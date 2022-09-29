module.exports = function () {
  return {
    environment: process.env.DEV_ENVIRONMENT || "dev"
  };
};