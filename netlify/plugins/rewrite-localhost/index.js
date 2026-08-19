'use strict'

// MyST v2's static export stamps sitemap.xml, robots.txt, and canonical URLs
// with the ephemeral localhost preview server it spins up during the build,
// ignoring BASE_URL and site.domains. This post-build hook rewrites those
// localhost URLs to the real site domain. It runs regardless of whether the
// build command lives in netlify.toml or the Netlify dashboard, so it needs
// no dashboard change. Implemented in pure Node (no sed) so it behaves
// identically on macOS and the Linux build image.

const fs = require('fs')
const path = require('path')

const SITE_URL = 'https://courses.brianjalaian.com'
const LOCALHOST = /http:\/\/localhost:\d+/g
const EXTENSIONS = new Set(['.html', '.xml', '.txt', '.json'])

function rewriteDir(dir) {
  let count = 0
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      count += rewriteDir(full)
    } else if (EXTENSIONS.has(path.extname(entry.name))) {
      const original = fs.readFileSync(full, 'utf8')
      if (LOCALHOST.test(original)) {
        fs.writeFileSync(full, original.replace(LOCALHOST, SITE_URL))
        count += 1
      }
    }
  }
  return count
}

module.exports = {
  onPostBuild: ({ constants, utils }) => {
    try {
      const changed = rewriteDir(constants.PUBLISH_DIR)
      console.log(`rewrite-localhost: rewrote localhost URLs in ${changed} file(s) to ${SITE_URL}`)
    } catch (error) {
      // Don't fail the deploy over a cosmetic SEO rewrite.
      utils.status.show({
        title: 'rewrite-localhost skipped',
        summary: `URL rewrite failed: ${error.message}`,
      })
    }
  },
}
