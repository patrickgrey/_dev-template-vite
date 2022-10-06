// import { ScrollToTop } from "_components/ScrollToTop";

var pageModule = (function () {
  var module = {};

  /**
   * Loads a JavaScript file and returns a Promise for when it is loaded
   */
  const loadScript = (src) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.onload = resolve;
      script.onerror = reject;
      script.src = src;
      document.head.append(script);
    });
  };

  module.hello = function (message) {
    console.log(message);
  }

  module.init = function () {
    // Analytics
    const head = document.querySelector("head");

    loadScript("/ilp/customs/JSLibrary/CF07_IANSanalytics.min.js")
      .then(() => {
        iansGASharedCode.detectIframeUpdate(
          document,
          "contentIframe",
          head.dataset.moduleCode,
          "Direct Access URL",
          "Direct Access URL",
          head.dataset.accessType,
          "bypages",
          head.dataset.courseMode,
          head.dataset.courseProvider
        );
      })
      .catch(() =>
        console.error(
          "!!!This is OK if you are developing locally!!! Analytics script did not load. "
        )
      );

    const backToSyllabus = document.querySelector("#backToSyllabus");

    backToSyllabus.addEventListener("click", function (event) {
      backToSyllabus.classList.remove("ians-lms-banner-show");
    })

    function showBackLink() {
      backToSyllabus.classList.add("ians-lms-banner-show");
    }

    function receiveMessage(event) {
      if (event.data === "linkClicked") {
        showBackLink();
      }
    }

    addEventListener("message", receiveMessage, false);
  };

  return module;
})();

pageModule.init();


