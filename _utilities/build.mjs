import { build } from "esbuild";
import glob from "fast-glob";

(async () => {
  let entryPointsJS = await glob(`_website-publish/**/*.js`);
  let entryPointsCSS = await glob(`_website-publish/**/*.css`);
  let entryPoints = [...entryPointsJS, ...entryPointsCSS];
  await build({
    allowOverwrite: true,
    bundle: true,
    entryPoints,
    minify: true,
    nodePaths: [`_website-publish/shared`],
    outdir: `_website-publish`
  });
})();