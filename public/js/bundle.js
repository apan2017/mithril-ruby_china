(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var m = require("mithril");
var Layout = require("./layout.jsx");
var Topics = require("./topics.jsx");
var Topic = require("./topic.jsx");
var Replies = require("./replies.jsx");
var User = require("./user.jsx");

m.route(document.body, "/", {
  "/": {
    onmatch: function onmatch() {
      Layout.activePath("/");
      Topics.loadList();
    },
    render: function render() {
      return m(Layout, m(Topics));
    }
  },
  "/topics/:type": {
    onmatch: function onmatch(params, path) {
      var mdata;

      Layout.activePath(path);
      if (mdata = params.type.match(/node(\d+)/)) {
        Topics.loadList(null, mdata[1]);
      } else {
        Topics.loadList(params.type);
      }
    },
    render: function render() {
      return m(Layout, m(Topics));
    }
  },
  "/topic/:id": {
    onmatch: function onmatch(params) {
      Topic.load(params.id);
      Replies.loadList(params.id);
    },
    render: function render() {
      return m(Layout, m(Topic, m(Replies)));
    }
  },
  "/:login": {
    onmatch: function onmatch(params) {
      User.load(params.login);
    },
    render: function render() {
      return m(Layout, m(User));
    }
  }
});

},{"./layout.jsx":2,"./replies.jsx":3,"./topic.jsx":4,"./topics.jsx":5,"./user.jsx":6,"mithril":8}],2:[function(require,module,exports){
'use strict';

var m = require("mithril");

var Layout = {};

Layout.paths = {
  '/': '社区',
  '/topics/popular': '优质话题',
  '/topics/no_reply': '无人问津',
  '/topics/recent': '最新发布'
};

Layout.currentActivedPath = '/';

Layout.activePath = function (path) {
  this.currentActivedPath = path;
};

Layout.linkClassName = function (linkPath) {
  return this.currentActivedPath === linkPath ? 'nav-link active' : 'nav-link';
};

Layout.renderLoginInfo = function () {
  var currentUser = window.currentUser;

  if (currentUser) {
    return m(
      'ul',
      { 'class': 'nav navbar-nav my-2 my-lg-0' },
      m(
        'li',
        { 'class': 'nav-item' },
        m(
          'a',
          { 'class': 'user-avatar nav-link', href: "/" + currentUser.login, oncreate: m.route.link },
          m('img', { 'class': 'avatar avatar-md media-object', src: currentUser.avatar_url })
        )
      ),
      m(
        'li',
        { 'class': 'nav-item' },
        m(
          'a',
          { href: '#', 'class': 'nav-link' },
          '\u767B\u51FA'
        )
      )
    );
  } else {
    return m(
      'ul',
      { 'class': 'nav navbar-nav my-2 my-lg-0' },
      m(
        'li',
        { 'class': 'nav-item' },
        m(
          'a',
          { 'class': 'nav-link', href: '/oauth' },
          '\u767B\u5F55'
        )
      )
    );
  }
};

Layout.view = function (vnode) {
  return m(
    'div',
    { id: 'root' },
    m(
      'nav',
      { id: 'header', 'class': 'navbar navbar-light navbar-toggleable-md fixed-top bg-faded' },
      m(
        'div',
        { 'class': 'container' },
        m(
          'a',
          { 'class': 'navbar-brand', href: "/", oncreate: m.route.link },
          m(
            'b',
            null,
            'Ruby'
          ),
          ' China ',
          m(
            'sup',
            null,
            'Mithril version'
          )
        ),
        m(
          'button',
          { 'class': 'navbar-toggler navbar-toggler-right', type: 'button', 'data-toggle': 'collapse', 'data-target': '#main-nav-menu' },
          m('span', { 'class': 'navbar-toggler-icon' })
        ),
        m(
          'div',
          { 'class': 'collapse navbar-collapse', id: 'main-nav-menu' },
          m(
            'ul',
            { 'class': 'nav navbar-nav main-nav mr-auto mt-2 mt-md-0' },
            Object.keys(Layout.paths).map(function (key, index) {
              return m(
                'li',
                { 'class': 'nav-item' },
                m(
                  'a',
                  { className: Layout.linkClassName(key), href: key, oncreate: m.route.link },
                  Layout.paths[key]
                )
              );
            })
          ),
          Layout.renderLoginInfo()
        )
      )
    ),
    m(
      'main',
      { id: 'main', 'class': 'main-layout' },
      vnode.children
    )
  );
};

module.exports = Layout;

},{"mithril":8}],3:[function(require,module,exports){
'use strict';

var m = require('mithril');
var Utils = require('./utils.js');

var Replies = {};

Replies.list = [];

Replies.loadList = function (topic_id) {
  m.request({
    method: 'GET',
    url: 'https://ruby-china.org/api/v3/topics/' + topic_id + '/replies.json',
    data: { limit: 50 }
  }).then(function (data) {
    Replies.list = data.replies;
  }).catch(function (err) {
    console.error(err);
  });
};

Replies.renderReply = function (reply, user) {
  return m(
    'div',
    { id: "reply-" + reply.id, 'class': 'media reply reply-reply' },
    m(
      'div',
      { 'class': 'd-flex align-self-start mr-3' },
      m(
        'a',
        { 'class': 'user-avatar', href: user.login, oncreate: m.route.link },
        m('img', { 'class': 'avatar avatar-lg media-object', src: user.avatar_url })
      )
    ),
    m(
      'div',
      { 'class': 'media-body' },
      m(
        'span',
        null,
        m(
          'div',
          { 'class': 'mt-0 media-heading' },
          m(
            'a',
            { title: user.name, 'class': 'user-name', href: user.login, oncreate: m.route.link },
            user.login
          ),
          m(
            'span',
            { 'class': 'date float-right' },
            m(
              'time',
              null,
              Utils.dateFormatFromString(reply.created_at)
            )
          )
        ),
        m(
          'div',
          { 'class': 'markdown' },
          m.trust(reply.body_html)
        ),
        m(
          'div',
          { 'class': 'media-footer clearfix' },
          m(
            'span',
            { 'class': 'float-right opts' },
            m(
              'a',
              { 'class': 'btn btn-icon like-button', href: '#' },
              m('i', { 'class': 'fa fa-heart' })
            ),
            m(
              'a',
              { 'class': 'btn btn-icon ', href: '#' },
              m('i', { 'class': 'fa fa-ellipsis-h' })
            ),
            m(
              'a',
              { 'class': 'btn btn-icon ', href: '#' },
              m('i', { 'class': 'fa fa-reply' })
            )
          )
        )
      )
    )
  );
};

Replies.view = function () {
  return m(
    'div',
    { 'class': 'replies' },
    Replies.list.map(function (reply) {
      return Replies.renderReply(reply, reply.user);
    })
  );
};

module.exports = Replies;

},{"./utils.js":7,"mithril":8}],4:[function(require,module,exports){
'use strict';

var m = require("mithril");
var Utils = require('./utils.js');

var Topic = {};

Topic.load = function (id) {
  m.request({
    method: 'GET',
    url: 'https://ruby-china.org/api/v3/topics/' + id + '.json'
  }).then(function (data) {
    Topic.current = data;
  }).catch(function (err) {
    console.error(err);
  });
};

Topic.renderTopicTitle = function (topic) {
  return m(
    'h1',
    null,
    m(
      'a',
      { title: topic.node_name, 'class': 'node-name', href: '/topics/node' + topic.node_id, oncreate: m.route.link },
      topic.node_name
    ),
    ' ',
    topic.title
  );
};

Topic.renderTopicContent = function (topic, user, vnode) {
  return m(
    'div',
    { 'class': 'row' },
    m(
      'div',
      { 'class': 'col-md-9' },
      m(
        'div',
        { 'class': 'topic-content' },
        m(
          'div',
          { id: 'topic-' + topic.id, 'class': 'media reply reply-topic' },
          m(
            'div',
            { 'class': 'd-flex align-self-start mr-3' },
            m(
              'a',
              { 'class': 'user-avatar ', href: '/' + user.login, oncreate: m.route.link },
              m('img', { 'class': 'avatar avatar-lg media-object', src: topic.user.avatar_url })
            )
          ),
          m(
            'div',
            { 'class': 'media-body' },
            m(
              'span',
              null,
              m(
                'div',
                { 'class': 'mt-0 media-heading' },
                m(
                  'a',
                  { title: user.name, 'class': 'user-name', href: '/' + user.login, oncreate: m.route.link },
                  user.login
                ),
                m(
                  'span',
                  { 'class': 'date float-right' },
                  m(
                    'time',
                    null,
                    Utils.dateFormatFromString(topic.replied_at)
                  )
                )
              )
            ),
            m(
              'div',
              { 'class': 'markdonw' },
              m.trust(topic.body_html)
            ),
            Topic.renderTopicFooter(topic)
          )
        )
      ),
      vnode.children
    ),
    m('div', { 'class': 'hidden-md-down col-md-3' })
  );
};

Topic.renderTopicFooter = function (topic) {
  return m(
    'div',
    { 'class': 'media-footer clearfix' },
    m(
      'span',
      { 'class': 'float-right opts' },
      m(
        'a',
        { 'class': 'btn btn-icon like-button', href: '#' },
        m('i', { 'class': 'fa fa-heart' }),
        ' ',
        topic.likes_count,
        ' \u4E2A\u8D5E'
      ),
      m(
        'a',
        { 'class': 'btn btn-icon ', href: '#' },
        m('i', { 'class': 'fa fa-ellipsis-h' })
      ),
      m(
        'a',
        { 'class': 'btn btn-icon ', href: '#' },
        m('i', { 'class': 'fa fa-reply' })
      )
    )
  );
};

Topic.view = function (vnode) {
  if (!Topic.current) {
    return;
  }

  var topic = Topic.current.topic;

  return m(
    'div',
    { 'class': 'container' },
    m(
      'div',
      { 'class': 'topic-detail' },
      [Topic.renderTopicTitle(topic), Topic.renderTopicContent(topic, topic.user, vnode)]
    )
  );
};

module.exports = Topic;

},{"./utils.js":7,"mithril":8}],5:[function(require,module,exports){
'use strict';

var m = require("mithril");
var Utils = require('./utils.js');

var Topics = {
  list: [],
  loadList: function loadList(type, node_id) {
    var data = {};
    data.type = type || 'last_actived';
    if (node_id) {
      data.node_id = node_id;
    }

    m.request({
      method: 'GET',
      url: 'https://ruby-china.org/api/v3/topics.json',
      data: data
    }).then(function (data) {
      Topics.list = data.topics;
    }).catch(function (err) {
      console.error(err);
    });
  }
};

Topics.view = function () {
  return m(
    'div',
    { 'class': 'container' },
    m(
      'div',
      { id: 'home-container' },
      m(
        'div',
        { 'class': 'topics' },
        m(
          'table',
          { 'class': 'table' },
          m(
            'thead',
            { 'class': 'thead-default' },
            m(
              'tr',
              { 'class': 'topic' },
              m(
                'th',
                { 'class': 'title' },
                '\u6807\u9898'
              ),
              m(
                'th',
                { 'class': 'author hidden-xs-down' },
                '\u4F5C\u8005'
              ),
              m(
                'th',
                { 'class': 'replies hidden-md-down' },
                '\u56DE\u5E16/\u8D5E'
              ),
              m(
                'th',
                { 'class': 'activity hidden-md-down' },
                '\u66F4\u65B0'
              )
            )
          ),
          m(
            'tbody',
            null,
            Topics.list.map(function (topic) {
              return m(
                'tr',
                { 'class': 'topic' },
                m(
                  'td',
                  { 'class': 'title' },
                  m(
                    'a',
                    { 'class': 'topic-link', href: '/topic/' + topic.id, oncreate: m.route.link },
                    m(
                      'span',
                      { 'class': 'node' },
                      topic.node_name
                    ),
                    ' ',
                    topic.title
                  )
                ),
                m(
                  'td',
                  { 'class': 'author hidden-xs-down' },
                  m(
                    'a',
                    { 'class': 'user-avatar ', href: "/" + topic.user.login, oncreate: m.route.link },
                    m('img', { 'class': 'avatar avatar-lg media-object', src: topic.user.avatar_url })
                  )
                ),
                m(
                  'td',
                  { 'class': 'replies hidden-md-down' },
                  m(
                    'span',
                    null,
                    m('i', { 'class': 'fa fa-comments' }),
                    ' ',
                    topic.replies_count
                  ),
                  m(
                    'span',
                    { 'class': 'likes' },
                    m('i', { 'class': 'fa fa-heart' }),
                    ' ',
                    topic.likes_count
                  )
                ),
                m(
                  'td',
                  { 'class': 'activity hidden-md-down' },
                  m(
                    'time',
                    null,
                    Utils.dateFormatFromString(topic.replied_at)
                  )
                )
              );
            })
          )
        )
      )
    )
  );
};

module.exports = Topics;

},{"./utils.js":7,"mithril":8}],6:[function(require,module,exports){
'use strict';

var m = require('mithril');
var Utils = require('./utils.js');

var User = {};

User.load = function (login) {
  m.request({
    method: 'GET',
    url: 'https://ruby-china.org/api/v3/users/' + login + '.json'
  }).then(function (data) {
    User.current = data;
  }).catch(function (err) {
    console.error(err);
  });
};

User.renderUserInfo = function (user) {
  return m(
    'div',
    { 'class': 'user-info card text-center' },
    m(
      'div',
      { 'class': 'card-block' },
      m(
        'a',
        { 'class': 'user-avatar ', href: "/" + user.login },
        m('img', { 'class': 'avatar avatar-lg media-object', src: user.avatar_url })
      ),
      m(
        'h4',
        { 'class': 'card-title text-center' },
        user.login,
        ' ',
        m(
          'span',
          { 'class': 'name' },
          '(',
          user.name,
          ')'
        )
      ),
      m(
        'div',
        { 'class': 'card-text' },
        user.tagline
      )
    ),
    m(
      'div',
      { 'class': 'card-footer' },
      m(
        'a',
        { 'class': 'followers', href: '/andor_chen/followers' },
        user.followers_count,
        ' \u5173\u6CE8\u8005'
      ),
      m(
        'a',
        { 'class': 'following', href: '/andor_chen/following' },
        user.following_count,
        ' \u6B63\u5728\u5173\u6CE8'
      )
    )
  );
};

User.getTabItems = function (login) {
  var obj = {};

  obj['/' + login] = '话题';
  obj['/' + login + '/replies'] = '回帖';
  obj['/' + login + '/favorites'] = '收藏';

  return obj;
};

User.renderTabs = function (user) {
  return m(
    'div',
    { 'class': 'clearfix' },
    m(
      'ul',
      { 'class': 'nav nav-pills' },
      m(
        'li',
        { 'class': 'nav-item' },
        m(
          'a',
          { 'class': 'nav-link', href: '/' + user.login, oncreate: m.route.link },
          '\u8BDD\u9898 ',
          m(
            'span',
            { 'class': 'count' },
            '(',
            user.topics_count,
            ')'
          )
        )
      ),
      m(
        'li',
        { 'class': 'nav-item' },
        m(
          'a',
          { 'class': 'nav-link', href: '/' + user.login + '/replies', oncreate: m.route.link },
          '\u56DE\u5E16 ',
          m(
            'span',
            { 'class': 'count' },
            '(',
            user.replies_count,
            ')'
          )
        )
      ),
      m(
        'li',
        { 'class': 'nav-item' },
        m(
          'a',
          { 'class': 'nav-link', href: '/' + user.login + '/replies', oncreate: m.route.link },
          '\u6536\u85CF ',
          m(
            'span',
            { 'class': 'count' },
            '(',
            user.favorites_count,
            ')'
          )
        )
      )
    )
  );
};

User.view = function () {
  if (!this.current) {
    return;
  }

  var user = this.current.user;

  return m(
    'div',
    { 'class': 'container' },
    m(
      'div',
      { 'class': 'user-profile' },
      User.renderUserInfo(user),
      User.renderTabs(user)
    )
  );
};

module.exports = User;

},{"./utils.js":7,"mithril":8}],7:[function(require,module,exports){
"use strict";

module.exports = {
  dateFormatFromString: function dateFormatFromString(string) {
    return this.dateFormat(new Date(string));
  },
  dateFormat: function dateFormat(date) {
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }
};

},{}],8:[function(require,module,exports){
(function (global){
new function() {

function Vnode(tag, key, attrs0, children, text, dom) {
	return {tag: tag, key: key, attrs: attrs0, children: children, text: text, dom: dom, domSize: undefined, state: {}, events: undefined, instance: undefined, skip: false}
}
Vnode.normalize = function(node) {
	if (Array.isArray(node)) return Vnode("[", undefined, undefined, Vnode.normalizeChildren(node), undefined, undefined)
	if (node != null && typeof node !== "object") return Vnode("#", undefined, undefined, node === false ? "" : node, undefined, undefined)
	return node
}
Vnode.normalizeChildren = function normalizeChildren(children) {
	for (var i = 0; i < children.length; i++) {
		children[i] = Vnode.normalize(children[i])
	}
	return children
}
var selectorParser = /(?:(^|#|\.)([^#\.\[\]]+))|(\[(.+?)(?:\s*=\s*("|'|)((?:\\["'\]]|.)*?)\5)?\])/g
var selectorCache = {}
function hyperscript(selector) {
	if (selector == null || typeof selector !== "string" && typeof selector.view !== "function") {
		throw Error("The selector must be either a string or a component.");
	}
	if (typeof selector === "string" && selectorCache[selector] === undefined) {
		var match, tag, classes = [], attributes = {}
		while (match = selectorParser.exec(selector)) {
			var type = match[1], value = match[2]
			if (type === "" && value !== "") tag = value
			else if (type === "#") attributes.id = value
			else if (type === ".") classes.push(value)
			else if (match[3][0] === "[") {
				var attrValue = match[6]
				if (attrValue) attrValue = attrValue.replace(/\\(["'])/g, "$1").replace(/\\\\/g, "\\")
				if (match[4] === "class") classes.push(attrValue)
				else attributes[match[4]] = attrValue || true
			}
		}
		if (classes.length > 0) attributes.className = classes.join(" ")
		selectorCache[selector] = function(attrs, children) {
			var hasAttrs = false, childList, text
			var className = attrs.className || attrs.class
			for (var key in attributes) attrs[key] = attributes[key]
			if (className !== undefined) {
				if (attrs.class !== undefined) {
					attrs.class = undefined
					attrs.className = className
				}
				if (attributes.className !== undefined) attrs.className = attributes.className + " " + className
			}
			for (var key in attrs) {
				if (key !== "key") {
					hasAttrs = true
					break
				}
			}
			if (Array.isArray(children) && children.length == 1 && children[0] != null && children[0].tag === "#") text = children[0].children
			else childList = children
			return Vnode(tag || "div", attrs.key, hasAttrs ? attrs : undefined, childList, text, undefined)
		}
	}
	var attrs, children, childrenIndex
	if (arguments[1] == null || typeof arguments[1] === "object" && arguments[1].tag === undefined && !Array.isArray(arguments[1])) {
		attrs = arguments[1]
		childrenIndex = 2
	}
	else childrenIndex = 1
	if (arguments.length === childrenIndex + 1) {
		children = Array.isArray(arguments[childrenIndex]) ? arguments[childrenIndex] : [arguments[childrenIndex]]
	}
	else {
		children = []
		for (var i = childrenIndex; i < arguments.length; i++) children.push(arguments[i])
	}
	if (typeof selector === "string") return selectorCache[selector](attrs || {}, Vnode.normalizeChildren(children))
	return Vnode(selector, attrs && attrs.key, attrs || {}, Vnode.normalizeChildren(children), undefined, undefined)
}
hyperscript.trust = function(html) {
	if (html == null) html = ""
	return Vnode("<", undefined, undefined, html, undefined, undefined)
}
hyperscript.fragment = function(attrs1, children) {
	return Vnode("[", attrs1.key, attrs1, Vnode.normalizeChildren(children), undefined, undefined)
}
var m = hyperscript
/** @constructor */
var PromisePolyfill = function(executor) {
	if (!(this instanceof PromisePolyfill)) throw new Error("Promise must be called with `new`")
	if (typeof executor !== "function") throw new TypeError("executor must be a function")
	var self = this, resolvers = [], rejectors = [], resolveCurrent = handler(resolvers, true), rejectCurrent = handler(rejectors, false)
	var instance = self._instance = {resolvers: resolvers, rejectors: rejectors}
	var callAsync = typeof setImmediate === "function" ? setImmediate : setTimeout
	function handler(list, shouldAbsorb) {
		return function execute(value) {
			var then
			try {
				if (shouldAbsorb && value != null && (typeof value === "object" || typeof value === "function") && typeof (then = value.then) === "function") {
					if (value === self) throw new TypeError("Promise can't be resolved w/ itself")
					executeOnce(then.bind(value))
				}
				else {
					callAsync(function() {
						if (!shouldAbsorb && list.length === 0) console.error("Possible unhandled promise rejection:", value)
						for (var i = 0; i < list.length; i++) list[i](value)
						resolvers.length = 0, rejectors.length = 0
						instance.state = shouldAbsorb
						instance.retry = function() {execute(value)}
					})
				}
			}
			catch (e) {
				rejectCurrent(e)
			}
		}
	}
	function executeOnce(then) {
		var runs = 0
		function run(fn) {
			return function(value) {
				if (runs++ > 0) return
				fn(value)
			}
		}
		var onerror = run(rejectCurrent)
		try {then(run(resolveCurrent), onerror)} catch (e) {onerror(e)}
	}
	executeOnce(executor)
}
PromisePolyfill.prototype.then = function(onFulfilled, onRejection) {
	var self = this, instance = self._instance
	function handle(callback, list, next, state) {
		list.push(function(value) {
			if (typeof callback !== "function") next(value)
			else try {resolveNext(callback(value))} catch (e) {if (rejectNext) rejectNext(e)}
		})
		if (typeof instance.retry === "function" && state === instance.state) instance.retry()
	}
	var resolveNext, rejectNext
	var promise = new PromisePolyfill(function(resolve, reject) {resolveNext = resolve, rejectNext = reject})
	handle(onFulfilled, instance.resolvers, resolveNext, true), handle(onRejection, instance.rejectors, rejectNext, false)
	return promise
}
PromisePolyfill.prototype.catch = function(onRejection) {
	return this.then(null, onRejection)
}
PromisePolyfill.resolve = function(value) {
	if (value instanceof PromisePolyfill) return value
	return new PromisePolyfill(function(resolve) {resolve(value)})
}
PromisePolyfill.reject = function(value) {
	return new PromisePolyfill(function(resolve, reject) {reject(value)})
}
PromisePolyfill.all = function(list) {
	return new PromisePolyfill(function(resolve, reject) {
		var total = list.length, count = 0, values = []
		if (list.length === 0) resolve([])
		else for (var i = 0; i < list.length; i++) {
			(function(i) {
				function consume(value) {
					count++
					values[i] = value
					if (count === total) resolve(values)
				}
				if (list[i] != null && (typeof list[i] === "object" || typeof list[i] === "function") && typeof list[i].then === "function") {
					list[i].then(consume, reject)
				}
				else consume(list[i])
			})(i)
		}
	})
}
PromisePolyfill.race = function(list) {
	return new PromisePolyfill(function(resolve, reject) {
		for (var i = 0; i < list.length; i++) {
			list[i].then(resolve, reject)
		}
	})
}
if (typeof window !== "undefined") {
	if (typeof window.Promise === "undefined") window.Promise = PromisePolyfill
	var PromisePolyfill = window.Promise
} else if (typeof global !== "undefined") {
	if (typeof global.Promise === "undefined") global.Promise = PromisePolyfill
	var PromisePolyfill = global.Promise
} else {
}
var buildQueryString = function(object) {
	if (Object.prototype.toString.call(object) !== "[object Object]") return ""
	var args = []
	for (var key0 in object) {
		destructure(key0, object[key0])
	}
	return args.join("&")
	function destructure(key0, value) {
		if (Array.isArray(value)) {
			for (var i = 0; i < value.length; i++) {
				destructure(key0 + "[" + i + "]", value[i])
			}
		}
		else if (Object.prototype.toString.call(value) === "[object Object]") {
			for (var i in value) {
				destructure(key0 + "[" + i + "]", value[i])
			}
		}
		else args.push(encodeURIComponent(key0) + (value != null && value !== "" ? "=" + encodeURIComponent(value) : ""))
	}
}
var _8 = function($window, Promise) {
	var callbackCount = 0
	var oncompletion
	function setCompletionCallback(callback) {oncompletion = callback}
	function finalizer() {
		var count = 0
		function complete() {if (--count === 0 && typeof oncompletion === "function") oncompletion()}
		return function finalize(promise0) {
			var then0 = promise0.then
			promise0.then = function() {
				count++
				var next = then0.apply(promise0, arguments)
				next.then(complete, function(e) {
					complete()
					if (count === 0) throw e
				})
				return finalize(next)
			}
			return promise0
		}
	}
	function normalize(args, extra) {
		if (typeof args === "string") {
			var url = args
			args = extra || {}
			if (args.url == null) args.url = url
		}
		return args
	}
	function request(args, extra) {
		var finalize = finalizer()
		args = normalize(args, extra)
		var promise0 = new Promise(function(resolve, reject) {
			if (args.method == null) args.method = "GET"
			args.method = args.method.toUpperCase()
			var useBody = typeof args.useBody === "boolean" ? args.useBody : args.method !== "GET" && args.method !== "TRACE"
			if (typeof args.serialize !== "function") args.serialize = typeof FormData !== "undefined" && args.data instanceof FormData ? function(value) {return value} : JSON.stringify
			if (typeof args.deserialize !== "function") args.deserialize = deserialize
			if (typeof args.extract !== "function") args.extract = extract
			args.url = interpolate(args.url, args.data)
			if (useBody) args.data = args.serialize(args.data)
			else args.url = assemble(args.url, args.data)
			var xhr = new $window.XMLHttpRequest()
			xhr.open(args.method, args.url, typeof args.async === "boolean" ? args.async : true, typeof args.user === "string" ? args.user : undefined, typeof args.password === "string" ? args.password : undefined)
			if (args.serialize === JSON.stringify && useBody) {
				xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8")
			}
			if (args.deserialize === deserialize) {
				xhr.setRequestHeader("Accept", "application/json, text/*")
			}
			if (args.withCredentials) xhr.withCredentials = args.withCredentials
			for (var key in args.headers) if ({}.hasOwnProperty.call(args.headers, key)) {
				xhr.setRequestHeader(key, args.headers[key])
			}
			if (typeof args.config === "function") xhr = args.config(xhr, args) || xhr
			xhr.onreadystatechange = function() {
				// Don't throw errors on xhr.abort(). XMLHttpRequests ends up in a state of
				// xhr.status == 0 and xhr.readyState == 4 if aborted after open, but before completion.
				if (xhr.status && xhr.readyState === 4) {
					try {
						var response = (args.extract !== extract) ? args.extract(xhr, args) : args.deserialize(args.extract(xhr, args))
						if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
							resolve(cast(args.type, response))
						}
						else {
							var error = new Error(xhr.responseText)
							for (var key in response) error[key] = response[key]
							reject(error)
						}
					}
					catch (e) {
						reject(e)
					}
				}
			}
			if (useBody && (args.data != null)) xhr.send(args.data)
			else xhr.send()
		})
		return args.background === true ? promise0 : finalize(promise0)
	}
	function jsonp(args, extra) {
		var finalize = finalizer()
		args = normalize(args, extra)
		var promise0 = new Promise(function(resolve, reject) {
			var callbackName = args.callbackName || "_mithril_" + Math.round(Math.random() * 1e16) + "_" + callbackCount++
			var script = $window.document.createElement("script")
			$window[callbackName] = function(data) {
				script.parentNode.removeChild(script)
				resolve(cast(args.type, data))
				delete $window[callbackName]
			}
			script.onerror = function() {
				script.parentNode.removeChild(script)
				reject(new Error("JSONP request failed"))
				delete $window[callbackName]
			}
			if (args.data == null) args.data = {}
			args.url = interpolate(args.url, args.data)
			args.data[args.callbackKey || "callback"] = callbackName
			script.src = assemble(args.url, args.data)
			$window.document.documentElement.appendChild(script)
		})
		return args.background === true? promise0 : finalize(promise0)
	}
	function interpolate(url, data) {
		if (data == null) return url
		var tokens = url.match(/:[^\/]+/gi) || []
		for (var i = 0; i < tokens.length; i++) {
			var key = tokens[i].slice(1)
			if (data[key] != null) {
				url = url.replace(tokens[i], data[key])
			}
		}
		return url
	}
	function assemble(url, data) {
		var querystring = buildQueryString(data)
		if (querystring !== "") {
			var prefix = url.indexOf("?") < 0 ? "?" : "&"
			url += prefix + querystring
		}
		return url
	}
	function deserialize(data) {
		try {return data !== "" ? JSON.parse(data) : null}
		catch (e) {throw new Error(data)}
	}
	function extract(xhr) {return xhr.responseText}
	function cast(type0, data) {
		if (typeof type0 === "function") {
			if (Array.isArray(data)) {
				for (var i = 0; i < data.length; i++) {
					data[i] = new type0(data[i])
				}
			}
			else return new type0(data)
		}
		return data
	}
	return {request: request, jsonp: jsonp, setCompletionCallback: setCompletionCallback}
}
var requestService = _8(window, PromisePolyfill)
var coreRenderer = function($window) {
	var $doc = $window.document
	var $emptyFragment = $doc.createDocumentFragment()
	var onevent
	function setEventCallback(callback) {return onevent = callback}
	//create
	function createNodes(parent, vnodes, start, end, hooks, nextSibling, ns) {
		for (var i = start; i < end; i++) {
			var vnode = vnodes[i]
			if (vnode != null) {
				createNode(parent, vnode, hooks, ns, nextSibling)
			}
		}
	}
	function createNode(parent, vnode, hooks, ns, nextSibling) {
		var tag = vnode.tag
		if (vnode.attrs != null) initLifecycle(vnode.attrs, vnode, hooks)
		if (typeof tag === "string") {
			switch (tag) {
				case "#": return createText(parent, vnode, nextSibling)
				case "<": return createHTML(parent, vnode, nextSibling)
				case "[": return createFragment(parent, vnode, hooks, ns, nextSibling)
				default: return createElement(parent, vnode, hooks, ns, nextSibling)
			}
		}
		else return createComponent(parent, vnode, hooks, ns, nextSibling)
	}
	function createText(parent, vnode, nextSibling) {
		vnode.dom = $doc.createTextNode(vnode.children)
		insertNode(parent, vnode.dom, nextSibling)
		return vnode.dom
	}
	function createHTML(parent, vnode, nextSibling) {
		var match1 = vnode.children.match(/^\s*?<(\w+)/im) || []
		var parent1 = {caption: "table", thead: "table", tbody: "table", tfoot: "table", tr: "tbody", th: "tr", td: "tr", colgroup: "table", col: "colgroup"}[match1[1]] || "div"
		var temp = $doc.createElement(parent1)
		temp.innerHTML = vnode.children
		vnode.dom = temp.firstChild
		vnode.domSize = temp.childNodes.length
		var fragment = $doc.createDocumentFragment()
		var child
		while (child = temp.firstChild) {
			fragment.appendChild(child)
		}
		insertNode(parent, fragment, nextSibling)
		return fragment
	}
	function createFragment(parent, vnode, hooks, ns, nextSibling) {
		var fragment = $doc.createDocumentFragment()
		if (vnode.children != null) {
			var children = vnode.children
			createNodes(fragment, children, 0, children.length, hooks, null, ns)
		}
		vnode.dom = fragment.firstChild
		vnode.domSize = fragment.childNodes.length
		insertNode(parent, fragment, nextSibling)
		return fragment
	}
	function createElement(parent, vnode, hooks, ns, nextSibling) {
		var tag = vnode.tag
		switch (vnode.tag) {
			case "svg": ns = "http://www.w3.org/2000/svg"; break
			case "math": ns = "http://www.w3.org/1998/Math/MathML"; break
		}
		var attrs2 = vnode.attrs
		var is = attrs2 && attrs2.is
		var element = ns ?
			is ? $doc.createElementNS(ns, tag, {is: is}) : $doc.createElementNS(ns, tag) :
			is ? $doc.createElement(tag, {is: is}) : $doc.createElement(tag)
		vnode.dom = element
		if (attrs2 != null) {
			setAttrs(vnode, attrs2, ns)
		}
		insertNode(parent, element, nextSibling)
		if (vnode.attrs != null && vnode.attrs.contenteditable != null) {
			setContentEditable(vnode)
		}
		else {
			if (vnode.text != null) {
				if (vnode.text !== "") element.textContent = vnode.text
				else vnode.children = [Vnode("#", undefined, undefined, vnode.text, undefined, undefined)]
			}
			if (vnode.children != null) {
				var children = vnode.children
				createNodes(element, children, 0, children.length, hooks, null, ns)
				setLateAttrs(vnode)
			}
		}
		return element
	}
	function createComponent(parent, vnode, hooks, ns, nextSibling) {
		vnode.state = Object.create(vnode.tag)
		var view = vnode.tag.view
		if (view.reentrantLock != null) return $emptyFragment
		view.reentrantLock = true
		initLifecycle(vnode.tag, vnode, hooks)
		vnode.instance = Vnode.normalize(view.call(vnode.state, vnode))
		view.reentrantLock = null
		if (vnode.instance != null) {
			if (vnode.instance === vnode) throw Error("A view cannot return the vnode it received as arguments")
			var element = createNode(parent, vnode.instance, hooks, ns, nextSibling)
			vnode.dom = vnode.instance.dom
			vnode.domSize = vnode.dom != null ? vnode.instance.domSize : 0
			insertNode(parent, element, nextSibling)
			return element
		}
		else {
			vnode.domSize = 0
			return $emptyFragment
		}
	}
	//update
	function updateNodes(parent, old, vnodes, recycling, hooks, nextSibling, ns) {
		if (old === vnodes || old == null && vnodes == null) return
		else if (old == null) createNodes(parent, vnodes, 0, vnodes.length, hooks, nextSibling, undefined)
		else if (vnodes == null) removeNodes(old, 0, old.length, vnodes)
		else {
			if (old.length === vnodes.length) {
				var isUnkeyed = false
				for (var i = 0; i < vnodes.length; i++) {
					if (vnodes[i] != null && old[i] != null) {
						isUnkeyed = vnodes[i].key == null && old[i].key == null
						break
					}
				}
				if (isUnkeyed) {
					for (var i = 0; i < old.length; i++) {
						if (old[i] === vnodes[i]) continue
						else if (old[i] == null && vnodes[i] != null) createNode(parent, vnodes[i], hooks, ns, getNextSibling(old, i + 1, nextSibling))
						else if (vnodes[i] == null) removeNodes(old, i, i + 1, vnodes)
						else updateNode(parent, old[i], vnodes[i], hooks, getNextSibling(old, i + 1, nextSibling), false, ns)
					}
					return
				}
			}
			recycling = recycling || isRecyclable(old, vnodes)
			if (recycling) old = old.concat(old.pool)
			
			var oldStart = 0, start = 0, oldEnd = old.length - 1, end = vnodes.length - 1, map
			while (oldEnd >= oldStart && end >= start) {
				var o = old[oldStart], v = vnodes[start]
				if (o === v && !recycling) oldStart++, start++
				else if (o == null) oldStart++
				else if (v == null) start++
				else if (o.key === v.key) {
					oldStart++, start++
					updateNode(parent, o, v, hooks, getNextSibling(old, oldStart, nextSibling), recycling, ns)
					if (recycling && o.tag === v.tag) insertNode(parent, toFragment(o), nextSibling)
				}
				else {
					var o = old[oldEnd]
					if (o === v && !recycling) oldEnd--, start++
					else if (o == null) oldEnd--
					else if (v == null) start++
					else if (o.key === v.key) {
						updateNode(parent, o, v, hooks, getNextSibling(old, oldEnd + 1, nextSibling), recycling, ns)
						if (recycling || start < end) insertNode(parent, toFragment(o), getNextSibling(old, oldStart, nextSibling))
						oldEnd--, start++
					}
					else break
				}
			}
			while (oldEnd >= oldStart && end >= start) {
				var o = old[oldEnd], v = vnodes[end]
				if (o === v && !recycling) oldEnd--, end--
				else if (o == null) oldEnd--
				else if (v == null) end--
				else if (o.key === v.key) {
					updateNode(parent, o, v, hooks, getNextSibling(old, oldEnd + 1, nextSibling), recycling, ns)
					if (recycling && o.tag === v.tag) insertNode(parent, toFragment(o), nextSibling)
					if (o.dom != null) nextSibling = o.dom
					oldEnd--, end--
				}
				else {
					if (!map) map = getKeyMap(old, oldEnd)
					if (v != null) {
						var oldIndex = map[v.key]
						if (oldIndex != null) {
							var movable = old[oldIndex]
							updateNode(parent, movable, v, hooks, getNextSibling(old, oldEnd + 1, nextSibling), recycling, ns)
							insertNode(parent, toFragment(movable), nextSibling)
							old[oldIndex].skip = true
							if (movable.dom != null) nextSibling = movable.dom
						}
						else {
							var dom = createNode(parent, v, hooks, undefined, nextSibling)
							nextSibling = dom
						}
					}
					end--
				}
				if (end < start) break
			}
			createNodes(parent, vnodes, start, end + 1, hooks, nextSibling, ns)
			removeNodes(old, oldStart, oldEnd + 1, vnodes)
		}
	}
	function updateNode(parent, old, vnode, hooks, nextSibling, recycling, ns) {
		var oldTag = old.tag, tag = vnode.tag
		if (oldTag === tag) {
			vnode.state = old.state
			vnode.events = old.events
			if (shouldUpdate(vnode, old)) return
			if (vnode.attrs != null) {
				updateLifecycle(vnode.attrs, vnode, hooks, recycling)
			}
			if (typeof oldTag === "string") {
				switch (oldTag) {
					case "#": updateText(old, vnode); break
					case "<": updateHTML(parent, old, vnode, nextSibling); break
					case "[": updateFragment(parent, old, vnode, recycling, hooks, nextSibling, ns); break
					default: updateElement(old, vnode, recycling, hooks, ns)
				}
			}
			else updateComponent(parent, old, vnode, hooks, nextSibling, recycling, ns)
		}
		else {
			removeNode(old, null)
			createNode(parent, vnode, hooks, ns, nextSibling)
		}
	}
	function updateText(old, vnode) {
		if (old.children.toString() !== vnode.children.toString()) {
			old.dom.nodeValue = vnode.children
		}
		vnode.dom = old.dom
	}
	function updateHTML(parent, old, vnode, nextSibling) {
		if (old.children !== vnode.children) {
			toFragment(old)
			createHTML(parent, vnode, nextSibling)
		}
		else vnode.dom = old.dom, vnode.domSize = old.domSize
	}
	function updateFragment(parent, old, vnode, recycling, hooks, nextSibling, ns) {
		updateNodes(parent, old.children, vnode.children, recycling, hooks, nextSibling, ns)
		var domSize = 0, children = vnode.children
		vnode.dom = null
		if (children != null) {
			for (var i = 0; i < children.length; i++) {
				var child = children[i]
				if (child != null && child.dom != null) {
					if (vnode.dom == null) vnode.dom = child.dom
					domSize += child.domSize || 1
				}
			}
			if (domSize !== 1) vnode.domSize = domSize
		}
	}
	function updateElement(old, vnode, recycling, hooks, ns) {
		var element = vnode.dom = old.dom
		switch (vnode.tag) {
			case "svg": ns = "http://www.w3.org/2000/svg"; break
			case "math": ns = "http://www.w3.org/1998/Math/MathML"; break
		}
		if (vnode.tag === "textarea") {
			if (vnode.attrs == null) vnode.attrs = {}
			if (vnode.text != null) {
				vnode.attrs.value = vnode.text //FIXME handle0 multiple children
				vnode.text = undefined
			}
		}
		updateAttrs(vnode, old.attrs, vnode.attrs, ns)
		if (vnode.attrs != null && vnode.attrs.contenteditable != null) {
			setContentEditable(vnode)
		}
		else if (old.text != null && vnode.text != null && vnode.text !== "") {
			if (old.text.toString() !== vnode.text.toString()) old.dom.firstChild.nodeValue = vnode.text
		}
		else {
			if (old.text != null) old.children = [Vnode("#", undefined, undefined, old.text, undefined, old.dom.firstChild)]
			if (vnode.text != null) vnode.children = [Vnode("#", undefined, undefined, vnode.text, undefined, undefined)]
			updateNodes(element, old.children, vnode.children, recycling, hooks, null, ns)
		}
	}
	function updateComponent(parent, old, vnode, hooks, nextSibling, recycling, ns) {
		vnode.instance = Vnode.normalize(vnode.tag.view.call(vnode.state, vnode))
		updateLifecycle(vnode.tag, vnode, hooks, recycling)
		if (vnode.instance != null) {
			if (old.instance == null) createNode(parent, vnode.instance, hooks, ns, nextSibling)
			else updateNode(parent, old.instance, vnode.instance, hooks, nextSibling, recycling, ns)
			vnode.dom = vnode.instance.dom
			vnode.domSize = vnode.instance.domSize
		}
		else if (old.instance != null) {
			removeNode(old.instance, null)
			vnode.dom = undefined
			vnode.domSize = 0
		}
		else {
			vnode.dom = old.dom
			vnode.domSize = old.domSize
		}
	}
	function isRecyclable(old, vnodes) {
		if (old.pool != null && Math.abs(old.pool.length - vnodes.length) <= Math.abs(old.length - vnodes.length)) {
			var oldChildrenLength = old[0] && old[0].children && old[0].children.length || 0
			var poolChildrenLength = old.pool[0] && old.pool[0].children && old.pool[0].children.length || 0
			var vnodesChildrenLength = vnodes[0] && vnodes[0].children && vnodes[0].children.length || 0
			if (Math.abs(poolChildrenLength - vnodesChildrenLength) <= Math.abs(oldChildrenLength - vnodesChildrenLength)) {
				return true
			}
		}
		return false
	}
	function getKeyMap(vnodes, end) {
		var map = {}, i = 0
		for (var i = 0; i < end; i++) {
			var vnode = vnodes[i]
			if (vnode != null) {
				var key2 = vnode.key
				if (key2 != null) map[key2] = i
			}
		}
		return map
	}
	function toFragment(vnode) {
		var count0 = vnode.domSize
		if (count0 != null || vnode.dom == null) {
			var fragment = $doc.createDocumentFragment()
			if (count0 > 0) {
				var dom = vnode.dom
				while (--count0) fragment.appendChild(dom.nextSibling)
				fragment.insertBefore(dom, fragment.firstChild)
			}
			return fragment
		}
		else return vnode.dom
	}
	function getNextSibling(vnodes, i, nextSibling) {
		for (; i < vnodes.length; i++) {
			if (vnodes[i] != null && vnodes[i].dom != null) return vnodes[i].dom
		}
		return nextSibling
	}
	function insertNode(parent, dom, nextSibling) {
		if (nextSibling && nextSibling.parentNode) parent.insertBefore(dom, nextSibling)
		else parent.appendChild(dom)
	}
	function setContentEditable(vnode) {
		var children = vnode.children
		if (children != null && children.length === 1 && children[0].tag === "<") {
			var content = children[0].children
			if (vnode.dom.innerHTML !== content) vnode.dom.innerHTML = content
		}
		else if (vnode.text != null || children != null && children.length !== 0) throw new Error("Child node of a contenteditable must be trusted")
	}
	//remove
	function removeNodes(vnodes, start, end, context) {
		for (var i = start; i < end; i++) {
			var vnode = vnodes[i]
			if (vnode != null) {
				if (vnode.skip) vnode.skip = false
				else removeNode(vnode, context)
			}
		}
	}
	function removeNode(vnode, context) {
		var expected = 1, called = 0
		if (vnode.attrs && vnode.attrs.onbeforeremove) {
			var result = vnode.attrs.onbeforeremove.call(vnode.state, vnode)
			if (result != null && typeof result.then === "function") {
				expected++
				result.then(continuation, continuation)
			}
		}
		if (typeof vnode.tag !== "string" && vnode.tag.onbeforeremove) {
			var result = vnode.tag.onbeforeremove.call(vnode.state, vnode)
			if (result != null && typeof result.then === "function") {
				expected++
				result.then(continuation, continuation)
			}
		}
		continuation()
		function continuation() {
			if (++called === expected) {
				onremove(vnode)
				if (vnode.dom) {
					var count0 = vnode.domSize || 1
					if (count0 > 1) {
						var dom = vnode.dom
						while (--count0) {
							removeNodeFromDOM(dom.nextSibling)
						}
					}
					removeNodeFromDOM(vnode.dom)
					if (context != null && vnode.domSize == null && !hasIntegrationMethods(vnode.attrs) && typeof vnode.tag === "string") { //TODO test custom elements
						if (!context.pool) context.pool = [vnode]
						else context.pool.push(vnode)
					}
				}
			}
		}
	}
	function removeNodeFromDOM(node) {
		var parent = node.parentNode
		if (parent != null) parent.removeChild(node)
	}
	function onremove(vnode) {
		if (vnode.attrs && vnode.attrs.onremove) vnode.attrs.onremove.call(vnode.state, vnode)
		if (typeof vnode.tag !== "string" && vnode.tag.onremove) vnode.tag.onremove.call(vnode.state, vnode)
		if (vnode.instance != null) onremove(vnode.instance)
		else {
			var children = vnode.children
			if (Array.isArray(children)) {
				for (var i = 0; i < children.length; i++) {
					var child = children[i]
					if (child != null) onremove(child)
				}
			}
		}
	}
	//attrs2
	function setAttrs(vnode, attrs2, ns) {
		for (var key2 in attrs2) {
			setAttr(vnode, key2, null, attrs2[key2], ns)
		}
	}
	function setAttr(vnode, key2, old, value, ns) {
		var element = vnode.dom
		if (key2 === "key" || key2 === "is" || (old === value && !isFormAttribute(vnode, key2)) && typeof value !== "object" || typeof value === "undefined" || isLifecycleMethod(key2)) return
		var nsLastIndex = key2.indexOf(":")
		if (nsLastIndex > -1 && key2.substr(0, nsLastIndex) === "xlink") {
			element.setAttributeNS("http://www.w3.org/1999/xlink", key2.slice(nsLastIndex + 1), value)
		}
		else if (key2[0] === "o" && key2[1] === "n" && typeof value === "function") updateEvent(vnode, key2, value)
		else if (key2 === "style") updateStyle(element, old, value)
		else if (key2 in element && !isAttribute(key2) && ns === undefined && !isCustomElement(vnode)) {
			//setting input[value] to same value by typing on focused element moves cursor to end in Chrome
			if (vnode.tag === "input" && key2 === "value" && vnode.dom.value === value && vnode.dom === $doc.activeElement) return
			//setting select[value] to same value while having select open blinks select dropdown in Chrome
			if (vnode.tag === "select" && key2 === "value" && vnode.dom.value === value && vnode.dom === $doc.activeElement) return
			//setting option[value] to same value while having select open blinks select dropdown in Chrome
			if (vnode.tag === "option" && key2 === "value" && vnode.dom.value === value) return
			element[key2] = value
		}
		else {
			if (typeof value === "boolean") {
				if (value) element.setAttribute(key2, "")
				else element.removeAttribute(key2)
			}
			else element.setAttribute(key2 === "className" ? "class" : key2, value)
		}
	}
	function setLateAttrs(vnode) {
		var attrs2 = vnode.attrs
		if (vnode.tag === "select" && attrs2 != null) {
			if ("value" in attrs2) setAttr(vnode, "value", null, attrs2.value, undefined)
			if ("selectedIndex" in attrs2) setAttr(vnode, "selectedIndex", null, attrs2.selectedIndex, undefined)
		}
	}
	function updateAttrs(vnode, old, attrs2, ns) {
		if (attrs2 != null) {
			for (var key2 in attrs2) {
				setAttr(vnode, key2, old && old[key2], attrs2[key2], ns)
			}
		}
		if (old != null) {
			for (var key2 in old) {
				if (attrs2 == null || !(key2 in attrs2)) {
					if (key2 === "className") key2 = "class"
					if (key2[0] === "o" && key2[1] === "n" && !isLifecycleMethod(key2)) updateEvent(vnode, key2, undefined)
					else if (key2 !== "key") vnode.dom.removeAttribute(key2)
				}
			}
		}
	}
	function isFormAttribute(vnode, attr) {
		return attr === "value" || attr === "checked" || attr === "selectedIndex" || attr === "selected" && vnode.dom === $doc.activeElement
	}
	function isLifecycleMethod(attr) {
		return attr === "oninit" || attr === "oncreate" || attr === "onupdate" || attr === "onremove" || attr === "onbeforeremove" || attr === "onbeforeupdate"
	}
	function isAttribute(attr) {
		return attr === "href" || attr === "list" || attr === "form" || attr === "width" || attr === "height"// || attr === "type"
	}
	function isCustomElement(vnode){
		return vnode.attrs.is || vnode.tag.indexOf("-") > -1
	}
	function hasIntegrationMethods(source) {
		return source != null && (source.oncreate || source.onupdate || source.onbeforeremove || source.onremove)
	}
	//style
	function updateStyle(element, old, style) {
		if (old === style) element.style.cssText = "", old = null
		if (style == null) element.style.cssText = ""
		else if (typeof style === "string") element.style.cssText = style
		else {
			if (typeof old === "string") element.style.cssText = ""
			for (var key2 in style) {
				element.style[key2] = style[key2]
			}
			if (old != null && typeof old !== "string") {
				for (var key2 in old) {
					if (!(key2 in style)) element.style[key2] = ""
				}
			}
		}
	}
	//event
	function updateEvent(vnode, key2, value) {
		var element = vnode.dom
		var callback = typeof onevent !== "function" ? value : function(e) {
			var result = value.call(element, e)
			onevent.call(element, e)
			return result
		}
		if (key2 in element) element[key2] = typeof value === "function" ? callback : null
		else {
			var eventName = key2.slice(2)
			if (vnode.events === undefined) vnode.events = {}
			if (vnode.events[key2] === callback) return
			if (vnode.events[key2] != null) element.removeEventListener(eventName, vnode.events[key2], false)
			if (typeof value === "function") {
				vnode.events[key2] = callback
				element.addEventListener(eventName, vnode.events[key2], false)
			}
		}
	}
	//lifecycle
	function initLifecycle(source, vnode, hooks) {
		if (typeof source.oninit === "function") source.oninit.call(vnode.state, vnode)
		if (typeof source.oncreate === "function") hooks.push(source.oncreate.bind(vnode.state, vnode))
	}
	function updateLifecycle(source, vnode, hooks, recycling) {
		if (recycling) initLifecycle(source, vnode, hooks)
		else if (typeof source.onupdate === "function") hooks.push(source.onupdate.bind(vnode.state, vnode))
	}
	function shouldUpdate(vnode, old) {
		var forceVnodeUpdate, forceComponentUpdate
		if (vnode.attrs != null && typeof vnode.attrs.onbeforeupdate === "function") forceVnodeUpdate = vnode.attrs.onbeforeupdate.call(vnode.state, vnode, old)
		if (typeof vnode.tag !== "string" && typeof vnode.tag.onbeforeupdate === "function") forceComponentUpdate = vnode.tag.onbeforeupdate.call(vnode.state, vnode, old)
		if (!(forceVnodeUpdate === undefined && forceComponentUpdate === undefined) && !forceVnodeUpdate && !forceComponentUpdate) {
			vnode.dom = old.dom
			vnode.domSize = old.domSize
			vnode.instance = old.instance
			return true
		}
		return false
	}
	function render(dom, vnodes) {
		if (!dom) throw new Error("Ensure the DOM element being passed to m.route/m.mount/m.render is not undefined.")
		var hooks = []
		var active = $doc.activeElement
		// First time0 rendering into a node clears it out
		if (dom.vnodes == null) dom.textContent = ""
		if (!Array.isArray(vnodes)) vnodes = [vnodes]
		updateNodes(dom, dom.vnodes, Vnode.normalizeChildren(vnodes), false, hooks, null, undefined)
		dom.vnodes = vnodes
		for (var i = 0; i < hooks.length; i++) hooks[i]()
		if ($doc.activeElement !== active) active.focus()
	}
	return {render: render, setEventCallback: setEventCallback}
}
function throttle(callback) {
	//60fps translates to 16.6ms, round it down since setTimeout requires int
	var time = 16
	var last = 0, pending = null
	var timeout = typeof requestAnimationFrame === "function" ? requestAnimationFrame : setTimeout
	return function() {
		var now = Date.now()
		if (last === 0 || now - last >= time) {
			last = now
			callback()
		}
		else if (pending === null) {
			pending = timeout(function() {
				pending = null
				callback()
				last = Date.now()
			}, time - (now - last))
		}
	}
}
var _11 = function($window) {
	var renderService = coreRenderer($window)
	renderService.setEventCallback(function(e) {
		if (e.redraw !== false) redraw()
	})
	var callbacks = []
	function subscribe(key1, callback) {
		unsubscribe(key1)
		callbacks.push(key1, throttle(callback))
	}
	function unsubscribe(key1) {
		var index = callbacks.indexOf(key1)
		if (index > -1) callbacks.splice(index, 2)
	}
    function redraw() {
        for (var i = 1; i < callbacks.length; i += 2) {
            callbacks[i]()
        }
    }
	return {subscribe: subscribe, unsubscribe: unsubscribe, redraw: redraw, render: renderService.render}
}
var redrawService = _11(window)
requestService.setCompletionCallback(redrawService.redraw)
var _16 = function(redrawService0) {
	return function(root, component) {
		if (component === null) {
			redrawService0.render(root, [])
			redrawService0.unsubscribe(root)
			return
		}
		
		if (component.view == null) throw new Error("m.mount(element, component) expects a component, not a vnode")
		
		var run0 = function() {
			redrawService0.render(root, Vnode(component))
		}
		redrawService0.subscribe(root, run0)
		redrawService0.redraw()
	}
}
m.mount = _16(redrawService)
var Promise = PromisePolyfill
var parseQueryString = function(string) {
	if (string === "" || string == null) return {}
	if (string.charAt(0) === "?") string = string.slice(1)
	var entries = string.split("&"), data0 = {}, counters = {}
	for (var i = 0; i < entries.length; i++) {
		var entry = entries[i].split("=")
		var key5 = decodeURIComponent(entry[0])
		var value = entry.length === 2 ? decodeURIComponent(entry[1]) : ""
		if (value === "true") value = true
		else if (value === "false") value = false
		var levels = key5.split(/\]\[?|\[/)
		var cursor = data0
		if (key5.indexOf("[") > -1) levels.pop()
		for (var j = 0; j < levels.length; j++) {
			var level = levels[j], nextLevel = levels[j + 1]
			var isNumber = nextLevel == "" || !isNaN(parseInt(nextLevel, 10))
			var isValue = j === levels.length - 1
			if (level === "") {
				var key5 = levels.slice(0, j).join()
				if (counters[key5] == null) counters[key5] = 0
				level = counters[key5]++
			}
			if (cursor[level] == null) {
				cursor[level] = isValue ? value : isNumber ? [] : {}
			}
			cursor = cursor[level]
		}
	}
	return data0
}
var coreRouter = function($window) {
	var supportsPushState = typeof $window.history.pushState === "function"
	var callAsync0 = typeof setImmediate === "function" ? setImmediate : setTimeout
	function normalize1(fragment0) {
		var data = $window.location[fragment0].replace(/(?:%[a-f89][a-f0-9])+/gim, decodeURIComponent)
		if (fragment0 === "pathname" && data[0] !== "/") data = "/" + data
		return data
	}
	var asyncId
	function debounceAsync(callback0) {
		return function() {
			if (asyncId != null) return
			asyncId = callAsync0(function() {
				asyncId = null
				callback0()
			})
		}
	}
	function parsePath(path, queryData, hashData) {
		var queryIndex = path.indexOf("?")
		var hashIndex = path.indexOf("#")
		var pathEnd = queryIndex > -1 ? queryIndex : hashIndex > -1 ? hashIndex : path.length
		if (queryIndex > -1) {
			var queryEnd = hashIndex > -1 ? hashIndex : path.length
			var queryParams = parseQueryString(path.slice(queryIndex + 1, queryEnd))
			for (var key4 in queryParams) queryData[key4] = queryParams[key4]
		}
		if (hashIndex > -1) {
			var hashParams = parseQueryString(path.slice(hashIndex + 1))
			for (var key4 in hashParams) hashData[key4] = hashParams[key4]
		}
		return path.slice(0, pathEnd)
	}
	var router = {prefix: "#!"}
	router.getPath = function() {
		var type2 = router.prefix.charAt(0)
		switch (type2) {
			case "#": return normalize1("hash").slice(router.prefix.length)
			case "?": return normalize1("search").slice(router.prefix.length) + normalize1("hash")
			default: return normalize1("pathname").slice(router.prefix.length) + normalize1("search") + normalize1("hash")
		}
	}
	router.setPath = function(path, data, options) {
		var queryData = {}, hashData = {}
		path = parsePath(path, queryData, hashData)
		if (data != null) {
			for (var key4 in data) queryData[key4] = data[key4]
			path = path.replace(/:([^\/]+)/g, function(match2, token) {
				delete queryData[token]
				return data[token]
			})
		}
		var query = buildQueryString(queryData)
		if (query) path += "?" + query
		var hash = buildQueryString(hashData)
		if (hash) path += "#" + hash
		if (supportsPushState) {
			var state = options ? options.state : null
			var title = options ? options.title : null
			$window.onpopstate()
			if (options && options.replace) $window.history.replaceState(state, title, router.prefix + path)
			else $window.history.pushState(state, title, router.prefix + path)
		}
		else $window.location.href = router.prefix + path
	}
	router.defineRoutes = function(routes, resolve, reject) {
		function resolveRoute() {
			var path = router.getPath()
			var params = {}
			var pathname = parsePath(path, params, params)
			var state = $window.history.state
			if (state != null) {
				for (var k in state) params[k] = state[k]
			}
			for (var route0 in routes) {
				var matcher = new RegExp("^" + route0.replace(/:[^\/]+?\.{3}/g, "(.*?)").replace(/:[^\/]+/g, "([^\\/]+)") + "\/?$")
				if (matcher.test(pathname)) {
					pathname.replace(matcher, function() {
						var keys = route0.match(/:[^\/]+/g) || []
						var values = [].slice.call(arguments, 1, -2)
						for (var i = 0; i < keys.length; i++) {
							params[keys[i].replace(/:|\./g, "")] = decodeURIComponent(values[i])
						}
						resolve(routes[route0], params, path, route0)
					})
					return
				}
			}
			reject(path, params)
		}
		if (supportsPushState) $window.onpopstate = debounceAsync(resolveRoute)
		else if (router.prefix.charAt(0) === "#") $window.onhashchange = resolveRoute
		resolveRoute()
	}
	return router
}
var _20 = function($window, redrawService0) {
	var routeService = coreRouter($window)
	var identity = function(v) {return v}
	var render1, component, attrs3, currentPath, lastUpdate
	var route = function(root, defaultRoute, routes) {
		if (root == null) throw new Error("Ensure the DOM element that was passed to `m.route` is not undefined")
		var run1 = function() {
			if (render1 != null) redrawService0.render(root, render1(Vnode(component, attrs3.key, attrs3)))
		}
		var bail = function(path) {
			if (path !== defaultRoute) routeService.setPath(defaultRoute, null, {replace: true})
			else throw new Error("Could not resolve default route " + defaultRoute)
		}
		routeService.defineRoutes(routes, function(payload, params, path) {
			var update = lastUpdate = function(routeResolver, comp) {
				if (update !== lastUpdate) return
				component = comp != null && typeof comp.view === "function" ? comp : "div", attrs3 = params, currentPath = path, lastUpdate = null
				render1 = (routeResolver.render || identity).bind(routeResolver)
				run1()
			}
			if (payload.view) update({}, payload)
			else {
				if (payload.onmatch) {
					Promise.resolve(payload.onmatch(params, path)).then(function(resolved) {
						update(payload, resolved)
					}, bail)
				}
				else update(payload, "div")
			}
		}, bail)
		redrawService0.subscribe(root, run1)
	}
	route.set = function(path, data, options) {
		if (lastUpdate != null) options = {replace: true}
		lastUpdate = null
		routeService.setPath(path, data, options)
	}
	route.get = function() {return currentPath}
	route.prefix = function(prefix0) {routeService.prefix = prefix0}
	route.link = function(vnode1) {
		vnode1.dom.setAttribute("href", routeService.prefix + vnode1.attrs.href)
		vnode1.dom.onclick = function(e) {
			if (e.ctrlKey || e.metaKey || e.shiftKey || e.which === 2) return
			e.preventDefault()
			e.redraw = false
			var href = this.getAttribute("href")
			if (href.indexOf(routeService.prefix) === 0) href = href.slice(routeService.prefix.length)
			route.set(href, undefined, undefined)
		}
	}
	route.param = function(key3) {
		if(typeof attrs3 !== "undefined" && typeof key3 !== "undefined") return attrs3[key3]
		return attrs3
	}
	return route
}
m.route = _20(window, redrawService)
m.withAttr = function(attrName, callback1, context) {
	return function(e) {
		callback1.call(context || this, attrName in e.currentTarget ? e.currentTarget[attrName] : e.currentTarget.getAttribute(attrName))
	}
}
var _28 = coreRenderer(window)
m.render = _28.render
m.redraw = redrawService.redraw
m.request = requestService.request
m.jsonp = requestService.jsonp
m.parseQueryString = parseQueryString
m.buildQueryString = buildQueryString
m.version = "1.0.1"
m.vnode = Vnode
if (typeof module !== "undefined") module["exports"] = m
else window.m = m
}
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy8uNi4wLjJAYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiamF2YXNjcmlwdHMvYXBwLmpzeCIsImphdmFzY3JpcHRzL2xheW91dC5qc3giLCJqYXZhc2NyaXB0cy9yZXBsaWVzLmpzeCIsImphdmFzY3JpcHRzL3RvcGljLmpzeCIsImphdmFzY3JpcHRzL3RvcGljcy5qc3giLCJqYXZhc2NyaXB0cy91c2VyLmpzeCIsImphdmFzY3JpcHRzL3V0aWxzLmpzIiwibm9kZV9tb2R1bGVzLy4xLjAuMUBtaXRocmlsL25vZGVfbW9kdWxlcy9taXRocmlsL21pdGhyaWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLElBQU0sSUFBVyxRQUFRLFNBQVIsQ0FBakI7QUFDQSxJQUFNLFNBQVcsUUFBUSxjQUFSLENBQWpCO0FBQ0EsSUFBTSxTQUFXLFFBQVEsY0FBUixDQUFqQjtBQUNBLElBQU0sUUFBVyxRQUFRLGFBQVIsQ0FBakI7QUFDQSxJQUFNLFVBQVcsUUFBUSxlQUFSLENBQWpCO0FBQ0EsSUFBTSxPQUFXLFFBQVEsWUFBUixDQUFqQjs7QUFFQSxFQUFFLEtBQUYsQ0FBUSxTQUFTLElBQWpCLEVBQXVCLEdBQXZCLEVBQTRCO0FBQzFCLE9BQUs7QUFDSCxhQUFTLG1CQUFXO0FBQ2xCLGFBQU8sVUFBUCxDQUFrQixHQUFsQjtBQUNBLGFBQU8sUUFBUDtBQUNELEtBSkU7QUFLSCxZQUFRLGtCQUFXO0FBQ2pCLGFBQU8sRUFBRSxNQUFGLEVBQVUsRUFBRSxNQUFGLENBQVYsQ0FBUDtBQUNEO0FBUEUsR0FEcUI7QUFVMUIsbUJBQWlCO0FBQ2YsYUFBUyxpQkFBUyxNQUFULEVBQWlCLElBQWpCLEVBQXVCO0FBQzlCLFVBQUksS0FBSjs7QUFFQSxhQUFPLFVBQVAsQ0FBa0IsSUFBbEI7QUFDQSxVQUFJLFFBQVEsT0FBTyxJQUFQLENBQVksS0FBWixDQUFrQixXQUFsQixDQUFaLEVBQTRDO0FBQzFDLGVBQU8sUUFBUCxDQUFn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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJjb25zdCBtICAgICAgICA9IHJlcXVpcmUoXCJtaXRocmlsXCIpO1xuY29uc3QgTGF5b3V0ICAgPSByZXF1aXJlKFwiLi9sYXlvdXQuanN4XCIpO1xuY29uc3QgVG9waWNzICAgPSByZXF1aXJlKFwiLi90b3BpY3MuanN4XCIpO1xuY29uc3QgVG9waWMgICAgPSByZXF1aXJlKFwiLi90b3BpYy5qc3hcIik7XG5jb25zdCBSZXBsaWVzICA9IHJlcXVpcmUoXCIuL3JlcGxpZXMuanN4XCIpO1xuY29uc3QgVXNlciAgICAgPSByZXF1aXJlKFwiLi91c2VyLmpzeFwiKTtcblxubS5yb3V0ZShkb2N1bWVudC5ib2R5LCBcIi9cIiwge1xuICBcIi9cIjoge1xuICAgIG9ubWF0Y2g6IGZ1bmN0aW9uKCkge1xuICAgICAgTGF5b3V0LmFjdGl2ZVBhdGgoXCIvXCIpO1xuICAgICAgVG9waWNzLmxvYWRMaXN0KCk7XG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIG0oTGF5b3V0LCBtKFRvcGljcykpXG4gICAgfVxuICB9LFxuICBcIi90b3BpY3MvOnR5cGVcIjoge1xuICAgIG9ubWF0Y2g6IGZ1bmN0aW9uKHBhcmFtcywgcGF0aCkge1xuICAgICAgdmFyIG1kYXRhO1xuXG4gICAgICBMYXlvdXQuYWN0aXZlUGF0aChwYXRoKTtcbiAgICAgIGlmIChtZGF0YSA9IHBhcmFtcy50eXBlLm1hdGNoKC9ub2RlKFxcZCspLykpIHtcbiAgICAgICAgVG9waWNzLmxvYWRMaXN0KG51bGwsIG1kYXRhWzFdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIFRvcGljcy5sb2FkTGlzdChwYXJhbXMudHlwZSk7ICBcbiAgICAgIH1cbiAgICB9LFxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gbShMYXlvdXQsIG0oVG9waWNzKSlcbiAgICB9XG4gIH0sXG4gIFwiL3RvcGljLzppZFwiOiB7XG4gICAgb25tYXRjaDogZnVuY3Rpb24ocGFyYW1zKSB7XG4gICAgICBUb3BpYy5sb2FkKHBhcmFtcy5pZCk7XG4gICAgICBSZXBsaWVzLmxvYWRMaXN0KHBhcmFtcy5pZCk7XG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIG0oTGF5b3V0LCBtKFRvcGljLCBtKFJlcGxpZXMpKSlcbiAgICB9XG4gIH0sXG4gIFwiLzpsb2dpblwiOiB7XG4gICAgb25tYXRjaDogZnVuY3Rpb24ocGFyYW1zKSB7XG4gICAgICBVc2VyLmxvYWQocGFyYW1zLmxvZ2luKTtcbiAgICB9LFxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gbShMYXlvdXQsIG0oVXNlcikpXG4gICAgfVxuICB9XG59KTtcbiIsImNvbnN0IG0gPSByZXF1aXJlKFwibWl0aHJpbFwiKTtcblxudmFyIExheW91dCA9IHt9O1xuXG5MYXlvdXQucGF0aHMgPSB7XG4gICcvJzogJ+ekvuWMuicsXG4gICcvdG9waWNzL3BvcHVsYXInOiAn5LyY6LSo6K+d6aKYJyxcbiAgJy90b3BpY3Mvbm9fcmVwbHknOiAn5peg5Lq66Zeu5rSlJyxcbiAgJy90b3BpY3MvcmVjZW50JzogJ+acgOaWsOWPkeW4gydcbn1cblxuTGF5b3V0LmN1cnJlbnRBY3RpdmVkUGF0aCA9ICcvJztcblxuTGF5b3V0LmFjdGl2ZVBhdGggPSBmdW5jdGlvbihwYXRoKSB7XG4gIHRoaXMuY3VycmVudEFjdGl2ZWRQYXRoID0gcGF0aDtcbn1cblxuTGF5b3V0LmxpbmtDbGFzc05hbWUgPSBmdW5jdGlvbihsaW5rUGF0aCkge1xuICByZXR1cm4gdGhpcy5jdXJyZW50QWN0aXZlZFBhdGggPT09IGxpbmtQYXRoID8gJ25hdi1saW5rIGFjdGl2ZScgOiAnbmF2LWxpbmsnO1xufVxuXG5MYXlvdXQucmVuZGVyTG9naW5JbmZvID0gZnVuY3Rpb24oKSB7XG4gIHZhciBjdXJyZW50VXNlciA9IHdpbmRvdy5jdXJyZW50VXNlcjtcblxuICBpZiAoY3VycmVudFVzZXIpIHtcbiAgICByZXR1cm4oXG4gICAgICA8dWwgY2xhc3M9XCJuYXYgbmF2YmFyLW5hdiBteS0yIG15LWxnLTBcIj5cbiAgICAgICAgPGxpIGNsYXNzPVwibmF2LWl0ZW1cIj5cbiAgICAgICAgICA8YSBjbGFzcz1cInVzZXItYXZhdGFyIG5hdi1saW5rXCIgaHJlZj17XCIvXCIgKyBjdXJyZW50VXNlci5sb2dpbn0gb25jcmVhdGU9e20ucm91dGUubGlua30+XG4gICAgICAgICAgICA8aW1nIGNsYXNzPVwiYXZhdGFyIGF2YXRhci1tZCBtZWRpYS1vYmplY3RcIiBzcmM9e2N1cnJlbnRVc2VyLmF2YXRhcl91cmx9IC8+XG4gICAgICAgICAgPC9hPlxuICAgICAgICA8L2xpPlxuICAgICAgICA8bGkgY2xhc3M9XCJuYXYtaXRlbVwiPjxhIGhyZWY9XCIjXCIgY2xhc3M9XCJuYXYtbGlua1wiPueZu+WHujwvYT48L2xpPlxuICAgICAgPC91bD5cbiAgICApXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuKFxuICAgICAgPHVsIGNsYXNzPVwibmF2IG5hdmJhci1uYXYgbXktMiBteS1sZy0wXCI+XG4gICAgICAgIDxsaSBjbGFzcz1cIm5hdi1pdGVtXCI+XG4gICAgICAgICAgPGEgY2xhc3M9XCJuYXYtbGlua1wiIGhyZWY9XCIvb2F1dGhcIj7nmbvlvZU8L2E+XG4gICAgICAgIDwvbGk+XG4gICAgICA8L3VsPlxuICAgIClcbiAgfVxufVxuXG5MYXlvdXQudmlldyA9IGZ1bmN0aW9uKHZub2RlKSB7XG4gIHJldHVybihcbiAgICA8ZGl2IGlkPVwicm9vdFwiPlxuICAgICAgPG5hdiBpZD1cImhlYWRlclwiIGNsYXNzPVwibmF2YmFyIG5hdmJhci1saWdodCBuYXZiYXItdG9nZ2xlYWJsZS1tZCBmaXhlZC10b3AgYmctZmFkZWRcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxuICAgICAgICAgIDxhIGNsYXNzPVwibmF2YmFyLWJyYW5kXCIgaHJlZj17XCIvXCJ9IG9uY3JlYXRlPXttLnJvdXRlLmxpbmt9PjxiPlJ1Ynk8L2I+IENoaW5hIDxzdXA+TWl0aHJpbCB2ZXJzaW9uPC9zdXA+PC9hPlxuICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJuYXZiYXItdG9nZ2xlciBuYXZiYXItdG9nZ2xlci1yaWdodFwiIHR5cGU9XCJidXR0b25cIiBkYXRhLXRvZ2dsZT1cImNvbGxhcHNlXCIgZGF0YS10YXJnZXQ9XCIjbWFpbi1uYXYtbWVudVwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJuYXZiYXItdG9nZ2xlci1pY29uXCI+PC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2xsYXBzZSBuYXZiYXItY29sbGFwc2VcIiBpZD1cIm1haW4tbmF2LW1lbnVcIj5cbiAgICAgICAgICAgIDx1bCBjbGFzcz1cIm5hdiBuYXZiYXItbmF2IG1haW4tbmF2IG1yLWF1dG8gbXQtMiBtdC1tZC0wXCI+XG4gICAgICAgICAgICAgIHtPYmplY3Qua2V5cyhMYXlvdXQucGF0aHMpLm1hcChmdW5jdGlvbihrZXksIGluZGV4KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDxsaSBjbGFzcz1cIm5hdi1pdGVtXCI+PGEgY2xhc3NOYW1lPXtMYXlvdXQubGlua0NsYXNzTmFtZShrZXkpfSBocmVmPXtrZXl9IG9uY3JlYXRlPXttLnJvdXRlLmxpbmt9PntMYXlvdXQucGF0aHNba2V5XX08L2E+PC9saT5cbiAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAge0xheW91dC5yZW5kZXJMb2dpbkluZm8oKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L25hdj5cbiAgICAgIDxtYWluIGlkPVwibWFpblwiIGNsYXNzPVwibWFpbi1sYXlvdXRcIj57dm5vZGUuY2hpbGRyZW59PC9tYWluPlxuICAgIDwvZGl2PlxuICApXG59XG5cbm1vZHVsZS5leHBvcnRzID0gTGF5b3V0O1xuIiwiY29uc3QgbSAgICAgPSByZXF1aXJlKCdtaXRocmlsJyk7XG5jb25zdCBVdGlscyA9IHJlcXVpcmUoJy4vdXRpbHMuanMnKVxuXG52YXIgUmVwbGllcyA9IHt9O1xuXG5SZXBsaWVzLmxpc3QgPSBbXTtcblxuUmVwbGllcy5sb2FkTGlzdCA9IGZ1bmN0aW9uKHRvcGljX2lkKSB7XG4gIG0ucmVxdWVzdCh7XG4gICAgbWV0aG9kOiAnR0VUJyxcbiAgICB1cmw6ICdodHRwczovL3J1YnktY2hpbmEub3JnL2FwaS92My90b3BpY3MvJyArIHRvcGljX2lkICsgJy9yZXBsaWVzLmpzb24nLFxuICAgIGRhdGE6IHtsaW1pdDogNTB9XG4gIH0pXG4gIC50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICBSZXBsaWVzLmxpc3QgPSBkYXRhLnJlcGxpZXM7XG4gIH0pXG4gIC5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICBjb25zb2xlLmVycm9yKGVycik7XG4gIH0pXG59XG5cblJlcGxpZXMucmVuZGVyUmVwbHkgPSBmdW5jdGlvbihyZXBseSwgdXNlcikge1xuICByZXR1cm4oXG4gICAgPGRpdiBpZD17XCJyZXBseS1cIiArIHJlcGx5LmlkfSBjbGFzcz1cIm1lZGlhIHJlcGx5IHJlcGx5LXJlcGx5XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiZC1mbGV4IGFsaWduLXNlbGYtc3RhcnQgbXItM1wiPlxuICAgICAgICA8YSBjbGFzcz1cInVzZXItYXZhdGFyXCIgaHJlZj17dXNlci5sb2dpbn0gb25jcmVhdGU9e20ucm91dGUubGlua30+XG4gICAgICAgICAgPGltZyBjbGFzcz1cImF2YXRhciBhdmF0YXItbGcgbWVkaWEtb2JqZWN0XCIgc3JjPXt1c2VyLmF2YXRhcl91cmx9IC8+XG4gICAgICAgIDwvYT5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cIm1lZGlhLWJvZHlcIj5cbiAgICAgICAgPHNwYW4+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cIm10LTAgbWVkaWEtaGVhZGluZ1wiPlxuICAgICAgICAgICAgPGEgdGl0bGU9e3VzZXIubmFtZX0gY2xhc3M9XCJ1c2VyLW5hbWVcIiBocmVmPXt1c2VyLmxvZ2lufSBvbmNyZWF0ZT17bS5yb3V0ZS5saW5rfT57dXNlci5sb2dpbn08L2E+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImRhdGUgZmxvYXQtcmlnaHRcIj48dGltZT57VXRpbHMuZGF0ZUZvcm1hdEZyb21TdHJpbmcocmVwbHkuY3JlYXRlZF9hdCl9PC90aW1lPjwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwibWFya2Rvd25cIj5cbiAgICAgICAgICAgIHttLnRydXN0KHJlcGx5LmJvZHlfaHRtbCl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cIm1lZGlhLWZvb3RlciBjbGVhcmZpeFwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmbG9hdC1yaWdodCBvcHRzXCI+XG4gICAgICAgICAgICAgIDxhIGNsYXNzPVwiYnRuIGJ0bi1pY29uIGxpa2UtYnV0dG9uXCIgaHJlZj1cIiNcIj48aSBjbGFzcz1cImZhIGZhLWhlYXJ0XCI+PC9pPjwvYT5cbiAgICAgICAgICAgICAgPGEgY2xhc3M9XCJidG4gYnRuLWljb24gXCIgaHJlZj1cIiNcIj48aSBjbGFzcz1cImZhIGZhLWVsbGlwc2lzLWhcIj48L2k+PC9hPlxuICAgICAgICAgICAgICA8YSBjbGFzcz1cImJ0biBidG4taWNvbiBcIiBocmVmPVwiI1wiPjxpIGNsYXNzPVwiZmEgZmEtcmVwbHlcIj48L2k+PC9hPlxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgPC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIClcbn1cblxuUmVwbGllcy52aWV3ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybihcbiAgICA8ZGl2IGNsYXNzPVwicmVwbGllc1wiPlxuICAgICAge1JlcGxpZXMubGlzdC5tYXAoZnVuY3Rpb24ocmVwbHkpIHtcbiAgICAgICAgcmV0dXJuIFJlcGxpZXMucmVuZGVyUmVwbHkocmVwbHksIHJlcGx5LnVzZXIpXG4gICAgICB9KX1cbiAgICA8L2Rpdj5cbiAgKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlcGxpZXM7XG4iLCJjb25zdCBtICAgICA9IHJlcXVpcmUoXCJtaXRocmlsXCIpO1xuY29uc3QgVXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzLmpzJylcblxudmFyIFRvcGljID0ge307XG5cblRvcGljLmxvYWQgPSBmdW5jdGlvbihpZCkge1xuICBtLnJlcXVlc3Qoe1xuICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgdXJsOiAnaHR0cHM6Ly9ydWJ5LWNoaW5hLm9yZy9hcGkvdjMvdG9waWNzLycgKyBpZCArICcuanNvbidcbiAgfSlcbiAgLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuICAgIFRvcGljLmN1cnJlbnQgPSBkYXRhO1xuICB9KVxuICAuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4gICAgY29uc29sZS5lcnJvcihlcnIpO1xuICB9KTtcbn1cblxuVG9waWMucmVuZGVyVG9waWNUaXRsZSA9IGZ1bmN0aW9uKHRvcGljKSB7XG4gIHJldHVybiA8aDE+PGEgdGl0bGU9e3RvcGljLm5vZGVfbmFtZX0gY2xhc3M9XCJub2RlLW5hbWVcIiBocmVmPXsnL3RvcGljcy9ub2RlJyArIHRvcGljLm5vZGVfaWR9IG9uY3JlYXRlPXttLnJvdXRlLmxpbmt9Pnt0b3BpYy5ub2RlX25hbWV9PC9hPiB7dG9waWMudGl0bGV9PC9oMT5cbn1cblxuVG9waWMucmVuZGVyVG9waWNDb250ZW50ID0gZnVuY3Rpb24odG9waWMsIHVzZXIsIHZub2RlKSB7XG4gIHJldHVybihcbiAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTlcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRvcGljLWNvbnRlbnRcIj5cbiAgICAgICAgICA8ZGl2IGlkPXsndG9waWMtJyArIHRvcGljLmlkfSBjbGFzcz1cIm1lZGlhIHJlcGx5IHJlcGx5LXRvcGljXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZC1mbGV4IGFsaWduLXNlbGYtc3RhcnQgbXItM1wiPlxuICAgICAgICAgICAgICA8YSBjbGFzcz1cInVzZXItYXZhdGFyIFwiIGhyZWY9eycvJyArIHVzZXIubG9naW59IG9uY3JlYXRlPXttLnJvdXRlLmxpbmt9PlxuICAgICAgICAgICAgICAgIDxpbWcgY2xhc3M9XCJhdmF0YXIgYXZhdGFyLWxnIG1lZGlhLW9iamVjdFwiIHNyYz17dG9waWMudXNlci5hdmF0YXJfdXJsfSAvPlxuICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtZWRpYS1ib2R5XCI+XG4gICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtdC0wIG1lZGlhLWhlYWRpbmdcIj5cbiAgICAgICAgICAgICAgICAgIDxhIHRpdGxlPXt1c2VyLm5hbWV9IGNsYXNzPVwidXNlci1uYW1lXCIgaHJlZj17Jy8nICsgdXNlci5sb2dpbn0gb25jcmVhdGU9e20ucm91dGUubGlua30+e3VzZXIubG9naW59PC9hPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJkYXRlIGZsb2F0LXJpZ2h0XCI+PHRpbWU+e1V0aWxzLmRhdGVGb3JtYXRGcm9tU3RyaW5nKHRvcGljLnJlcGxpZWRfYXQpfTwvdGltZT48L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1hcmtkb253XCI+e20udHJ1c3QodG9waWMuYm9keV9odG1sKX08L2Rpdj5cbiAgICAgICAgICAgICAge1RvcGljLnJlbmRlclRvcGljRm9vdGVyKHRvcGljKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAge3Zub2RlLmNoaWxkcmVufVxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiaGlkZGVuLW1kLWRvd24gY29sLW1kLTNcIj48L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKVxufVxuXG5Ub3BpYy5yZW5kZXJUb3BpY0Zvb3RlciA9IGZ1bmN0aW9uKHRvcGljKSB7XG4gIHJldHVybihcbiAgICA8ZGl2IGNsYXNzPVwibWVkaWEtZm9vdGVyIGNsZWFyZml4XCI+XG4gICAgICA8c3BhbiBjbGFzcz1cImZsb2F0LXJpZ2h0IG9wdHNcIj5cbiAgICAgICAgPGEgY2xhc3M9XCJidG4gYnRuLWljb24gbGlrZS1idXR0b25cIiBocmVmPVwiI1wiPjxpIGNsYXNzPVwiZmEgZmEtaGVhcnRcIj48L2k+IHt0b3BpYy5saWtlc19jb3VudH0g5Liq6LWePC9hPlxuICAgICAgICA8YSBjbGFzcz1cImJ0biBidG4taWNvbiBcIiBocmVmPVwiI1wiPjxpIGNsYXNzPVwiZmEgZmEtZWxsaXBzaXMtaFwiPjwvaT48L2E+XG4gICAgICAgIDxhIGNsYXNzPVwiYnRuIGJ0bi1pY29uIFwiIGhyZWY9XCIjXCI+PGkgY2xhc3M9XCJmYSBmYS1yZXBseVwiPjwvaT48L2E+XG4gICAgICA8L3NwYW4+XG4gICAgPC9kaXY+XG4gIClcbn1cblxuVG9waWMudmlldyA9IGZ1bmN0aW9uKHZub2RlKSB7XG4gIGlmICghVG9waWMuY3VycmVudCkge1xuICAgIHJldHVyblxuICB9XG5cbiAgdmFyIHRvcGljID0gVG9waWMuY3VycmVudC50b3BpYztcblxuICByZXR1cm4oXG4gICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxuICAgICAgPGRpdiBjbGFzcz1cInRvcGljLWRldGFpbFwiPlxuICAgICAgICB7W1xuICAgICAgICAgIFRvcGljLnJlbmRlclRvcGljVGl0bGUodG9waWMpLFxuICAgICAgICAgIFRvcGljLnJlbmRlclRvcGljQ29udGVudCh0b3BpYywgdG9waWMudXNlciwgdm5vZGUpXG4gICAgICAgIF19XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFRvcGljO1xuIiwiY29uc3QgbSAgICAgPSByZXF1aXJlKFwibWl0aHJpbFwiKTtcbmNvbnN0IFV0aWxzID0gcmVxdWlyZSgnLi91dGlscy5qcycpXG5cbnZhciBUb3BpY3MgPSB7XG4gIGxpc3Q6IFtdLFxuICBsb2FkTGlzdDogZnVuY3Rpb24odHlwZSwgbm9kZV9pZCkge1xuICAgIHZhciBkYXRhID0ge31cbiAgICBkYXRhLnR5cGUgPSB0eXBlIHx8ICdsYXN0X2FjdGl2ZWQnO1xuICAgIGlmIChub2RlX2lkKSB7XG4gICAgICBkYXRhLm5vZGVfaWQgPSBub2RlX2lkO1xuICAgIH1cblxuICAgIG0ucmVxdWVzdCh7XG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgdXJsOiAnaHR0cHM6Ly9ydWJ5LWNoaW5hLm9yZy9hcGkvdjMvdG9waWNzLmpzb24nLFxuICAgICAgZGF0YTogZGF0YVxuICAgIH0pXG4gICAgLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuICAgICAgVG9waWNzLmxpc3QgPSBkYXRhLnRvcGljcztcbiAgICB9KVxuICAgIC5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICB9KVxuICB9XG59O1xuXG5Ub3BpY3MudmlldyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4oXG4gICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxuICAgICAgPGRpdiBpZD1cImhvbWUtY29udGFpbmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0b3BpY3NcIj5cbiAgICAgICAgICA8dGFibGUgY2xhc3M9XCJ0YWJsZVwiPlxuICAgICAgICAgICAgPHRoZWFkIGNsYXNzPVwidGhlYWQtZGVmYXVsdFwiPlxuICAgICAgICAgICAgICA8dHIgY2xhc3M9XCJ0b3BpY1wiPlxuICAgICAgICAgICAgICAgIDx0aCBjbGFzcz1cInRpdGxlXCI+5qCH6aKYPC90aD5cbiAgICAgICAgICAgICAgICA8dGggY2xhc3M9XCJhdXRob3IgaGlkZGVuLXhzLWRvd25cIj7kvZzogIU8L3RoPlxuICAgICAgICAgICAgICAgIDx0aCBjbGFzcz1cInJlcGxpZXMgaGlkZGVuLW1kLWRvd25cIj7lm57luJYv6LWePC90aD5cbiAgICAgICAgICAgICAgICA8dGggY2xhc3M9XCJhY3Rpdml0eSBoaWRkZW4tbWQtZG93blwiPuabtOaWsDwvdGg+XG4gICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICB7VG9waWNzLmxpc3QubWFwKGZ1bmN0aW9uKHRvcGljKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuKFxuICAgICAgICAgICAgICAgICAgPHRyIGNsYXNzPVwidG9waWNcIj5cbiAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwidGl0bGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzcz1cInRvcGljLWxpbmtcIiBocmVmPXsnL3RvcGljLycgKyB0b3BpYy5pZH0gb25jcmVhdGU9e20ucm91dGUubGlua30+PHNwYW4gY2xhc3M9XCJub2RlXCI+e3RvcGljLm5vZGVfbmFtZX08L3NwYW4+IHt0b3BpYy50aXRsZX08L2E+XG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImF1dGhvciBoaWRkZW4teHMtZG93blwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzPVwidXNlci1hdmF0YXIgXCIgaHJlZj17XCIvXCIgKyB0b3BpYy51c2VyLmxvZ2lufSBvbmNyZWF0ZT17bS5yb3V0ZS5saW5rfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgY2xhc3M9XCJhdmF0YXIgYXZhdGFyLWxnIG1lZGlhLW9iamVjdFwiIHNyYz17dG9waWMudXNlci5hdmF0YXJfdXJsfSAvPlxuICAgICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwicmVwbGllcyBoaWRkZW4tbWQtZG93blwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPjxpIGNsYXNzPVwiZmEgZmEtY29tbWVudHNcIj48L2k+IHt0b3BpYy5yZXBsaWVzX2NvdW50fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImxpa2VzXCI+PGkgY2xhc3M9XCJmYSBmYS1oZWFydFwiPjwvaT4ge3RvcGljLmxpa2VzX2NvdW50fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwiYWN0aXZpdHkgaGlkZGVuLW1kLWRvd25cIj5cbiAgICAgICAgICAgICAgICAgICAgICA8dGltZT57VXRpbHMuZGF0ZUZvcm1hdEZyb21TdHJpbmcodG9waWMucmVwbGllZF9hdCl9PC90aW1lPlxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApXG59XG5cbm1vZHVsZS5leHBvcnRzID0gVG9waWNzO1xuIiwiY29uc3QgbSAgICAgPSByZXF1aXJlKCdtaXRocmlsJyk7XG5jb25zdCBVdGlscyA9IHJlcXVpcmUoJy4vdXRpbHMuanMnKTtcblxudmFyIFVzZXIgPSB7fTtcblxuVXNlci5sb2FkID0gZnVuY3Rpb24obG9naW4pIHtcbiAgbS5yZXF1ZXN0KHtcbiAgICBtZXRob2Q6ICdHRVQnLFxuICAgIHVybDogJ2h0dHBzOi8vcnVieS1jaGluYS5vcmcvYXBpL3YzL3VzZXJzLycgKyBsb2dpbiArICcuanNvbidcbiAgfSlcbiAgLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuICAgIFVzZXIuY3VycmVudCA9IGRhdGE7XG4gIH0pXG4gIC5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICBjb25zb2xlLmVycm9yKGVycik7XG4gIH0pO1xufVxuXG5Vc2VyLnJlbmRlclVzZXJJbmZvID0gZnVuY3Rpb24odXNlcikge1xuICByZXR1cm4oXG4gICAgPGRpdiBjbGFzcz1cInVzZXItaW5mbyBjYXJkIHRleHQtY2VudGVyXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1ibG9ja1wiPlxuICAgICAgICA8YSBjbGFzcz1cInVzZXItYXZhdGFyIFwiIGhyZWY9e1wiL1wiICsgdXNlci5sb2dpbn0+XG4gICAgICAgICAgPGltZyBjbGFzcz1cImF2YXRhciBhdmF0YXItbGcgbWVkaWEtb2JqZWN0XCIgc3JjPXt1c2VyLmF2YXRhcl91cmx9IC8+XG4gICAgICAgIDwvYT5cbiAgICAgICAgPGg0IGNsYXNzPVwiY2FyZC10aXRsZSB0ZXh0LWNlbnRlclwiPnt1c2VyLmxvZ2lufSA8c3BhbiBjbGFzcz1cIm5hbWVcIj4oe3VzZXIubmFtZX0pPC9zcGFuPjwvaDQ+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLXRleHRcIj57dXNlci50YWdsaW5lfTwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1mb290ZXJcIj5cbiAgICAgICAgPGEgY2xhc3M9XCJmb2xsb3dlcnNcIiBocmVmPVwiL2FuZG9yX2NoZW4vZm9sbG93ZXJzXCI+e3VzZXIuZm9sbG93ZXJzX2NvdW50fSDlhbPms6jogIU8L2E+XG4gICAgICAgIDxhIGNsYXNzPVwiZm9sbG93aW5nXCIgaHJlZj1cIi9hbmRvcl9jaGVuL2ZvbGxvd2luZ1wiPnt1c2VyLmZvbGxvd2luZ19jb3VudH0g5q2j5Zyo5YWz5rOoPC9hPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIClcbn1cblxuVXNlci5nZXRUYWJJdGVtcyA9IGZ1bmN0aW9uKGxvZ2luKSB7XG4gIHZhciBvYmogPSB7fTtcblxuICBvYmpbJy8nICsgbG9naW5dID0gJ+ivnemimCdcbiAgb2JqWycvJyArIGxvZ2luICsgJy9yZXBsaWVzJ10gPSAn5Zue5biWJ1xuICBvYmpbJy8nICsgbG9naW4gKyAnL2Zhdm9yaXRlcyddID0gJ+aUtuiXjydcblxuICByZXR1cm4gb2JqXG59XG5cblVzZXIucmVuZGVyVGFicyA9IGZ1bmN0aW9uKHVzZXIpIHtcbiAgcmV0dXJuKFxuICAgIDxkaXYgY2xhc3M9XCJjbGVhcmZpeFwiPlxuICAgICAgPHVsIGNsYXNzPVwibmF2IG5hdi1waWxsc1wiPlxuICAgICAgICA8bGkgY2xhc3M9XCJuYXYtaXRlbVwiPlxuICAgICAgICAgIDxhIGNsYXNzPVwibmF2LWxpbmtcIiBocmVmPXsnLycgKyB1c2VyLmxvZ2lufSBvbmNyZWF0ZT17bS5yb3V0ZS5saW5rfT7or53popggPHNwYW4gY2xhc3M9XCJjb3VudFwiPih7dXNlci50b3BpY3NfY291bnR9KTwvc3Bhbj48L2E+XG4gICAgICAgIDwvbGk+XG4gICAgICAgIDxsaSBjbGFzcz1cIm5hdi1pdGVtXCI+XG4gICAgICAgICAgPGEgY2xhc3M9XCJuYXYtbGlua1wiIGhyZWY9eycvJyArIHVzZXIubG9naW4gKyAnL3JlcGxpZXMnfSBvbmNyZWF0ZT17bS5yb3V0ZS5saW5rfT7lm57luJYgPHNwYW4gY2xhc3M9XCJjb3VudFwiPih7dXNlci5yZXBsaWVzX2NvdW50fSk8L3NwYW4+PC9hPlxuICAgICAgICA8L2xpPlxuICAgICAgICA8bGkgY2xhc3M9XCJuYXYtaXRlbVwiPlxuICAgICAgICAgIDxhIGNsYXNzPVwibmF2LWxpbmtcIiBocmVmPXsnLycgKyB1c2VyLmxvZ2luICsgJy9yZXBsaWVzJ30gb25jcmVhdGU9e20ucm91dGUubGlua30+5pS26JePIDxzcGFuIGNsYXNzPVwiY291bnRcIj4oe3VzZXIuZmF2b3JpdGVzX2NvdW50fSk8L3NwYW4+PC9hPlxuICAgICAgICA8L2xpPlxuICAgICAgPC91bD5cbiAgICA8L2Rpdj5cbiAgKVxufVxuXG5Vc2VyLnZpZXcgPSBmdW5jdGlvbigpIHtcbiAgaWYgKCF0aGlzLmN1cnJlbnQpIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIHZhciB1c2VyID0gdGhpcy5jdXJyZW50LnVzZXI7XG5cbiAgcmV0dXJuKFxuICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJ1c2VyLXByb2ZpbGVcIj5cbiAgICAgICAge1VzZXIucmVuZGVyVXNlckluZm8odXNlcil9XG4gICAgICAgIHtVc2VyLnJlbmRlclRhYnModXNlcil9XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFVzZXI7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgZGF0ZUZvcm1hdEZyb21TdHJpbmc6IGZ1bmN0aW9uKHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLmRhdGVGb3JtYXQobmV3IERhdGUoc3RyaW5nKSk7XG4gIH0sXG4gIGRhdGVGb3JtYXQ6IGZ1bmN0aW9uKGRhdGUpIHtcbiAgICB2YXIgbW9udGhOYW1lcyA9IFtcbiAgICAgIFwiSmFudWFyeVwiLCBcIkZlYnJ1YXJ5XCIsIFwiTWFyY2hcIixcbiAgICAgIFwiQXByaWxcIiwgXCJNYXlcIiwgXCJKdW5lXCIsIFwiSnVseVwiLFxuICAgICAgXCJBdWd1c3RcIiwgXCJTZXB0ZW1iZXJcIiwgXCJPY3RvYmVyXCIsXG4gICAgICBcIk5vdmVtYmVyXCIsIFwiRGVjZW1iZXJcIlxuICAgIF07XG5cbiAgICB2YXIgZGF5ID0gZGF0ZS5nZXREYXRlKCk7XG4gICAgdmFyIG1vbnRoSW5kZXggPSBkYXRlLmdldE1vbnRoKCk7XG4gICAgdmFyIHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XG5cbiAgICByZXR1cm4gZGF5ICsgJyAnICsgbW9udGhOYW1lc1ttb250aEluZGV4XSArICcgJyArIHllYXI7XG4gIH1cbn1cbiIsIm5ldyBmdW5jdGlvbigpIHtcblxuZnVuY3Rpb24gVm5vZGUodGFnLCBrZXksIGF0dHJzMCwgY2hpbGRyZW4sIHRleHQsIGRvbSkge1xuXHRyZXR1cm4ge3RhZzogdGFnLCBrZXk6IGtleSwgYXR0cnM6IGF0dHJzMCwgY2hpbGRyZW46IGNoaWxkcmVuLCB0ZXh0OiB0ZXh0LCBkb206IGRvbSwgZG9tU2l6ZTogdW5kZWZpbmVkLCBzdGF0ZToge30sIGV2ZW50czogdW5kZWZpbmVkLCBpbnN0YW5jZTogdW5kZWZpbmVkLCBza2lwOiBmYWxzZX1cbn1cblZub2RlLm5vcm1hbGl6ZSA9IGZ1bmN0aW9uKG5vZGUpIHtcblx0aWYgKEFycmF5LmlzQXJyYXkobm9kZSkpIHJldHVybiBWbm9kZShcIltcIiwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIFZub2RlLm5vcm1hbGl6ZUNoaWxkcmVuKG5vZGUpLCB1bmRlZmluZWQsIHVuZGVmaW5lZClcblx0aWYgKG5vZGUgIT0gbnVsbCAmJiB0eXBlb2Ygbm9kZSAhPT0gXCJvYmplY3RcIikgcmV0dXJuIFZub2RlKFwiI1wiLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgbm9kZSA9PT0gZmFsc2UgPyBcIlwiIDogbm9kZSwgdW5kZWZpbmVkLCB1bmRlZmluZWQpXG5cdHJldHVybiBub2RlXG59XG5Wbm9kZS5ub3JtYWxpemVDaGlsZHJlbiA9IGZ1bmN0aW9uIG5vcm1hbGl6ZUNoaWxkcmVuKGNoaWxkcmVuKSB7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcblx0XHRjaGlsZHJlbltpXSA9IFZub2RlLm5vcm1hbGl6ZShjaGlsZHJlbltpXSlcblx0fVxuXHRyZXR1cm4gY2hpbGRyZW5cbn1cbnZhciBzZWxlY3RvclBhcnNlciA9IC8oPzooXnwjfFxcLikoW14jXFwuXFxbXFxdXSspKXwoXFxbKC4rPykoPzpcXHMqPVxccyooXCJ8J3wpKCg/OlxcXFxbXCInXFxdXXwuKSo/KVxcNSk/XFxdKS9nXG52YXIgc2VsZWN0b3JDYWNoZSA9IHt9XG5mdW5jdGlvbiBoeXBlcnNjcmlwdChzZWxlY3Rvcikge1xuXHRpZiAoc2VsZWN0b3IgPT0gbnVsbCB8fCB0eXBlb2Ygc2VsZWN0b3IgIT09IFwic3RyaW5nXCIgJiYgdHlwZW9mIHNlbGVjdG9yLnZpZXcgIT09IFwiZnVuY3Rpb25cIikge1xuXHRcdHRocm93IEVycm9yKFwiVGhlIHNlbGVjdG9yIG11c3QgYmUgZWl0aGVyIGEgc3RyaW5nIG9yIGEgY29tcG9uZW50LlwiKTtcblx0fVxuXHRpZiAodHlwZW9mIHNlbGVjdG9yID09PSBcInN0cmluZ1wiICYmIHNlbGVjdG9yQ2FjaGVbc2VsZWN0b3JdID09PSB1bmRlZmluZWQpIHtcblx0XHR2YXIgbWF0Y2gsIHRhZywgY2xhc3NlcyA9IFtdLCBhdHRyaWJ1dGVzID0ge31cblx0XHR3aGlsZSAobWF0Y2ggPSBzZWxlY3RvclBhcnNlci5leGVjKHNlbGVjdG9yKSkge1xuXHRcdFx0dmFyIHR5cGUgPSBtYXRjaFsxXSwgdmFsdWUgPSBtYXRjaFsyXVxuXHRcdFx0aWYgKHR5cGUgPT09IFwiXCIgJiYgdmFsdWUgIT09IFwiXCIpIHRhZyA9IHZhbHVlXG5cdFx0XHRlbHNlIGlmICh0eXBlID09PSBcIiNcIikgYXR0cmlidXRlcy5pZCA9IHZhbHVlXG5cdFx0XHRlbHNlIGlmICh0eXBlID09PSBcIi5cIikgY2xhc3Nlcy5wdXNoKHZhbHVlKVxuXHRcdFx0ZWxzZSBpZiAobWF0Y2hbM11bMF0gPT09IFwiW1wiKSB7XG5cdFx0XHRcdHZhciBhdHRyVmFsdWUgPSBtYXRjaFs2XVxuXHRcdFx0XHRpZiAoYXR0clZhbHVlKSBhdHRyVmFsdWUgPSBhdHRyVmFsdWUucmVwbGFjZSgvXFxcXChbXCInXSkvZywgXCIkMVwiKS5yZXBsYWNlKC9cXFxcXFxcXC9nLCBcIlxcXFxcIilcblx0XHRcdFx0aWYgKG1hdGNoWzRdID09PSBcImNsYXNzXCIpIGNsYXNzZXMucHVzaChhdHRyVmFsdWUpXG5cdFx0XHRcdGVsc2UgYXR0cmlidXRlc1ttYXRjaFs0XV0gPSBhdHRyVmFsdWUgfHwgdHJ1ZVxuXHRcdFx0fVxuXHRcdH1cblx0XHRpZiAoY2xhc3Nlcy5sZW5ndGggPiAwKSBhdHRyaWJ1dGVzLmNsYXNzTmFtZSA9IGNsYXNzZXMuam9pbihcIiBcIilcblx0XHRzZWxlY3RvckNhY2hlW3NlbGVjdG9yXSA9IGZ1bmN0aW9uKGF0dHJzLCBjaGlsZHJlbikge1xuXHRcdFx0dmFyIGhhc0F0dHJzID0gZmFsc2UsIGNoaWxkTGlzdCwgdGV4dFxuXHRcdFx0dmFyIGNsYXNzTmFtZSA9IGF0dHJzLmNsYXNzTmFtZSB8fCBhdHRycy5jbGFzc1xuXHRcdFx0Zm9yICh2YXIga2V5IGluIGF0dHJpYnV0ZXMpIGF0dHJzW2tleV0gPSBhdHRyaWJ1dGVzW2tleV1cblx0XHRcdGlmIChjbGFzc05hbWUgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRpZiAoYXR0cnMuY2xhc3MgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdGF0dHJzLmNsYXNzID0gdW5kZWZpbmVkXG5cdFx0XHRcdFx0YXR0cnMuY2xhc3NOYW1lID0gY2xhc3NOYW1lXG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKGF0dHJpYnV0ZXMuY2xhc3NOYW1lICE9PSB1bmRlZmluZWQpIGF0dHJzLmNsYXNzTmFtZSA9IGF0dHJpYnV0ZXMuY2xhc3NOYW1lICsgXCIgXCIgKyBjbGFzc05hbWVcblx0XHRcdH1cblx0XHRcdGZvciAodmFyIGtleSBpbiBhdHRycykge1xuXHRcdFx0XHRpZiAoa2V5ICE9PSBcImtleVwiKSB7XG5cdFx0XHRcdFx0aGFzQXR0cnMgPSB0cnVlXG5cdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYgKEFycmF5LmlzQXJyYXkoY2hpbGRyZW4pICYmIGNoaWxkcmVuLmxlbmd0aCA9PSAxICYmIGNoaWxkcmVuWzBdICE9IG51bGwgJiYgY2hpbGRyZW5bMF0udGFnID09PSBcIiNcIikgdGV4dCA9IGNoaWxkcmVuWzBdLmNoaWxkcmVuXG5cdFx0XHRlbHNlIGNoaWxkTGlzdCA9IGNoaWxkcmVuXG5cdFx0XHRyZXR1cm4gVm5vZGUodGFnIHx8IFwiZGl2XCIsIGF0dHJzLmtleSwgaGFzQXR0cnMgPyBhdHRycyA6IHVuZGVmaW5lZCwgY2hpbGRMaXN0LCB0ZXh0LCB1bmRlZmluZWQpXG5cdFx0fVxuXHR9XG5cdHZhciBhdHRycywgY2hpbGRyZW4sIGNoaWxkcmVuSW5kZXhcblx0aWYgKGFyZ3VtZW50c1sxXSA9PSBudWxsIHx8IHR5cGVvZiBhcmd1bWVudHNbMV0gPT09IFwib2JqZWN0XCIgJiYgYXJndW1lbnRzWzFdLnRhZyA9PT0gdW5kZWZpbmVkICYmICFBcnJheS5pc0FycmF5KGFyZ3VtZW50c1sxXSkpIHtcblx0XHRhdHRycyA9IGFyZ3VtZW50c1sxXVxuXHRcdGNoaWxkcmVuSW5kZXggPSAyXG5cdH1cblx0ZWxzZSBjaGlsZHJlbkluZGV4ID0gMVxuXHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gY2hpbGRyZW5JbmRleCArIDEpIHtcblx0XHRjaGlsZHJlbiA9IEFycmF5LmlzQXJyYXkoYXJndW1lbnRzW2NoaWxkcmVuSW5kZXhdKSA/IGFyZ3VtZW50c1tjaGlsZHJlbkluZGV4XSA6IFthcmd1bWVudHNbY2hpbGRyZW5JbmRleF1dXG5cdH1cblx0ZWxzZSB7XG5cdFx0Y2hpbGRyZW4gPSBbXVxuXHRcdGZvciAodmFyIGkgPSBjaGlsZHJlbkluZGV4OyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSBjaGlsZHJlbi5wdXNoKGFyZ3VtZW50c1tpXSlcblx0fVxuXHRpZiAodHlwZW9mIHNlbGVjdG9yID09PSBcInN0cmluZ1wiKSByZXR1cm4gc2VsZWN0b3JDYWNoZVtzZWxlY3Rvcl0oYXR0cnMgfHwge30sIFZub2RlLm5vcm1hbGl6ZUNoaWxkcmVuKGNoaWxkcmVuKSlcblx0cmV0dXJuIFZub2RlKHNlbGVjdG9yLCBhdHRycyAmJiBhdHRycy5rZXksIGF0dHJzIHx8IHt9LCBWbm9kZS5ub3JtYWxpemVDaGlsZHJlbihjaGlsZHJlbiksIHVuZGVmaW5lZCwgdW5kZWZpbmVkKVxufVxuaHlwZXJzY3JpcHQudHJ1c3QgPSBmdW5jdGlvbihodG1sKSB7XG5cdGlmIChodG1sID09IG51bGwpIGh0bWwgPSBcIlwiXG5cdHJldHVybiBWbm9kZShcIjxcIiwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIGh0bWwsIHVuZGVmaW5lZCwgdW5kZWZpbmVkKVxufVxuaHlwZXJzY3JpcHQuZnJhZ21lbnQgPSBmdW5jdGlvbihhdHRyczEsIGNoaWxkcmVuKSB7XG5cdHJldHVybiBWbm9kZShcIltcIiwgYXR0cnMxLmtleSwgYXR0cnMxLCBWbm9kZS5ub3JtYWxpemVDaGlsZHJlbihjaGlsZHJlbiksIHVuZGVmaW5lZCwgdW5kZWZpbmVkKVxufVxudmFyIG0gPSBoeXBlcnNjcmlwdFxuLyoqIEBjb25zdHJ1Y3RvciAqL1xudmFyIFByb21pc2VQb2x5ZmlsbCA9IGZ1bmN0aW9uKGV4ZWN1dG9yKSB7XG5cdGlmICghKHRoaXMgaW5zdGFuY2VvZiBQcm9taXNlUG9seWZpbGwpKSB0aHJvdyBuZXcgRXJyb3IoXCJQcm9taXNlIG11c3QgYmUgY2FsbGVkIHdpdGggYG5ld2BcIilcblx0aWYgKHR5cGVvZiBleGVjdXRvciAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiZXhlY3V0b3IgbXVzdCBiZSBhIGZ1bmN0aW9uXCIpXG5cdHZhciBzZWxmID0gdGhpcywgcmVzb2x2ZXJzID0gW10sIHJlamVjdG9ycyA9IFtdLCByZXNvbHZlQ3VycmVudCA9IGhhbmRsZXIocmVzb2x2ZXJzLCB0cnVlKSwgcmVqZWN0Q3VycmVudCA9IGhhbmRsZXIocmVqZWN0b3JzLCBmYWxzZSlcblx0dmFyIGluc3RhbmNlID0gc2VsZi5faW5zdGFuY2UgPSB7cmVzb2x2ZXJzOiByZXNvbHZlcnMsIHJlamVjdG9yczogcmVqZWN0b3JzfVxuXHR2YXIgY2FsbEFzeW5jID0gdHlwZW9mIHNldEltbWVkaWF0ZSA9PT0gXCJmdW5jdGlvblwiID8gc2V0SW1tZWRpYXRlIDogc2V0VGltZW91dFxuXHRmdW5jdGlvbiBoYW5kbGVyKGxpc3QsIHNob3VsZEFic29yYikge1xuXHRcdHJldHVybiBmdW5jdGlvbiBleGVjdXRlKHZhbHVlKSB7XG5cdFx0XHR2YXIgdGhlblxuXHRcdFx0dHJ5IHtcblx0XHRcdFx0aWYgKHNob3VsZEFic29yYiAmJiB2YWx1ZSAhPSBudWxsICYmICh0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCIpICYmIHR5cGVvZiAodGhlbiA9IHZhbHVlLnRoZW4pID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdFx0XHRpZiAodmFsdWUgPT09IHNlbGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcm9taXNlIGNhbid0IGJlIHJlc29sdmVkIHcvIGl0c2VsZlwiKVxuXHRcdFx0XHRcdGV4ZWN1dGVPbmNlKHRoZW4uYmluZCh2YWx1ZSkpXG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0Y2FsbEFzeW5jKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0aWYgKCFzaG91bGRBYnNvcmIgJiYgbGlzdC5sZW5ndGggPT09IDApIGNvbnNvbGUuZXJyb3IoXCJQb3NzaWJsZSB1bmhhbmRsZWQgcHJvbWlzZSByZWplY3Rpb246XCIsIHZhbHVlKVxuXHRcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSBsaXN0W2ldKHZhbHVlKVxuXHRcdFx0XHRcdFx0cmVzb2x2ZXJzLmxlbmd0aCA9IDAsIHJlamVjdG9ycy5sZW5ndGggPSAwXG5cdFx0XHRcdFx0XHRpbnN0YW5jZS5zdGF0ZSA9IHNob3VsZEFic29yYlxuXHRcdFx0XHRcdFx0aW5zdGFuY2UucmV0cnkgPSBmdW5jdGlvbigpIHtleGVjdXRlKHZhbHVlKX1cblx0XHRcdFx0XHR9KVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRjYXRjaCAoZSkge1xuXHRcdFx0XHRyZWplY3RDdXJyZW50KGUpXG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdGZ1bmN0aW9uIGV4ZWN1dGVPbmNlKHRoZW4pIHtcblx0XHR2YXIgcnVucyA9IDBcblx0XHRmdW5jdGlvbiBydW4oZm4pIHtcblx0XHRcdHJldHVybiBmdW5jdGlvbih2YWx1ZSkge1xuXHRcdFx0XHRpZiAocnVucysrID4gMCkgcmV0dXJuXG5cdFx0XHRcdGZuKHZhbHVlKVxuXHRcdFx0fVxuXHRcdH1cblx0XHR2YXIgb25lcnJvciA9IHJ1bihyZWplY3RDdXJyZW50KVxuXHRcdHRyeSB7dGhlbihydW4ocmVzb2x2ZUN1cnJlbnQpLCBvbmVycm9yKX0gY2F0Y2ggKGUpIHtvbmVycm9yKGUpfVxuXHR9XG5cdGV4ZWN1dGVPbmNlKGV4ZWN1dG9yKVxufVxuUHJvbWlzZVBvbHlmaWxsLnByb3RvdHlwZS50aGVuID0gZnVuY3Rpb24ob25GdWxmaWxsZWQsIG9uUmVqZWN0aW9uKSB7XG5cdHZhciBzZWxmID0gdGhpcywgaW5zdGFuY2UgPSBzZWxmLl9pbnN0YW5jZVxuXHRmdW5jdGlvbiBoYW5kbGUoY2FsbGJhY2ssIGxpc3QsIG5leHQsIHN0YXRlKSB7XG5cdFx0bGlzdC5wdXNoKGZ1bmN0aW9uKHZhbHVlKSB7XG5cdFx0XHRpZiAodHlwZW9mIGNhbGxiYWNrICE9PSBcImZ1bmN0aW9uXCIpIG5leHQodmFsdWUpXG5cdFx0XHRlbHNlIHRyeSB7cmVzb2x2ZU5leHQoY2FsbGJhY2sodmFsdWUpKX0gY2F0Y2ggKGUpIHtpZiAocmVqZWN0TmV4dCkgcmVqZWN0TmV4dChlKX1cblx0XHR9KVxuXHRcdGlmICh0eXBlb2YgaW5zdGFuY2UucmV0cnkgPT09IFwiZnVuY3Rpb25cIiAmJiBzdGF0ZSA9PT0gaW5zdGFuY2Uuc3RhdGUpIGluc3RhbmNlLnJldHJ5KClcblx0fVxuXHR2YXIgcmVzb2x2ZU5leHQsIHJlamVjdE5leHRcblx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZVBvbHlmaWxsKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge3Jlc29sdmVOZXh0ID0gcmVzb2x2ZSwgcmVqZWN0TmV4dCA9IHJlamVjdH0pXG5cdGhhbmRsZShvbkZ1bGZpbGxlZCwgaW5zdGFuY2UucmVzb2x2ZXJzLCByZXNvbHZlTmV4dCwgdHJ1ZSksIGhhbmRsZShvblJlamVjdGlvbiwgaW5zdGFuY2UucmVqZWN0b3JzLCByZWplY3ROZXh0LCBmYWxzZSlcblx0cmV0dXJuIHByb21pc2Vcbn1cblByb21pc2VQb2x5ZmlsbC5wcm90b3R5cGUuY2F0Y2ggPSBmdW5jdGlvbihvblJlamVjdGlvbikge1xuXHRyZXR1cm4gdGhpcy50aGVuKG51bGwsIG9uUmVqZWN0aW9uKVxufVxuUHJvbWlzZVBvbHlmaWxsLnJlc29sdmUgPSBmdW5jdGlvbih2YWx1ZSkge1xuXHRpZiAodmFsdWUgaW5zdGFuY2VvZiBQcm9taXNlUG9seWZpbGwpIHJldHVybiB2YWx1ZVxuXHRyZXR1cm4gbmV3IFByb21pc2VQb2x5ZmlsbChmdW5jdGlvbihyZXNvbHZlKSB7cmVzb2x2ZSh2YWx1ZSl9KVxufVxuUHJvbWlzZVBvbHlmaWxsLnJlamVjdCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG5cdHJldHVybiBuZXcgUHJvbWlzZVBvbHlmaWxsKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge3JlamVjdCh2YWx1ZSl9KVxufVxuUHJvbWlzZVBvbHlmaWxsLmFsbCA9IGZ1bmN0aW9uKGxpc3QpIHtcblx0cmV0dXJuIG5ldyBQcm9taXNlUG9seWZpbGwoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cdFx0dmFyIHRvdGFsID0gbGlzdC5sZW5ndGgsIGNvdW50ID0gMCwgdmFsdWVzID0gW11cblx0XHRpZiAobGlzdC5sZW5ndGggPT09IDApIHJlc29sdmUoW10pXG5cdFx0ZWxzZSBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcblx0XHRcdChmdW5jdGlvbihpKSB7XG5cdFx0XHRcdGZ1bmN0aW9uIGNvbnN1bWUodmFsdWUpIHtcblx0XHRcdFx0XHRjb3VudCsrXG5cdFx0XHRcdFx0dmFsdWVzW2ldID0gdmFsdWVcblx0XHRcdFx0XHRpZiAoY291bnQgPT09IHRvdGFsKSByZXNvbHZlKHZhbHVlcylcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAobGlzdFtpXSAhPSBudWxsICYmICh0eXBlb2YgbGlzdFtpXSA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgbGlzdFtpXSA9PT0gXCJmdW5jdGlvblwiKSAmJiB0eXBlb2YgbGlzdFtpXS50aGVuID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdFx0XHRsaXN0W2ldLnRoZW4oY29uc3VtZSwgcmVqZWN0KVxuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2UgY29uc3VtZShsaXN0W2ldKVxuXHRcdFx0fSkoaSlcblx0XHR9XG5cdH0pXG59XG5Qcm9taXNlUG9seWZpbGwucmFjZSA9IGZ1bmN0aW9uKGxpc3QpIHtcblx0cmV0dXJuIG5ldyBQcm9taXNlUG9seWZpbGwoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRsaXN0W2ldLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KVxuXHRcdH1cblx0fSlcbn1cbmlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSB7XG5cdGlmICh0eXBlb2Ygd2luZG93LlByb21pc2UgPT09IFwidW5kZWZpbmVkXCIpIHdpbmRvdy5Qcm9taXNlID0gUHJvbWlzZVBvbHlmaWxsXG5cdHZhciBQcm9taXNlUG9seWZpbGwgPSB3aW5kb3cuUHJvbWlzZVxufSBlbHNlIGlmICh0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsLlByb21pc2UgPT09IFwidW5kZWZpbmVkXCIpIGdsb2JhbC5Qcm9taXNlID0gUHJvbWlzZVBvbHlmaWxsXG5cdHZhciBQcm9taXNlUG9seWZpbGwgPSBnbG9iYWwuUHJvbWlzZVxufSBlbHNlIHtcbn1cbnZhciBidWlsZFF1ZXJ5U3RyaW5nID0gZnVuY3Rpb24ob2JqZWN0KSB7XG5cdGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqZWN0KSAhPT0gXCJbb2JqZWN0IE9iamVjdF1cIikgcmV0dXJuIFwiXCJcblx0dmFyIGFyZ3MgPSBbXVxuXHRmb3IgKHZhciBrZXkwIGluIG9iamVjdCkge1xuXHRcdGRlc3RydWN0dXJlKGtleTAsIG9iamVjdFtrZXkwXSlcblx0fVxuXHRyZXR1cm4gYXJncy5qb2luKFwiJlwiKVxuXHRmdW5jdGlvbiBkZXN0cnVjdHVyZShrZXkwLCB2YWx1ZSkge1xuXHRcdGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB2YWx1ZS5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRkZXN0cnVjdHVyZShrZXkwICsgXCJbXCIgKyBpICsgXCJdXCIsIHZhbHVlW2ldKVxuXHRcdFx0fVxuXHRcdH1cblx0XHRlbHNlIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpID09PSBcIltvYmplY3QgT2JqZWN0XVwiKSB7XG5cdFx0XHRmb3IgKHZhciBpIGluIHZhbHVlKSB7XG5cdFx0XHRcdGRlc3RydWN0dXJlKGtleTAgKyBcIltcIiArIGkgKyBcIl1cIiwgdmFsdWVbaV0pXG5cdFx0XHR9XG5cdFx0fVxuXHRcdGVsc2UgYXJncy5wdXNoKGVuY29kZVVSSUNvbXBvbmVudChrZXkwKSArICh2YWx1ZSAhPSBudWxsICYmIHZhbHVlICE9PSBcIlwiID8gXCI9XCIgKyBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpIDogXCJcIikpXG5cdH1cbn1cbnZhciBfOCA9IGZ1bmN0aW9uKCR3aW5kb3csIFByb21pc2UpIHtcblx0dmFyIGNhbGxiYWNrQ291bnQgPSAwXG5cdHZhciBvbmNvbXBsZXRpb25cblx0ZnVuY3Rpb24gc2V0Q29tcGxldGlvbkNhbGxiYWNrKGNhbGxiYWNrKSB7b25jb21wbGV0aW9uID0gY2FsbGJhY2t9XG5cdGZ1bmN0aW9uIGZpbmFsaXplcigpIHtcblx0XHR2YXIgY291bnQgPSAwXG5cdFx0ZnVuY3Rpb24gY29tcGxldGUoKSB7aWYgKC0tY291bnQgPT09IDAgJiYgdHlwZW9mIG9uY29tcGxldGlvbiA9PT0gXCJmdW5jdGlvblwiKSBvbmNvbXBsZXRpb24oKX1cblx0XHRyZXR1cm4gZnVuY3Rpb24gZmluYWxpemUocHJvbWlzZTApIHtcblx0XHRcdHZhciB0aGVuMCA9IHByb21pc2UwLnRoZW5cblx0XHRcdHByb21pc2UwLnRoZW4gPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0Y291bnQrK1xuXHRcdFx0XHR2YXIgbmV4dCA9IHRoZW4wLmFwcGx5KHByb21pc2UwLCBhcmd1bWVudHMpXG5cdFx0XHRcdG5leHQudGhlbihjb21wbGV0ZSwgZnVuY3Rpb24oZSkge1xuXHRcdFx0XHRcdGNvbXBsZXRlKClcblx0XHRcdFx0XHRpZiAoY291bnQgPT09IDApIHRocm93IGVcblx0XHRcdFx0fSlcblx0XHRcdFx0cmV0dXJuIGZpbmFsaXplKG5leHQpXG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gcHJvbWlzZTBcblx0XHR9XG5cdH1cblx0ZnVuY3Rpb24gbm9ybWFsaXplKGFyZ3MsIGV4dHJhKSB7XG5cdFx0aWYgKHR5cGVvZiBhcmdzID09PSBcInN0cmluZ1wiKSB7XG5cdFx0XHR2YXIgdXJsID0gYXJnc1xuXHRcdFx0YXJncyA9IGV4dHJhIHx8IHt9XG5cdFx0XHRpZiAoYXJncy51cmwgPT0gbnVsbCkgYXJncy51cmwgPSB1cmxcblx0XHR9XG5cdFx0cmV0dXJuIGFyZ3Ncblx0fVxuXHRmdW5jdGlvbiByZXF1ZXN0KGFyZ3MsIGV4dHJhKSB7XG5cdFx0dmFyIGZpbmFsaXplID0gZmluYWxpemVyKClcblx0XHRhcmdzID0gbm9ybWFsaXplKGFyZ3MsIGV4dHJhKVxuXHRcdHZhciBwcm9taXNlMCA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuXHRcdFx0aWYgKGFyZ3MubWV0aG9kID09IG51bGwpIGFyZ3MubWV0aG9kID0gXCJHRVRcIlxuXHRcdFx0YXJncy5tZXRob2QgPSBhcmdzLm1ldGhvZC50b1VwcGVyQ2FzZSgpXG5cdFx0XHR2YXIgdXNlQm9keSA9IHR5cGVvZiBhcmdzLnVzZUJvZHkgPT09IFwiYm9vbGVhblwiID8gYXJncy51c2VCb2R5IDogYXJncy5tZXRob2QgIT09IFwiR0VUXCIgJiYgYXJncy5tZXRob2QgIT09IFwiVFJBQ0VcIlxuXHRcdFx0aWYgKHR5cGVvZiBhcmdzLnNlcmlhbGl6ZSAhPT0gXCJmdW5jdGlvblwiKSBhcmdzLnNlcmlhbGl6ZSA9IHR5cGVvZiBGb3JtRGF0YSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBhcmdzLmRhdGEgaW5zdGFuY2VvZiBGb3JtRGF0YSA/IGZ1bmN0aW9uKHZhbHVlKSB7cmV0dXJuIHZhbHVlfSA6IEpTT04uc3RyaW5naWZ5XG5cdFx0XHRpZiAodHlwZW9mIGFyZ3MuZGVzZXJpYWxpemUgIT09IFwiZnVuY3Rpb25cIikgYXJncy5kZXNlcmlhbGl6ZSA9IGRlc2VyaWFsaXplXG5cdFx0XHRpZiAodHlwZW9mIGFyZ3MuZXh0cmFjdCAhPT0gXCJmdW5jdGlvblwiKSBhcmdzLmV4dHJhY3QgPSBleHRyYWN0XG5cdFx0XHRhcmdzLnVybCA9IGludGVycG9sYXRlKGFyZ3MudXJsLCBhcmdzLmRhdGEpXG5cdFx0XHRpZiAodXNlQm9keSkgYXJncy5kYXRhID0gYXJncy5zZXJpYWxpemUoYXJncy5kYXRhKVxuXHRcdFx0ZWxzZSBhcmdzLnVybCA9IGFzc2VtYmxlKGFyZ3MudXJsLCBhcmdzLmRhdGEpXG5cdFx0XHR2YXIgeGhyID0gbmV3ICR3aW5kb3cuWE1MSHR0cFJlcXVlc3QoKVxuXHRcdFx0eGhyLm9wZW4oYXJncy5tZXRob2QsIGFyZ3MudXJsLCB0eXBlb2YgYXJncy5hc3luYyA9PT0gXCJib29sZWFuXCIgPyBhcmdzLmFzeW5jIDogdHJ1ZSwgdHlwZW9mIGFyZ3MudXNlciA9PT0gXCJzdHJpbmdcIiA/IGFyZ3MudXNlciA6IHVuZGVmaW5lZCwgdHlwZW9mIGFyZ3MucGFzc3dvcmQgPT09IFwic3RyaW5nXCIgPyBhcmdzLnBhc3N3b3JkIDogdW5kZWZpbmVkKVxuXHRcdFx0aWYgKGFyZ3Muc2VyaWFsaXplID09PSBKU09OLnN0cmluZ2lmeSAmJiB1c2VCb2R5KSB7XG5cdFx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiKVxuXHRcdFx0fVxuXHRcdFx0aWYgKGFyZ3MuZGVzZXJpYWxpemUgPT09IGRlc2VyaWFsaXplKSB7XG5cdFx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKFwiQWNjZXB0XCIsIFwiYXBwbGljYXRpb24vanNvbiwgdGV4dC8qXCIpXG5cdFx0XHR9XG5cdFx0XHRpZiAoYXJncy53aXRoQ3JlZGVudGlhbHMpIHhoci53aXRoQ3JlZGVudGlhbHMgPSBhcmdzLndpdGhDcmVkZW50aWFsc1xuXHRcdFx0Zm9yICh2YXIga2V5IGluIGFyZ3MuaGVhZGVycykgaWYgKHt9Lmhhc093blByb3BlcnR5LmNhbGwoYXJncy5oZWFkZXJzLCBrZXkpKSB7XG5cdFx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKGtleSwgYXJncy5oZWFkZXJzW2tleV0pXG5cdFx0XHR9XG5cdFx0XHRpZiAodHlwZW9mIGFyZ3MuY29uZmlnID09PSBcImZ1bmN0aW9uXCIpIHhociA9IGFyZ3MuY29uZmlnKHhociwgYXJncykgfHwgeGhyXG5cdFx0XHR4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdC8vIERvbid0IHRocm93IGVycm9ycyBvbiB4aHIuYWJvcnQoKS4gWE1MSHR0cFJlcXVlc3RzIGVuZHMgdXAgaW4gYSBzdGF0ZSBvZlxuXHRcdFx0XHQvLyB4aHIuc3RhdHVzID09IDAgYW5kIHhoci5yZWFkeVN0YXRlID09IDQgaWYgYWJvcnRlZCBhZnRlciBvcGVuLCBidXQgYmVmb3JlIGNvbXBsZXRpb24uXG5cdFx0XHRcdGlmICh4aHIuc3RhdHVzICYmIHhoci5yZWFkeVN0YXRlID09PSA0KSB7XG5cdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdHZhciByZXNwb25zZSA9IChhcmdzLmV4dHJhY3QgIT09IGV4dHJhY3QpID8gYXJncy5leHRyYWN0KHhociwgYXJncykgOiBhcmdzLmRlc2VyaWFsaXplKGFyZ3MuZXh0cmFjdCh4aHIsIGFyZ3MpKVxuXHRcdFx0XHRcdFx0aWYgKCh4aHIuc3RhdHVzID49IDIwMCAmJiB4aHIuc3RhdHVzIDwgMzAwKSB8fCB4aHIuc3RhdHVzID09PSAzMDQpIHtcblx0XHRcdFx0XHRcdFx0cmVzb2x2ZShjYXN0KGFyZ3MudHlwZSwgcmVzcG9uc2UpKVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHZhciBlcnJvciA9IG5ldyBFcnJvcih4aHIucmVzcG9uc2VUZXh0KVxuXHRcdFx0XHRcdFx0XHRmb3IgKHZhciBrZXkgaW4gcmVzcG9uc2UpIGVycm9yW2tleV0gPSByZXNwb25zZVtrZXldXG5cdFx0XHRcdFx0XHRcdHJlamVjdChlcnJvcilcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Y2F0Y2ggKGUpIHtcblx0XHRcdFx0XHRcdHJlamVjdChlKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYgKHVzZUJvZHkgJiYgKGFyZ3MuZGF0YSAhPSBudWxsKSkgeGhyLnNlbmQoYXJncy5kYXRhKVxuXHRcdFx0ZWxzZSB4aHIuc2VuZCgpXG5cdFx0fSlcblx0XHRyZXR1cm4gYXJncy5iYWNrZ3JvdW5kID09PSB0cnVlID8gcHJvbWlzZTAgOiBmaW5hbGl6ZShwcm9taXNlMClcblx0fVxuXHRmdW5jdGlvbiBqc29ucChhcmdzLCBleHRyYSkge1xuXHRcdHZhciBmaW5hbGl6ZSA9IGZpbmFsaXplcigpXG5cdFx0YXJncyA9IG5vcm1hbGl6ZShhcmdzLCBleHRyYSlcblx0XHR2YXIgcHJvbWlzZTAgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblx0XHRcdHZhciBjYWxsYmFja05hbWUgPSBhcmdzLmNhbGxiYWNrTmFtZSB8fCBcIl9taXRocmlsX1wiICsgTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogMWUxNikgKyBcIl9cIiArIGNhbGxiYWNrQ291bnQrK1xuXHRcdFx0dmFyIHNjcmlwdCA9ICR3aW5kb3cuZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKVxuXHRcdFx0JHdpbmRvd1tjYWxsYmFja05hbWVdID0gZnVuY3Rpb24oZGF0YSkge1xuXHRcdFx0XHRzY3JpcHQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzY3JpcHQpXG5cdFx0XHRcdHJlc29sdmUoY2FzdChhcmdzLnR5cGUsIGRhdGEpKVxuXHRcdFx0XHRkZWxldGUgJHdpbmRvd1tjYWxsYmFja05hbWVdXG5cdFx0XHR9XG5cdFx0XHRzY3JpcHQub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRzY3JpcHQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzY3JpcHQpXG5cdFx0XHRcdHJlamVjdChuZXcgRXJyb3IoXCJKU09OUCByZXF1ZXN0IGZhaWxlZFwiKSlcblx0XHRcdFx0ZGVsZXRlICR3aW5kb3dbY2FsbGJhY2tOYW1lXVxuXHRcdFx0fVxuXHRcdFx0aWYgKGFyZ3MuZGF0YSA9PSBudWxsKSBhcmdzLmRhdGEgPSB7fVxuXHRcdFx0YXJncy51cmwgPSBpbnRlcnBvbGF0ZShhcmdzLnVybCwgYXJncy5kYXRhKVxuXHRcdFx0YXJncy5kYXRhW2FyZ3MuY2FsbGJhY2tLZXkgfHwgXCJjYWxsYmFja1wiXSA9IGNhbGxiYWNrTmFtZVxuXHRcdFx0c2NyaXB0LnNyYyA9IGFzc2VtYmxlKGFyZ3MudXJsLCBhcmdzLmRhdGEpXG5cdFx0XHQkd2luZG93LmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5hcHBlbmRDaGlsZChzY3JpcHQpXG5cdFx0fSlcblx0XHRyZXR1cm4gYXJncy5iYWNrZ3JvdW5kID09PSB0cnVlPyBwcm9taXNlMCA6IGZpbmFsaXplKHByb21pc2UwKVxuXHR9XG5cdGZ1bmN0aW9uIGludGVycG9sYXRlKHVybCwgZGF0YSkge1xuXHRcdGlmIChkYXRhID09IG51bGwpIHJldHVybiB1cmxcblx0XHR2YXIgdG9rZW5zID0gdXJsLm1hdGNoKC86W15cXC9dKy9naSkgfHwgW11cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHRva2Vucy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGtleSA9IHRva2Vuc1tpXS5zbGljZSgxKVxuXHRcdFx0aWYgKGRhdGFba2V5XSAhPSBudWxsKSB7XG5cdFx0XHRcdHVybCA9IHVybC5yZXBsYWNlKHRva2Vuc1tpXSwgZGF0YVtrZXldKVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdXJsXG5cdH1cblx0ZnVuY3Rpb24gYXNzZW1ibGUodXJsLCBkYXRhKSB7XG5cdFx0dmFyIHF1ZXJ5c3RyaW5nID0gYnVpbGRRdWVyeVN0cmluZyhkYXRhKVxuXHRcdGlmIChxdWVyeXN0cmluZyAhPT0gXCJcIikge1xuXHRcdFx0dmFyIHByZWZpeCA9IHVybC5pbmRleE9mKFwiP1wiKSA8IDAgPyBcIj9cIiA6IFwiJlwiXG5cdFx0XHR1cmwgKz0gcHJlZml4ICsgcXVlcnlzdHJpbmdcblx0XHR9XG5cdFx0cmV0dXJuIHVybFxuXHR9XG5cdGZ1bmN0aW9uIGRlc2VyaWFsaXplKGRhdGEpIHtcblx0XHR0cnkge3JldHVybiBkYXRhICE9PSBcIlwiID8gSlNPTi5wYXJzZShkYXRhKSA6IG51bGx9XG5cdFx0Y2F0Y2ggKGUpIHt0aHJvdyBuZXcgRXJyb3IoZGF0YSl9XG5cdH1cblx0ZnVuY3Rpb24gZXh0cmFjdCh4aHIpIHtyZXR1cm4geGhyLnJlc3BvbnNlVGV4dH1cblx0ZnVuY3Rpb24gY2FzdCh0eXBlMCwgZGF0YSkge1xuXHRcdGlmICh0eXBlb2YgdHlwZTAgPT09IFwiZnVuY3Rpb25cIikge1xuXHRcdFx0aWYgKEFycmF5LmlzQXJyYXkoZGF0YSkpIHtcblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0ZGF0YVtpXSA9IG5ldyB0eXBlMChkYXRhW2ldKVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHJldHVybiBuZXcgdHlwZTAoZGF0YSlcblx0XHR9XG5cdFx0cmV0dXJuIGRhdGFcblx0fVxuXHRyZXR1cm4ge3JlcXVlc3Q6IHJlcXVlc3QsIGpzb25wOiBqc29ucCwgc2V0Q29tcGxldGlvbkNhbGxiYWNrOiBzZXRDb21wbGV0aW9uQ2FsbGJhY2t9XG59XG52YXIgcmVxdWVzdFNlcnZpY2UgPSBfOCh3aW5kb3csIFByb21pc2VQb2x5ZmlsbClcbnZhciBjb3JlUmVuZGVyZXIgPSBmdW5jdGlvbigkd2luZG93KSB7XG5cdHZhciAkZG9jID0gJHdpbmRvdy5kb2N1bWVudFxuXHR2YXIgJGVtcHR5RnJhZ21lbnQgPSAkZG9jLmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKVxuXHR2YXIgb25ldmVudFxuXHRmdW5jdGlvbiBzZXRFdmVudENhbGxiYWNrKGNhbGxiYWNrKSB7cmV0dXJuIG9uZXZlbnQgPSBjYWxsYmFja31cblx0Ly9jcmVhdGVcblx0ZnVuY3Rpb24gY3JlYXRlTm9kZXMocGFyZW50LCB2bm9kZXMsIHN0YXJ0LCBlbmQsIGhvb2tzLCBuZXh0U2libGluZywgbnMpIHtcblx0XHRmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkrKykge1xuXHRcdFx0dmFyIHZub2RlID0gdm5vZGVzW2ldXG5cdFx0XHRpZiAodm5vZGUgIT0gbnVsbCkge1xuXHRcdFx0XHRjcmVhdGVOb2RlKHBhcmVudCwgdm5vZGUsIGhvb2tzLCBucywgbmV4dFNpYmxpbmcpXG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdGZ1bmN0aW9uIGNyZWF0ZU5vZGUocGFyZW50LCB2bm9kZSwgaG9va3MsIG5zLCBuZXh0U2libGluZykge1xuXHRcdHZhciB0YWcgPSB2bm9kZS50YWdcblx0XHRpZiAodm5vZGUuYXR0cnMgIT0gbnVsbCkgaW5pdExpZmVjeWNsZSh2bm9kZS5hdHRycywgdm5vZGUsIGhvb2tzKVxuXHRcdGlmICh0eXBlb2YgdGFnID09PSBcInN0cmluZ1wiKSB7XG5cdFx0XHRzd2l0Y2ggKHRhZykge1xuXHRcdFx0XHRjYXNlIFwiI1wiOiByZXR1cm4gY3JlYXRlVGV4dChwYXJlbnQsIHZub2RlLCBuZXh0U2libGluZylcblx0XHRcdFx0Y2FzZSBcIjxcIjogcmV0dXJuIGNyZWF0ZUhUTUwocGFyZW50LCB2bm9kZSwgbmV4dFNpYmxpbmcpXG5cdFx0XHRcdGNhc2UgXCJbXCI6IHJldHVybiBjcmVhdGVGcmFnbWVudChwYXJlbnQsIHZub2RlLCBob29rcywgbnMsIG5leHRTaWJsaW5nKVxuXHRcdFx0XHRkZWZhdWx0OiByZXR1cm4gY3JlYXRlRWxlbWVudChwYXJlbnQsIHZub2RlLCBob29rcywgbnMsIG5leHRTaWJsaW5nKVxuXHRcdFx0fVxuXHRcdH1cblx0XHRlbHNlIHJldHVybiBjcmVhdGVDb21wb25lbnQocGFyZW50LCB2bm9kZSwgaG9va3MsIG5zLCBuZXh0U2libGluZylcblx0fVxuXHRmdW5jdGlvbiBjcmVhdGVUZXh0KHBhcmVudCwgdm5vZGUsIG5leHRTaWJsaW5nKSB7XG5cdFx0dm5vZGUuZG9tID0gJGRvYy5jcmVhdGVUZXh0Tm9kZSh2bm9kZS5jaGlsZHJlbilcblx0XHRpbnNlcnROb2RlKHBhcmVudCwgdm5vZGUuZG9tLCBuZXh0U2libGluZylcblx0XHRyZXR1cm4gdm5vZGUuZG9tXG5cdH1cblx0ZnVuY3Rpb24gY3JlYXRlSFRNTChwYXJlbnQsIHZub2RlLCBuZXh0U2libGluZykge1xuXHRcdHZhciBtYXRjaDEgPSB2bm9kZS5jaGlsZHJlbi5tYXRjaCgvXlxccyo/PChcXHcrKS9pbSkgfHwgW11cblx0XHR2YXIgcGFyZW50MSA9IHtjYXB0aW9uOiBcInRhYmxlXCIsIHRoZWFkOiBcInRhYmxlXCIsIHRib2R5OiBcInRhYmxlXCIsIHRmb290OiBcInRhYmxlXCIsIHRyOiBcInRib2R5XCIsIHRoOiBcInRyXCIsIHRkOiBcInRyXCIsIGNvbGdyb3VwOiBcInRhYmxlXCIsIGNvbDogXCJjb2xncm91cFwifVttYXRjaDFbMV1dIHx8IFwiZGl2XCJcblx0XHR2YXIgdGVtcCA9ICRkb2MuY3JlYXRlRWxlbWVudChwYXJlbnQxKVxuXHRcdHRlbXAuaW5uZXJIVE1MID0gdm5vZGUuY2hpbGRyZW5cblx0XHR2bm9kZS5kb20gPSB0ZW1wLmZpcnN0Q2hpbGRcblx0XHR2bm9kZS5kb21TaXplID0gdGVtcC5jaGlsZE5vZGVzLmxlbmd0aFxuXHRcdHZhciBmcmFnbWVudCA9ICRkb2MuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpXG5cdFx0dmFyIGNoaWxkXG5cdFx0d2hpbGUgKGNoaWxkID0gdGVtcC5maXJzdENoaWxkKSB7XG5cdFx0XHRmcmFnbWVudC5hcHBlbmRDaGlsZChjaGlsZClcblx0XHR9XG5cdFx0aW5zZXJ0Tm9kZShwYXJlbnQsIGZyYWdtZW50LCBuZXh0U2libGluZylcblx0XHRyZXR1cm4gZnJhZ21lbnRcblx0fVxuXHRmdW5jdGlvbiBjcmVhdGVGcmFnbWVudChwYXJlbnQsIHZub2RlLCBob29rcywgbnMsIG5leHRTaWJsaW5nKSB7XG5cdFx0dmFyIGZyYWdtZW50ID0gJGRvYy5jcmVhdGVEb2N1bWVudEZyYWdtZW50KClcblx0XHRpZiAodm5vZGUuY2hpbGRyZW4gIT0gbnVsbCkge1xuXHRcdFx0dmFyIGNoaWxkcmVuID0gdm5vZGUuY2hpbGRyZW5cblx0XHRcdGNyZWF0ZU5vZGVzKGZyYWdtZW50LCBjaGlsZHJlbiwgMCwgY2hpbGRyZW4ubGVuZ3RoLCBob29rcywgbnVsbCwgbnMpXG5cdFx0fVxuXHRcdHZub2RlLmRvbSA9IGZyYWdtZW50LmZpcnN0Q2hpbGRcblx0XHR2bm9kZS5kb21TaXplID0gZnJhZ21lbnQuY2hpbGROb2Rlcy5sZW5ndGhcblx0XHRpbnNlcnROb2RlKHBhcmVudCwgZnJhZ21lbnQsIG5leHRTaWJsaW5nKVxuXHRcdHJldHVybiBmcmFnbWVudFxuXHR9XG5cdGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQocGFyZW50LCB2bm9kZSwgaG9va3MsIG5zLCBuZXh0U2libGluZykge1xuXHRcdHZhciB0YWcgPSB2bm9kZS50YWdcblx0XHRzd2l0Y2ggKHZub2RlLnRhZykge1xuXHRcdFx0Y2FzZSBcInN2Z1wiOiBucyA9IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIjsgYnJlYWtcblx0XHRcdGNhc2UgXCJtYXRoXCI6IG5zID0gXCJodHRwOi8vd3d3LnczLm9yZy8xOTk4L01hdGgvTWF0aE1MXCI7IGJyZWFrXG5cdFx0fVxuXHRcdHZhciBhdHRyczIgPSB2bm9kZS5hdHRyc1xuXHRcdHZhciBpcyA9IGF0dHJzMiAmJiBhdHRyczIuaXNcblx0XHR2YXIgZWxlbWVudCA9IG5zID9cblx0XHRcdGlzID8gJGRvYy5jcmVhdGVFbGVtZW50TlMobnMsIHRhZywge2lzOiBpc30pIDogJGRvYy5jcmVhdGVFbGVtZW50TlMobnMsIHRhZykgOlxuXHRcdFx0aXMgPyAkZG9jLmNyZWF0ZUVsZW1lbnQodGFnLCB7aXM6IGlzfSkgOiAkZG9jLmNyZWF0ZUVsZW1lbnQodGFnKVxuXHRcdHZub2RlLmRvbSA9IGVsZW1lbnRcblx0XHRpZiAoYXR0cnMyICE9IG51bGwpIHtcblx0XHRcdHNldEF0dHJzKHZub2RlLCBhdHRyczIsIG5zKVxuXHRcdH1cblx0XHRpbnNlcnROb2RlKHBhcmVudCwgZWxlbWVudCwgbmV4dFNpYmxpbmcpXG5cdFx0aWYgKHZub2RlLmF0dHJzICE9IG51bGwgJiYgdm5vZGUuYXR0cnMuY29udGVudGVkaXRhYmxlICE9IG51bGwpIHtcblx0XHRcdHNldENvbnRlbnRFZGl0YWJsZSh2bm9kZSlcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHRpZiAodm5vZGUudGV4dCAhPSBudWxsKSB7XG5cdFx0XHRcdGlmICh2bm9kZS50ZXh0ICE9PSBcIlwiKSBlbGVtZW50LnRleHRDb250ZW50ID0gdm5vZGUudGV4dFxuXHRcdFx0XHRlbHNlIHZub2RlLmNoaWxkcmVuID0gW1Zub2RlKFwiI1wiLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdm5vZGUudGV4dCwgdW5kZWZpbmVkLCB1bmRlZmluZWQpXVxuXHRcdFx0fVxuXHRcdFx0aWYgKHZub2RlLmNoaWxkcmVuICE9IG51bGwpIHtcblx0XHRcdFx0dmFyIGNoaWxkcmVuID0gdm5vZGUuY2hpbGRyZW5cblx0XHRcdFx0Y3JlYXRlTm9kZXMoZWxlbWVudCwgY2hpbGRyZW4sIDAsIGNoaWxkcmVuLmxlbmd0aCwgaG9va3MsIG51bGwsIG5zKVxuXHRcdFx0XHRzZXRMYXRlQXR0cnModm5vZGUpXG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBlbGVtZW50XG5cdH1cblx0ZnVuY3Rpb24gY3JlYXRlQ29tcG9uZW50KHBhcmVudCwgdm5vZGUsIGhvb2tzLCBucywgbmV4dFNpYmxpbmcpIHtcblx0XHR2bm9kZS5zdGF0ZSA9IE9iamVjdC5jcmVhdGUodm5vZGUudGFnKVxuXHRcdHZhciB2aWV3ID0gdm5vZGUudGFnLnZpZXdcblx0XHRpZiAodmlldy5yZWVudHJhbnRMb2NrICE9IG51bGwpIHJldHVybiAkZW1wdHlGcmFnbWVudFxuXHRcdHZpZXcucmVlbnRyYW50TG9jayA9IHRydWVcblx0XHRpbml0TGlmZWN5Y2xlKHZub2RlLnRhZywgdm5vZGUsIGhvb2tzKVxuXHRcdHZub2RlLmluc3RhbmNlID0gVm5vZGUubm9ybWFsaXplKHZpZXcuY2FsbCh2bm9kZS5zdGF0ZSwgdm5vZGUpKVxuXHRcdHZpZXcucmVlbnRyYW50TG9jayA9IG51bGxcblx0XHRpZiAodm5vZGUuaW5zdGFuY2UgIT0gbnVsbCkge1xuXHRcdFx0aWYgKHZub2RlLmluc3RhbmNlID09PSB2bm9kZSkgdGhyb3cgRXJyb3IoXCJBIHZpZXcgY2Fubm90IHJldHVybiB0aGUgdm5vZGUgaXQgcmVjZWl2ZWQgYXMgYXJndW1lbnRzXCIpXG5cdFx0XHR2YXIgZWxlbWVudCA9IGNyZWF0ZU5vZGUocGFyZW50LCB2bm9kZS5pbnN0YW5jZSwgaG9va3MsIG5zLCBuZXh0U2libGluZylcblx0XHRcdHZub2RlLmRvbSA9IHZub2RlLmluc3RhbmNlLmRvbVxuXHRcdFx0dm5vZGUuZG9tU2l6ZSA9IHZub2RlLmRvbSAhPSBudWxsID8gdm5vZGUuaW5zdGFuY2UuZG9tU2l6ZSA6IDBcblx0XHRcdGluc2VydE5vZGUocGFyZW50LCBlbGVtZW50LCBuZXh0U2libGluZylcblx0XHRcdHJldHVybiBlbGVtZW50XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0dm5vZGUuZG9tU2l6ZSA9IDBcblx0XHRcdHJldHVybiAkZW1wdHlGcmFnbWVudFxuXHRcdH1cblx0fVxuXHQvL3VwZGF0ZVxuXHRmdW5jdGlvbiB1cGRhdGVOb2RlcyhwYXJlbnQsIG9sZCwgdm5vZGVzLCByZWN5Y2xpbmcsIGhvb2tzLCBuZXh0U2libGluZywgbnMpIHtcblx0XHRpZiAob2xkID09PSB2bm9kZXMgfHwgb2xkID09IG51bGwgJiYgdm5vZGVzID09IG51bGwpIHJldHVyblxuXHRcdGVsc2UgaWYgKG9sZCA9PSBudWxsKSBjcmVhdGVOb2RlcyhwYXJlbnQsIHZub2RlcywgMCwgdm5vZGVzLmxlbmd0aCwgaG9va3MsIG5leHRTaWJsaW5nLCB1bmRlZmluZWQpXG5cdFx0ZWxzZSBpZiAodm5vZGVzID09IG51bGwpIHJlbW92ZU5vZGVzKG9sZCwgMCwgb2xkLmxlbmd0aCwgdm5vZGVzKVxuXHRcdGVsc2Uge1xuXHRcdFx0aWYgKG9sZC5sZW5ndGggPT09IHZub2Rlcy5sZW5ndGgpIHtcblx0XHRcdFx0dmFyIGlzVW5rZXllZCA9IGZhbHNlXG5cdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdm5vZGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0aWYgKHZub2Rlc1tpXSAhPSBudWxsICYmIG9sZFtpXSAhPSBudWxsKSB7XG5cdFx0XHRcdFx0XHRpc1Vua2V5ZWQgPSB2bm9kZXNbaV0ua2V5ID09IG51bGwgJiYgb2xkW2ldLmtleSA9PSBudWxsXG5cdFx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoaXNVbmtleWVkKSB7XG5cdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBvbGQubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRcdGlmIChvbGRbaV0gPT09IHZub2Rlc1tpXSkgY29udGludWVcblx0XHRcdFx0XHRcdGVsc2UgaWYgKG9sZFtpXSA9PSBudWxsICYmIHZub2Rlc1tpXSAhPSBudWxsKSBjcmVhdGVOb2RlKHBhcmVudCwgdm5vZGVzW2ldLCBob29rcywgbnMsIGdldE5leHRTaWJsaW5nKG9sZCwgaSArIDEsIG5leHRTaWJsaW5nKSlcblx0XHRcdFx0XHRcdGVsc2UgaWYgKHZub2Rlc1tpXSA9PSBudWxsKSByZW1vdmVOb2RlcyhvbGQsIGksIGkgKyAxLCB2bm9kZXMpXG5cdFx0XHRcdFx0XHRlbHNlIHVwZGF0ZU5vZGUocGFyZW50LCBvbGRbaV0sIHZub2Rlc1tpXSwgaG9va3MsIGdldE5leHRTaWJsaW5nKG9sZCwgaSArIDEsIG5leHRTaWJsaW5nKSwgZmFsc2UsIG5zKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm5cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmVjeWNsaW5nID0gcmVjeWNsaW5nIHx8IGlzUmVjeWNsYWJsZShvbGQsIHZub2Rlcylcblx0XHRcdGlmIChyZWN5Y2xpbmcpIG9sZCA9IG9sZC5jb25jYXQob2xkLnBvb2wpXG5cdFx0XHRcblx0XHRcdHZhciBvbGRTdGFydCA9IDAsIHN0YXJ0ID0gMCwgb2xkRW5kID0gb2xkLmxlbmd0aCAtIDEsIGVuZCA9IHZub2Rlcy5sZW5ndGggLSAxLCBtYXBcblx0XHRcdHdoaWxlIChvbGRFbmQgPj0gb2xkU3RhcnQgJiYgZW5kID49IHN0YXJ0KSB7XG5cdFx0XHRcdHZhciBvID0gb2xkW29sZFN0YXJ0XSwgdiA9IHZub2Rlc1tzdGFydF1cblx0XHRcdFx0aWYgKG8gPT09IHYgJiYgIXJlY3ljbGluZykgb2xkU3RhcnQrKywgc3RhcnQrK1xuXHRcdFx0XHRlbHNlIGlmIChvID09IG51bGwpIG9sZFN0YXJ0Kytcblx0XHRcdFx0ZWxzZSBpZiAodiA9PSBudWxsKSBzdGFydCsrXG5cdFx0XHRcdGVsc2UgaWYgKG8ua2V5ID09PSB2LmtleSkge1xuXHRcdFx0XHRcdG9sZFN0YXJ0KyssIHN0YXJ0Kytcblx0XHRcdFx0XHR1cGRhdGVOb2RlKHBhcmVudCwgbywgdiwgaG9va3MsIGdldE5leHRTaWJsaW5nKG9sZCwgb2xkU3RhcnQsIG5leHRTaWJsaW5nKSwgcmVjeWNsaW5nLCBucylcblx0XHRcdFx0XHRpZiAocmVjeWNsaW5nICYmIG8udGFnID09PSB2LnRhZykgaW5zZXJ0Tm9kZShwYXJlbnQsIHRvRnJhZ21lbnQobyksIG5leHRTaWJsaW5nKVxuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdHZhciBvID0gb2xkW29sZEVuZF1cblx0XHRcdFx0XHRpZiAobyA9PT0gdiAmJiAhcmVjeWNsaW5nKSBvbGRFbmQtLSwgc3RhcnQrK1xuXHRcdFx0XHRcdGVsc2UgaWYgKG8gPT0gbnVsbCkgb2xkRW5kLS1cblx0XHRcdFx0XHRlbHNlIGlmICh2ID09IG51bGwpIHN0YXJ0Kytcblx0XHRcdFx0XHRlbHNlIGlmIChvLmtleSA9PT0gdi5rZXkpIHtcblx0XHRcdFx0XHRcdHVwZGF0ZU5vZGUocGFyZW50LCBvLCB2LCBob29rcywgZ2V0TmV4dFNpYmxpbmcob2xkLCBvbGRFbmQgKyAxLCBuZXh0U2libGluZyksIHJlY3ljbGluZywgbnMpXG5cdFx0XHRcdFx0XHRpZiAocmVjeWNsaW5nIHx8IHN0YXJ0IDwgZW5kKSBpbnNlcnROb2RlKHBhcmVudCwgdG9GcmFnbWVudChvKSwgZ2V0TmV4dFNpYmxpbmcob2xkLCBvbGRTdGFydCwgbmV4dFNpYmxpbmcpKVxuXHRcdFx0XHRcdFx0b2xkRW5kLS0sIHN0YXJ0Kytcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZSBicmVha1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHR3aGlsZSAob2xkRW5kID49IG9sZFN0YXJ0ICYmIGVuZCA+PSBzdGFydCkge1xuXHRcdFx0XHR2YXIgbyA9IG9sZFtvbGRFbmRdLCB2ID0gdm5vZGVzW2VuZF1cblx0XHRcdFx0aWYgKG8gPT09IHYgJiYgIXJlY3ljbGluZykgb2xkRW5kLS0sIGVuZC0tXG5cdFx0XHRcdGVsc2UgaWYgKG8gPT0gbnVsbCkgb2xkRW5kLS1cblx0XHRcdFx0ZWxzZSBpZiAodiA9PSBudWxsKSBlbmQtLVxuXHRcdFx0XHRlbHNlIGlmIChvLmtleSA9PT0gdi5rZXkpIHtcblx0XHRcdFx0XHR1cGRhdGVOb2RlKHBhcmVudCwgbywgdiwgaG9va3MsIGdldE5leHRTaWJsaW5nKG9sZCwgb2xkRW5kICsgMSwgbmV4dFNpYmxpbmcpLCByZWN5Y2xpbmcsIG5zKVxuXHRcdFx0XHRcdGlmIChyZWN5Y2xpbmcgJiYgby50YWcgPT09IHYudGFnKSBpbnNlcnROb2RlKHBhcmVudCwgdG9GcmFnbWVudChvKSwgbmV4dFNpYmxpbmcpXG5cdFx0XHRcdFx0aWYgKG8uZG9tICE9IG51bGwpIG5leHRTaWJsaW5nID0gby5kb21cblx0XHRcdFx0XHRvbGRFbmQtLSwgZW5kLS1cblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRpZiAoIW1hcCkgbWFwID0gZ2V0S2V5TWFwKG9sZCwgb2xkRW5kKVxuXHRcdFx0XHRcdGlmICh2ICE9IG51bGwpIHtcblx0XHRcdFx0XHRcdHZhciBvbGRJbmRleCA9IG1hcFt2LmtleV1cblx0XHRcdFx0XHRcdGlmIChvbGRJbmRleCAhPSBudWxsKSB7XG5cdFx0XHRcdFx0XHRcdHZhciBtb3ZhYmxlID0gb2xkW29sZEluZGV4XVxuXHRcdFx0XHRcdFx0XHR1cGRhdGVOb2RlKHBhcmVudCwgbW92YWJsZSwgdiwgaG9va3MsIGdldE5leHRTaWJsaW5nKG9sZCwgb2xkRW5kICsgMSwgbmV4dFNpYmxpbmcpLCByZWN5Y2xpbmcsIG5zKVxuXHRcdFx0XHRcdFx0XHRpbnNlcnROb2RlKHBhcmVudCwgdG9GcmFnbWVudChtb3ZhYmxlKSwgbmV4dFNpYmxpbmcpXG5cdFx0XHRcdFx0XHRcdG9sZFtvbGRJbmRleF0uc2tpcCA9IHRydWVcblx0XHRcdFx0XHRcdFx0aWYgKG1vdmFibGUuZG9tICE9IG51bGwpIG5leHRTaWJsaW5nID0gbW92YWJsZS5kb21cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0XHR2YXIgZG9tID0gY3JlYXRlTm9kZShwYXJlbnQsIHYsIGhvb2tzLCB1bmRlZmluZWQsIG5leHRTaWJsaW5nKVxuXHRcdFx0XHRcdFx0XHRuZXh0U2libGluZyA9IGRvbVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbmQtLVxuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChlbmQgPCBzdGFydCkgYnJlYWtcblx0XHRcdH1cblx0XHRcdGNyZWF0ZU5vZGVzKHBhcmVudCwgdm5vZGVzLCBzdGFydCwgZW5kICsgMSwgaG9va3MsIG5leHRTaWJsaW5nLCBucylcblx0XHRcdHJlbW92ZU5vZGVzKG9sZCwgb2xkU3RhcnQsIG9sZEVuZCArIDEsIHZub2Rlcylcblx0XHR9XG5cdH1cblx0ZnVuY3Rpb24gdXBkYXRlTm9kZShwYXJlbnQsIG9sZCwgdm5vZGUsIGhvb2tzLCBuZXh0U2libGluZywgcmVjeWNsaW5nLCBucykge1xuXHRcdHZhciBvbGRUYWcgPSBvbGQudGFnLCB0YWcgPSB2bm9kZS50YWdcblx0XHRpZiAob2xkVGFnID09PSB0YWcpIHtcblx0XHRcdHZub2RlLnN0YXRlID0gb2xkLnN0YXRlXG5cdFx0XHR2bm9kZS5ldmVudHMgPSBvbGQuZXZlbnRzXG5cdFx0XHRpZiAoc2hvdWxkVXBkYXRlKHZub2RlLCBvbGQpKSByZXR1cm5cblx0XHRcdGlmICh2bm9kZS5hdHRycyAhPSBudWxsKSB7XG5cdFx0XHRcdHVwZGF0ZUxpZmVjeWNsZSh2bm9kZS5hdHRycywgdm5vZGUsIGhvb2tzLCByZWN5Y2xpbmcpXG5cdFx0XHR9XG5cdFx0XHRpZiAodHlwZW9mIG9sZFRhZyA9PT0gXCJzdHJpbmdcIikge1xuXHRcdFx0XHRzd2l0Y2ggKG9sZFRhZykge1xuXHRcdFx0XHRcdGNhc2UgXCIjXCI6IHVwZGF0ZVRleHQob2xkLCB2bm9kZSk7IGJyZWFrXG5cdFx0XHRcdFx0Y2FzZSBcIjxcIjogdXBkYXRlSFRNTChwYXJlbnQsIG9sZCwgdm5vZGUsIG5leHRTaWJsaW5nKTsgYnJlYWtcblx0XHRcdFx0XHRjYXNlIFwiW1wiOiB1cGRhdGVGcmFnbWVudChwYXJlbnQsIG9sZCwgdm5vZGUsIHJlY3ljbGluZywgaG9va3MsIG5leHRTaWJsaW5nLCBucyk7IGJyZWFrXG5cdFx0XHRcdFx0ZGVmYXVsdDogdXBkYXRlRWxlbWVudChvbGQsIHZub2RlLCByZWN5Y2xpbmcsIGhvb2tzLCBucylcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZWxzZSB1cGRhdGVDb21wb25lbnQocGFyZW50LCBvbGQsIHZub2RlLCBob29rcywgbmV4dFNpYmxpbmcsIHJlY3ljbGluZywgbnMpXG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0cmVtb3ZlTm9kZShvbGQsIG51bGwpXG5cdFx0XHRjcmVhdGVOb2RlKHBhcmVudCwgdm5vZGUsIGhvb2tzLCBucywgbmV4dFNpYmxpbmcpXG5cdFx0fVxuXHR9XG5cdGZ1bmN0aW9uIHVwZGF0ZVRleHQob2xkLCB2bm9kZSkge1xuXHRcdGlmIChvbGQuY2hpbGRyZW4udG9TdHJpbmcoKSAhPT0gdm5vZGUuY2hpbGRyZW4udG9TdHJpbmcoKSkge1xuXHRcdFx0b2xkLmRvbS5ub2RlVmFsdWUgPSB2bm9kZS5jaGlsZHJlblxuXHRcdH1cblx0XHR2bm9kZS5kb20gPSBvbGQuZG9tXG5cdH1cblx0ZnVuY3Rpb24gdXBkYXRlSFRNTChwYXJlbnQsIG9sZCwgdm5vZGUsIG5leHRTaWJsaW5nKSB7XG5cdFx0aWYgKG9sZC5jaGlsZHJlbiAhPT0gdm5vZGUuY2hpbGRyZW4pIHtcblx0XHRcdHRvRnJhZ21lbnQob2xkKVxuXHRcdFx0Y3JlYXRlSFRNTChwYXJlbnQsIHZub2RlLCBuZXh0U2libGluZylcblx0XHR9XG5cdFx0ZWxzZSB2bm9kZS5kb20gPSBvbGQuZG9tLCB2bm9kZS5kb21TaXplID0gb2xkLmRvbVNpemVcblx0fVxuXHRmdW5jdGlvbiB1cGRhdGVGcmFnbWVudChwYXJlbnQsIG9sZCwgdm5vZGUsIHJlY3ljbGluZywgaG9va3MsIG5leHRTaWJsaW5nLCBucykge1xuXHRcdHVwZGF0ZU5vZGVzKHBhcmVudCwgb2xkLmNoaWxkcmVuLCB2bm9kZS5jaGlsZHJlbiwgcmVjeWNsaW5nLCBob29rcywgbmV4dFNpYmxpbmcsIG5zKVxuXHRcdHZhciBkb21TaXplID0gMCwgY2hpbGRyZW4gPSB2bm9kZS5jaGlsZHJlblxuXHRcdHZub2RlLmRvbSA9IG51bGxcblx0XHRpZiAoY2hpbGRyZW4gIT0gbnVsbCkge1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHR2YXIgY2hpbGQgPSBjaGlsZHJlbltpXVxuXHRcdFx0XHRpZiAoY2hpbGQgIT0gbnVsbCAmJiBjaGlsZC5kb20gIT0gbnVsbCkge1xuXHRcdFx0XHRcdGlmICh2bm9kZS5kb20gPT0gbnVsbCkgdm5vZGUuZG9tID0gY2hpbGQuZG9tXG5cdFx0XHRcdFx0ZG9tU2l6ZSArPSBjaGlsZC5kb21TaXplIHx8IDFcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYgKGRvbVNpemUgIT09IDEpIHZub2RlLmRvbVNpemUgPSBkb21TaXplXG5cdFx0fVxuXHR9XG5cdGZ1bmN0aW9uIHVwZGF0ZUVsZW1lbnQob2xkLCB2bm9kZSwgcmVjeWNsaW5nLCBob29rcywgbnMpIHtcblx0XHR2YXIgZWxlbWVudCA9IHZub2RlLmRvbSA9IG9sZC5kb21cblx0XHRzd2l0Y2ggKHZub2RlLnRhZykge1xuXHRcdFx0Y2FzZSBcInN2Z1wiOiBucyA9IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIjsgYnJlYWtcblx0XHRcdGNhc2UgXCJtYXRoXCI6IG5zID0gXCJodHRwOi8vd3d3LnczLm9yZy8xOTk4L01hdGgvTWF0aE1MXCI7IGJyZWFrXG5cdFx0fVxuXHRcdGlmICh2bm9kZS50YWcgPT09IFwidGV4dGFyZWFcIikge1xuXHRcdFx0aWYgKHZub2RlLmF0dHJzID09IG51bGwpIHZub2RlLmF0dHJzID0ge31cblx0XHRcdGlmICh2bm9kZS50ZXh0ICE9IG51bGwpIHtcblx0XHRcdFx0dm5vZGUuYXR0cnMudmFsdWUgPSB2bm9kZS50ZXh0IC8vRklYTUUgaGFuZGxlMCBtdWx0aXBsZSBjaGlsZHJlblxuXHRcdFx0XHR2bm9kZS50ZXh0ID0gdW5kZWZpbmVkXG5cdFx0XHR9XG5cdFx0fVxuXHRcdHVwZGF0ZUF0dHJzKHZub2RlLCBvbGQuYXR0cnMsIHZub2RlLmF0dHJzLCBucylcblx0XHRpZiAodm5vZGUuYXR0cnMgIT0gbnVsbCAmJiB2bm9kZS5hdHRycy5jb250ZW50ZWRpdGFibGUgIT0gbnVsbCkge1xuXHRcdFx0c2V0Q29udGVudEVkaXRhYmxlKHZub2RlKVxuXHRcdH1cblx0XHRlbHNlIGlmIChvbGQudGV4dCAhPSBudWxsICYmIHZub2RlLnRleHQgIT0gbnVsbCAmJiB2bm9kZS50ZXh0ICE9PSBcIlwiKSB7XG5cdFx0XHRpZiAob2xkLnRleHQudG9TdHJpbmcoKSAhPT0gdm5vZGUudGV4dC50b1N0cmluZygpKSBvbGQuZG9tLmZpcnN0Q2hpbGQubm9kZVZhbHVlID0gdm5vZGUudGV4dFxuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdGlmIChvbGQudGV4dCAhPSBudWxsKSBvbGQuY2hpbGRyZW4gPSBbVm5vZGUoXCIjXCIsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBvbGQudGV4dCwgdW5kZWZpbmVkLCBvbGQuZG9tLmZpcnN0Q2hpbGQpXVxuXHRcdFx0aWYgKHZub2RlLnRleHQgIT0gbnVsbCkgdm5vZGUuY2hpbGRyZW4gPSBbVm5vZGUoXCIjXCIsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB2bm9kZS50ZXh0LCB1bmRlZmluZWQsIHVuZGVmaW5lZCldXG5cdFx0XHR1cGRhdGVOb2RlcyhlbGVtZW50LCBvbGQuY2hpbGRyZW4sIHZub2RlLmNoaWxkcmVuLCByZWN5Y2xpbmcsIGhvb2tzLCBudWxsLCBucylcblx0XHR9XG5cdH1cblx0ZnVuY3Rpb24gdXBkYXRlQ29tcG9uZW50KHBhcmVudCwgb2xkLCB2bm9kZSwgaG9va3MsIG5leHRTaWJsaW5nLCByZWN5Y2xpbmcsIG5zKSB7XG5cdFx0dm5vZGUuaW5zdGFuY2UgPSBWbm9kZS5ub3JtYWxpemUodm5vZGUudGFnLnZpZXcuY2FsbCh2bm9kZS5zdGF0ZSwgdm5vZGUpKVxuXHRcdHVwZGF0ZUxpZmVjeWNsZSh2bm9kZS50YWcsIHZub2RlLCBob29rcywgcmVjeWNsaW5nKVxuXHRcdGlmICh2bm9kZS5pbnN0YW5jZSAhPSBudWxsKSB7XG5cdFx0XHRpZiAob2xkLmluc3RhbmNlID09IG51bGwpIGNyZWF0ZU5vZGUocGFyZW50LCB2bm9kZS5pbnN0YW5jZSwgaG9va3MsIG5zLCBuZXh0U2libGluZylcblx0XHRcdGVsc2UgdXBkYXRlTm9kZShwYXJlbnQsIG9sZC5pbnN0YW5jZSwgdm5vZGUuaW5zdGFuY2UsIGhvb2tzLCBuZXh0U2libGluZywgcmVjeWNsaW5nLCBucylcblx0XHRcdHZub2RlLmRvbSA9IHZub2RlLmluc3RhbmNlLmRvbVxuXHRcdFx0dm5vZGUuZG9tU2l6ZSA9IHZub2RlLmluc3RhbmNlLmRvbVNpemVcblx0XHR9XG5cdFx0ZWxzZSBpZiAob2xkLmluc3RhbmNlICE9IG51bGwpIHtcblx0XHRcdHJlbW92ZU5vZGUob2xkLmluc3RhbmNlLCBudWxsKVxuXHRcdFx0dm5vZGUuZG9tID0gdW5kZWZpbmVkXG5cdFx0XHR2bm9kZS5kb21TaXplID0gMFxuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdHZub2RlLmRvbSA9IG9sZC5kb21cblx0XHRcdHZub2RlLmRvbVNpemUgPSBvbGQuZG9tU2l6ZVxuXHRcdH1cblx0fVxuXHRmdW5jdGlvbiBpc1JlY3ljbGFibGUob2xkLCB2bm9kZXMpIHtcblx0XHRpZiAob2xkLnBvb2wgIT0gbnVsbCAmJiBNYXRoLmFicyhvbGQucG9vbC5sZW5ndGggLSB2bm9kZXMubGVuZ3RoKSA8PSBNYXRoLmFicyhvbGQubGVuZ3RoIC0gdm5vZGVzLmxlbmd0aCkpIHtcblx0XHRcdHZhciBvbGRDaGlsZHJlbkxlbmd0aCA9IG9sZFswXSAmJiBvbGRbMF0uY2hpbGRyZW4gJiYgb2xkWzBdLmNoaWxkcmVuLmxlbmd0aCB8fCAwXG5cdFx0XHR2YXIgcG9vbENoaWxkcmVuTGVuZ3RoID0gb2xkLnBvb2xbMF0gJiYgb2xkLnBvb2xbMF0uY2hpbGRyZW4gJiYgb2xkLnBvb2xbMF0uY2hpbGRyZW4ubGVuZ3RoIHx8IDBcblx0XHRcdHZhciB2bm9kZXNDaGlsZHJlbkxlbmd0aCA9IHZub2Rlc1swXSAmJiB2bm9kZXNbMF0uY2hpbGRyZW4gJiYgdm5vZGVzWzBdLmNoaWxkcmVuLmxlbmd0aCB8fCAwXG5cdFx0XHRpZiAoTWF0aC5hYnMocG9vbENoaWxkcmVuTGVuZ3RoIC0gdm5vZGVzQ2hpbGRyZW5MZW5ndGgpIDw9IE1hdGguYWJzKG9sZENoaWxkcmVuTGVuZ3RoIC0gdm5vZGVzQ2hpbGRyZW5MZW5ndGgpKSB7XG5cdFx0XHRcdHJldHVybiB0cnVlXG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZVxuXHR9XG5cdGZ1bmN0aW9uIGdldEtleU1hcCh2bm9kZXMsIGVuZCkge1xuXHRcdHZhciBtYXAgPSB7fSwgaSA9IDBcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGVuZDsgaSsrKSB7XG5cdFx0XHR2YXIgdm5vZGUgPSB2bm9kZXNbaV1cblx0XHRcdGlmICh2bm9kZSAhPSBudWxsKSB7XG5cdFx0XHRcdHZhciBrZXkyID0gdm5vZGUua2V5XG5cdFx0XHRcdGlmIChrZXkyICE9IG51bGwpIG1hcFtrZXkyXSA9IGlcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIG1hcFxuXHR9XG5cdGZ1bmN0aW9uIHRvRnJhZ21lbnQodm5vZGUpIHtcblx0XHR2YXIgY291bnQwID0gdm5vZGUuZG9tU2l6ZVxuXHRcdGlmIChjb3VudDAgIT0gbnVsbCB8fCB2bm9kZS5kb20gPT0gbnVsbCkge1xuXHRcdFx0dmFyIGZyYWdtZW50ID0gJGRvYy5jcmVhdGVEb2N1bWVudEZyYWdtZW50KClcblx0XHRcdGlmIChjb3VudDAgPiAwKSB7XG5cdFx0XHRcdHZhciBkb20gPSB2bm9kZS5kb21cblx0XHRcdFx0d2hpbGUgKC0tY291bnQwKSBmcmFnbWVudC5hcHBlbmRDaGlsZChkb20ubmV4dFNpYmxpbmcpXG5cdFx0XHRcdGZyYWdtZW50Lmluc2VydEJlZm9yZShkb20sIGZyYWdtZW50LmZpcnN0Q2hpbGQpXG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZnJhZ21lbnRcblx0XHR9XG5cdFx0ZWxzZSByZXR1cm4gdm5vZGUuZG9tXG5cdH1cblx0ZnVuY3Rpb24gZ2V0TmV4dFNpYmxpbmcodm5vZGVzLCBpLCBuZXh0U2libGluZykge1xuXHRcdGZvciAoOyBpIDwgdm5vZGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRpZiAodm5vZGVzW2ldICE9IG51bGwgJiYgdm5vZGVzW2ldLmRvbSAhPSBudWxsKSByZXR1cm4gdm5vZGVzW2ldLmRvbVxuXHRcdH1cblx0XHRyZXR1cm4gbmV4dFNpYmxpbmdcblx0fVxuXHRmdW5jdGlvbiBpbnNlcnROb2RlKHBhcmVudCwgZG9tLCBuZXh0U2libGluZykge1xuXHRcdGlmIChuZXh0U2libGluZyAmJiBuZXh0U2libGluZy5wYXJlbnROb2RlKSBwYXJlbnQuaW5zZXJ0QmVmb3JlKGRvbSwgbmV4dFNpYmxpbmcpXG5cdFx0ZWxzZSBwYXJlbnQuYXBwZW5kQ2hpbGQoZG9tKVxuXHR9XG5cdGZ1bmN0aW9uIHNldENvbnRlbnRFZGl0YWJsZSh2bm9kZSkge1xuXHRcdHZhciBjaGlsZHJlbiA9IHZub2RlLmNoaWxkcmVuXG5cdFx0aWYgKGNoaWxkcmVuICE9IG51bGwgJiYgY2hpbGRyZW4ubGVuZ3RoID09PSAxICYmIGNoaWxkcmVuWzBdLnRhZyA9PT0gXCI8XCIpIHtcblx0XHRcdHZhciBjb250ZW50ID0gY2hpbGRyZW5bMF0uY2hpbGRyZW5cblx0XHRcdGlmICh2bm9kZS5kb20uaW5uZXJIVE1MICE9PSBjb250ZW50KSB2bm9kZS5kb20uaW5uZXJIVE1MID0gY29udGVudFxuXHRcdH1cblx0XHRlbHNlIGlmICh2bm9kZS50ZXh0ICE9IG51bGwgfHwgY2hpbGRyZW4gIT0gbnVsbCAmJiBjaGlsZHJlbi5sZW5ndGggIT09IDApIHRocm93IG5ldyBFcnJvcihcIkNoaWxkIG5vZGUgb2YgYSBjb250ZW50ZWRpdGFibGUgbXVzdCBiZSB0cnVzdGVkXCIpXG5cdH1cblx0Ly9yZW1vdmVcblx0ZnVuY3Rpb24gcmVtb3ZlTm9kZXModm5vZGVzLCBzdGFydCwgZW5kLCBjb250ZXh0KSB7XG5cdFx0Zm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpKyspIHtcblx0XHRcdHZhciB2bm9kZSA9IHZub2Rlc1tpXVxuXHRcdFx0aWYgKHZub2RlICE9IG51bGwpIHtcblx0XHRcdFx0aWYgKHZub2RlLnNraXApIHZub2RlLnNraXAgPSBmYWxzZVxuXHRcdFx0XHRlbHNlIHJlbW92ZU5vZGUodm5vZGUsIGNvbnRleHQpXG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdGZ1bmN0aW9uIHJlbW92ZU5vZGUodm5vZGUsIGNvbnRleHQpIHtcblx0XHR2YXIgZXhwZWN0ZWQgPSAxLCBjYWxsZWQgPSAwXG5cdFx0aWYgKHZub2RlLmF0dHJzICYmIHZub2RlLmF0dHJzLm9uYmVmb3JlcmVtb3ZlKSB7XG5cdFx0XHR2YXIgcmVzdWx0ID0gdm5vZGUuYXR0cnMub25iZWZvcmVyZW1vdmUuY2FsbCh2bm9kZS5zdGF0ZSwgdm5vZGUpXG5cdFx0XHRpZiAocmVzdWx0ICE9IG51bGwgJiYgdHlwZW9mIHJlc3VsdC50aGVuID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdFx0ZXhwZWN0ZWQrK1xuXHRcdFx0XHRyZXN1bHQudGhlbihjb250aW51YXRpb24sIGNvbnRpbnVhdGlvbilcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKHR5cGVvZiB2bm9kZS50YWcgIT09IFwic3RyaW5nXCIgJiYgdm5vZGUudGFnLm9uYmVmb3JlcmVtb3ZlKSB7XG5cdFx0XHR2YXIgcmVzdWx0ID0gdm5vZGUudGFnLm9uYmVmb3JlcmVtb3ZlLmNhbGwodm5vZGUuc3RhdGUsIHZub2RlKVxuXHRcdFx0aWYgKHJlc3VsdCAhPSBudWxsICYmIHR5cGVvZiByZXN1bHQudGhlbiA9PT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0XHRcdGV4cGVjdGVkKytcblx0XHRcdFx0cmVzdWx0LnRoZW4oY29udGludWF0aW9uLCBjb250aW51YXRpb24pXG5cdFx0XHR9XG5cdFx0fVxuXHRcdGNvbnRpbnVhdGlvbigpXG5cdFx0ZnVuY3Rpb24gY29udGludWF0aW9uKCkge1xuXHRcdFx0aWYgKCsrY2FsbGVkID09PSBleHBlY3RlZCkge1xuXHRcdFx0XHRvbnJlbW92ZSh2bm9kZSlcblx0XHRcdFx0aWYgKHZub2RlLmRvbSkge1xuXHRcdFx0XHRcdHZhciBjb3VudDAgPSB2bm9kZS5kb21TaXplIHx8IDFcblx0XHRcdFx0XHRpZiAoY291bnQwID4gMSkge1xuXHRcdFx0XHRcdFx0dmFyIGRvbSA9IHZub2RlLmRvbVxuXHRcdFx0XHRcdFx0d2hpbGUgKC0tY291bnQwKSB7XG5cdFx0XHRcdFx0XHRcdHJlbW92ZU5vZGVGcm9tRE9NKGRvbS5uZXh0U2libGluZylcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmVtb3ZlTm9kZUZyb21ET00odm5vZGUuZG9tKVxuXHRcdFx0XHRcdGlmIChjb250ZXh0ICE9IG51bGwgJiYgdm5vZGUuZG9tU2l6ZSA9PSBudWxsICYmICFoYXNJbnRlZ3JhdGlvbk1ldGhvZHModm5vZGUuYXR0cnMpICYmIHR5cGVvZiB2bm9kZS50YWcgPT09IFwic3RyaW5nXCIpIHsgLy9UT0RPIHRlc3QgY3VzdG9tIGVsZW1lbnRzXG5cdFx0XHRcdFx0XHRpZiAoIWNvbnRleHQucG9vbCkgY29udGV4dC5wb29sID0gW3Zub2RlXVxuXHRcdFx0XHRcdFx0ZWxzZSBjb250ZXh0LnBvb2wucHVzaCh2bm9kZSlcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblx0ZnVuY3Rpb24gcmVtb3ZlTm9kZUZyb21ET00obm9kZSkge1xuXHRcdHZhciBwYXJlbnQgPSBub2RlLnBhcmVudE5vZGVcblx0XHRpZiAocGFyZW50ICE9IG51bGwpIHBhcmVudC5yZW1vdmVDaGlsZChub2RlKVxuXHR9XG5cdGZ1bmN0aW9uIG9ucmVtb3ZlKHZub2RlKSB7XG5cdFx0aWYgKHZub2RlLmF0dHJzICYmIHZub2RlLmF0dHJzLm9ucmVtb3ZlKSB2bm9kZS5hdHRycy5vbnJlbW92ZS5jYWxsKHZub2RlLnN0YXRlLCB2bm9kZSlcblx0XHRpZiAodHlwZW9mIHZub2RlLnRhZyAhPT0gXCJzdHJpbmdcIiAmJiB2bm9kZS50YWcub25yZW1vdmUpIHZub2RlLnRhZy5vbnJlbW92ZS5jYWxsKHZub2RlLnN0YXRlLCB2bm9kZSlcblx0XHRpZiAodm5vZGUuaW5zdGFuY2UgIT0gbnVsbCkgb25yZW1vdmUodm5vZGUuaW5zdGFuY2UpXG5cdFx0ZWxzZSB7XG5cdFx0XHR2YXIgY2hpbGRyZW4gPSB2bm9kZS5jaGlsZHJlblxuXHRcdFx0aWYgKEFycmF5LmlzQXJyYXkoY2hpbGRyZW4pKSB7XG5cdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHR2YXIgY2hpbGQgPSBjaGlsZHJlbltpXVxuXHRcdFx0XHRcdGlmIChjaGlsZCAhPSBudWxsKSBvbnJlbW92ZShjaGlsZClcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHQvL2F0dHJzMlxuXHRmdW5jdGlvbiBzZXRBdHRycyh2bm9kZSwgYXR0cnMyLCBucykge1xuXHRcdGZvciAodmFyIGtleTIgaW4gYXR0cnMyKSB7XG5cdFx0XHRzZXRBdHRyKHZub2RlLCBrZXkyLCBudWxsLCBhdHRyczJba2V5Ml0sIG5zKVxuXHRcdH1cblx0fVxuXHRmdW5jdGlvbiBzZXRBdHRyKHZub2RlLCBrZXkyLCBvbGQsIHZhbHVlLCBucykge1xuXHRcdHZhciBlbGVtZW50ID0gdm5vZGUuZG9tXG5cdFx0aWYgKGtleTIgPT09IFwia2V5XCIgfHwga2V5MiA9PT0gXCJpc1wiIHx8IChvbGQgPT09IHZhbHVlICYmICFpc0Zvcm1BdHRyaWJ1dGUodm5vZGUsIGtleTIpKSAmJiB0eXBlb2YgdmFsdWUgIT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIHZhbHVlID09PSBcInVuZGVmaW5lZFwiIHx8IGlzTGlmZWN5Y2xlTWV0aG9kKGtleTIpKSByZXR1cm5cblx0XHR2YXIgbnNMYXN0SW5kZXggPSBrZXkyLmluZGV4T2YoXCI6XCIpXG5cdFx0aWYgKG5zTGFzdEluZGV4ID4gLTEgJiYga2V5Mi5zdWJzdHIoMCwgbnNMYXN0SW5kZXgpID09PSBcInhsaW5rXCIpIHtcblx0XHRcdGVsZW1lbnQuc2V0QXR0cmlidXRlTlMoXCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIsIGtleTIuc2xpY2UobnNMYXN0SW5kZXggKyAxKSwgdmFsdWUpXG5cdFx0fVxuXHRcdGVsc2UgaWYgKGtleTJbMF0gPT09IFwib1wiICYmIGtleTJbMV0gPT09IFwiblwiICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiKSB1cGRhdGVFdmVudCh2bm9kZSwga2V5MiwgdmFsdWUpXG5cdFx0ZWxzZSBpZiAoa2V5MiA9PT0gXCJzdHlsZVwiKSB1cGRhdGVTdHlsZShlbGVtZW50LCBvbGQsIHZhbHVlKVxuXHRcdGVsc2UgaWYgKGtleTIgaW4gZWxlbWVudCAmJiAhaXNBdHRyaWJ1dGUoa2V5MikgJiYgbnMgPT09IHVuZGVmaW5lZCAmJiAhaXNDdXN0b21FbGVtZW50KHZub2RlKSkge1xuXHRcdFx0Ly9zZXR0aW5nIGlucHV0W3ZhbHVlXSB0byBzYW1lIHZhbHVlIGJ5IHR5cGluZyBvbiBmb2N1c2VkIGVsZW1lbnQgbW92ZXMgY3Vyc29yIHRvIGVuZCBpbiBDaHJvbWVcblx0XHRcdGlmICh2bm9kZS50YWcgPT09IFwiaW5wdXRcIiAmJiBrZXkyID09PSBcInZhbHVlXCIgJiYgdm5vZGUuZG9tLnZhbHVlID09PSB2YWx1ZSAmJiB2bm9kZS5kb20gPT09ICRkb2MuYWN0aXZlRWxlbWVudCkgcmV0dXJuXG5cdFx0XHQvL3NldHRpbmcgc2VsZWN0W3ZhbHVlXSB0byBzYW1lIHZhbHVlIHdoaWxlIGhhdmluZyBzZWxlY3Qgb3BlbiBibGlua3Mgc2VsZWN0IGRyb3Bkb3duIGluIENocm9tZVxuXHRcdFx0aWYgKHZub2RlLnRhZyA9PT0gXCJzZWxlY3RcIiAmJiBrZXkyID09PSBcInZhbHVlXCIgJiYgdm5vZGUuZG9tLnZhbHVlID09PSB2YWx1ZSAmJiB2bm9kZS5kb20gPT09ICRkb2MuYWN0aXZlRWxlbWVudCkgcmV0dXJuXG5cdFx0XHQvL3NldHRpbmcgb3B0aW9uW3ZhbHVlXSB0byBzYW1lIHZhbHVlIHdoaWxlIGhhdmluZyBzZWxlY3Qgb3BlbiBibGlua3Mgc2VsZWN0IGRyb3Bkb3duIGluIENocm9tZVxuXHRcdFx0aWYgKHZub2RlLnRhZyA9PT0gXCJvcHRpb25cIiAmJiBrZXkyID09PSBcInZhbHVlXCIgJiYgdm5vZGUuZG9tLnZhbHVlID09PSB2YWx1ZSkgcmV0dXJuXG5cdFx0XHRlbGVtZW50W2tleTJdID0gdmFsdWVcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHRpZiAodHlwZW9mIHZhbHVlID09PSBcImJvb2xlYW5cIikge1xuXHRcdFx0XHRpZiAodmFsdWUpIGVsZW1lbnQuc2V0QXR0cmlidXRlKGtleTIsIFwiXCIpXG5cdFx0XHRcdGVsc2UgZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoa2V5Milcblx0XHRcdH1cblx0XHRcdGVsc2UgZWxlbWVudC5zZXRBdHRyaWJ1dGUoa2V5MiA9PT0gXCJjbGFzc05hbWVcIiA/IFwiY2xhc3NcIiA6IGtleTIsIHZhbHVlKVxuXHRcdH1cblx0fVxuXHRmdW5jdGlvbiBzZXRMYXRlQXR0cnModm5vZGUpIHtcblx0XHR2YXIgYXR0cnMyID0gdm5vZGUuYXR0cnNcblx0XHRpZiAodm5vZGUudGFnID09PSBcInNlbGVjdFwiICYmIGF0dHJzMiAhPSBudWxsKSB7XG5cdFx0XHRpZiAoXCJ2YWx1ZVwiIGluIGF0dHJzMikgc2V0QXR0cih2bm9kZSwgXCJ2YWx1ZVwiLCBudWxsLCBhdHRyczIudmFsdWUsIHVuZGVmaW5lZClcblx0XHRcdGlmIChcInNlbGVjdGVkSW5kZXhcIiBpbiBhdHRyczIpIHNldEF0dHIodm5vZGUsIFwic2VsZWN0ZWRJbmRleFwiLCBudWxsLCBhdHRyczIuc2VsZWN0ZWRJbmRleCwgdW5kZWZpbmVkKVxuXHRcdH1cblx0fVxuXHRmdW5jdGlvbiB1cGRhdGVBdHRycyh2bm9kZSwgb2xkLCBhdHRyczIsIG5zKSB7XG5cdFx0aWYgKGF0dHJzMiAhPSBudWxsKSB7XG5cdFx0XHRmb3IgKHZhciBrZXkyIGluIGF0dHJzMikge1xuXHRcdFx0XHRzZXRBdHRyKHZub2RlLCBrZXkyLCBvbGQgJiYgb2xkW2tleTJdLCBhdHRyczJba2V5Ml0sIG5zKVxuXHRcdFx0fVxuXHRcdH1cblx0XHRpZiAob2xkICE9IG51bGwpIHtcblx0XHRcdGZvciAodmFyIGtleTIgaW4gb2xkKSB7XG5cdFx0XHRcdGlmIChhdHRyczIgPT0gbnVsbCB8fCAhKGtleTIgaW4gYXR0cnMyKSkge1xuXHRcdFx0XHRcdGlmIChrZXkyID09PSBcImNsYXNzTmFtZVwiKSBrZXkyID0gXCJjbGFzc1wiXG5cdFx0XHRcdFx0aWYgKGtleTJbMF0gPT09IFwib1wiICYmIGtleTJbMV0gPT09IFwiblwiICYmICFpc0xpZmVjeWNsZU1ldGhvZChrZXkyKSkgdXBkYXRlRXZlbnQodm5vZGUsIGtleTIsIHVuZGVmaW5lZClcblx0XHRcdFx0XHRlbHNlIGlmIChrZXkyICE9PSBcImtleVwiKSB2bm9kZS5kb20ucmVtb3ZlQXR0cmlidXRlKGtleTIpXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblx0ZnVuY3Rpb24gaXNGb3JtQXR0cmlidXRlKHZub2RlLCBhdHRyKSB7XG5cdFx0cmV0dXJuIGF0dHIgPT09IFwidmFsdWVcIiB8fCBhdHRyID09PSBcImNoZWNrZWRcIiB8fCBhdHRyID09PSBcInNlbGVjdGVkSW5kZXhcIiB8fCBhdHRyID09PSBcInNlbGVjdGVkXCIgJiYgdm5vZGUuZG9tID09PSAkZG9jLmFjdGl2ZUVsZW1lbnRcblx0fVxuXHRmdW5jdGlvbiBpc0xpZmVjeWNsZU1ldGhvZChhdHRyKSB7XG5cdFx0cmV0dXJuIGF0dHIgPT09IFwib25pbml0XCIgfHwgYXR0ciA9PT0gXCJvbmNyZWF0ZVwiIHx8IGF0dHIgPT09IFwib251cGRhdGVcIiB8fCBhdHRyID09PSBcIm9ucmVtb3ZlXCIgfHwgYXR0ciA9PT0gXCJvbmJlZm9yZXJlbW92ZVwiIHx8IGF0dHIgPT09IFwib25iZWZvcmV1cGRhdGVcIlxuXHR9XG5cdGZ1bmN0aW9uIGlzQXR0cmlidXRlKGF0dHIpIHtcblx0XHRyZXR1cm4gYXR0ciA9PT0gXCJocmVmXCIgfHwgYXR0ciA9PT0gXCJsaXN0XCIgfHwgYXR0ciA9PT0gXCJmb3JtXCIgfHwgYXR0ciA9PT0gXCJ3aWR0aFwiIHx8IGF0dHIgPT09IFwiaGVpZ2h0XCIvLyB8fCBhdHRyID09PSBcInR5cGVcIlxuXHR9XG5cdGZ1bmN0aW9uIGlzQ3VzdG9tRWxlbWVudCh2bm9kZSl7XG5cdFx0cmV0dXJuIHZub2RlLmF0dHJzLmlzIHx8IHZub2RlLnRhZy5pbmRleE9mKFwiLVwiKSA+IC0xXG5cdH1cblx0ZnVuY3Rpb24gaGFzSW50ZWdyYXRpb25NZXRob2RzKHNvdXJjZSkge1xuXHRcdHJldHVybiBzb3VyY2UgIT0gbnVsbCAmJiAoc291cmNlLm9uY3JlYXRlIHx8IHNvdXJjZS5vbnVwZGF0ZSB8fCBzb3VyY2Uub25iZWZvcmVyZW1vdmUgfHwgc291cmNlLm9ucmVtb3ZlKVxuXHR9XG5cdC8vc3R5bGVcblx0ZnVuY3Rpb24gdXBkYXRlU3R5bGUoZWxlbWVudCwgb2xkLCBzdHlsZSkge1xuXHRcdGlmIChvbGQgPT09IHN0eWxlKSBlbGVtZW50LnN0eWxlLmNzc1RleHQgPSBcIlwiLCBvbGQgPSBudWxsXG5cdFx0aWYgKHN0eWxlID09IG51bGwpIGVsZW1lbnQuc3R5bGUuY3NzVGV4dCA9IFwiXCJcblx0XHRlbHNlIGlmICh0eXBlb2Ygc3R5bGUgPT09IFwic3RyaW5nXCIpIGVsZW1lbnQuc3R5bGUuY3NzVGV4dCA9IHN0eWxlXG5cdFx0ZWxzZSB7XG5cdFx0XHRpZiAodHlwZW9mIG9sZCA9PT0gXCJzdHJpbmdcIikgZWxlbWVudC5zdHlsZS5jc3NUZXh0ID0gXCJcIlxuXHRcdFx0Zm9yICh2YXIga2V5MiBpbiBzdHlsZSkge1xuXHRcdFx0XHRlbGVtZW50LnN0eWxlW2tleTJdID0gc3R5bGVba2V5Ml1cblx0XHRcdH1cblx0XHRcdGlmIChvbGQgIT0gbnVsbCAmJiB0eXBlb2Ygb2xkICE9PSBcInN0cmluZ1wiKSB7XG5cdFx0XHRcdGZvciAodmFyIGtleTIgaW4gb2xkKSB7XG5cdFx0XHRcdFx0aWYgKCEoa2V5MiBpbiBzdHlsZSkpIGVsZW1lbnQuc3R5bGVba2V5Ml0gPSBcIlwiXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblx0Ly9ldmVudFxuXHRmdW5jdGlvbiB1cGRhdGVFdmVudCh2bm9kZSwga2V5MiwgdmFsdWUpIHtcblx0XHR2YXIgZWxlbWVudCA9IHZub2RlLmRvbVxuXHRcdHZhciBjYWxsYmFjayA9IHR5cGVvZiBvbmV2ZW50ICE9PSBcImZ1bmN0aW9uXCIgPyB2YWx1ZSA6IGZ1bmN0aW9uKGUpIHtcblx0XHRcdHZhciByZXN1bHQgPSB2YWx1ZS5jYWxsKGVsZW1lbnQsIGUpXG5cdFx0XHRvbmV2ZW50LmNhbGwoZWxlbWVudCwgZSlcblx0XHRcdHJldHVybiByZXN1bHRcblx0XHR9XG5cdFx0aWYgKGtleTIgaW4gZWxlbWVudCkgZWxlbWVudFtrZXkyXSA9IHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiID8gY2FsbGJhY2sgOiBudWxsXG5cdFx0ZWxzZSB7XG5cdFx0XHR2YXIgZXZlbnROYW1lID0ga2V5Mi5zbGljZSgyKVxuXHRcdFx0aWYgKHZub2RlLmV2ZW50cyA9PT0gdW5kZWZpbmVkKSB2bm9kZS5ldmVudHMgPSB7fVxuXHRcdFx0aWYgKHZub2RlLmV2ZW50c1trZXkyXSA9PT0gY2FsbGJhY2spIHJldHVyblxuXHRcdFx0aWYgKHZub2RlLmV2ZW50c1trZXkyXSAhPSBudWxsKSBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCB2bm9kZS5ldmVudHNba2V5Ml0sIGZhbHNlKVxuXHRcdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0XHRcdHZub2RlLmV2ZW50c1trZXkyXSA9IGNhbGxiYWNrXG5cdFx0XHRcdGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIHZub2RlLmV2ZW50c1trZXkyXSwgZmFsc2UpXG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdC8vbGlmZWN5Y2xlXG5cdGZ1bmN0aW9uIGluaXRMaWZlY3ljbGUoc291cmNlLCB2bm9kZSwgaG9va3MpIHtcblx0XHRpZiAodHlwZW9mIHNvdXJjZS5vbmluaXQgPT09IFwiZnVuY3Rpb25cIikgc291cmNlLm9uaW5pdC5jYWxsKHZub2RlLnN0YXRlLCB2bm9kZSlcblx0XHRpZiAodHlwZW9mIHNvdXJjZS5vbmNyZWF0ZSA9PT0gXCJmdW5jdGlvblwiKSBob29rcy5wdXNoKHNvdXJjZS5vbmNyZWF0ZS5iaW5kKHZub2RlLnN0YXRlLCB2bm9kZSkpXG5cdH1cblx0ZnVuY3Rpb24gdXBkYXRlTGlmZWN5Y2xlKHNvdXJjZSwgdm5vZGUsIGhvb2tzLCByZWN5Y2xpbmcpIHtcblx0XHRpZiAocmVjeWNsaW5nKSBpbml0TGlmZWN5Y2xlKHNvdXJjZSwgdm5vZGUsIGhvb2tzKVxuXHRcdGVsc2UgaWYgKHR5cGVvZiBzb3VyY2Uub251cGRhdGUgPT09IFwiZnVuY3Rpb25cIikgaG9va3MucHVzaChzb3VyY2Uub251cGRhdGUuYmluZCh2bm9kZS5zdGF0ZSwgdm5vZGUpKVxuXHR9XG5cdGZ1bmN0aW9uIHNob3VsZFVwZGF0ZSh2bm9kZSwgb2xkKSB7XG5cdFx0dmFyIGZvcmNlVm5vZGVVcGRhdGUsIGZvcmNlQ29tcG9uZW50VXBkYXRlXG5cdFx0aWYgKHZub2RlLmF0dHJzICE9IG51bGwgJiYgdHlwZW9mIHZub2RlLmF0dHJzLm9uYmVmb3JldXBkYXRlID09PSBcImZ1bmN0aW9uXCIpIGZvcmNlVm5vZGVVcGRhdGUgPSB2bm9kZS5hdHRycy5vbmJlZm9yZXVwZGF0ZS5jYWxsKHZub2RlLnN0YXRlLCB2bm9kZSwgb2xkKVxuXHRcdGlmICh0eXBlb2Ygdm5vZGUudGFnICE9PSBcInN0cmluZ1wiICYmIHR5cGVvZiB2bm9kZS50YWcub25iZWZvcmV1cGRhdGUgPT09IFwiZnVuY3Rpb25cIikgZm9yY2VDb21wb25lbnRVcGRhdGUgPSB2bm9kZS50YWcub25iZWZvcmV1cGRhdGUuY2FsbCh2bm9kZS5zdGF0ZSwgdm5vZGUsIG9sZClcblx0XHRpZiAoIShmb3JjZVZub2RlVXBkYXRlID09PSB1bmRlZmluZWQgJiYgZm9yY2VDb21wb25lbnRVcGRhdGUgPT09IHVuZGVmaW5lZCkgJiYgIWZvcmNlVm5vZGVVcGRhdGUgJiYgIWZvcmNlQ29tcG9uZW50VXBkYXRlKSB7XG5cdFx0XHR2bm9kZS5kb20gPSBvbGQuZG9tXG5cdFx0XHR2bm9kZS5kb21TaXplID0gb2xkLmRvbVNpemVcblx0XHRcdHZub2RlLmluc3RhbmNlID0gb2xkLmluc3RhbmNlXG5cdFx0XHRyZXR1cm4gdHJ1ZVxuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2Vcblx0fVxuXHRmdW5jdGlvbiByZW5kZXIoZG9tLCB2bm9kZXMpIHtcblx0XHRpZiAoIWRvbSkgdGhyb3cgbmV3IEVycm9yKFwiRW5zdXJlIHRoZSBET00gZWxlbWVudCBiZWluZyBwYXNzZWQgdG8gbS5yb3V0ZS9tLm1vdW50L20ucmVuZGVyIGlzIG5vdCB1bmRlZmluZWQuXCIpXG5cdFx0dmFyIGhvb2tzID0gW11cblx0XHR2YXIgYWN0aXZlID0gJGRvYy5hY3RpdmVFbGVtZW50XG5cdFx0Ly8gRmlyc3QgdGltZTAgcmVuZGVyaW5nIGludG8gYSBub2RlIGNsZWFycyBpdCBvdXRcblx0XHRpZiAoZG9tLnZub2RlcyA9PSBudWxsKSBkb20udGV4dENvbnRlbnQgPSBcIlwiXG5cdFx0aWYgKCFBcnJheS5pc0FycmF5KHZub2RlcykpIHZub2RlcyA9IFt2bm9kZXNdXG5cdFx0dXBkYXRlTm9kZXMoZG9tLCBkb20udm5vZGVzLCBWbm9kZS5ub3JtYWxpemVDaGlsZHJlbih2bm9kZXMpLCBmYWxzZSwgaG9va3MsIG51bGwsIHVuZGVmaW5lZClcblx0XHRkb20udm5vZGVzID0gdm5vZGVzXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBob29rcy5sZW5ndGg7IGkrKykgaG9va3NbaV0oKVxuXHRcdGlmICgkZG9jLmFjdGl2ZUVsZW1lbnQgIT09IGFjdGl2ZSkgYWN0aXZlLmZvY3VzKClcblx0fVxuXHRyZXR1cm4ge3JlbmRlcjogcmVuZGVyLCBzZXRFdmVudENhbGxiYWNrOiBzZXRFdmVudENhbGxiYWNrfVxufVxuZnVuY3Rpb24gdGhyb3R0bGUoY2FsbGJhY2spIHtcblx0Ly82MGZwcyB0cmFuc2xhdGVzIHRvIDE2LjZtcywgcm91bmQgaXQgZG93biBzaW5jZSBzZXRUaW1lb3V0IHJlcXVpcmVzIGludFxuXHR2YXIgdGltZSA9IDE2XG5cdHZhciBsYXN0ID0gMCwgcGVuZGluZyA9IG51bGxcblx0dmFyIHRpbWVvdXQgPSB0eXBlb2YgcmVxdWVzdEFuaW1hdGlvbkZyYW1lID09PSBcImZ1bmN0aW9uXCIgPyByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgOiBzZXRUaW1lb3V0XG5cdHJldHVybiBmdW5jdGlvbigpIHtcblx0XHR2YXIgbm93ID0gRGF0ZS5ub3coKVxuXHRcdGlmIChsYXN0ID09PSAwIHx8IG5vdyAtIGxhc3QgPj0gdGltZSkge1xuXHRcdFx0bGFzdCA9IG5vd1xuXHRcdFx0Y2FsbGJhY2soKVxuXHRcdH1cblx0XHRlbHNlIGlmIChwZW5kaW5nID09PSBudWxsKSB7XG5cdFx0XHRwZW5kaW5nID0gdGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdFx0cGVuZGluZyA9IG51bGxcblx0XHRcdFx0Y2FsbGJhY2soKVxuXHRcdFx0XHRsYXN0ID0gRGF0ZS5ub3coKVxuXHRcdFx0fSwgdGltZSAtIChub3cgLSBsYXN0KSlcblx0XHR9XG5cdH1cbn1cbnZhciBfMTEgPSBmdW5jdGlvbigkd2luZG93KSB7XG5cdHZhciByZW5kZXJTZXJ2aWNlID0gY29yZVJlbmRlcmVyKCR3aW5kb3cpXG5cdHJlbmRlclNlcnZpY2Uuc2V0RXZlbnRDYWxsYmFjayhmdW5jdGlvbihlKSB7XG5cdFx0aWYgKGUucmVkcmF3ICE9PSBmYWxzZSkgcmVkcmF3KClcblx0fSlcblx0dmFyIGNhbGxiYWNrcyA9IFtdXG5cdGZ1bmN0aW9uIHN1YnNjcmliZShrZXkxLCBjYWxsYmFjaykge1xuXHRcdHVuc3Vic2NyaWJlKGtleTEpXG5cdFx0Y2FsbGJhY2tzLnB1c2goa2V5MSwgdGhyb3R0bGUoY2FsbGJhY2spKVxuXHR9XG5cdGZ1bmN0aW9uIHVuc3Vic2NyaWJlKGtleTEpIHtcblx0XHR2YXIgaW5kZXggPSBjYWxsYmFja3MuaW5kZXhPZihrZXkxKVxuXHRcdGlmIChpbmRleCA+IC0xKSBjYWxsYmFja3Muc3BsaWNlKGluZGV4LCAyKVxuXHR9XG4gICAgZnVuY3Rpb24gcmVkcmF3KCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkgKz0gMikge1xuICAgICAgICAgICAgY2FsbGJhY2tzW2ldKClcbiAgICAgICAgfVxuICAgIH1cblx0cmV0dXJuIHtzdWJzY3JpYmU6IHN1YnNjcmliZSwgdW5zdWJzY3JpYmU6IHVuc3Vic2NyaWJlLCByZWRyYXc6IHJlZHJhdywgcmVuZGVyOiByZW5kZXJTZXJ2aWNlLnJlbmRlcn1cbn1cbnZhciByZWRyYXdTZXJ2aWNlID0gXzExKHdpbmRvdylcbnJlcXVlc3RTZXJ2aWNlLnNldENvbXBsZXRpb25DYWxsYmFjayhyZWRyYXdTZXJ2aWNlLnJlZHJhdylcbnZhciBfMTYgPSBmdW5jdGlvbihyZWRyYXdTZXJ2aWNlMCkge1xuXHRyZXR1cm4gZnVuY3Rpb24ocm9vdCwgY29tcG9uZW50KSB7XG5cdFx0aWYgKGNvbXBvbmVudCA9PT0gbnVsbCkge1xuXHRcdFx0cmVkcmF3U2VydmljZTAucmVuZGVyKHJvb3QsIFtdKVxuXHRcdFx0cmVkcmF3U2VydmljZTAudW5zdWJzY3JpYmUocm9vdClcblx0XHRcdHJldHVyblxuXHRcdH1cblx0XHRcblx0XHRpZiAoY29tcG9uZW50LnZpZXcgPT0gbnVsbCkgdGhyb3cgbmV3IEVycm9yKFwibS5tb3VudChlbGVtZW50LCBjb21wb25lbnQpIGV4cGVjdHMgYSBjb21wb25lbnQsIG5vdCBhIHZub2RlXCIpXG5cdFx0XG5cdFx0dmFyIHJ1bjAgPSBmdW5jdGlvbigpIHtcblx0XHRcdHJlZHJhd1NlcnZpY2UwLnJlbmRlcihyb290LCBWbm9kZShjb21wb25lbnQpKVxuXHRcdH1cblx0XHRyZWRyYXdTZXJ2aWNlMC5zdWJzY3JpYmUocm9vdCwgcnVuMClcblx0XHRyZWRyYXdTZXJ2aWNlMC5yZWRyYXcoKVxuXHR9XG59XG5tLm1vdW50ID0gXzE2KHJlZHJhd1NlcnZpY2UpXG52YXIgUHJvbWlzZSA9IFByb21pc2VQb2x5ZmlsbFxudmFyIHBhcnNlUXVlcnlTdHJpbmcgPSBmdW5jdGlvbihzdHJpbmcpIHtcblx0aWYgKHN0cmluZyA9PT0gXCJcIiB8fCBzdHJpbmcgPT0gbnVsbCkgcmV0dXJuIHt9XG5cdGlmIChzdHJpbmcuY2hhckF0KDApID09PSBcIj9cIikgc3RyaW5nID0gc3RyaW5nLnNsaWNlKDEpXG5cdHZhciBlbnRyaWVzID0gc3RyaW5nLnNwbGl0KFwiJlwiKSwgZGF0YTAgPSB7fSwgY291bnRlcnMgPSB7fVxuXHRmb3IgKHZhciBpID0gMDsgaSA8IGVudHJpZXMubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgZW50cnkgPSBlbnRyaWVzW2ldLnNwbGl0KFwiPVwiKVxuXHRcdHZhciBrZXk1ID0gZGVjb2RlVVJJQ29tcG9uZW50KGVudHJ5WzBdKVxuXHRcdHZhciB2YWx1ZSA9IGVudHJ5Lmxlbmd0aCA9PT0gMiA/IGRlY29kZVVSSUNvbXBvbmVudChlbnRyeVsxXSkgOiBcIlwiXG5cdFx0aWYgKHZhbHVlID09PSBcInRydWVcIikgdmFsdWUgPSB0cnVlXG5cdFx0ZWxzZSBpZiAodmFsdWUgPT09IFwiZmFsc2VcIikgdmFsdWUgPSBmYWxzZVxuXHRcdHZhciBsZXZlbHMgPSBrZXk1LnNwbGl0KC9cXF1cXFs/fFxcWy8pXG5cdFx0dmFyIGN1cnNvciA9IGRhdGEwXG5cdFx0aWYgKGtleTUuaW5kZXhPZihcIltcIikgPiAtMSkgbGV2ZWxzLnBvcCgpXG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBsZXZlbHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdHZhciBsZXZlbCA9IGxldmVsc1tqXSwgbmV4dExldmVsID0gbGV2ZWxzW2ogKyAxXVxuXHRcdFx0dmFyIGlzTnVtYmVyID0gbmV4dExldmVsID09IFwiXCIgfHwgIWlzTmFOKHBhcnNlSW50KG5leHRMZXZlbCwgMTApKVxuXHRcdFx0dmFyIGlzVmFsdWUgPSBqID09PSBsZXZlbHMubGVuZ3RoIC0gMVxuXHRcdFx0aWYgKGxldmVsID09PSBcIlwiKSB7XG5cdFx0XHRcdHZhciBrZXk1ID0gbGV2ZWxzLnNsaWNlKDAsIGopLmpvaW4oKVxuXHRcdFx0XHRpZiAoY291bnRlcnNba2V5NV0gPT0gbnVsbCkgY291bnRlcnNba2V5NV0gPSAwXG5cdFx0XHRcdGxldmVsID0gY291bnRlcnNba2V5NV0rK1xuXHRcdFx0fVxuXHRcdFx0aWYgKGN1cnNvcltsZXZlbF0gPT0gbnVsbCkge1xuXHRcdFx0XHRjdXJzb3JbbGV2ZWxdID0gaXNWYWx1ZSA/IHZhbHVlIDogaXNOdW1iZXIgPyBbXSA6IHt9XG5cdFx0XHR9XG5cdFx0XHRjdXJzb3IgPSBjdXJzb3JbbGV2ZWxdXG5cdFx0fVxuXHR9XG5cdHJldHVybiBkYXRhMFxufVxudmFyIGNvcmVSb3V0ZXIgPSBmdW5jdGlvbigkd2luZG93KSB7XG5cdHZhciBzdXBwb3J0c1B1c2hTdGF0ZSA9IHR5cGVvZiAkd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlID09PSBcImZ1bmN0aW9uXCJcblx0dmFyIGNhbGxBc3luYzAgPSB0eXBlb2Ygc2V0SW1tZWRpYXRlID09PSBcImZ1bmN0aW9uXCIgPyBzZXRJbW1lZGlhdGUgOiBzZXRUaW1lb3V0XG5cdGZ1bmN0aW9uIG5vcm1hbGl6ZTEoZnJhZ21lbnQwKSB7XG5cdFx0dmFyIGRhdGEgPSAkd2luZG93LmxvY2F0aW9uW2ZyYWdtZW50MF0ucmVwbGFjZSgvKD86JVthLWY4OV1bYS1mMC05XSkrL2dpbSwgZGVjb2RlVVJJQ29tcG9uZW50KVxuXHRcdGlmIChmcmFnbWVudDAgPT09IFwicGF0aG5hbWVcIiAmJiBkYXRhWzBdICE9PSBcIi9cIikgZGF0YSA9IFwiL1wiICsgZGF0YVxuXHRcdHJldHVybiBkYXRhXG5cdH1cblx0dmFyIGFzeW5jSWRcblx0ZnVuY3Rpb24gZGVib3VuY2VBc3luYyhjYWxsYmFjazApIHtcblx0XHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdFx0XHRpZiAoYXN5bmNJZCAhPSBudWxsKSByZXR1cm5cblx0XHRcdGFzeW5jSWQgPSBjYWxsQXN5bmMwKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRhc3luY0lkID0gbnVsbFxuXHRcdFx0XHRjYWxsYmFjazAoKVxuXHRcdFx0fSlcblx0XHR9XG5cdH1cblx0ZnVuY3Rpb24gcGFyc2VQYXRoKHBhdGgsIHF1ZXJ5RGF0YSwgaGFzaERhdGEpIHtcblx0XHR2YXIgcXVlcnlJbmRleCA9IHBhdGguaW5kZXhPZihcIj9cIilcblx0XHR2YXIgaGFzaEluZGV4ID0gcGF0aC5pbmRleE9mKFwiI1wiKVxuXHRcdHZhciBwYXRoRW5kID0gcXVlcnlJbmRleCA+IC0xID8gcXVlcnlJbmRleCA6IGhhc2hJbmRleCA+IC0xID8gaGFzaEluZGV4IDogcGF0aC5sZW5ndGhcblx0XHRpZiAocXVlcnlJbmRleCA+IC0xKSB7XG5cdFx0XHR2YXIgcXVlcnlFbmQgPSBoYXNoSW5kZXggPiAtMSA/IGhhc2hJbmRleCA6IHBhdGgubGVuZ3RoXG5cdFx0XHR2YXIgcXVlcnlQYXJhbXMgPSBwYXJzZVF1ZXJ5U3RyaW5nKHBhdGguc2xpY2UocXVlcnlJbmRleCArIDEsIHF1ZXJ5RW5kKSlcblx0XHRcdGZvciAodmFyIGtleTQgaW4gcXVlcnlQYXJhbXMpIHF1ZXJ5RGF0YVtrZXk0XSA9IHF1ZXJ5UGFyYW1zW2tleTRdXG5cdFx0fVxuXHRcdGlmIChoYXNoSW5kZXggPiAtMSkge1xuXHRcdFx0dmFyIGhhc2hQYXJhbXMgPSBwYXJzZVF1ZXJ5U3RyaW5nKHBhdGguc2xpY2UoaGFzaEluZGV4ICsgMSkpXG5cdFx0XHRmb3IgKHZhciBrZXk0IGluIGhhc2hQYXJhbXMpIGhhc2hEYXRhW2tleTRdID0gaGFzaFBhcmFtc1trZXk0XVxuXHRcdH1cblx0XHRyZXR1cm4gcGF0aC5zbGljZSgwLCBwYXRoRW5kKVxuXHR9XG5cdHZhciByb3V0ZXIgPSB7cHJlZml4OiBcIiMhXCJ9XG5cdHJvdXRlci5nZXRQYXRoID0gZnVuY3Rpb24oKSB7XG5cdFx0dmFyIHR5cGUyID0gcm91dGVyLnByZWZpeC5jaGFyQXQoMClcblx0XHRzd2l0Y2ggKHR5cGUyKSB7XG5cdFx0XHRjYXNlIFwiI1wiOiByZXR1cm4gbm9ybWFsaXplMShcImhhc2hcIikuc2xpY2Uocm91dGVyLnByZWZpeC5sZW5ndGgpXG5cdFx0XHRjYXNlIFwiP1wiOiByZXR1cm4gbm9ybWFsaXplMShcInNlYXJjaFwiKS5zbGljZShyb3V0ZXIucHJlZml4Lmxlbmd0aCkgKyBub3JtYWxpemUxKFwiaGFzaFwiKVxuXHRcdFx0ZGVmYXVsdDogcmV0dXJuIG5vcm1hbGl6ZTEoXCJwYXRobmFtZVwiKS5zbGljZShyb3V0ZXIucHJlZml4Lmxlbmd0aCkgKyBub3JtYWxpemUxKFwic2VhcmNoXCIpICsgbm9ybWFsaXplMShcImhhc2hcIilcblx0XHR9XG5cdH1cblx0cm91dGVyLnNldFBhdGggPSBmdW5jdGlvbihwYXRoLCBkYXRhLCBvcHRpb25zKSB7XG5cdFx0dmFyIHF1ZXJ5RGF0YSA9IHt9LCBoYXNoRGF0YSA9IHt9XG5cdFx0cGF0aCA9IHBhcnNlUGF0aChwYXRoLCBxdWVyeURhdGEsIGhhc2hEYXRhKVxuXHRcdGlmIChkYXRhICE9IG51bGwpIHtcblx0XHRcdGZvciAodmFyIGtleTQgaW4gZGF0YSkgcXVlcnlEYXRhW2tleTRdID0gZGF0YVtrZXk0XVxuXHRcdFx0cGF0aCA9IHBhdGgucmVwbGFjZSgvOihbXlxcL10rKS9nLCBmdW5jdGlvbihtYXRjaDIsIHRva2VuKSB7XG5cdFx0XHRcdGRlbGV0ZSBxdWVyeURhdGFbdG9rZW5dXG5cdFx0XHRcdHJldHVybiBkYXRhW3Rva2VuXVxuXHRcdFx0fSlcblx0XHR9XG5cdFx0dmFyIHF1ZXJ5ID0gYnVpbGRRdWVyeVN0cmluZyhxdWVyeURhdGEpXG5cdFx0aWYgKHF1ZXJ5KSBwYXRoICs9IFwiP1wiICsgcXVlcnlcblx0XHR2YXIgaGFzaCA9IGJ1aWxkUXVlcnlTdHJpbmcoaGFzaERhdGEpXG5cdFx0aWYgKGhhc2gpIHBhdGggKz0gXCIjXCIgKyBoYXNoXG5cdFx0aWYgKHN1cHBvcnRzUHVzaFN0YXRlKSB7XG5cdFx0XHR2YXIgc3RhdGUgPSBvcHRpb25zID8gb3B0aW9ucy5zdGF0ZSA6IG51bGxcblx0XHRcdHZhciB0aXRsZSA9IG9wdGlvbnMgPyBvcHRpb25zLnRpdGxlIDogbnVsbFxuXHRcdFx0JHdpbmRvdy5vbnBvcHN0YXRlKClcblx0XHRcdGlmIChvcHRpb25zICYmIG9wdGlvbnMucmVwbGFjZSkgJHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZShzdGF0ZSwgdGl0bGUsIHJvdXRlci5wcmVmaXggKyBwYXRoKVxuXHRcdFx0ZWxzZSAkd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKHN0YXRlLCB0aXRsZSwgcm91dGVyLnByZWZpeCArIHBhdGgpXG5cdFx0fVxuXHRcdGVsc2UgJHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gcm91dGVyLnByZWZpeCArIHBhdGhcblx0fVxuXHRyb3V0ZXIuZGVmaW5lUm91dGVzID0gZnVuY3Rpb24ocm91dGVzLCByZXNvbHZlLCByZWplY3QpIHtcblx0XHRmdW5jdGlvbiByZXNvbHZlUm91dGUoKSB7XG5cdFx0XHR2YXIgcGF0aCA9IHJvdXRlci5nZXRQYXRoKClcblx0XHRcdHZhciBwYXJhbXMgPSB7fVxuXHRcdFx0dmFyIHBhdGhuYW1lID0gcGFyc2VQYXRoKHBhdGgsIHBhcmFtcywgcGFyYW1zKVxuXHRcdFx0dmFyIHN0YXRlID0gJHdpbmRvdy5oaXN0b3J5LnN0YXRlXG5cdFx0XHRpZiAoc3RhdGUgIT0gbnVsbCkge1xuXHRcdFx0XHRmb3IgKHZhciBrIGluIHN0YXRlKSBwYXJhbXNba10gPSBzdGF0ZVtrXVxuXHRcdFx0fVxuXHRcdFx0Zm9yICh2YXIgcm91dGUwIGluIHJvdXRlcykge1xuXHRcdFx0XHR2YXIgbWF0Y2hlciA9IG5ldyBSZWdFeHAoXCJeXCIgKyByb3V0ZTAucmVwbGFjZSgvOlteXFwvXSs/XFwuezN9L2csIFwiKC4qPylcIikucmVwbGFjZSgvOlteXFwvXSsvZywgXCIoW15cXFxcL10rKVwiKSArIFwiXFwvPyRcIilcblx0XHRcdFx0aWYgKG1hdGNoZXIudGVzdChwYXRobmFtZSkpIHtcblx0XHRcdFx0XHRwYXRobmFtZS5yZXBsYWNlKG1hdGNoZXIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0dmFyIGtleXMgPSByb3V0ZTAubWF0Y2goLzpbXlxcL10rL2cpIHx8IFtdXG5cdFx0XHRcdFx0XHR2YXIgdmFsdWVzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEsIC0yKVxuXHRcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0XHRcdHBhcmFtc1trZXlzW2ldLnJlcGxhY2UoLzp8XFwuL2csIFwiXCIpXSA9IGRlY29kZVVSSUNvbXBvbmVudCh2YWx1ZXNbaV0pXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRyZXNvbHZlKHJvdXRlc1tyb3V0ZTBdLCBwYXJhbXMsIHBhdGgsIHJvdXRlMClcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdHJldHVyblxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZWplY3QocGF0aCwgcGFyYW1zKVxuXHRcdH1cblx0XHRpZiAoc3VwcG9ydHNQdXNoU3RhdGUpICR3aW5kb3cub25wb3BzdGF0ZSA9IGRlYm91bmNlQXN5bmMocmVzb2x2ZVJvdXRlKVxuXHRcdGVsc2UgaWYgKHJvdXRlci5wcmVmaXguY2hhckF0KDApID09PSBcIiNcIikgJHdpbmRvdy5vbmhhc2hjaGFuZ2UgPSByZXNvbHZlUm91dGVcblx0XHRyZXNvbHZlUm91dGUoKVxuXHR9XG5cdHJldHVybiByb3V0ZXJcbn1cbnZhciBfMjAgPSBmdW5jdGlvbigkd2luZG93LCByZWRyYXdTZXJ2aWNlMCkge1xuXHR2YXIgcm91dGVTZXJ2aWNlID0gY29yZVJvdXRlcigkd2luZG93KVxuXHR2YXIgaWRlbnRpdHkgPSBmdW5jdGlvbih2KSB7cmV0dXJuIHZ9XG5cdHZhciByZW5kZXIxLCBjb21wb25lbnQsIGF0dHJzMywgY3VycmVudFBhdGgsIGxhc3RVcGRhdGVcblx0dmFyIHJvdXRlID0gZnVuY3Rpb24ocm9vdCwgZGVmYXVsdFJvdXRlLCByb3V0ZXMpIHtcblx0XHRpZiAocm9vdCA9PSBudWxsKSB0aHJvdyBuZXcgRXJyb3IoXCJFbnN1cmUgdGhlIERPTSBlbGVtZW50IHRoYXQgd2FzIHBhc3NlZCB0byBgbS5yb3V0ZWAgaXMgbm90IHVuZGVmaW5lZFwiKVxuXHRcdHZhciBydW4xID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRpZiAocmVuZGVyMSAhPSBudWxsKSByZWRyYXdTZXJ2aWNlMC5yZW5kZXIocm9vdCwgcmVuZGVyMShWbm9kZShjb21wb25lbnQsIGF0dHJzMy5rZXksIGF0dHJzMykpKVxuXHRcdH1cblx0XHR2YXIgYmFpbCA9IGZ1bmN0aW9uKHBhdGgpIHtcblx0XHRcdGlmIChwYXRoICE9PSBkZWZhdWx0Um91dGUpIHJvdXRlU2VydmljZS5zZXRQYXRoKGRlZmF1bHRSb3V0ZSwgbnVsbCwge3JlcGxhY2U6IHRydWV9KVxuXHRcdFx0ZWxzZSB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZCBub3QgcmVzb2x2ZSBkZWZhdWx0IHJvdXRlIFwiICsgZGVmYXVsdFJvdXRlKVxuXHRcdH1cblx0XHRyb3V0ZVNlcnZpY2UuZGVmaW5lUm91dGVzKHJvdXRlcywgZnVuY3Rpb24ocGF5bG9hZCwgcGFyYW1zLCBwYXRoKSB7XG5cdFx0XHR2YXIgdXBkYXRlID0gbGFzdFVwZGF0ZSA9IGZ1bmN0aW9uKHJvdXRlUmVzb2x2ZXIsIGNvbXApIHtcblx0XHRcdFx0aWYgKHVwZGF0ZSAhPT0gbGFzdFVwZGF0ZSkgcmV0dXJuXG5cdFx0XHRcdGNvbXBvbmVudCA9IGNvbXAgIT0gbnVsbCAmJiB0eXBlb2YgY29tcC52aWV3ID09PSBcImZ1bmN0aW9uXCIgPyBjb21wIDogXCJkaXZcIiwgYXR0cnMzID0gcGFyYW1zLCBjdXJyZW50UGF0aCA9IHBhdGgsIGxhc3RVcGRhdGUgPSBudWxsXG5cdFx0XHRcdHJlbmRlcjEgPSAocm91dGVSZXNvbHZlci5yZW5kZXIgfHwgaWRlbnRpdHkpLmJpbmQocm91dGVSZXNvbHZlcilcblx0XHRcdFx0cnVuMSgpXG5cdFx0XHR9XG5cdFx0XHRpZiAocGF5bG9hZC52aWV3KSB1cGRhdGUoe30sIHBheWxvYWQpXG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0aWYgKHBheWxvYWQub25tYXRjaCkge1xuXHRcdFx0XHRcdFByb21pc2UucmVzb2x2ZShwYXlsb2FkLm9ubWF0Y2gocGFyYW1zLCBwYXRoKSkudGhlbihmdW5jdGlvbihyZXNvbHZlZCkge1xuXHRcdFx0XHRcdFx0dXBkYXRlKHBheWxvYWQsIHJlc29sdmVkKVxuXHRcdFx0XHRcdH0sIGJhaWwpXG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB1cGRhdGUocGF5bG9hZCwgXCJkaXZcIilcblx0XHRcdH1cblx0XHR9LCBiYWlsKVxuXHRcdHJlZHJhd1NlcnZpY2UwLnN1YnNjcmliZShyb290LCBydW4xKVxuXHR9XG5cdHJvdXRlLnNldCA9IGZ1bmN0aW9uKHBhdGgsIGRhdGEsIG9wdGlvbnMpIHtcblx0XHRpZiAobGFzdFVwZGF0ZSAhPSBudWxsKSBvcHRpb25zID0ge3JlcGxhY2U6IHRydWV9XG5cdFx0bGFzdFVwZGF0ZSA9IG51bGxcblx0XHRyb3V0ZVNlcnZpY2Uuc2V0UGF0aChwYXRoLCBkYXRhLCBvcHRpb25zKVxuXHR9XG5cdHJvdXRlLmdldCA9IGZ1bmN0aW9uKCkge3JldHVybiBjdXJyZW50UGF0aH1cblx0cm91dGUucHJlZml4ID0gZnVuY3Rpb24ocHJlZml4MCkge3JvdXRlU2VydmljZS5wcmVmaXggPSBwcmVmaXgwfVxuXHRyb3V0ZS5saW5rID0gZnVuY3Rpb24odm5vZGUxKSB7XG5cdFx0dm5vZGUxLmRvbS5zZXRBdHRyaWJ1dGUoXCJocmVmXCIsIHJvdXRlU2VydmljZS5wcmVmaXggKyB2bm9kZTEuYXR0cnMuaHJlZilcblx0XHR2bm9kZTEuZG9tLm9uY2xpY2sgPSBmdW5jdGlvbihlKSB7XG5cdFx0XHRpZiAoZS5jdHJsS2V5IHx8IGUubWV0YUtleSB8fCBlLnNoaWZ0S2V5IHx8IGUud2hpY2ggPT09IDIpIHJldHVyblxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpXG5cdFx0XHRlLnJlZHJhdyA9IGZhbHNlXG5cdFx0XHR2YXIgaHJlZiA9IHRoaXMuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKVxuXHRcdFx0aWYgKGhyZWYuaW5kZXhPZihyb3V0ZVNlcnZpY2UucHJlZml4KSA9PT0gMCkgaHJlZiA9IGhyZWYuc2xpY2Uocm91dGVTZXJ2aWNlLnByZWZpeC5sZW5ndGgpXG5cdFx0XHRyb3V0ZS5zZXQoaHJlZiwgdW5kZWZpbmVkLCB1bmRlZmluZWQpXG5cdFx0fVxuXHR9XG5cdHJvdXRlLnBhcmFtID0gZnVuY3Rpb24oa2V5Mykge1xuXHRcdGlmKHR5cGVvZiBhdHRyczMgIT09IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIGtleTMgIT09IFwidW5kZWZpbmVkXCIpIHJldHVybiBhdHRyczNba2V5M11cblx0XHRyZXR1cm4gYXR0cnMzXG5cdH1cblx0cmV0dXJuIHJvdXRlXG59XG5tLnJvdXRlID0gXzIwKHdpbmRvdywgcmVkcmF3U2VydmljZSlcbm0ud2l0aEF0dHIgPSBmdW5jdGlvbihhdHRyTmFtZSwgY2FsbGJhY2sxLCBjb250ZXh0KSB7XG5cdHJldHVybiBmdW5jdGlvbihlKSB7XG5cdFx0Y2FsbGJhY2sxLmNhbGwoY29udGV4dCB8fCB0aGlzLCBhdHRyTmFtZSBpbiBlLmN1cnJlbnRUYXJnZXQgPyBlLmN1cnJlbnRUYXJnZXRbYXR0ck5hbWVdIDogZS5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZShhdHRyTmFtZSkpXG5cdH1cbn1cbnZhciBfMjggPSBjb3JlUmVuZGVyZXIod2luZG93KVxubS5yZW5kZXIgPSBfMjgucmVuZGVyXG5tLnJlZHJhdyA9IHJlZHJhd1NlcnZpY2UucmVkcmF3XG5tLnJlcXVlc3QgPSByZXF1ZXN0U2VydmljZS5yZXF1ZXN0XG5tLmpzb25wID0gcmVxdWVzdFNlcnZpY2UuanNvbnBcbm0ucGFyc2VRdWVyeVN0cmluZyA9IHBhcnNlUXVlcnlTdHJpbmdcbm0uYnVpbGRRdWVyeVN0cmluZyA9IGJ1aWxkUXVlcnlTdHJpbmdcbm0udmVyc2lvbiA9IFwiMS4wLjFcIlxubS52bm9kZSA9IFZub2RlXG5pZiAodHlwZW9mIG1vZHVsZSAhPT0gXCJ1bmRlZmluZWRcIikgbW9kdWxlW1wiZXhwb3J0c1wiXSA9IG1cbmVsc2Ugd2luZG93Lm0gPSBtXG59Il19
