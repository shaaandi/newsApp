const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(proxy(["/graphql", "/auth"], { target: "http://localhost:4000" }));
};
