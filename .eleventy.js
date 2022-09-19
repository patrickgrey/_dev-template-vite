const EleventyVitePlugin = require("@11ty/eleventy-plugin-vite");

module.exports = function (eleventyConfig) {
  eleventyConfig.setServerPassthroughCopyBehavior("copy");
  // Copy the `img` and `css` folders to the output
  // if (process.env.NODE_ENV === "development") {
  eleventyConfig.addPassthroughCopy("_website-source/**/*.js");
  eleventyConfig.addPassthroughCopy("_website-source/**/*.css");
  eleventyConfig.addPassthroughCopy("_website-source/**/*.scss");
  // }


  // https://vueschool.io/articles/vuejs-tutorials/import-aliases-in-vite/
  // https://vitejs.dev/config/shared-options.html#resolve-alias - this doesn't seem to work

  // Maybe look at reinstating shared link for dev and manipulating
  // shared on esbuild?
  // Alternative is to use a filter or shortcode? Can't use in js/css
  if (process.env.NODE_ENV === "development") {
    eleventyConfig.addPlugin(EleventyVitePlugin, {
      tempFolderName: "_website-publish", // Default name of the temp folder
    });
  }

  return {
    // Control which files Eleventy will process
    // e.g.: *.md, *.njk, *.html, *.liquid
    templateFormats: [
      "njk",
      "html",
    ],

    // Pre-process *.md files with: (default: `liquid`)
    markdownTemplateEngine: "njk",

    // Pre-process *.html files with: (default: `liquid`)
    htmlTemplateEngine: "njk",

    // -----------------------------------------------------------------
    // If your site deploys to a subdirectory, change `pathPrefix`.
    // Don’t worry about leading and trailing slashes, we normalize these.

    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for link URLs (it does not affect your file structure)
    // Best paired with the `url` filter: https://www.11ty.dev/docs/filters/url/

    // You can also pass this in on the command line using `--pathprefix`

    // Optional (default is shown)
    pathPrefix: "/",
    // -----------------------------------------------------------------

    // These are all optional (defaults are shown):
    dir: {
      input: "_website-source",
      output: "_website-publish"
    }
  };
};
