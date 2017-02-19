const m = require("mithril");
const Layout = require("./layout.jsx");
const Topics = require("./topics.jsx");

m.route(document.body, "/", {
  "/": {
    onmatch: function() {
      Layout.activePath("/");
      Topics.loadList();
    },
    render: function() {
      return m(Layout, m(Topics))
    }
  },
  "/topics/:type": {
    onmatch: function(params, path) {
      Layout.activePath(path);
      Topics.loadList(params.type);
    },
    render: function() {
      return m(Layout, m(Topics))
    }
  }
});
