// MyST parses markdown inside <details> blocks as HTML, so `$...$` comes out as
// <span class="math-inline"> text instead of a math node and is never rendered.
// Turn those spans back into math nodes so collapsible answers show formulas.
// MyST renders math with KaTeX before plugins run, so render these here too.
import katex from 'katex';

function mathNode(type, node) {
  const value = (node.children ?? []).map((child) => child.value ?? '').join('');
  const html = katex.renderToString(value, { displayMode: type === 'math', throwOnError: false });
  return { type, value, html };
}

function convert(node, inCheck = false) {
  if (!node || !Array.isArray(node.children)) return;
  const insideCheck = inCheck || (node.type === 'details' && node.class === 'extended-materials-check');
  node.children = node.children.map((child) => {
    if (insideCheck && child.type === 'span' && child.class === 'math-inline') {
      return mathNode('inlineMath', child);
    }
    if (insideCheck && (child.type === 'div' || child.type === 'span') && child.class === 'math-display') {
      return mathNode('math', child);
    }
    convert(child, insideCheck);
    return child;
  });
}

const plugin = {
  name: 'Math inside details',
  transforms: [
    {
      name: 'details-math',
      stage: 'document',
      plugin: () => (tree) => convert(tree),
    },
  ],
};

export default plugin;
