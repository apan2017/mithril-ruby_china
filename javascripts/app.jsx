const m = require("mithril");
const Layout = require("./layout.jsx");
const Topics = require("./topics.jsx");

m.route(document.body, "/", {
  "/": {
    render: function() {
      return m(Layout, m(Topics))
    }
  }
});