import { build } from "esbuild";
import glob from "fast-glob";
import { sassPlugin } from "esbuild-sass-plugin";

(async () => {
  let entryPointsJS = await glob(`website-publish/**/*.js`, { ignore: [`website-publish/**/*min.js`] });
  let entryPointsCSS = await glob(`website-publish/**/*.css`, { ignore: [`website-publish/**/*min.css`] });
  let entryPointsSCSS = await glob(`website-publish/**/*.scss`, { ignore: [`website-publish/**/*min.scss`] });
  let entryPoints = [...entryPointsJS, ...entryPointsCSS, ...entryPointsSCSS];
  await build({
    allowOverwrite: true,
    bundle: true,
    entryPoints,
    external: ["*.jpg", "*.jpeg", "*.png", "*.svg", "*.webp", "*.avif", "*.gif"],
    sourcemap: true,
    minify: true,
    nodePaths: [`website-publish/shared`],
    outdir: `website-publish`,
    plugins: [sassPlugin()]
  });
})();