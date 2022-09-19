// Get all entry points (html) and build to same directory? 
// Or prevent passthrough on build and build with entry points?
// https://stackoverflow.com/questions/70042979/why-does-javascript-vite-js-multi-page-app-fail-on-build

// https://patak.dev/vite/build.html

// Vite plugin result:
/*
entries:  [
  'index.html',
  'page-01/index_fr/index.html',
  'page-01/index.html',
  'topic-01/page-01/index_fr/index.html',
  'topic-01/page-01/index.html'
]
*/

/**
 * Entries from own loop:
 * [
  '_website-publish/index.html',
  '_website-publish/page-01/index.html',
  '_website-publish/page-01/index_fr/index.html',        
  '_website-publish/topic-01/page-01/index.html',        
  '_website-publish/topic-01/page-01/index_fr/index.html'
]
 */

import * as fs from 'fs';
import glob from "fast-glob";

fs.mkdirSync("_website-vite");

let entryPoints = glob.sync(`_website-publish/**/*.html`);

entryPoints.forEach((entry, index) => {
  entryPoints[index] = entry.replace("_website-publish/", "");
});

// entryPoints.shift();

export default {
  build: {
    root: "_website-publish",
    mode: "production",
    outDir: "_website-vite",
    rollupOptions: {
      input: entryPoints
    }
  }
}