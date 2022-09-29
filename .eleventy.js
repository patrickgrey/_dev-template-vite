const EleventyVitePlugin = require("@11ty/eleventy-plugin-vite");
const CleanCSS = require("clean-css");

module.exports = function (eleventyConfig) {
  eleventyConfig.setServerPassthroughCopyBehavior("copy");
  // Copy the `img` and `css` folders to the output
  eleventyConfig.addPassthroughCopy("_website-source/**/*.js");
  eleventyConfig.addPassthroughCopy("_website-source/**/*.css");
  eleventyConfig.addPassthroughCopy("_website-source/**/*.scss");
  // eleventyConfig.addPassthroughCopy("_website-source/img");

  // Add plugins
  eleventyConfig.addPlugin(EleventyVitePlugin, {
    tempFolderName: "_website-publish", // Default name of the temp folder
  });

  console.log("process.env.DEV_ENVIRONMENT:", process.env.DEV_ENVIRONMENT);

  eleventyConfig.addFilter("cssmin", function (code) {
    return new CleanCSS({}).minify(code).styles;
  });

  eleventyConfig.addFilter("sasstocss", function (code) {
    return (process.env.DEV_ENVIRONMENT != "dev") ? code.replace(".scss", ".css") : code;
  });

  return {
    // Control which files Eleventy will process
    // e.g.: *.md, *.njk, *.html, *.liquid
    templateFormats: [
      "md",
      "njk",
      "html",
      "liquid"
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
