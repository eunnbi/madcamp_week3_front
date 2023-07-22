const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://172.10.5.167:80",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "",
      },
    })
  );
};