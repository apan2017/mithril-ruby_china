const m        = require("mithril");
const Layout   = require("./layout.jsx");
const Topics   = require("./topics.jsx");
const Topic    = require("./topic.jsx");
const Replies  = require("./replies.jsx");

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
  },
  "/topic/:id": {
    onmatch: function(params) {
      Topic.load(params.id);
      Replies.loadList(params.id);
    },
    render: function() {
      return m(Layout, m(Topic, m(Replies)))
    }
  }
});
