const EleventyVitePlugin = require("@11ty/eleventy-plugin-vite");
const Image = require("@11ty/eleventy-img");
const purgeCssPlugin = require("eleventy-plugin-purgecss");
const CleanCSS = require("clean-css");
const { minify } = require("terser");
const path = require("path");

async function imageShortcode(src, alt, cls, sizes, widths, formats) {
  const imagePath = path.dirname(src);
  // console.log("imagePath:", imagePath);
  const urlPath = imagePath + "/";
  let pageURL = this.page.url;
  // console.log("pageURL:", pageURL);
  if (this.page.url.slice(-5) === ".html") {
    // console.log(pageURL.lastIndexOf("/") * -1)
    pageURL = pageURL.slice(0, pageURL.lastIndexOf("/") + 1);
  }
  // console.log("pageURL:", pageURL);
  const outputDir = "./website-publish" + pageURL + imagePath + "/";
  // BUG if ends with .html, need to remove string back to /
  // console.log("outputDir:", outputDir);
  const imageSource = "./website-source" + pageURL + src;
  // console.log("imageSource:", imageSource);
  const sizesString = sizes || `(max-width: 2400px) 100vw, 2400px`;

  let metadata = await Image(imageSource, {
    widths: widths || [320, 640, 960, 1200, 1800, 2400],
    formats: formats || ["avif", "webp", "jpeg"],
    urlPath: urlPath,
    outputDir: outputDir,
  });

  let imageAttributes = {
    class: cls || "",
    alt,
    sizes: sizesString,
    loading: "lazy",
    decoding: "async",
  };

  return Image.generateHTML(metadata, imageAttributes);
}

module.exports = function (eleventyConfig) {
  eleventyConfig.setServerPassthroughCopyBehavior("copy");
  ["js", "css", "scss", "jpg", "jpeg", "png", "svg", "webp", "avif", "mp3", "pdf", "gif", "json"].forEach((extension) => {
    eleventyConfig.addPassthroughCopy(`website-source/**/*.${extension}`);
  });

  // Add plugins
  if (process.env.DEV_ENVIRONMENT === "dev") {
    eleventyConfig.addPlugin(EleventyVitePlugin, {
      tempFolderName: "website-publish", // Default name of the temp folder
    });
  }

  if (process.env.DEV_ENVIRONMENT != "dev") {
    eleventyConfig.addPlugin(purgeCssPlugin, {
      // Optional: Specify the location of your PurgeCSS config
      config: "./purgecss.config.js",

      // Optional: Set quiet: true to suppress terminal output
      quiet: false,
    });
  }

  // Add filters
  eleventyConfig.addFilter("cssmin", function (code) {
    return new CleanCSS({}).minify(code).styles;
  });
  eleventyConfig.addFilter("jsmin", async function (code) {
    const minifiedObject = await minify(code);
    return minifiedObject.code;
  });
  // Change links to sass files in template to css on build
  eleventyConfig.addFilter("sasstocss", function (code) {
    return (process.env.DEV_ENVIRONMENT != "dev") ? code.replace(".scss", ".css") : code;
  });

  // Add shortcodes
  eleventyConfig.addShortcode("lmsBanner", function () {
    let html = ``;
    if (process.env.DEV_ENVIRONMENT === "dev") {
      html = `<div class="ians-lms-banner">
		<a href="/index.html">&lt;&lt; Back</a>
	</div>`;
    }
    return html;
  });

  eleventyConfig.addShortcode("vimeo", function (id) {
    const videoid = id || "692319154?h=167b8d2cc5"; //Placeholder
    return `<div class="ians-video-16-9">
		<iframe
			src="https://player.vimeo.com/video/${videoid}"
			loading="lazy"
			width="640"
						height="564"
						frameborder="0"
						allow="autoplay; fullscreen"
						allowfullscreen
		></iframe>
	</div>`;
  });

  eleventyConfig.addAsyncShortcode("image", imageShortcode);

  return {
    // Control which files Eleventy will process
    // e.g.: *.md, *.njk, *.html, *.liquid
    templateFormats: [
      "md",
      "njk",
      "html",
      "liquid"
    ],

    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",

    dir: {
      input: "website-source",
      output: "website-publish",
      data: "../_utilities/_data",
    }
  };
};
