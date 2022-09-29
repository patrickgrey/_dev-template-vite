import { build } from "esbuild";
import glob from "fast-glob";
import { sassPlugin } from "esbuild-sass-plugin";

(async () => {
  let entryPointsJS = await glob(`_website-publish/**/*.js`);
  let entryPointsCSS = await glob(`_website-publish/**/*.css`);
  let entryPointsSCSS = await glob(`_website-publish/**/*.scss`);
  let entryPoints = [...entryPointsJS, ...entryPointsCSS, ...entryPointsSCSS];
  await build({
    allowOverwrite: true,
    bundle: true,
    entryPoints,
    minify: false,
    nodePaths: [`_website-publish/shared`],
    outdir: `_website-publish`,
    plugins: [sassPlugin()]
  });
})();