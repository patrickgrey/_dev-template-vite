(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // _website-publish/_data/devEnvironment.js
  var require_devEnvironment = __commonJS({
    "_website-publish/_data/devEnvironment.js"(exports, module) {
      module.exports = function() {
        return {
          environment: process.env.DEV_ENVIRONMENT || "dev"
        };
      };
    }
  });
  require_devEnvironment();
})();
