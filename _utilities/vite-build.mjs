// Get all entry points (html) and build to same directory? 
// Or prevent passthrough on build and build with entry points?
// https://stackoverflow.com/questions/70042979/why-does-javascript-vite-js-multi-page-app-fail-on-build

import * as fs from 'fs';
import glob from "fast-glob";

// Maybe this has to be inside the vite config...

fs.mkdirSync("_webiste-vite");

let entryPoints = glob.sync(`_website-publish/**/*.html`);

entryPoints.forEach((entry, index) => {
  entryPoints[index] = entry.replace("_website-publish/", "");
});

console.log(entryPoints);


// (async () => {
//   let entryPoints = await glob(`_website-publish/**/*.html`);
// })();
