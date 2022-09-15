// Get all entry points (html) and build to same directory? 
// Or prevent passthrough on build and build with entry points?
// https://stackoverflow.com/questions/70042979/why-does-javascript-vite-js-multi-page-app-fail-on-build

import glob from "fast-glob";

// Maybe this has to be inside the vite config...

(async () => {
  let entryPoints = await glob(`_website-publish/**/*.html`);
  console.log(entryPoints);
})();