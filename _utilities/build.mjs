import { build } from "esbuild";
import glob from "fast-glob";
import { sassPlugin } from "esbuild-sass-plugin";

(async () => {
  let entryPointsJS = await glob(`website-publish/**/*.js`, { ignore: ['website-publish/_data/**/*.js'] });
  let entryPointsCSS = await glob(`website-publish/**/*.css`);
  let entryPointsSCSS = await glob(`website-publish/**/*.scss`);
  let entryPoints = [...entryPointsJS, ...entryPointsCSS, ...entryPointsSCSS];
  await build({
    allowOverwrite: true,
    bundle: true,
    entryPoints,
    sourcemap: true,
    minify: true,
    nodePaths: [`website-publish/shared`],
    outdir: `website-publish`,
    plugins: [sassPlugin()]
  });
})();