#!/usr/bin/env node
'use strict'

// Post-build fixes applied to the built site before it is deployed.
//
// This runs from the GitHub Actions workflow, NOT as a Netlify build plugin.
// The site is deployed with nwtgck/actions-netlify, which uploads _build/html
// directly, so Netlify never runs a build and never executes the [[plugins]]
// or [[redirects]] in netlify.toml. Anything that must affect the live site
// has to happen here.

const fs = require('fs')
const path = require('path')

const SITE_URL = 'https://courses.brianjalaian.com'
const EXTENSIONS = new Set(['.html', '.xml', '.txt', '.json'])
const publishDir = process.argv[2] || '_build/html'

// 1. MyST stamps sitemap.xml, robots.txt and canonical URLs with the ephemeral
//    localhost preview server it runs during the build, ignoring BASE_URL.
function rewriteLocalhost(dir) {
  let count = 0
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      count += rewriteLocalhost(full)
      continue
    }
    if (!EXTENSIONS.has(path.extname(entry.name))) continue
    const original = fs.readFileSync(full, 'utf8')
    // Build the regex per call: a /g regex keeps lastIndex between uses, so a
    // shared one would skip roughly half the files.
    const rewritten = original.replace(/http:\/\/localhost:\d+/g, SITE_URL)
    if (rewritten !== original) {
      fs.writeFileSync(full, rewritten)
      count += 1
    }
  }
  return count
}

// 2. The 36 published YouTube descriptions link to /modules/<dir>/, but MyST
//    serves every module overview at /index-N -- the pages are all named
//    index.md, so it de-duplicates the slugs. Those URLs are baked into
//    published video descriptions, so redirect rather than reword them.
function writeRedirects(dir) {
  const yml = fs.readFileSync('myst.yml', 'utf8')
  const dirs = [...yml.matchAll(/file: (modules\/[^/\s]+)\/index\.md/g)].map((m) => m[1])
  const lines = dirs.map((d, i) => `/${d}/*  /index-${i + 1}  301!`)
  fs.writeFileSync(path.join(dir, '_redirects'), lines.join('\n') + '\n')
  return dirs.length
}

const rewritten = rewriteLocalhost(publishDir)
const redirects = writeRedirects(publishDir)
console.log(`postbuild: rewrote localhost URLs in ${rewritten} file(s); wrote ${redirects} redirect(s)`)
