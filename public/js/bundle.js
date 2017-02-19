(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var m = require("mithril");
var Layout = require("./layout.jsx");
var Topics = require("./topics.jsx");

m.route(document.body, "/", {
  "/": {
    render: function render() {
      return m(Layout, m(Topics));
    }
  }
});

},{"./layout.jsx":2,"./topics.jsx":3,"mithril":4}],2:[function(require,module,exports){
"use strict";

var m = require("mithril");

var Layout = {};

Layout.view = function (vnode) {
  return m(
    "main",
    null,
    m(
      "nav",
      { id: "header", "class": "navbar navbar-light navbar-toggleable-md fixed-top bg-faded" },
      m(
        "div",
        { "class": "container" },
        m(
          "a",
          { "class": "navbar-brand", href: "/" },
          m(
            "b",
            null,
            "Ruby"
          ),
          m(
            "sup",
            null,
            "React version"
          )
        ),
        m(
          "button",
          { "class": "navbar-toggler navbar-toggler-right", type: "button", "data-toggle": "collapse", "data-target": "#main-nav-menu" },
          m("span", { "class": "navbar-toggler-icon" })
        ),
        m(
          "div",
          { "class": "collapse navbar-collapse", id: "main-nav-menu" },
          m(
            "ul",
            { "class": "nav navbar-nav main-nav mr-auto mt-2 mt-md-0" },
            m(
              "li",
              { "class": "nav-item" },
              m(
                "a",
                { "class": "nav-link active", href: "/" },
                "\u793E\u533A"
              )
            ),
            m(
              "li",
              { "class": "nav-item" },
              m(
                "a",
                { "class": "nav-link", href: "/topics/popular" },
                "\u4F18\u8D28\u8BDD\u9898"
              )
            ),
            m(
              "li",
              { "class": "nav-item" },
              m(
                "a",
                { "class": "nav-link", href: "/topics/no-reply" },
                "\u65E0\u4EBA\u95EE\u6D25"
              )
            ),
            m(
              "li",
              { "class": "nav-item" },
              m(
                "a",
                { "class": "nav-link", href: "/topics/recent" },
                "\u6700\u65B0\u53D1\u5E03"
              )
            )
          ),
          m(
            "ul",
            { "class": "nav navbar-nav my-2 my-lg-0" },
            m(
              "li",
              { "class": "nav-item" },
              m(
                "a",
                { "class": "nav-link", href: "/oauth/new" },
                "\u767B\u5F55"
              )
            )
          )
        )
      )
    ),
    m(
      "div",
      { "class": "container" },
      vnode.children
    )
  );
};

module.exports = Layout;

},{"mithril":4}],3:[function(require,module,exports){
"use strict";

var m = require("mithril");

var List = {};

List.controller = function () {};

List.view = function () {
  return m(
    "h2",
    null,
    "topics"
  );
};

module.exports = List;

},{"mithril":4}],4:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy8uNi4wLjJAYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiamF2YXNjcmlwdHMvYXBwLmpzeCIsImphdmFzY3JpcHRzL2xheW91dC5qc3giLCJqYXZhc2NyaXB0cy90b3BpY3MuanN4Iiwibm9kZV9tb2R1bGVzLy4xLjAuMUBtaXRocmlsL25vZGVfbW9kdWxlcy9taXRocmlsL21pdGhyaWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLElBQU0sSUFBSSxRQUFRLFNBQVIsQ0FBVjtBQUNBLElBQU0sU0FBUyxRQUFRLGNBQVIsQ0FBZjtBQUNBLElBQU0sU0FBUyxRQUFRLGNBQVIsQ0FBZjs7QUFFQSxFQUFFLEtBQUYsQ0FBUSxTQUFTLElBQWpCLEVBQXVCLEdBQXZCLEVBQTRCO0FBQzFCLE9BQUs7QUFDSCxZQUFRLGtCQUFXO0FBQ2pCLGFBQU8sRUFBRSxNQUFGLEVBQVUsRUFBRSxNQUFGLENBQVYsQ0FBUDtBQUNEO0FBSEU7QUFEcUIsQ0FBNUI7Ozs7O0FDSkEsSUFBTSxJQUFJLFFBQVEsU0FBUixDQUFWOztBQUVBLElBQUksU0FBUyxFQUFiOztBQUVBLE9BQU8sSUFBUCxHQUFjLFVBQVMsS0FBVCxFQUFnQjtBQUM1QixTQUNFO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQSxRQUFLLElBQUcsUUFBUixFQUFpQixTQUFNLDZEQUF2QjtBQUNFO0FBQUE7QUFBQSxVQUFLLFNBQU0sV0FBWDtBQUNFO0FBQUE7QUFBQSxZQUFHLFNBQU0sY0FBVCxFQUF3QixNQUFLLEdBQTdCO0FBQWlDO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FBakM7QUFBNEM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUE1QyxTQURGO0FBRUU7QUFBQTtBQUFBLFlBQVEsU0FBTSxxQ0FBZCxFQUFvRCxNQUFLLFFBQXpELEVBQWtFLGVBQVksVUFBOUUsRUFBeUYsZUFBWSxnQkFBckc7QUFDRSxzQkFBTSxTQUFNLHFCQUFaO0FBREYsU0FGRjtBQUtFO0FBQUE7QUFBQSxZQUFLLFNBQU0sMEJBQVgsRUFBc0MsSUFBRyxlQUF6QztBQUNFO0FBQUE7QUFBQSxjQUFJLFNBQU0sOENBQVY7QUFDRTtBQUFBO0FBQUEsZ0JBQUksU0FBTSxVQUFWO0FBQXFCO0FBQUE7QUFBQSxrQkFBRyxTQUFNLGlCQUFULEVBQTJCLE1BQUssR0FBaEM7QUFBQTtBQUFBO0FBQXJCLGFBREY7QUFFRTtBQUFBO0FBQUEsZ0JBQUksU0FBTSxVQUFWO0FBQXFCO0FBQUE7QUFBQSxrQkFBRyxTQUFNLFVBQVQsRUFBb0IsTUFBSyxpQkFBekI7QUFBQTtBQUFBO0FBQXJCLGFBRkY7QUFHRTtBQUFBO0FBQUEsZ0JBQUksU0FBTSxVQUFWO0FBQXFCO0FBQUE7QUFBQSxrQkFBRyxTQUFNLFVBQVQsRUFBb0IsTUFBSyxrQkFBekI7QUFBQTtBQUFBO0FBQXJCLGFBSEY7QUFJRTtBQUFBO0FBQUEsZ0JBQUksU0FBTSxVQUFWO0FBQXFCO0FBQUE7QUFBQSxrQkFBRyxTQUFNLFVBQVQsRUFBb0IsTUFBSyxnQkFBekI7QUFBQTtBQUFBO0FBQXJCO0FBSkYsV0FERjtBQU9FO0FBQUE7QUFBQSxjQUFJLFNBQU0sNkJBQVY7QUFDRTtBQUFBO0FBQUEsZ0JBQUksU0FBTSxVQUFWO0FBQXFCO0FBQUE7QUFBQSxrQkFBRyxTQUFNLFVBQVQsRUFBb0IsTUFBSyxZQUF6QjtBQUFBO0FBQUE7QUFBckI7QUFERjtBQVBGO0FBTEY7QUFERixLQURGO0FBb0JFO0FBQUE7QUFBQSxRQUFLLFNBQU0sV0FBWDtBQUF3QixZQUFNO0FBQTlCO0FBcEJGLEdBREY7QUF3QkQsQ0F6QkQ7O0FBMkJBLE9BQU8sT0FBUCxHQUFpQixNQUFqQjs7Ozs7QUMvQkEsSUFBTSxJQUFJLFFBQVEsU0FBUixDQUFWOztBQUVBLElBQUksT0FBTyxFQUFYOztBQUVBLEtBQUssVUFBTCxHQUFrQixZQUFXLENBRTVCLENBRkQ7O0FBSUEsS0FBSyxJQUFMLEdBQVksWUFBVztBQUNyQixTQUFPO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBUDtBQUNELENBRkQ7O0FBSUEsT0FBTyxPQUFQLEdBQWlCLElBQWpCOzs7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJjb25zdCBtID0gcmVxdWlyZShcIm1pdGhyaWxcIik7XG5jb25zdCBMYXlvdXQgPSByZXF1aXJlKFwiLi9sYXlvdXQuanN4XCIpO1xuY29uc3QgVG9waWNzID0gcmVxdWlyZShcIi4vdG9waWNzLmpzeFwiKTtcblxubS5yb3V0ZShkb2N1bWVudC5ib2R5LCBcIi9cIiwge1xuICBcIi9cIjoge1xuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gbShMYXlvdXQsIG0oVG9waWNzKSlcbiAgICB9XG4gIH1cbn0pOyIsImNvbnN0IG0gPSByZXF1aXJlKFwibWl0aHJpbFwiKTtcblxudmFyIExheW91dCA9IHt9O1xuXG5MYXlvdXQudmlldyA9IGZ1bmN0aW9uKHZub2RlKSB7XG4gIHJldHVybihcbiAgICA8bWFpbj5cbiAgICAgIDxuYXYgaWQ9XCJoZWFkZXJcIiBjbGFzcz1cIm5hdmJhciBuYXZiYXItbGlnaHQgbmF2YmFyLXRvZ2dsZWFibGUtbWQgZml4ZWQtdG9wIGJnLWZhZGVkXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cbiAgICAgICAgICA8YSBjbGFzcz1cIm5hdmJhci1icmFuZFwiIGhyZWY9XCIvXCI+PGI+UnVieTwvYj48c3VwPlJlYWN0IHZlcnNpb248L3N1cD48L2E+XG4gICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cIm5hdmJhci10b2dnbGVyIG5hdmJhci10b2dnbGVyLXJpZ2h0XCIgdHlwZT1cImJ1dHRvblwiIGRhdGEtdG9nZ2xlPVwiY29sbGFwc2VcIiBkYXRhLXRhcmdldD1cIiNtYWluLW5hdi1tZW51XCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cIm5hdmJhci10b2dnbGVyLWljb25cIj48L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbGxhcHNlIG5hdmJhci1jb2xsYXBzZVwiIGlkPVwibWFpbi1uYXYtbWVudVwiPlxuICAgICAgICAgICAgPHVsIGNsYXNzPVwibmF2IG5hdmJhci1uYXYgbWFpbi1uYXYgbXItYXV0byBtdC0yIG10LW1kLTBcIj5cbiAgICAgICAgICAgICAgPGxpIGNsYXNzPVwibmF2LWl0ZW1cIj48YSBjbGFzcz1cIm5hdi1saW5rIGFjdGl2ZVwiIGhyZWY9XCIvXCI+56S+5Yy6PC9hPjwvbGk+XG4gICAgICAgICAgICAgIDxsaSBjbGFzcz1cIm5hdi1pdGVtXCI+PGEgY2xhc3M9XCJuYXYtbGlua1wiIGhyZWY9XCIvdG9waWNzL3BvcHVsYXJcIj7kvJjotKjor53popg8L2E+PC9saT5cbiAgICAgICAgICAgICAgPGxpIGNsYXNzPVwibmF2LWl0ZW1cIj48YSBjbGFzcz1cIm5hdi1saW5rXCIgaHJlZj1cIi90b3BpY3Mvbm8tcmVwbHlcIj7ml6Dkurrpl67mtKU8L2E+PC9saT5cbiAgICAgICAgICAgICAgPGxpIGNsYXNzPVwibmF2LWl0ZW1cIj48YSBjbGFzcz1cIm5hdi1saW5rXCIgaHJlZj1cIi90b3BpY3MvcmVjZW50XCI+5pyA5paw5Y+R5biDPC9hPjwvbGk+XG4gICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgPHVsIGNsYXNzPVwibmF2IG5hdmJhci1uYXYgbXktMiBteS1sZy0wXCI+XG4gICAgICAgICAgICAgIDxsaSBjbGFzcz1cIm5hdi1pdGVtXCI+PGEgY2xhc3M9XCJuYXYtbGlua1wiIGhyZWY9XCIvb2F1dGgvbmV3XCI+55m75b2VPC9hPjwvbGk+XG4gICAgICAgICAgICA8L3VsPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvbmF2PlxuICAgICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPnt2bm9kZS5jaGlsZHJlbn08L2Rpdj5cbiAgICA8L21haW4+XG4gIClcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBMYXlvdXQ7IiwiY29uc3QgbSA9IHJlcXVpcmUoXCJtaXRocmlsXCIpO1xuXG52YXIgTGlzdCA9IHt9O1xuXG5MaXN0LmNvbnRyb2xsZXIgPSBmdW5jdGlvbigpIHtcblxufVxuXG5MaXN0LnZpZXcgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuKDxoMj50b3BpY3M8L2gyPilcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBMaXN0O1xuIiwibmV3IGZ1bmN0aW9uKCkge1xuXG5mdW5jdGlvbiBWbm9kZSh0YWcsIGtleSwgYXR0cnMwLCBjaGlsZHJlbiwgdGV4dCwgZG9tKSB7XG5cdHJldHVybiB7dGFnOiB0YWcsIGtleToga2V5LCBhdHRyczogYXR0cnMwLCBjaGlsZHJlbjogY2hpbGRyZW4sIHRleHQ6IHRleHQsIGRvbTogZG9tLCBkb21TaXplOiB1bmRlZmluZWQsIHN0YXRlOiB7fSwgZXZlbnRzOiB1bmRlZmluZWQsIGluc3RhbmNlOiB1bmRlZmluZWQsIHNraXA6IGZhbHNlfVxufVxuVm5vZGUubm9ybWFsaXplID0gZnVuY3Rpb24obm9kZSkge1xuXHRpZiAoQXJyYXkuaXNBcnJheShub2RlKSkgcmV0dXJuIFZub2RlKFwiW1wiLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgVm5vZGUubm9ybWFsaXplQ2hpbGRyZW4obm9kZSksIHVuZGVmaW5lZCwgdW5kZWZpbmVkKVxuXHRpZiAobm9kZSAhPSBudWxsICYmIHR5cGVvZiBub2RlICE9PSBcIm9iamVjdFwiKSByZXR1cm4gVm5vZGUoXCIjXCIsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBub2RlID09PSBmYWxzZSA/IFwiXCIgOiBub2RlLCB1bmRlZmluZWQsIHVuZGVmaW5lZClcblx0cmV0dXJuIG5vZGVcbn1cblZub2RlLm5vcm1hbGl6ZUNoaWxkcmVuID0gZnVuY3Rpb24gbm9ybWFsaXplQ2hpbGRyZW4oY2hpbGRyZW4pIHtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuXHRcdGNoaWxkcmVuW2ldID0gVm5vZGUubm9ybWFsaXplKGNoaWxkcmVuW2ldKVxuXHR9XG5cdHJldHVybiBjaGlsZHJlblxufVxudmFyIHNlbGVjdG9yUGFyc2VyID0gLyg/OihefCN8XFwuKShbXiNcXC5cXFtcXF1dKykpfChcXFsoLis/KSg/Olxccyo9XFxzKihcInwnfCkoKD86XFxcXFtcIidcXF1dfC4pKj8pXFw1KT9cXF0pL2dcbnZhciBzZWxlY3RvckNhY2hlID0ge31cbmZ1bmN0aW9uIGh5cGVyc2NyaXB0KHNlbGVjdG9yKSB7XG5cdGlmIChzZWxlY3RvciA9PSBudWxsIHx8IHR5cGVvZiBzZWxlY3RvciAhPT0gXCJzdHJpbmdcIiAmJiB0eXBlb2Ygc2VsZWN0b3IudmlldyAhPT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0dGhyb3cgRXJyb3IoXCJUaGUgc2VsZWN0b3IgbXVzdCBiZSBlaXRoZXIgYSBzdHJpbmcgb3IgYSBjb21wb25lbnQuXCIpO1xuXHR9XG5cdGlmICh0eXBlb2Ygc2VsZWN0b3IgPT09IFwic3RyaW5nXCIgJiYgc2VsZWN0b3JDYWNoZVtzZWxlY3Rvcl0gPT09IHVuZGVmaW5lZCkge1xuXHRcdHZhciBtYXRjaCwgdGFnLCBjbGFzc2VzID0gW10sIGF0dHJpYnV0ZXMgPSB7fVxuXHRcdHdoaWxlIChtYXRjaCA9IHNlbGVjdG9yUGFyc2VyLmV4ZWMoc2VsZWN0b3IpKSB7XG5cdFx0XHR2YXIgdHlwZSA9IG1hdGNoWzFdLCB2YWx1ZSA9IG1hdGNoWzJdXG5cdFx0XHRpZiAodHlwZSA9PT0gXCJcIiAmJiB2YWx1ZSAhPT0gXCJcIikgdGFnID0gdmFsdWVcblx0XHRcdGVsc2UgaWYgKHR5cGUgPT09IFwiI1wiKSBhdHRyaWJ1dGVzLmlkID0gdmFsdWVcblx0XHRcdGVsc2UgaWYgKHR5cGUgPT09IFwiLlwiKSBjbGFzc2VzLnB1c2godmFsdWUpXG5cdFx0XHRlbHNlIGlmIChtYXRjaFszXVswXSA9PT0gXCJbXCIpIHtcblx0XHRcdFx0dmFyIGF0dHJWYWx1ZSA9IG1hdGNoWzZdXG5cdFx0XHRcdGlmIChhdHRyVmFsdWUpIGF0dHJWYWx1ZSA9IGF0dHJWYWx1ZS5yZXBsYWNlKC9cXFxcKFtcIiddKS9nLCBcIiQxXCIpLnJlcGxhY2UoL1xcXFxcXFxcL2csIFwiXFxcXFwiKVxuXHRcdFx0XHRpZiAobWF0Y2hbNF0gPT09IFwiY2xhc3NcIikgY2xhc3Nlcy5wdXNoKGF0dHJWYWx1ZSlcblx0XHRcdFx0ZWxzZSBhdHRyaWJ1dGVzW21hdGNoWzRdXSA9IGF0dHJWYWx1ZSB8fCB0cnVlXG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmIChjbGFzc2VzLmxlbmd0aCA+IDApIGF0dHJpYnV0ZXMuY2xhc3NOYW1lID0gY2xhc3Nlcy5qb2luKFwiIFwiKVxuXHRcdHNlbGVjdG9yQ2FjaGVbc2VsZWN0b3JdID0gZnVuY3Rpb24oYXR0cnMsIGNoaWxkcmVuKSB7XG5cdFx0XHR2YXIgaGFzQXR0cnMgPSBmYWxzZSwgY2hpbGRMaXN0LCB0ZXh0XG5cdFx0XHR2YXIgY2xhc3NOYW1lID0gYXR0cnMuY2xhc3NOYW1lIHx8IGF0dHJzLmNsYXNzXG5cdFx0XHRmb3IgKHZhciBrZXkgaW4gYXR0cmlidXRlcykgYXR0cnNba2V5XSA9IGF0dHJpYnV0ZXNba2V5XVxuXHRcdFx0aWYgKGNsYXNzTmFtZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdGlmIChhdHRycy5jbGFzcyAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0YXR0cnMuY2xhc3MgPSB1bmRlZmluZWRcblx0XHRcdFx0XHRhdHRycy5jbGFzc05hbWUgPSBjbGFzc05hbWVcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoYXR0cmlidXRlcy5jbGFzc05hbWUgIT09IHVuZGVmaW5lZCkgYXR0cnMuY2xhc3NOYW1lID0gYXR0cmlidXRlcy5jbGFzc05hbWUgKyBcIiBcIiArIGNsYXNzTmFtZVxuXHRcdFx0fVxuXHRcdFx0Zm9yICh2YXIga2V5IGluIGF0dHJzKSB7XG5cdFx0XHRcdGlmIChrZXkgIT09IFwia2V5XCIpIHtcblx0XHRcdFx0XHRoYXNBdHRycyA9IHRydWVcblx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZiAoQXJyYXkuaXNBcnJheShjaGlsZHJlbikgJiYgY2hpbGRyZW4ubGVuZ3RoID09IDEgJiYgY2hpbGRyZW5bMF0gIT0gbnVsbCAmJiBjaGlsZHJlblswXS50YWcgPT09IFwiI1wiKSB0ZXh0ID0gY2hpbGRyZW5bMF0uY2hpbGRyZW5cblx0XHRcdGVsc2UgY2hpbGRMaXN0ID0gY2hpbGRyZW5cblx0XHRcdHJldHVybiBWbm9kZSh0YWcgfHwgXCJkaXZcIiwgYXR0cnMua2V5LCBoYXNBdHRycyA/IGF0dHJzIDogdW5kZWZpbmVkLCBjaGlsZExpc3QsIHRleHQsIHVuZGVmaW5lZClcblx0XHR9XG5cdH1cblx0dmFyIGF0dHJzLCBjaGlsZHJlbiwgY2hpbGRyZW5JbmRleFxuXHRpZiAoYXJndW1lbnRzWzFdID09IG51bGwgfHwgdHlwZW9mIGFyZ3VtZW50c1sxXSA9PT0gXCJvYmplY3RcIiAmJiBhcmd1bWVudHNbMV0udGFnID09PSB1bmRlZmluZWQgJiYgIUFycmF5LmlzQXJyYXkoYXJndW1lbnRzWzFdKSkge1xuXHRcdGF0dHJzID0gYXJndW1lbnRzWzFdXG5cdFx0Y2hpbGRyZW5JbmRleCA9IDJcblx0fVxuXHRlbHNlIGNoaWxkcmVuSW5kZXggPSAxXG5cdGlmIChhcmd1bWVudHMubGVuZ3RoID09PSBjaGlsZHJlbkluZGV4ICsgMSkge1xuXHRcdGNoaWxkcmVuID0gQXJyYXkuaXNBcnJheShhcmd1bWVudHNbY2hpbGRyZW5JbmRleF0pID8gYXJndW1lbnRzW2NoaWxkcmVuSW5kZXhdIDogW2FyZ3VtZW50c1tjaGlsZHJlbkluZGV4XV1cblx0fVxuXHRlbHNlIHtcblx0XHRjaGlsZHJlbiA9IFtdXG5cdFx0Zm9yICh2YXIgaSA9IGNoaWxkcmVuSW5kZXg7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIGNoaWxkcmVuLnB1c2goYXJndW1lbnRzW2ldKVxuXHR9XG5cdGlmICh0eXBlb2Ygc2VsZWN0b3IgPT09IFwic3RyaW5nXCIpIHJldHVybiBzZWxlY3RvckNhY2hlW3NlbGVjdG9yXShhdHRycyB8fCB7fSwgVm5vZGUubm9ybWFsaXplQ2hpbGRyZW4oY2hpbGRyZW4pKVxuXHRyZXR1cm4gVm5vZGUoc2VsZWN0b3IsIGF0dHJzICYmIGF0dHJzLmtleSwgYXR0cnMgfHwge30sIFZub2RlLm5vcm1hbGl6ZUNoaWxkcmVuKGNoaWxkcmVuKSwgdW5kZWZpbmVkLCB1bmRlZmluZWQpXG59XG5oeXBlcnNjcmlwdC50cnVzdCA9IGZ1bmN0aW9uKGh0bWwpIHtcblx0aWYgKGh0bWwgPT0gbnVsbCkgaHRtbCA9IFwiXCJcblx0cmV0dXJuIFZub2RlKFwiPFwiLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgaHRtbCwgdW5kZWZpbmVkLCB1bmRlZmluZWQpXG59XG5oeXBlcnNjcmlwdC5mcmFnbWVudCA9IGZ1bmN0aW9uKGF0dHJzMSwgY2hpbGRyZW4pIHtcblx0cmV0dXJuIFZub2RlKFwiW1wiLCBhdHRyczEua2V5LCBhdHRyczEsIFZub2RlLm5vcm1hbGl6ZUNoaWxkcmVuKGNoaWxkcmVuKSwgdW5kZWZpbmVkLCB1bmRlZmluZWQpXG59XG52YXIgbSA9IGh5cGVyc2NyaXB0XG4vKiogQGNvbnN0cnVjdG9yICovXG52YXIgUHJvbWlzZVBvbHlmaWxsID0gZnVuY3Rpb24oZXhlY3V0b3IpIHtcblx0aWYgKCEodGhpcyBpbnN0YW5jZW9mIFByb21pc2VQb2x5ZmlsbCkpIHRocm93IG5ldyBFcnJvcihcIlByb21pc2UgbXVzdCBiZSBjYWxsZWQgd2l0aCBgbmV3YFwiKVxuXHRpZiAodHlwZW9mIGV4ZWN1dG9yICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJleGVjdXRvciBtdXN0IGJlIGEgZnVuY3Rpb25cIilcblx0dmFyIHNlbGYgPSB0aGlzLCByZXNvbHZlcnMgPSBbXSwgcmVqZWN0b3JzID0gW10sIHJlc29sdmVDdXJyZW50ID0gaGFuZGxlcihyZXNvbHZlcnMsIHRydWUpLCByZWplY3RDdXJyZW50ID0gaGFuZGxlcihyZWplY3RvcnMsIGZhbHNlKVxuXHR2YXIgaW5zdGFuY2UgPSBzZWxmLl9pbnN0YW5jZSA9IHtyZXNvbHZlcnM6IHJlc29sdmVycywgcmVqZWN0b3JzOiByZWplY3RvcnN9XG5cdHZhciBjYWxsQXN5bmMgPSB0eXBlb2Ygc2V0SW1tZWRpYXRlID09PSBcImZ1bmN0aW9uXCIgPyBzZXRJbW1lZGlhdGUgOiBzZXRUaW1lb3V0XG5cdGZ1bmN0aW9uIGhhbmRsZXIobGlzdCwgc2hvdWxkQWJzb3JiKSB7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uIGV4ZWN1dGUodmFsdWUpIHtcblx0XHRcdHZhciB0aGVuXG5cdFx0XHR0cnkge1xuXHRcdFx0XHRpZiAoc2hvdWxkQWJzb3JiICYmIHZhbHVlICE9IG51bGwgJiYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIikgJiYgdHlwZW9mICh0aGVuID0gdmFsdWUudGhlbikgPT09IFwiZnVuY3Rpb25cIikge1xuXHRcdFx0XHRcdGlmICh2YWx1ZSA9PT0gc2VsZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByb21pc2UgY2FuJ3QgYmUgcmVzb2x2ZWQgdy8gaXRzZWxmXCIpXG5cdFx0XHRcdFx0ZXhlY3V0ZU9uY2UodGhlbi5iaW5kKHZhbHVlKSlcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRjYWxsQXN5bmMoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRpZiAoIXNob3VsZEFic29yYiAmJiBsaXN0Lmxlbmd0aCA9PT0gMCkgY29uc29sZS5lcnJvcihcIlBvc3NpYmxlIHVuaGFuZGxlZCBwcm9taXNlIHJlamVjdGlvbjpcIiwgdmFsdWUpXG5cdFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIGxpc3RbaV0odmFsdWUpXG5cdFx0XHRcdFx0XHRyZXNvbHZlcnMubGVuZ3RoID0gMCwgcmVqZWN0b3JzLmxlbmd0aCA9IDBcblx0XHRcdFx0XHRcdGluc3RhbmNlLnN0YXRlID0gc2hvdWxkQWJzb3JiXG5cdFx0XHRcdFx0XHRpbnN0YW5jZS5yZXRyeSA9IGZ1bmN0aW9uKCkge2V4ZWN1dGUodmFsdWUpfVxuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGNhdGNoIChlKSB7XG5cdFx0XHRcdHJlamVjdEN1cnJlbnQoZSlcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0ZnVuY3Rpb24gZXhlY3V0ZU9uY2UodGhlbikge1xuXHRcdHZhciBydW5zID0gMFxuXHRcdGZ1bmN0aW9uIHJ1bihmbikge1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uKHZhbHVlKSB7XG5cdFx0XHRcdGlmIChydW5zKysgPiAwKSByZXR1cm5cblx0XHRcdFx0Zm4odmFsdWUpXG5cdFx0XHR9XG5cdFx0fVxuXHRcdHZhciBvbmVycm9yID0gcnVuKHJlamVjdEN1cnJlbnQpXG5cdFx0dHJ5IHt0aGVuKHJ1bihyZXNvbHZlQ3VycmVudCksIG9uZXJyb3IpfSBjYXRjaCAoZSkge29uZXJyb3IoZSl9XG5cdH1cblx0ZXhlY3V0ZU9uY2UoZXhlY3V0b3IpXG59XG5Qcm9taXNlUG9seWZpbGwucHJvdG90eXBlLnRoZW4gPSBmdW5jdGlvbihvbkZ1bGZpbGxlZCwgb25SZWplY3Rpb24pIHtcblx0dmFyIHNlbGYgPSB0aGlzLCBpbnN0YW5jZSA9IHNlbGYuX2luc3RhbmNlXG5cdGZ1bmN0aW9uIGhhbmRsZShjYWxsYmFjaywgbGlzdCwgbmV4dCwgc3RhdGUpIHtcblx0XHRsaXN0LnB1c2goZnVuY3Rpb24odmFsdWUpIHtcblx0XHRcdGlmICh0eXBlb2YgY2FsbGJhY2sgIT09IFwiZnVuY3Rpb25cIikgbmV4dCh2YWx1ZSlcblx0XHRcdGVsc2UgdHJ5IHtyZXNvbHZlTmV4dChjYWxsYmFjayh2YWx1ZSkpfSBjYXRjaCAoZSkge2lmIChyZWplY3ROZXh0KSByZWplY3ROZXh0KGUpfVxuXHRcdH0pXG5cdFx0aWYgKHR5cGVvZiBpbnN0YW5jZS5yZXRyeSA9PT0gXCJmdW5jdGlvblwiICYmIHN0YXRlID09PSBpbnN0YW5jZS5zdGF0ZSkgaW5zdGFuY2UucmV0cnkoKVxuXHR9XG5cdHZhciByZXNvbHZlTmV4dCwgcmVqZWN0TmV4dFxuXHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlUG9seWZpbGwoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7cmVzb2x2ZU5leHQgPSByZXNvbHZlLCByZWplY3ROZXh0ID0gcmVqZWN0fSlcblx0aGFuZGxlKG9uRnVsZmlsbGVkLCBpbnN0YW5jZS5yZXNvbHZlcnMsIHJlc29sdmVOZXh0LCB0cnVlKSwgaGFuZGxlKG9uUmVqZWN0aW9uLCBpbnN0YW5jZS5yZWplY3RvcnMsIHJlamVjdE5leHQsIGZhbHNlKVxuXHRyZXR1cm4gcHJvbWlzZVxufVxuUHJvbWlzZVBvbHlmaWxsLnByb3RvdHlwZS5jYXRjaCA9IGZ1bmN0aW9uKG9uUmVqZWN0aW9uKSB7XG5cdHJldHVybiB0aGlzLnRoZW4obnVsbCwgb25SZWplY3Rpb24pXG59XG5Qcm9taXNlUG9seWZpbGwucmVzb2x2ZSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG5cdGlmICh2YWx1ZSBpbnN0YW5jZW9mIFByb21pc2VQb2x5ZmlsbCkgcmV0dXJuIHZhbHVlXG5cdHJldHVybiBuZXcgUHJvbWlzZVBvbHlmaWxsKGZ1bmN0aW9uKHJlc29sdmUpIHtyZXNvbHZlKHZhbHVlKX0pXG59XG5Qcm9taXNlUG9seWZpbGwucmVqZWN0ID0gZnVuY3Rpb24odmFsdWUpIHtcblx0cmV0dXJuIG5ldyBQcm9taXNlUG9seWZpbGwoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7cmVqZWN0KHZhbHVlKX0pXG59XG5Qcm9taXNlUG9seWZpbGwuYWxsID0gZnVuY3Rpb24obGlzdCkge1xuXHRyZXR1cm4gbmV3IFByb21pc2VQb2x5ZmlsbChmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblx0XHR2YXIgdG90YWwgPSBsaXN0Lmxlbmd0aCwgY291bnQgPSAwLCB2YWx1ZXMgPSBbXVxuXHRcdGlmIChsaXN0Lmxlbmd0aCA9PT0gMCkgcmVzb2x2ZShbXSlcblx0XHRlbHNlIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuXHRcdFx0KGZ1bmN0aW9uKGkpIHtcblx0XHRcdFx0ZnVuY3Rpb24gY29uc3VtZSh2YWx1ZSkge1xuXHRcdFx0XHRcdGNvdW50Kytcblx0XHRcdFx0XHR2YWx1ZXNbaV0gPSB2YWx1ZVxuXHRcdFx0XHRcdGlmIChjb3VudCA9PT0gdG90YWwpIHJlc29sdmUodmFsdWVzKVxuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChsaXN0W2ldICE9IG51bGwgJiYgKHR5cGVvZiBsaXN0W2ldID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBsaXN0W2ldID09PSBcImZ1bmN0aW9uXCIpICYmIHR5cGVvZiBsaXN0W2ldLnRoZW4gPT09IFwiZnVuY3Rpb25cIikge1xuXHRcdFx0XHRcdGxpc3RbaV0udGhlbihjb25zdW1lLCByZWplY3QpXG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSBjb25zdW1lKGxpc3RbaV0pXG5cdFx0XHR9KShpKVxuXHRcdH1cblx0fSlcbn1cblByb21pc2VQb2x5ZmlsbC5yYWNlID0gZnVuY3Rpb24obGlzdCkge1xuXHRyZXR1cm4gbmV3IFByb21pc2VQb2x5ZmlsbChmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcblx0XHRcdGxpc3RbaV0udGhlbihyZXNvbHZlLCByZWplY3QpXG5cdFx0fVxuXHR9KVxufVxuaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHtcblx0aWYgKHR5cGVvZiB3aW5kb3cuUHJvbWlzZSA9PT0gXCJ1bmRlZmluZWRcIikgd2luZG93LlByb21pc2UgPSBQcm9taXNlUG9seWZpbGxcblx0dmFyIFByb21pc2VQb2x5ZmlsbCA9IHdpbmRvdy5Qcm9taXNlXG59IGVsc2UgaWYgKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWwuUHJvbWlzZSA9PT0gXCJ1bmRlZmluZWRcIikgZ2xvYmFsLlByb21pc2UgPSBQcm9taXNlUG9seWZpbGxcblx0dmFyIFByb21pc2VQb2x5ZmlsbCA9IGdsb2JhbC5Qcm9taXNlXG59IGVsc2Uge1xufVxudmFyIGJ1aWxkUXVlcnlTdHJpbmcgPSBmdW5jdGlvbihvYmplY3QpIHtcblx0aWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmplY3QpICE9PSBcIltvYmplY3QgT2JqZWN0XVwiKSByZXR1cm4gXCJcIlxuXHR2YXIgYXJncyA9IFtdXG5cdGZvciAodmFyIGtleTAgaW4gb2JqZWN0KSB7XG5cdFx0ZGVzdHJ1Y3R1cmUoa2V5MCwgb2JqZWN0W2tleTBdKVxuXHR9XG5cdHJldHVybiBhcmdzLmpvaW4oXCImXCIpXG5cdGZ1bmN0aW9uIGRlc3RydWN0dXJlKGtleTAsIHZhbHVlKSB7XG5cdFx0aWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHZhbHVlLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGRlc3RydWN0dXJlKGtleTAgKyBcIltcIiArIGkgKyBcIl1cIiwgdmFsdWVbaV0pXG5cdFx0XHR9XG5cdFx0fVxuXHRcdGVsc2UgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT09IFwiW29iamVjdCBPYmplY3RdXCIpIHtcblx0XHRcdGZvciAodmFyIGkgaW4gdmFsdWUpIHtcblx0XHRcdFx0ZGVzdHJ1Y3R1cmUoa2V5MCArIFwiW1wiICsgaSArIFwiXVwiLCB2YWx1ZVtpXSlcblx0XHRcdH1cblx0XHR9XG5cdFx0ZWxzZSBhcmdzLnB1c2goZW5jb2RlVVJJQ29tcG9uZW50KGtleTApICsgKHZhbHVlICE9IG51bGwgJiYgdmFsdWUgIT09IFwiXCIgPyBcIj1cIiArIGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSkgOiBcIlwiKSlcblx0fVxufVxudmFyIF84ID0gZnVuY3Rpb24oJHdpbmRvdywgUHJvbWlzZSkge1xuXHR2YXIgY2FsbGJhY2tDb3VudCA9IDBcblx0dmFyIG9uY29tcGxldGlvblxuXHRmdW5jdGlvbiBzZXRDb21wbGV0aW9uQ2FsbGJhY2soY2FsbGJhY2spIHtvbmNvbXBsZXRpb24gPSBjYWxsYmFja31cblx0ZnVuY3Rpb24gZmluYWxpemVyKCkge1xuXHRcdHZhciBjb3VudCA9IDBcblx0XHRmdW5jdGlvbiBjb21wbGV0ZSgpIHtpZiAoLS1jb3VudCA9PT0gMCAmJiB0eXBlb2Ygb25jb21wbGV0aW9uID09PSBcImZ1bmN0aW9uXCIpIG9uY29tcGxldGlvbigpfVxuXHRcdHJldHVybiBmdW5jdGlvbiBmaW5hbGl6ZShwcm9taXNlMCkge1xuXHRcdFx0dmFyIHRoZW4wID0gcHJvbWlzZTAudGhlblxuXHRcdFx0cHJvbWlzZTAudGhlbiA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRjb3VudCsrXG5cdFx0XHRcdHZhciBuZXh0ID0gdGhlbjAuYXBwbHkocHJvbWlzZTAsIGFyZ3VtZW50cylcblx0XHRcdFx0bmV4dC50aGVuKGNvbXBsZXRlLCBmdW5jdGlvbihlKSB7XG5cdFx0XHRcdFx0Y29tcGxldGUoKVxuXHRcdFx0XHRcdGlmIChjb3VudCA9PT0gMCkgdGhyb3cgZVxuXHRcdFx0XHR9KVxuXHRcdFx0XHRyZXR1cm4gZmluYWxpemUobmV4dClcblx0XHRcdH1cblx0XHRcdHJldHVybiBwcm9taXNlMFxuXHRcdH1cblx0fVxuXHRmdW5jdGlvbiBub3JtYWxpemUoYXJncywgZXh0cmEpIHtcblx0XHRpZiAodHlwZW9mIGFyZ3MgPT09IFwic3RyaW5nXCIpIHtcblx0XHRcdHZhciB1cmwgPSBhcmdzXG5cdFx0XHRhcmdzID0gZXh0cmEgfHwge31cblx0XHRcdGlmIChhcmdzLnVybCA9PSBudWxsKSBhcmdzLnVybCA9IHVybFxuXHRcdH1cblx0XHRyZXR1cm4gYXJnc1xuXHR9XG5cdGZ1bmN0aW9uIHJlcXVlc3QoYXJncywgZXh0cmEpIHtcblx0XHR2YXIgZmluYWxpemUgPSBmaW5hbGl6ZXIoKVxuXHRcdGFyZ3MgPSBub3JtYWxpemUoYXJncywgZXh0cmEpXG5cdFx0dmFyIHByb21pc2UwID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cdFx0XHRpZiAoYXJncy5tZXRob2QgPT0gbnVsbCkgYXJncy5tZXRob2QgPSBcIkdFVFwiXG5cdFx0XHRhcmdzLm1ldGhvZCA9IGFyZ3MubWV0aG9kLnRvVXBwZXJDYXNlKClcblx0XHRcdHZhciB1c2VCb2R5ID0gdHlwZW9mIGFyZ3MudXNlQm9keSA9PT0gXCJib29sZWFuXCIgPyBhcmdzLnVzZUJvZHkgOiBhcmdzLm1ldGhvZCAhPT0gXCJHRVRcIiAmJiBhcmdzLm1ldGhvZCAhPT0gXCJUUkFDRVwiXG5cdFx0XHRpZiAodHlwZW9mIGFyZ3Muc2VyaWFsaXplICE9PSBcImZ1bmN0aW9uXCIpIGFyZ3Muc2VyaWFsaXplID0gdHlwZW9mIEZvcm1EYXRhICE9PSBcInVuZGVmaW5lZFwiICYmIGFyZ3MuZGF0YSBpbnN0YW5jZW9mIEZvcm1EYXRhID8gZnVuY3Rpb24odmFsdWUpIHtyZXR1cm4gdmFsdWV9IDogSlNPTi5zdHJpbmdpZnlcblx0XHRcdGlmICh0eXBlb2YgYXJncy5kZXNlcmlhbGl6ZSAhPT0gXCJmdW5jdGlvblwiKSBhcmdzLmRlc2VyaWFsaXplID0gZGVzZXJpYWxpemVcblx0XHRcdGlmICh0eXBlb2YgYXJncy5leHRyYWN0ICE9PSBcImZ1bmN0aW9uXCIpIGFyZ3MuZXh0cmFjdCA9IGV4dHJhY3Rcblx0XHRcdGFyZ3MudXJsID0gaW50ZXJwb2xhdGUoYXJncy51cmwsIGFyZ3MuZGF0YSlcblx0XHRcdGlmICh1c2VCb2R5KSBhcmdzLmRhdGEgPSBhcmdzLnNlcmlhbGl6ZShhcmdzLmRhdGEpXG5cdFx0XHRlbHNlIGFyZ3MudXJsID0gYXNzZW1ibGUoYXJncy51cmwsIGFyZ3MuZGF0YSlcblx0XHRcdHZhciB4aHIgPSBuZXcgJHdpbmRvdy5YTUxIdHRwUmVxdWVzdCgpXG5cdFx0XHR4aHIub3BlbihhcmdzLm1ldGhvZCwgYXJncy51cmwsIHR5cGVvZiBhcmdzLmFzeW5jID09PSBcImJvb2xlYW5cIiA/IGFyZ3MuYXN5bmMgOiB0cnVlLCB0eXBlb2YgYXJncy51c2VyID09PSBcInN0cmluZ1wiID8gYXJncy51c2VyIDogdW5kZWZpbmVkLCB0eXBlb2YgYXJncy5wYXNzd29yZCA9PT0gXCJzdHJpbmdcIiA/IGFyZ3MucGFzc3dvcmQgOiB1bmRlZmluZWQpXG5cdFx0XHRpZiAoYXJncy5zZXJpYWxpemUgPT09IEpTT04uc3RyaW5naWZ5ICYmIHVzZUJvZHkpIHtcblx0XHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIpXG5cdFx0XHR9XG5cdFx0XHRpZiAoYXJncy5kZXNlcmlhbGl6ZSA9PT0gZGVzZXJpYWxpemUpIHtcblx0XHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoXCJBY2NlcHRcIiwgXCJhcHBsaWNhdGlvbi9qc29uLCB0ZXh0LypcIilcblx0XHRcdH1cblx0XHRcdGlmIChhcmdzLndpdGhDcmVkZW50aWFscykgeGhyLndpdGhDcmVkZW50aWFscyA9IGFyZ3Mud2l0aENyZWRlbnRpYWxzXG5cdFx0XHRmb3IgKHZhciBrZXkgaW4gYXJncy5oZWFkZXJzKSBpZiAoe30uaGFzT3duUHJvcGVydHkuY2FsbChhcmdzLmhlYWRlcnMsIGtleSkpIHtcblx0XHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoa2V5LCBhcmdzLmhlYWRlcnNba2V5XSlcblx0XHRcdH1cblx0XHRcdGlmICh0eXBlb2YgYXJncy5jb25maWcgPT09IFwiZnVuY3Rpb25cIikgeGhyID0gYXJncy5jb25maWcoeGhyLCBhcmdzKSB8fCB4aHJcblx0XHRcdHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0Ly8gRG9uJ3QgdGhyb3cgZXJyb3JzIG9uIHhoci5hYm9ydCgpLiBYTUxIdHRwUmVxdWVzdHMgZW5kcyB1cCBpbiBhIHN0YXRlIG9mXG5cdFx0XHRcdC8vIHhoci5zdGF0dXMgPT0gMCBhbmQgeGhyLnJlYWR5U3RhdGUgPT0gNCBpZiBhYm9ydGVkIGFmdGVyIG9wZW4sIGJ1dCBiZWZvcmUgY29tcGxldGlvbi5cblx0XHRcdFx0aWYgKHhoci5zdGF0dXMgJiYgeGhyLnJlYWR5U3RhdGUgPT09IDQpIHtcblx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0dmFyIHJlc3BvbnNlID0gKGFyZ3MuZXh0cmFjdCAhPT0gZXh0cmFjdCkgPyBhcmdzLmV4dHJhY3QoeGhyLCBhcmdzKSA6IGFyZ3MuZGVzZXJpYWxpemUoYXJncy5leHRyYWN0KHhociwgYXJncykpXG5cdFx0XHRcdFx0XHRpZiAoKHhoci5zdGF0dXMgPj0gMjAwICYmIHhoci5zdGF0dXMgPCAzMDApIHx8IHhoci5zdGF0dXMgPT09IDMwNCkge1xuXHRcdFx0XHRcdFx0XHRyZXNvbHZlKGNhc3QoYXJncy50eXBlLCByZXNwb25zZSkpXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdFx0dmFyIGVycm9yID0gbmV3IEVycm9yKHhoci5yZXNwb25zZVRleHQpXG5cdFx0XHRcdFx0XHRcdGZvciAodmFyIGtleSBpbiByZXNwb25zZSkgZXJyb3Jba2V5XSA9IHJlc3BvbnNlW2tleV1cblx0XHRcdFx0XHRcdFx0cmVqZWN0KGVycm9yKVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRjYXRjaCAoZSkge1xuXHRcdFx0XHRcdFx0cmVqZWN0KGUpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZiAodXNlQm9keSAmJiAoYXJncy5kYXRhICE9IG51bGwpKSB4aHIuc2VuZChhcmdzLmRhdGEpXG5cdFx0XHRlbHNlIHhoci5zZW5kKClcblx0XHR9KVxuXHRcdHJldHVybiBhcmdzLmJhY2tncm91bmQgPT09IHRydWUgPyBwcm9taXNlMCA6IGZpbmFsaXplKHByb21pc2UwKVxuXHR9XG5cdGZ1bmN0aW9uIGpzb25wKGFyZ3MsIGV4dHJhKSB7XG5cdFx0dmFyIGZpbmFsaXplID0gZmluYWxpemVyKClcblx0XHRhcmdzID0gbm9ybWFsaXplKGFyZ3MsIGV4dHJhKVxuXHRcdHZhciBwcm9taXNlMCA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuXHRcdFx0dmFyIGNhbGxiYWNrTmFtZSA9IGFyZ3MuY2FsbGJhY2tOYW1lIHx8IFwiX21pdGhyaWxfXCIgKyBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAxZTE2KSArIFwiX1wiICsgY2FsbGJhY2tDb3VudCsrXG5cdFx0XHR2YXIgc2NyaXB0ID0gJHdpbmRvdy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpXG5cdFx0XHQkd2luZG93W2NhbGxiYWNrTmFtZV0gPSBmdW5jdGlvbihkYXRhKSB7XG5cdFx0XHRcdHNjcmlwdC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHNjcmlwdClcblx0XHRcdFx0cmVzb2x2ZShjYXN0KGFyZ3MudHlwZSwgZGF0YSkpXG5cdFx0XHRcdGRlbGV0ZSAkd2luZG93W2NhbGxiYWNrTmFtZV1cblx0XHRcdH1cblx0XHRcdHNjcmlwdC5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHNjcmlwdC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHNjcmlwdClcblx0XHRcdFx0cmVqZWN0KG5ldyBFcnJvcihcIkpTT05QIHJlcXVlc3QgZmFpbGVkXCIpKVxuXHRcdFx0XHRkZWxldGUgJHdpbmRvd1tjYWxsYmFja05hbWVdXG5cdFx0XHR9XG5cdFx0XHRpZiAoYXJncy5kYXRhID09IG51bGwpIGFyZ3MuZGF0YSA9IHt9XG5cdFx0XHRhcmdzLnVybCA9IGludGVycG9sYXRlKGFyZ3MudXJsLCBhcmdzLmRhdGEpXG5cdFx0XHRhcmdzLmRhdGFbYXJncy5jYWxsYmFja0tleSB8fCBcImNhbGxiYWNrXCJdID0gY2FsbGJhY2tOYW1lXG5cdFx0XHRzY3JpcHQuc3JjID0gYXNzZW1ibGUoYXJncy51cmwsIGFyZ3MuZGF0YSlcblx0XHRcdCR3aW5kb3cuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmFwcGVuZENoaWxkKHNjcmlwdClcblx0XHR9KVxuXHRcdHJldHVybiBhcmdzLmJhY2tncm91bmQgPT09IHRydWU/IHByb21pc2UwIDogZmluYWxpemUocHJvbWlzZTApXG5cdH1cblx0ZnVuY3Rpb24gaW50ZXJwb2xhdGUodXJsLCBkYXRhKSB7XG5cdFx0aWYgKGRhdGEgPT0gbnVsbCkgcmV0dXJuIHVybFxuXHRcdHZhciB0b2tlbnMgPSB1cmwubWF0Y2goLzpbXlxcL10rL2dpKSB8fCBbXVxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdG9rZW5zLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIga2V5ID0gdG9rZW5zW2ldLnNsaWNlKDEpXG5cdFx0XHRpZiAoZGF0YVtrZXldICE9IG51bGwpIHtcblx0XHRcdFx0dXJsID0gdXJsLnJlcGxhY2UodG9rZW5zW2ldLCBkYXRhW2tleV0pXG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB1cmxcblx0fVxuXHRmdW5jdGlvbiBhc3NlbWJsZSh1cmwsIGRhdGEpIHtcblx0XHR2YXIgcXVlcnlzdHJpbmcgPSBidWlsZFF1ZXJ5U3RyaW5nKGRhdGEpXG5cdFx0aWYgKHF1ZXJ5c3RyaW5nICE9PSBcIlwiKSB7XG5cdFx0XHR2YXIgcHJlZml4ID0gdXJsLmluZGV4T2YoXCI/XCIpIDwgMCA/IFwiP1wiIDogXCImXCJcblx0XHRcdHVybCArPSBwcmVmaXggKyBxdWVyeXN0cmluZ1xuXHRcdH1cblx0XHRyZXR1cm4gdXJsXG5cdH1cblx0ZnVuY3Rpb24gZGVzZXJpYWxpemUoZGF0YSkge1xuXHRcdHRyeSB7cmV0dXJuIGRhdGEgIT09IFwiXCIgPyBKU09OLnBhcnNlKGRhdGEpIDogbnVsbH1cblx0XHRjYXRjaCAoZSkge3Rocm93IG5ldyBFcnJvcihkYXRhKX1cblx0fVxuXHRmdW5jdGlvbiBleHRyYWN0KHhocikge3JldHVybiB4aHIucmVzcG9uc2VUZXh0fVxuXHRmdW5jdGlvbiBjYXN0KHR5cGUwLCBkYXRhKSB7XG5cdFx0aWYgKHR5cGVvZiB0eXBlMCA9PT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0XHRpZiAoQXJyYXkuaXNBcnJheShkYXRhKSkge1xuXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRkYXRhW2ldID0gbmV3IHR5cGUwKGRhdGFbaV0pXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGVsc2UgcmV0dXJuIG5ldyB0eXBlMChkYXRhKVxuXHRcdH1cblx0XHRyZXR1cm4gZGF0YVxuXHR9XG5cdHJldHVybiB7cmVxdWVzdDogcmVxdWVzdCwganNvbnA6IGpzb25wLCBzZXRDb21wbGV0aW9uQ2FsbGJhY2s6IHNldENvbXBsZXRpb25DYWxsYmFja31cbn1cbnZhciByZXF1ZXN0U2VydmljZSA9IF84KHdpbmRvdywgUHJvbWlzZVBvbHlmaWxsKVxudmFyIGNvcmVSZW5kZXJlciA9IGZ1bmN0aW9uKCR3aW5kb3cpIHtcblx0dmFyICRkb2MgPSAkd2luZG93LmRvY3VtZW50XG5cdHZhciAkZW1wdHlGcmFnbWVudCA9ICRkb2MuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpXG5cdHZhciBvbmV2ZW50XG5cdGZ1bmN0aW9uIHNldEV2ZW50Q2FsbGJhY2soY2FsbGJhY2spIHtyZXR1cm4gb25ldmVudCA9IGNhbGxiYWNrfVxuXHQvL2NyZWF0ZVxuXHRmdW5jdGlvbiBjcmVhdGVOb2RlcyhwYXJlbnQsIHZub2Rlcywgc3RhcnQsIGVuZCwgaG9va3MsIG5leHRTaWJsaW5nLCBucykge1xuXHRcdGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgaSsrKSB7XG5cdFx0XHR2YXIgdm5vZGUgPSB2bm9kZXNbaV1cblx0XHRcdGlmICh2bm9kZSAhPSBudWxsKSB7XG5cdFx0XHRcdGNyZWF0ZU5vZGUocGFyZW50LCB2bm9kZSwgaG9va3MsIG5zLCBuZXh0U2libGluZylcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0ZnVuY3Rpb24gY3JlYXRlTm9kZShwYXJlbnQsIHZub2RlLCBob29rcywgbnMsIG5leHRTaWJsaW5nKSB7XG5cdFx0dmFyIHRhZyA9IHZub2RlLnRhZ1xuXHRcdGlmICh2bm9kZS5hdHRycyAhPSBudWxsKSBpbml0TGlmZWN5Y2xlKHZub2RlLmF0dHJzLCB2bm9kZSwgaG9va3MpXG5cdFx0aWYgKHR5cGVvZiB0YWcgPT09IFwic3RyaW5nXCIpIHtcblx0XHRcdHN3aXRjaCAodGFnKSB7XG5cdFx0XHRcdGNhc2UgXCIjXCI6IHJldHVybiBjcmVhdGVUZXh0KHBhcmVudCwgdm5vZGUsIG5leHRTaWJsaW5nKVxuXHRcdFx0XHRjYXNlIFwiPFwiOiByZXR1cm4gY3JlYXRlSFRNTChwYXJlbnQsIHZub2RlLCBuZXh0U2libGluZylcblx0XHRcdFx0Y2FzZSBcIltcIjogcmV0dXJuIGNyZWF0ZUZyYWdtZW50KHBhcmVudCwgdm5vZGUsIGhvb2tzLCBucywgbmV4dFNpYmxpbmcpXG5cdFx0XHRcdGRlZmF1bHQ6IHJldHVybiBjcmVhdGVFbGVtZW50KHBhcmVudCwgdm5vZGUsIGhvb2tzLCBucywgbmV4dFNpYmxpbmcpXG5cdFx0XHR9XG5cdFx0fVxuXHRcdGVsc2UgcmV0dXJuIGNyZWF0ZUNvbXBvbmVudChwYXJlbnQsIHZub2RlLCBob29rcywgbnMsIG5leHRTaWJsaW5nKVxuXHR9XG5cdGZ1bmN0aW9uIGNyZWF0ZVRleHQocGFyZW50LCB2bm9kZSwgbmV4dFNpYmxpbmcpIHtcblx0XHR2bm9kZS5kb20gPSAkZG9jLmNyZWF0ZVRleHROb2RlKHZub2RlLmNoaWxkcmVuKVxuXHRcdGluc2VydE5vZGUocGFyZW50LCB2bm9kZS5kb20sIG5leHRTaWJsaW5nKVxuXHRcdHJldHVybiB2bm9kZS5kb21cblx0fVxuXHRmdW5jdGlvbiBjcmVhdGVIVE1MKHBhcmVudCwgdm5vZGUsIG5leHRTaWJsaW5nKSB7XG5cdFx0dmFyIG1hdGNoMSA9IHZub2RlLmNoaWxkcmVuLm1hdGNoKC9eXFxzKj88KFxcdyspL2ltKSB8fCBbXVxuXHRcdHZhciBwYXJlbnQxID0ge2NhcHRpb246IFwidGFibGVcIiwgdGhlYWQ6IFwidGFibGVcIiwgdGJvZHk6IFwidGFibGVcIiwgdGZvb3Q6IFwidGFibGVcIiwgdHI6IFwidGJvZHlcIiwgdGg6IFwidHJcIiwgdGQ6IFwidHJcIiwgY29sZ3JvdXA6IFwidGFibGVcIiwgY29sOiBcImNvbGdyb3VwXCJ9W21hdGNoMVsxXV0gfHwgXCJkaXZcIlxuXHRcdHZhciB0ZW1wID0gJGRvYy5jcmVhdGVFbGVtZW50KHBhcmVudDEpXG5cdFx0dGVtcC5pbm5lckhUTUwgPSB2bm9kZS5jaGlsZHJlblxuXHRcdHZub2RlLmRvbSA9IHRlbXAuZmlyc3RDaGlsZFxuXHRcdHZub2RlLmRvbVNpemUgPSB0ZW1wLmNoaWxkTm9kZXMubGVuZ3RoXG5cdFx0dmFyIGZyYWdtZW50ID0gJGRvYy5jcmVhdGVEb2N1bWVudEZyYWdtZW50KClcblx0XHR2YXIgY2hpbGRcblx0XHR3aGlsZSAoY2hpbGQgPSB0ZW1wLmZpcnN0Q2hpbGQpIHtcblx0XHRcdGZyYWdtZW50LmFwcGVuZENoaWxkKGNoaWxkKVxuXHRcdH1cblx0XHRpbnNlcnROb2RlKHBhcmVudCwgZnJhZ21lbnQsIG5leHRTaWJsaW5nKVxuXHRcdHJldHVybiBmcmFnbWVudFxuXHR9XG5cdGZ1bmN0aW9uIGNyZWF0ZUZyYWdtZW50KHBhcmVudCwgdm5vZGUsIGhvb2tzLCBucywgbmV4dFNpYmxpbmcpIHtcblx0XHR2YXIgZnJhZ21lbnQgPSAkZG9jLmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKVxuXHRcdGlmICh2bm9kZS5jaGlsZHJlbiAhPSBudWxsKSB7XG5cdFx0XHR2YXIgY2hpbGRyZW4gPSB2bm9kZS5jaGlsZHJlblxuXHRcdFx0Y3JlYXRlTm9kZXMoZnJhZ21lbnQsIGNoaWxkcmVuLCAwLCBjaGlsZHJlbi5sZW5ndGgsIGhvb2tzLCBudWxsLCBucylcblx0XHR9XG5cdFx0dm5vZGUuZG9tID0gZnJhZ21lbnQuZmlyc3RDaGlsZFxuXHRcdHZub2RlLmRvbVNpemUgPSBmcmFnbWVudC5jaGlsZE5vZGVzLmxlbmd0aFxuXHRcdGluc2VydE5vZGUocGFyZW50LCBmcmFnbWVudCwgbmV4dFNpYmxpbmcpXG5cdFx0cmV0dXJuIGZyYWdtZW50XG5cdH1cblx0ZnVuY3Rpb24gY3JlYXRlRWxlbWVudChwYXJlbnQsIHZub2RlLCBob29rcywgbnMsIG5leHRTaWJsaW5nKSB7XG5cdFx0dmFyIHRhZyA9IHZub2RlLnRhZ1xuXHRcdHN3aXRjaCAodm5vZGUudGFnKSB7XG5cdFx0XHRjYXNlIFwic3ZnXCI6IG5zID0gXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiOyBicmVha1xuXHRcdFx0Y2FzZSBcIm1hdGhcIjogbnMgPSBcImh0dHA6Ly93d3cudzMub3JnLzE5OTgvTWF0aC9NYXRoTUxcIjsgYnJlYWtcblx0XHR9XG5cdFx0dmFyIGF0dHJzMiA9IHZub2RlLmF0dHJzXG5cdFx0dmFyIGlzID0gYXR0cnMyICYmIGF0dHJzMi5pc1xuXHRcdHZhciBlbGVtZW50ID0gbnMgP1xuXHRcdFx0aXMgPyAkZG9jLmNyZWF0ZUVsZW1lbnROUyhucywgdGFnLCB7aXM6IGlzfSkgOiAkZG9jLmNyZWF0ZUVsZW1lbnROUyhucywgdGFnKSA6XG5cdFx0XHRpcyA/ICRkb2MuY3JlYXRlRWxlbWVudCh0YWcsIHtpczogaXN9KSA6ICRkb2MuY3JlYXRlRWxlbWVudCh0YWcpXG5cdFx0dm5vZGUuZG9tID0gZWxlbWVudFxuXHRcdGlmIChhdHRyczIgIT0gbnVsbCkge1xuXHRcdFx0c2V0QXR0cnModm5vZGUsIGF0dHJzMiwgbnMpXG5cdFx0fVxuXHRcdGluc2VydE5vZGUocGFyZW50LCBlbGVtZW50LCBuZXh0U2libGluZylcblx0XHRpZiAodm5vZGUuYXR0cnMgIT0gbnVsbCAmJiB2bm9kZS5hdHRycy5jb250ZW50ZWRpdGFibGUgIT0gbnVsbCkge1xuXHRcdFx0c2V0Q29udGVudEVkaXRhYmxlKHZub2RlKVxuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdGlmICh2bm9kZS50ZXh0ICE9IG51bGwpIHtcblx0XHRcdFx0aWYgKHZub2RlLnRleHQgIT09IFwiXCIpIGVsZW1lbnQudGV4dENvbnRlbnQgPSB2bm9kZS50ZXh0XG5cdFx0XHRcdGVsc2Ugdm5vZGUuY2hpbGRyZW4gPSBbVm5vZGUoXCIjXCIsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB2bm9kZS50ZXh0LCB1bmRlZmluZWQsIHVuZGVmaW5lZCldXG5cdFx0XHR9XG5cdFx0XHRpZiAodm5vZGUuY2hpbGRyZW4gIT0gbnVsbCkge1xuXHRcdFx0XHR2YXIgY2hpbGRyZW4gPSB2bm9kZS5jaGlsZHJlblxuXHRcdFx0XHRjcmVhdGVOb2RlcyhlbGVtZW50LCBjaGlsZHJlbiwgMCwgY2hpbGRyZW4ubGVuZ3RoLCBob29rcywgbnVsbCwgbnMpXG5cdFx0XHRcdHNldExhdGVBdHRycyh2bm9kZSlcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGVsZW1lbnRcblx0fVxuXHRmdW5jdGlvbiBjcmVhdGVDb21wb25lbnQocGFyZW50LCB2bm9kZSwgaG9va3MsIG5zLCBuZXh0U2libGluZykge1xuXHRcdHZub2RlLnN0YXRlID0gT2JqZWN0LmNyZWF0ZSh2bm9kZS50YWcpXG5cdFx0dmFyIHZpZXcgPSB2bm9kZS50YWcudmlld1xuXHRcdGlmICh2aWV3LnJlZW50cmFudExvY2sgIT0gbnVsbCkgcmV0dXJuICRlbXB0eUZyYWdtZW50XG5cdFx0dmlldy5yZWVudHJhbnRMb2NrID0gdHJ1ZVxuXHRcdGluaXRMaWZlY3ljbGUodm5vZGUudGFnLCB2bm9kZSwgaG9va3MpXG5cdFx0dm5vZGUuaW5zdGFuY2UgPSBWbm9kZS5ub3JtYWxpemUodmlldy5jYWxsKHZub2RlLnN0YXRlLCB2bm9kZSkpXG5cdFx0dmlldy5yZWVudHJhbnRMb2NrID0gbnVsbFxuXHRcdGlmICh2bm9kZS5pbnN0YW5jZSAhPSBudWxsKSB7XG5cdFx0XHRpZiAodm5vZGUuaW5zdGFuY2UgPT09IHZub2RlKSB0aHJvdyBFcnJvcihcIkEgdmlldyBjYW5ub3QgcmV0dXJuIHRoZSB2bm9kZSBpdCByZWNlaXZlZCBhcyBhcmd1bWVudHNcIilcblx0XHRcdHZhciBlbGVtZW50ID0gY3JlYXRlTm9kZShwYXJlbnQsIHZub2RlLmluc3RhbmNlLCBob29rcywgbnMsIG5leHRTaWJsaW5nKVxuXHRcdFx0dm5vZGUuZG9tID0gdm5vZGUuaW5zdGFuY2UuZG9tXG5cdFx0XHR2bm9kZS5kb21TaXplID0gdm5vZGUuZG9tICE9IG51bGwgPyB2bm9kZS5pbnN0YW5jZS5kb21TaXplIDogMFxuXHRcdFx0aW5zZXJ0Tm9kZShwYXJlbnQsIGVsZW1lbnQsIG5leHRTaWJsaW5nKVxuXHRcdFx0cmV0dXJuIGVsZW1lbnRcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHR2bm9kZS5kb21TaXplID0gMFxuXHRcdFx0cmV0dXJuICRlbXB0eUZyYWdtZW50XG5cdFx0fVxuXHR9XG5cdC8vdXBkYXRlXG5cdGZ1bmN0aW9uIHVwZGF0ZU5vZGVzKHBhcmVudCwgb2xkLCB2bm9kZXMsIHJlY3ljbGluZywgaG9va3MsIG5leHRTaWJsaW5nLCBucykge1xuXHRcdGlmIChvbGQgPT09IHZub2RlcyB8fCBvbGQgPT0gbnVsbCAmJiB2bm9kZXMgPT0gbnVsbCkgcmV0dXJuXG5cdFx0ZWxzZSBpZiAob2xkID09IG51bGwpIGNyZWF0ZU5vZGVzKHBhcmVudCwgdm5vZGVzLCAwLCB2bm9kZXMubGVuZ3RoLCBob29rcywgbmV4dFNpYmxpbmcsIHVuZGVmaW5lZClcblx0XHRlbHNlIGlmICh2bm9kZXMgPT0gbnVsbCkgcmVtb3ZlTm9kZXMob2xkLCAwLCBvbGQubGVuZ3RoLCB2bm9kZXMpXG5cdFx0ZWxzZSB7XG5cdFx0XHRpZiAob2xkLmxlbmd0aCA9PT0gdm5vZGVzLmxlbmd0aCkge1xuXHRcdFx0XHR2YXIgaXNVbmtleWVkID0gZmFsc2Vcblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB2bm9kZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRpZiAodm5vZGVzW2ldICE9IG51bGwgJiYgb2xkW2ldICE9IG51bGwpIHtcblx0XHRcdFx0XHRcdGlzVW5rZXllZCA9IHZub2Rlc1tpXS5rZXkgPT0gbnVsbCAmJiBvbGRbaV0ua2V5ID09IG51bGxcblx0XHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChpc1Vua2V5ZWQpIHtcblx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG9sZC5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdFx0aWYgKG9sZFtpXSA9PT0gdm5vZGVzW2ldKSBjb250aW51ZVxuXHRcdFx0XHRcdFx0ZWxzZSBpZiAob2xkW2ldID09IG51bGwgJiYgdm5vZGVzW2ldICE9IG51bGwpIGNyZWF0ZU5vZGUocGFyZW50LCB2bm9kZXNbaV0sIGhvb2tzLCBucywgZ2V0TmV4dFNpYmxpbmcob2xkLCBpICsgMSwgbmV4dFNpYmxpbmcpKVxuXHRcdFx0XHRcdFx0ZWxzZSBpZiAodm5vZGVzW2ldID09IG51bGwpIHJlbW92ZU5vZGVzKG9sZCwgaSwgaSArIDEsIHZub2Rlcylcblx0XHRcdFx0XHRcdGVsc2UgdXBkYXRlTm9kZShwYXJlbnQsIG9sZFtpXSwgdm5vZGVzW2ldLCBob29rcywgZ2V0TmV4dFNpYmxpbmcob2xkLCBpICsgMSwgbmV4dFNpYmxpbmcpLCBmYWxzZSwgbnMpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVyblxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZWN5Y2xpbmcgPSByZWN5Y2xpbmcgfHwgaXNSZWN5Y2xhYmxlKG9sZCwgdm5vZGVzKVxuXHRcdFx0aWYgKHJlY3ljbGluZykgb2xkID0gb2xkLmNvbmNhdChvbGQucG9vbClcblx0XHRcdFxuXHRcdFx0dmFyIG9sZFN0YXJ0ID0gMCwgc3RhcnQgPSAwLCBvbGRFbmQgPSBvbGQubGVuZ3RoIC0gMSwgZW5kID0gdm5vZGVzLmxlbmd0aCAtIDEsIG1hcFxuXHRcdFx0d2hpbGUgKG9sZEVuZCA+PSBvbGRTdGFydCAmJiBlbmQgPj0gc3RhcnQpIHtcblx0XHRcdFx0dmFyIG8gPSBvbGRbb2xkU3RhcnRdLCB2ID0gdm5vZGVzW3N0YXJ0XVxuXHRcdFx0XHRpZiAobyA9PT0gdiAmJiAhcmVjeWNsaW5nKSBvbGRTdGFydCsrLCBzdGFydCsrXG5cdFx0XHRcdGVsc2UgaWYgKG8gPT0gbnVsbCkgb2xkU3RhcnQrK1xuXHRcdFx0XHRlbHNlIGlmICh2ID09IG51bGwpIHN0YXJ0Kytcblx0XHRcdFx0ZWxzZSBpZiAoby5rZXkgPT09IHYua2V5KSB7XG5cdFx0XHRcdFx0b2xkU3RhcnQrKywgc3RhcnQrK1xuXHRcdFx0XHRcdHVwZGF0ZU5vZGUocGFyZW50LCBvLCB2LCBob29rcywgZ2V0TmV4dFNpYmxpbmcob2xkLCBvbGRTdGFydCwgbmV4dFNpYmxpbmcpLCByZWN5Y2xpbmcsIG5zKVxuXHRcdFx0XHRcdGlmIChyZWN5Y2xpbmcgJiYgby50YWcgPT09IHYudGFnKSBpbnNlcnROb2RlKHBhcmVudCwgdG9GcmFnbWVudChvKSwgbmV4dFNpYmxpbmcpXG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0dmFyIG8gPSBvbGRbb2xkRW5kXVxuXHRcdFx0XHRcdGlmIChvID09PSB2ICYmICFyZWN5Y2xpbmcpIG9sZEVuZC0tLCBzdGFydCsrXG5cdFx0XHRcdFx0ZWxzZSBpZiAobyA9PSBudWxsKSBvbGRFbmQtLVxuXHRcdFx0XHRcdGVsc2UgaWYgKHYgPT0gbnVsbCkgc3RhcnQrK1xuXHRcdFx0XHRcdGVsc2UgaWYgKG8ua2V5ID09PSB2LmtleSkge1xuXHRcdFx0XHRcdFx0dXBkYXRlTm9kZShwYXJlbnQsIG8sIHYsIGhvb2tzLCBnZXROZXh0U2libGluZyhvbGQsIG9sZEVuZCArIDEsIG5leHRTaWJsaW5nKSwgcmVjeWNsaW5nLCBucylcblx0XHRcdFx0XHRcdGlmIChyZWN5Y2xpbmcgfHwgc3RhcnQgPCBlbmQpIGluc2VydE5vZGUocGFyZW50LCB0b0ZyYWdtZW50KG8pLCBnZXROZXh0U2libGluZyhvbGQsIG9sZFN0YXJ0LCBuZXh0U2libGluZykpXG5cdFx0XHRcdFx0XHRvbGRFbmQtLSwgc3RhcnQrK1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlIGJyZWFrXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHdoaWxlIChvbGRFbmQgPj0gb2xkU3RhcnQgJiYgZW5kID49IHN0YXJ0KSB7XG5cdFx0XHRcdHZhciBvID0gb2xkW29sZEVuZF0sIHYgPSB2bm9kZXNbZW5kXVxuXHRcdFx0XHRpZiAobyA9PT0gdiAmJiAhcmVjeWNsaW5nKSBvbGRFbmQtLSwgZW5kLS1cblx0XHRcdFx0ZWxzZSBpZiAobyA9PSBudWxsKSBvbGRFbmQtLVxuXHRcdFx0XHRlbHNlIGlmICh2ID09IG51bGwpIGVuZC0tXG5cdFx0XHRcdGVsc2UgaWYgKG8ua2V5ID09PSB2LmtleSkge1xuXHRcdFx0XHRcdHVwZGF0ZU5vZGUocGFyZW50LCBvLCB2LCBob29rcywgZ2V0TmV4dFNpYmxpbmcob2xkLCBvbGRFbmQgKyAxLCBuZXh0U2libGluZyksIHJlY3ljbGluZywgbnMpXG5cdFx0XHRcdFx0aWYgKHJlY3ljbGluZyAmJiBvLnRhZyA9PT0gdi50YWcpIGluc2VydE5vZGUocGFyZW50LCB0b0ZyYWdtZW50KG8pLCBuZXh0U2libGluZylcblx0XHRcdFx0XHRpZiAoby5kb20gIT0gbnVsbCkgbmV4dFNpYmxpbmcgPSBvLmRvbVxuXHRcdFx0XHRcdG9sZEVuZC0tLCBlbmQtLVxuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdGlmICghbWFwKSBtYXAgPSBnZXRLZXlNYXAob2xkLCBvbGRFbmQpXG5cdFx0XHRcdFx0aWYgKHYgIT0gbnVsbCkge1xuXHRcdFx0XHRcdFx0dmFyIG9sZEluZGV4ID0gbWFwW3Yua2V5XVxuXHRcdFx0XHRcdFx0aWYgKG9sZEluZGV4ICE9IG51bGwpIHtcblx0XHRcdFx0XHRcdFx0dmFyIG1vdmFibGUgPSBvbGRbb2xkSW5kZXhdXG5cdFx0XHRcdFx0XHRcdHVwZGF0ZU5vZGUocGFyZW50LCBtb3ZhYmxlLCB2LCBob29rcywgZ2V0TmV4dFNpYmxpbmcob2xkLCBvbGRFbmQgKyAxLCBuZXh0U2libGluZyksIHJlY3ljbGluZywgbnMpXG5cdFx0XHRcdFx0XHRcdGluc2VydE5vZGUocGFyZW50LCB0b0ZyYWdtZW50KG1vdmFibGUpLCBuZXh0U2libGluZylcblx0XHRcdFx0XHRcdFx0b2xkW29sZEluZGV4XS5za2lwID0gdHJ1ZVxuXHRcdFx0XHRcdFx0XHRpZiAobW92YWJsZS5kb20gIT0gbnVsbCkgbmV4dFNpYmxpbmcgPSBtb3ZhYmxlLmRvbVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHZhciBkb20gPSBjcmVhdGVOb2RlKHBhcmVudCwgdiwgaG9va3MsIHVuZGVmaW5lZCwgbmV4dFNpYmxpbmcpXG5cdFx0XHRcdFx0XHRcdG5leHRTaWJsaW5nID0gZG9tXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVuZC0tXG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKGVuZCA8IHN0YXJ0KSBicmVha1xuXHRcdFx0fVxuXHRcdFx0Y3JlYXRlTm9kZXMocGFyZW50LCB2bm9kZXMsIHN0YXJ0LCBlbmQgKyAxLCBob29rcywgbmV4dFNpYmxpbmcsIG5zKVxuXHRcdFx0cmVtb3ZlTm9kZXMob2xkLCBvbGRTdGFydCwgb2xkRW5kICsgMSwgdm5vZGVzKVxuXHRcdH1cblx0fVxuXHRmdW5jdGlvbiB1cGRhdGVOb2RlKHBhcmVudCwgb2xkLCB2bm9kZSwgaG9va3MsIG5leHRTaWJsaW5nLCByZWN5Y2xpbmcsIG5zKSB7XG5cdFx0dmFyIG9sZFRhZyA9IG9sZC50YWcsIHRhZyA9IHZub2RlLnRhZ1xuXHRcdGlmIChvbGRUYWcgPT09IHRhZykge1xuXHRcdFx0dm5vZGUuc3RhdGUgPSBvbGQuc3RhdGVcblx0XHRcdHZub2RlLmV2ZW50cyA9IG9sZC5ldmVudHNcblx0XHRcdGlmIChzaG91bGRVcGRhdGUodm5vZGUsIG9sZCkpIHJldHVyblxuXHRcdFx0aWYgKHZub2RlLmF0dHJzICE9IG51bGwpIHtcblx0XHRcdFx0dXBkYXRlTGlmZWN5Y2xlKHZub2RlLmF0dHJzLCB2bm9kZSwgaG9va3MsIHJlY3ljbGluZylcblx0XHRcdH1cblx0XHRcdGlmICh0eXBlb2Ygb2xkVGFnID09PSBcInN0cmluZ1wiKSB7XG5cdFx0XHRcdHN3aXRjaCAob2xkVGFnKSB7XG5cdFx0XHRcdFx0Y2FzZSBcIiNcIjogdXBkYXRlVGV4dChvbGQsIHZub2RlKTsgYnJlYWtcblx0XHRcdFx0XHRjYXNlIFwiPFwiOiB1cGRhdGVIVE1MKHBhcmVudCwgb2xkLCB2bm9kZSwgbmV4dFNpYmxpbmcpOyBicmVha1xuXHRcdFx0XHRcdGNhc2UgXCJbXCI6IHVwZGF0ZUZyYWdtZW50KHBhcmVudCwgb2xkLCB2bm9kZSwgcmVjeWNsaW5nLCBob29rcywgbmV4dFNpYmxpbmcsIG5zKTsgYnJlYWtcblx0XHRcdFx0XHRkZWZhdWx0OiB1cGRhdGVFbGVtZW50KG9sZCwgdm5vZGUsIHJlY3ljbGluZywgaG9va3MsIG5zKVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHVwZGF0ZUNvbXBvbmVudChwYXJlbnQsIG9sZCwgdm5vZGUsIGhvb2tzLCBuZXh0U2libGluZywgcmVjeWNsaW5nLCBucylcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHRyZW1vdmVOb2RlKG9sZCwgbnVsbClcblx0XHRcdGNyZWF0ZU5vZGUocGFyZW50LCB2bm9kZSwgaG9va3MsIG5zLCBuZXh0U2libGluZylcblx0XHR9XG5cdH1cblx0ZnVuY3Rpb24gdXBkYXRlVGV4dChvbGQsIHZub2RlKSB7XG5cdFx0aWYgKG9sZC5jaGlsZHJlbi50b1N0cmluZygpICE9PSB2bm9kZS5jaGlsZHJlbi50b1N0cmluZygpKSB7XG5cdFx0XHRvbGQuZG9tLm5vZGVWYWx1ZSA9IHZub2RlLmNoaWxkcmVuXG5cdFx0fVxuXHRcdHZub2RlLmRvbSA9IG9sZC5kb21cblx0fVxuXHRmdW5jdGlvbiB1cGRhdGVIVE1MKHBhcmVudCwgb2xkLCB2bm9kZSwgbmV4dFNpYmxpbmcpIHtcblx0XHRpZiAob2xkLmNoaWxkcmVuICE9PSB2bm9kZS5jaGlsZHJlbikge1xuXHRcdFx0dG9GcmFnbWVudChvbGQpXG5cdFx0XHRjcmVhdGVIVE1MKHBhcmVudCwgdm5vZGUsIG5leHRTaWJsaW5nKVxuXHRcdH1cblx0XHRlbHNlIHZub2RlLmRvbSA9IG9sZC5kb20sIHZub2RlLmRvbVNpemUgPSBvbGQuZG9tU2l6ZVxuXHR9XG5cdGZ1bmN0aW9uIHVwZGF0ZUZyYWdtZW50KHBhcmVudCwgb2xkLCB2bm9kZSwgcmVjeWNsaW5nLCBob29rcywgbmV4dFNpYmxpbmcsIG5zKSB7XG5cdFx0dXBkYXRlTm9kZXMocGFyZW50LCBvbGQuY2hpbGRyZW4sIHZub2RlLmNoaWxkcmVuLCByZWN5Y2xpbmcsIGhvb2tzLCBuZXh0U2libGluZywgbnMpXG5cdFx0dmFyIGRvbVNpemUgPSAwLCBjaGlsZHJlbiA9IHZub2RlLmNoaWxkcmVuXG5cdFx0dm5vZGUuZG9tID0gbnVsbFxuXHRcdGlmIChjaGlsZHJlbiAhPSBudWxsKSB7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdHZhciBjaGlsZCA9IGNoaWxkcmVuW2ldXG5cdFx0XHRcdGlmIChjaGlsZCAhPSBudWxsICYmIGNoaWxkLmRvbSAhPSBudWxsKSB7XG5cdFx0XHRcdFx0aWYgKHZub2RlLmRvbSA9PSBudWxsKSB2bm9kZS5kb20gPSBjaGlsZC5kb21cblx0XHRcdFx0XHRkb21TaXplICs9IGNoaWxkLmRvbVNpemUgfHwgMVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZiAoZG9tU2l6ZSAhPT0gMSkgdm5vZGUuZG9tU2l6ZSA9IGRvbVNpemVcblx0XHR9XG5cdH1cblx0ZnVuY3Rpb24gdXBkYXRlRWxlbWVudChvbGQsIHZub2RlLCByZWN5Y2xpbmcsIGhvb2tzLCBucykge1xuXHRcdHZhciBlbGVtZW50ID0gdm5vZGUuZG9tID0gb2xkLmRvbVxuXHRcdHN3aXRjaCAodm5vZGUudGFnKSB7XG5cdFx0XHRjYXNlIFwic3ZnXCI6IG5zID0gXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiOyBicmVha1xuXHRcdFx0Y2FzZSBcIm1hdGhcIjogbnMgPSBcImh0dHA6Ly93d3cudzMub3JnLzE5OTgvTWF0aC9NYXRoTUxcIjsgYnJlYWtcblx0XHR9XG5cdFx0aWYgKHZub2RlLnRhZyA9PT0gXCJ0ZXh0YXJlYVwiKSB7XG5cdFx0XHRpZiAodm5vZGUuYXR0cnMgPT0gbnVsbCkgdm5vZGUuYXR0cnMgPSB7fVxuXHRcdFx0aWYgKHZub2RlLnRleHQgIT0gbnVsbCkge1xuXHRcdFx0XHR2bm9kZS5hdHRycy52YWx1ZSA9IHZub2RlLnRleHQgLy9GSVhNRSBoYW5kbGUwIG11bHRpcGxlIGNoaWxkcmVuXG5cdFx0XHRcdHZub2RlLnRleHQgPSB1bmRlZmluZWRcblx0XHRcdH1cblx0XHR9XG5cdFx0dXBkYXRlQXR0cnModm5vZGUsIG9sZC5hdHRycywgdm5vZGUuYXR0cnMsIG5zKVxuXHRcdGlmICh2bm9kZS5hdHRycyAhPSBudWxsICYmIHZub2RlLmF0dHJzLmNvbnRlbnRlZGl0YWJsZSAhPSBudWxsKSB7XG5cdFx0XHRzZXRDb250ZW50RWRpdGFibGUodm5vZGUpXG5cdFx0fVxuXHRcdGVsc2UgaWYgKG9sZC50ZXh0ICE9IG51bGwgJiYgdm5vZGUudGV4dCAhPSBudWxsICYmIHZub2RlLnRleHQgIT09IFwiXCIpIHtcblx0XHRcdGlmIChvbGQudGV4dC50b1N0cmluZygpICE9PSB2bm9kZS50ZXh0LnRvU3RyaW5nKCkpIG9sZC5kb20uZmlyc3RDaGlsZC5ub2RlVmFsdWUgPSB2bm9kZS50ZXh0XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0aWYgKG9sZC50ZXh0ICE9IG51bGwpIG9sZC5jaGlsZHJlbiA9IFtWbm9kZShcIiNcIiwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIG9sZC50ZXh0LCB1bmRlZmluZWQsIG9sZC5kb20uZmlyc3RDaGlsZCldXG5cdFx0XHRpZiAodm5vZGUudGV4dCAhPSBudWxsKSB2bm9kZS5jaGlsZHJlbiA9IFtWbm9kZShcIiNcIiwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHZub2RlLnRleHQsIHVuZGVmaW5lZCwgdW5kZWZpbmVkKV1cblx0XHRcdHVwZGF0ZU5vZGVzKGVsZW1lbnQsIG9sZC5jaGlsZHJlbiwgdm5vZGUuY2hpbGRyZW4sIHJlY3ljbGluZywgaG9va3MsIG51bGwsIG5zKVxuXHRcdH1cblx0fVxuXHRmdW5jdGlvbiB1cGRhdGVDb21wb25lbnQocGFyZW50LCBvbGQsIHZub2RlLCBob29rcywgbmV4dFNpYmxpbmcsIHJlY3ljbGluZywgbnMpIHtcblx0XHR2bm9kZS5pbnN0YW5jZSA9IFZub2RlLm5vcm1hbGl6ZSh2bm9kZS50YWcudmlldy5jYWxsKHZub2RlLnN0YXRlLCB2bm9kZSkpXG5cdFx0dXBkYXRlTGlmZWN5Y2xlKHZub2RlLnRhZywgdm5vZGUsIGhvb2tzLCByZWN5Y2xpbmcpXG5cdFx0aWYgKHZub2RlLmluc3RhbmNlICE9IG51bGwpIHtcblx0XHRcdGlmIChvbGQuaW5zdGFuY2UgPT0gbnVsbCkgY3JlYXRlTm9kZShwYXJlbnQsIHZub2RlLmluc3RhbmNlLCBob29rcywgbnMsIG5leHRTaWJsaW5nKVxuXHRcdFx0ZWxzZSB1cGRhdGVOb2RlKHBhcmVudCwgb2xkLmluc3RhbmNlLCB2bm9kZS5pbnN0YW5jZSwgaG9va3MsIG5leHRTaWJsaW5nLCByZWN5Y2xpbmcsIG5zKVxuXHRcdFx0dm5vZGUuZG9tID0gdm5vZGUuaW5zdGFuY2UuZG9tXG5cdFx0XHR2bm9kZS5kb21TaXplID0gdm5vZGUuaW5zdGFuY2UuZG9tU2l6ZVxuXHRcdH1cblx0XHRlbHNlIGlmIChvbGQuaW5zdGFuY2UgIT0gbnVsbCkge1xuXHRcdFx0cmVtb3ZlTm9kZShvbGQuaW5zdGFuY2UsIG51bGwpXG5cdFx0XHR2bm9kZS5kb20gPSB1bmRlZmluZWRcblx0XHRcdHZub2RlLmRvbVNpemUgPSAwXG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0dm5vZGUuZG9tID0gb2xkLmRvbVxuXHRcdFx0dm5vZGUuZG9tU2l6ZSA9IG9sZC5kb21TaXplXG5cdFx0fVxuXHR9XG5cdGZ1bmN0aW9uIGlzUmVjeWNsYWJsZShvbGQsIHZub2Rlcykge1xuXHRcdGlmIChvbGQucG9vbCAhPSBudWxsICYmIE1hdGguYWJzKG9sZC5wb29sLmxlbmd0aCAtIHZub2Rlcy5sZW5ndGgpIDw9IE1hdGguYWJzKG9sZC5sZW5ndGggLSB2bm9kZXMubGVuZ3RoKSkge1xuXHRcdFx0dmFyIG9sZENoaWxkcmVuTGVuZ3RoID0gb2xkWzBdICYmIG9sZFswXS5jaGlsZHJlbiAmJiBvbGRbMF0uY2hpbGRyZW4ubGVuZ3RoIHx8IDBcblx0XHRcdHZhciBwb29sQ2hpbGRyZW5MZW5ndGggPSBvbGQucG9vbFswXSAmJiBvbGQucG9vbFswXS5jaGlsZHJlbiAmJiBvbGQucG9vbFswXS5jaGlsZHJlbi5sZW5ndGggfHwgMFxuXHRcdFx0dmFyIHZub2Rlc0NoaWxkcmVuTGVuZ3RoID0gdm5vZGVzWzBdICYmIHZub2Rlc1swXS5jaGlsZHJlbiAmJiB2bm9kZXNbMF0uY2hpbGRyZW4ubGVuZ3RoIHx8IDBcblx0XHRcdGlmIChNYXRoLmFicyhwb29sQ2hpbGRyZW5MZW5ndGggLSB2bm9kZXNDaGlsZHJlbkxlbmd0aCkgPD0gTWF0aC5hYnMob2xkQ2hpbGRyZW5MZW5ndGggLSB2bm9kZXNDaGlsZHJlbkxlbmd0aCkpIHtcblx0XHRcdFx0cmV0dXJuIHRydWVcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlXG5cdH1cblx0ZnVuY3Rpb24gZ2V0S2V5TWFwKHZub2RlcywgZW5kKSB7XG5cdFx0dmFyIG1hcCA9IHt9LCBpID0gMFxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZW5kOyBpKyspIHtcblx0XHRcdHZhciB2bm9kZSA9IHZub2Rlc1tpXVxuXHRcdFx0aWYgKHZub2RlICE9IG51bGwpIHtcblx0XHRcdFx0dmFyIGtleTIgPSB2bm9kZS5rZXlcblx0XHRcdFx0aWYgKGtleTIgIT0gbnVsbCkgbWFwW2tleTJdID0gaVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gbWFwXG5cdH1cblx0ZnVuY3Rpb24gdG9GcmFnbWVudCh2bm9kZSkge1xuXHRcdHZhciBjb3VudDAgPSB2bm9kZS5kb21TaXplXG5cdFx0aWYgKGNvdW50MCAhPSBudWxsIHx8IHZub2RlLmRvbSA9PSBudWxsKSB7XG5cdFx0XHR2YXIgZnJhZ21lbnQgPSAkZG9jLmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKVxuXHRcdFx0aWYgKGNvdW50MCA+IDApIHtcblx0XHRcdFx0dmFyIGRvbSA9IHZub2RlLmRvbVxuXHRcdFx0XHR3aGlsZSAoLS1jb3VudDApIGZyYWdtZW50LmFwcGVuZENoaWxkKGRvbS5uZXh0U2libGluZylcblx0XHRcdFx0ZnJhZ21lbnQuaW5zZXJ0QmVmb3JlKGRvbSwgZnJhZ21lbnQuZmlyc3RDaGlsZClcblx0XHRcdH1cblx0XHRcdHJldHVybiBmcmFnbWVudFxuXHRcdH1cblx0XHRlbHNlIHJldHVybiB2bm9kZS5kb21cblx0fVxuXHRmdW5jdGlvbiBnZXROZXh0U2libGluZyh2bm9kZXMsIGksIG5leHRTaWJsaW5nKSB7XG5cdFx0Zm9yICg7IGkgPCB2bm9kZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGlmICh2bm9kZXNbaV0gIT0gbnVsbCAmJiB2bm9kZXNbaV0uZG9tICE9IG51bGwpIHJldHVybiB2bm9kZXNbaV0uZG9tXG5cdFx0fVxuXHRcdHJldHVybiBuZXh0U2libGluZ1xuXHR9XG5cdGZ1bmN0aW9uIGluc2VydE5vZGUocGFyZW50LCBkb20sIG5leHRTaWJsaW5nKSB7XG5cdFx0aWYgKG5leHRTaWJsaW5nICYmIG5leHRTaWJsaW5nLnBhcmVudE5vZGUpIHBhcmVudC5pbnNlcnRCZWZvcmUoZG9tLCBuZXh0U2libGluZylcblx0XHRlbHNlIHBhcmVudC5hcHBlbmRDaGlsZChkb20pXG5cdH1cblx0ZnVuY3Rpb24gc2V0Q29udGVudEVkaXRhYmxlKHZub2RlKSB7XG5cdFx0dmFyIGNoaWxkcmVuID0gdm5vZGUuY2hpbGRyZW5cblx0XHRpZiAoY2hpbGRyZW4gIT0gbnVsbCAmJiBjaGlsZHJlbi5sZW5ndGggPT09IDEgJiYgY2hpbGRyZW5bMF0udGFnID09PSBcIjxcIikge1xuXHRcdFx0dmFyIGNvbnRlbnQgPSBjaGlsZHJlblswXS5jaGlsZHJlblxuXHRcdFx0aWYgKHZub2RlLmRvbS5pbm5lckhUTUwgIT09IGNvbnRlbnQpIHZub2RlLmRvbS5pbm5lckhUTUwgPSBjb250ZW50XG5cdFx0fVxuXHRcdGVsc2UgaWYgKHZub2RlLnRleHQgIT0gbnVsbCB8fCBjaGlsZHJlbiAhPSBudWxsICYmIGNoaWxkcmVuLmxlbmd0aCAhPT0gMCkgdGhyb3cgbmV3IEVycm9yKFwiQ2hpbGQgbm9kZSBvZiBhIGNvbnRlbnRlZGl0YWJsZSBtdXN0IGJlIHRydXN0ZWRcIilcblx0fVxuXHQvL3JlbW92ZVxuXHRmdW5jdGlvbiByZW1vdmVOb2Rlcyh2bm9kZXMsIHN0YXJ0LCBlbmQsIGNvbnRleHQpIHtcblx0XHRmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkrKykge1xuXHRcdFx0dmFyIHZub2RlID0gdm5vZGVzW2ldXG5cdFx0XHRpZiAodm5vZGUgIT0gbnVsbCkge1xuXHRcdFx0XHRpZiAodm5vZGUuc2tpcCkgdm5vZGUuc2tpcCA9IGZhbHNlXG5cdFx0XHRcdGVsc2UgcmVtb3ZlTm9kZSh2bm9kZSwgY29udGV4dClcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0ZnVuY3Rpb24gcmVtb3ZlTm9kZSh2bm9kZSwgY29udGV4dCkge1xuXHRcdHZhciBleHBlY3RlZCA9IDEsIGNhbGxlZCA9IDBcblx0XHRpZiAodm5vZGUuYXR0cnMgJiYgdm5vZGUuYXR0cnMub25iZWZvcmVyZW1vdmUpIHtcblx0XHRcdHZhciByZXN1bHQgPSB2bm9kZS5hdHRycy5vbmJlZm9yZXJlbW92ZS5jYWxsKHZub2RlLnN0YXRlLCB2bm9kZSlcblx0XHRcdGlmIChyZXN1bHQgIT0gbnVsbCAmJiB0eXBlb2YgcmVzdWx0LnRoZW4gPT09IFwiZnVuY3Rpb25cIikge1xuXHRcdFx0XHRleHBlY3RlZCsrXG5cdFx0XHRcdHJlc3VsdC50aGVuKGNvbnRpbnVhdGlvbiwgY29udGludWF0aW9uKVxuXHRcdFx0fVxuXHRcdH1cblx0XHRpZiAodHlwZW9mIHZub2RlLnRhZyAhPT0gXCJzdHJpbmdcIiAmJiB2bm9kZS50YWcub25iZWZvcmVyZW1vdmUpIHtcblx0XHRcdHZhciByZXN1bHQgPSB2bm9kZS50YWcub25iZWZvcmVyZW1vdmUuY2FsbCh2bm9kZS5zdGF0ZSwgdm5vZGUpXG5cdFx0XHRpZiAocmVzdWx0ICE9IG51bGwgJiYgdHlwZW9mIHJlc3VsdC50aGVuID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdFx0ZXhwZWN0ZWQrK1xuXHRcdFx0XHRyZXN1bHQudGhlbihjb250aW51YXRpb24sIGNvbnRpbnVhdGlvbilcblx0XHRcdH1cblx0XHR9XG5cdFx0Y29udGludWF0aW9uKClcblx0XHRmdW5jdGlvbiBjb250aW51YXRpb24oKSB7XG5cdFx0XHRpZiAoKytjYWxsZWQgPT09IGV4cGVjdGVkKSB7XG5cdFx0XHRcdG9ucmVtb3ZlKHZub2RlKVxuXHRcdFx0XHRpZiAodm5vZGUuZG9tKSB7XG5cdFx0XHRcdFx0dmFyIGNvdW50MCA9IHZub2RlLmRvbVNpemUgfHwgMVxuXHRcdFx0XHRcdGlmIChjb3VudDAgPiAxKSB7XG5cdFx0XHRcdFx0XHR2YXIgZG9tID0gdm5vZGUuZG9tXG5cdFx0XHRcdFx0XHR3aGlsZSAoLS1jb3VudDApIHtcblx0XHRcdFx0XHRcdFx0cmVtb3ZlTm9kZUZyb21ET00oZG9tLm5leHRTaWJsaW5nKVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZW1vdmVOb2RlRnJvbURPTSh2bm9kZS5kb20pXG5cdFx0XHRcdFx0aWYgKGNvbnRleHQgIT0gbnVsbCAmJiB2bm9kZS5kb21TaXplID09IG51bGwgJiYgIWhhc0ludGVncmF0aW9uTWV0aG9kcyh2bm9kZS5hdHRycykgJiYgdHlwZW9mIHZub2RlLnRhZyA9PT0gXCJzdHJpbmdcIikgeyAvL1RPRE8gdGVzdCBjdXN0b20gZWxlbWVudHNcblx0XHRcdFx0XHRcdGlmICghY29udGV4dC5wb29sKSBjb250ZXh0LnBvb2wgPSBbdm5vZGVdXG5cdFx0XHRcdFx0XHRlbHNlIGNvbnRleHQucG9vbC5wdXNoKHZub2RlKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRmdW5jdGlvbiByZW1vdmVOb2RlRnJvbURPTShub2RlKSB7XG5cdFx0dmFyIHBhcmVudCA9IG5vZGUucGFyZW50Tm9kZVxuXHRcdGlmIChwYXJlbnQgIT0gbnVsbCkgcGFyZW50LnJlbW92ZUNoaWxkKG5vZGUpXG5cdH1cblx0ZnVuY3Rpb24gb25yZW1vdmUodm5vZGUpIHtcblx0XHRpZiAodm5vZGUuYXR0cnMgJiYgdm5vZGUuYXR0cnMub25yZW1vdmUpIHZub2RlLmF0dHJzLm9ucmVtb3ZlLmNhbGwodm5vZGUuc3RhdGUsIHZub2RlKVxuXHRcdGlmICh0eXBlb2Ygdm5vZGUudGFnICE9PSBcInN0cmluZ1wiICYmIHZub2RlLnRhZy5vbnJlbW92ZSkgdm5vZGUudGFnLm9ucmVtb3ZlLmNhbGwodm5vZGUuc3RhdGUsIHZub2RlKVxuXHRcdGlmICh2bm9kZS5pbnN0YW5jZSAhPSBudWxsKSBvbnJlbW92ZSh2bm9kZS5pbnN0YW5jZSlcblx0XHRlbHNlIHtcblx0XHRcdHZhciBjaGlsZHJlbiA9IHZub2RlLmNoaWxkcmVuXG5cdFx0XHRpZiAoQXJyYXkuaXNBcnJheShjaGlsZHJlbikpIHtcblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdHZhciBjaGlsZCA9IGNoaWxkcmVuW2ldXG5cdFx0XHRcdFx0aWYgKGNoaWxkICE9IG51bGwpIG9ucmVtb3ZlKGNoaWxkKVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdC8vYXR0cnMyXG5cdGZ1bmN0aW9uIHNldEF0dHJzKHZub2RlLCBhdHRyczIsIG5zKSB7XG5cdFx0Zm9yICh2YXIga2V5MiBpbiBhdHRyczIpIHtcblx0XHRcdHNldEF0dHIodm5vZGUsIGtleTIsIG51bGwsIGF0dHJzMltrZXkyXSwgbnMpXG5cdFx0fVxuXHR9XG5cdGZ1bmN0aW9uIHNldEF0dHIodm5vZGUsIGtleTIsIG9sZCwgdmFsdWUsIG5zKSB7XG5cdFx0dmFyIGVsZW1lbnQgPSB2bm9kZS5kb21cblx0XHRpZiAoa2V5MiA9PT0gXCJrZXlcIiB8fCBrZXkyID09PSBcImlzXCIgfHwgKG9sZCA9PT0gdmFsdWUgJiYgIWlzRm9ybUF0dHJpYnV0ZSh2bm9kZSwga2V5MikpICYmIHR5cGVvZiB2YWx1ZSAhPT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgdmFsdWUgPT09IFwidW5kZWZpbmVkXCIgfHwgaXNMaWZlY3ljbGVNZXRob2Qoa2V5MikpIHJldHVyblxuXHRcdHZhciBuc0xhc3RJbmRleCA9IGtleTIuaW5kZXhPZihcIjpcIilcblx0XHRpZiAobnNMYXN0SW5kZXggPiAtMSAmJiBrZXkyLnN1YnN0cigwLCBuc0xhc3RJbmRleCkgPT09IFwieGxpbmtcIikge1xuXHRcdFx0ZWxlbWVudC5zZXRBdHRyaWJ1dGVOUyhcImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiwga2V5Mi5zbGljZShuc0xhc3RJbmRleCArIDEpLCB2YWx1ZSlcblx0XHR9XG5cdFx0ZWxzZSBpZiAoa2V5MlswXSA9PT0gXCJvXCIgJiYga2V5MlsxXSA9PT0gXCJuXCIgJiYgdHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCIpIHVwZGF0ZUV2ZW50KHZub2RlLCBrZXkyLCB2YWx1ZSlcblx0XHRlbHNlIGlmIChrZXkyID09PSBcInN0eWxlXCIpIHVwZGF0ZVN0eWxlKGVsZW1lbnQsIG9sZCwgdmFsdWUpXG5cdFx0ZWxzZSBpZiAoa2V5MiBpbiBlbGVtZW50ICYmICFpc0F0dHJpYnV0ZShrZXkyKSAmJiBucyA9PT0gdW5kZWZpbmVkICYmICFpc0N1c3RvbUVsZW1lbnQodm5vZGUpKSB7XG5cdFx0XHQvL3NldHRpbmcgaW5wdXRbdmFsdWVdIHRvIHNhbWUgdmFsdWUgYnkgdHlwaW5nIG9uIGZvY3VzZWQgZWxlbWVudCBtb3ZlcyBjdXJzb3IgdG8gZW5kIGluIENocm9tZVxuXHRcdFx0aWYgKHZub2RlLnRhZyA9PT0gXCJpbnB1dFwiICYmIGtleTIgPT09IFwidmFsdWVcIiAmJiB2bm9kZS5kb20udmFsdWUgPT09IHZhbHVlICYmIHZub2RlLmRvbSA9PT0gJGRvYy5hY3RpdmVFbGVtZW50KSByZXR1cm5cblx0XHRcdC8vc2V0dGluZyBzZWxlY3RbdmFsdWVdIHRvIHNhbWUgdmFsdWUgd2hpbGUgaGF2aW5nIHNlbGVjdCBvcGVuIGJsaW5rcyBzZWxlY3QgZHJvcGRvd24gaW4gQ2hyb21lXG5cdFx0XHRpZiAodm5vZGUudGFnID09PSBcInNlbGVjdFwiICYmIGtleTIgPT09IFwidmFsdWVcIiAmJiB2bm9kZS5kb20udmFsdWUgPT09IHZhbHVlICYmIHZub2RlLmRvbSA9PT0gJGRvYy5hY3RpdmVFbGVtZW50KSByZXR1cm5cblx0XHRcdC8vc2V0dGluZyBvcHRpb25bdmFsdWVdIHRvIHNhbWUgdmFsdWUgd2hpbGUgaGF2aW5nIHNlbGVjdCBvcGVuIGJsaW5rcyBzZWxlY3QgZHJvcGRvd24gaW4gQ2hyb21lXG5cdFx0XHRpZiAodm5vZGUudGFnID09PSBcIm9wdGlvblwiICYmIGtleTIgPT09IFwidmFsdWVcIiAmJiB2bm9kZS5kb20udmFsdWUgPT09IHZhbHVlKSByZXR1cm5cblx0XHRcdGVsZW1lbnRba2V5Ml0gPSB2YWx1ZVxuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdGlmICh0eXBlb2YgdmFsdWUgPT09IFwiYm9vbGVhblwiKSB7XG5cdFx0XHRcdGlmICh2YWx1ZSkgZWxlbWVudC5zZXRBdHRyaWJ1dGUoa2V5MiwgXCJcIilcblx0XHRcdFx0ZWxzZSBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShrZXkyKVxuXHRcdFx0fVxuXHRcdFx0ZWxzZSBlbGVtZW50LnNldEF0dHJpYnV0ZShrZXkyID09PSBcImNsYXNzTmFtZVwiID8gXCJjbGFzc1wiIDoga2V5MiwgdmFsdWUpXG5cdFx0fVxuXHR9XG5cdGZ1bmN0aW9uIHNldExhdGVBdHRycyh2bm9kZSkge1xuXHRcdHZhciBhdHRyczIgPSB2bm9kZS5hdHRyc1xuXHRcdGlmICh2bm9kZS50YWcgPT09IFwic2VsZWN0XCIgJiYgYXR0cnMyICE9IG51bGwpIHtcblx0XHRcdGlmIChcInZhbHVlXCIgaW4gYXR0cnMyKSBzZXRBdHRyKHZub2RlLCBcInZhbHVlXCIsIG51bGwsIGF0dHJzMi52YWx1ZSwgdW5kZWZpbmVkKVxuXHRcdFx0aWYgKFwic2VsZWN0ZWRJbmRleFwiIGluIGF0dHJzMikgc2V0QXR0cih2bm9kZSwgXCJzZWxlY3RlZEluZGV4XCIsIG51bGwsIGF0dHJzMi5zZWxlY3RlZEluZGV4LCB1bmRlZmluZWQpXG5cdFx0fVxuXHR9XG5cdGZ1bmN0aW9uIHVwZGF0ZUF0dHJzKHZub2RlLCBvbGQsIGF0dHJzMiwgbnMpIHtcblx0XHRpZiAoYXR0cnMyICE9IG51bGwpIHtcblx0XHRcdGZvciAodmFyIGtleTIgaW4gYXR0cnMyKSB7XG5cdFx0XHRcdHNldEF0dHIodm5vZGUsIGtleTIsIG9sZCAmJiBvbGRba2V5Ml0sIGF0dHJzMltrZXkyXSwgbnMpXG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmIChvbGQgIT0gbnVsbCkge1xuXHRcdFx0Zm9yICh2YXIga2V5MiBpbiBvbGQpIHtcblx0XHRcdFx0aWYgKGF0dHJzMiA9PSBudWxsIHx8ICEoa2V5MiBpbiBhdHRyczIpKSB7XG5cdFx0XHRcdFx0aWYgKGtleTIgPT09IFwiY2xhc3NOYW1lXCIpIGtleTIgPSBcImNsYXNzXCJcblx0XHRcdFx0XHRpZiAoa2V5MlswXSA9PT0gXCJvXCIgJiYga2V5MlsxXSA9PT0gXCJuXCIgJiYgIWlzTGlmZWN5Y2xlTWV0aG9kKGtleTIpKSB1cGRhdGVFdmVudCh2bm9kZSwga2V5MiwgdW5kZWZpbmVkKVxuXHRcdFx0XHRcdGVsc2UgaWYgKGtleTIgIT09IFwia2V5XCIpIHZub2RlLmRvbS5yZW1vdmVBdHRyaWJ1dGUoa2V5Milcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRmdW5jdGlvbiBpc0Zvcm1BdHRyaWJ1dGUodm5vZGUsIGF0dHIpIHtcblx0XHRyZXR1cm4gYXR0ciA9PT0gXCJ2YWx1ZVwiIHx8IGF0dHIgPT09IFwiY2hlY2tlZFwiIHx8IGF0dHIgPT09IFwic2VsZWN0ZWRJbmRleFwiIHx8IGF0dHIgPT09IFwic2VsZWN0ZWRcIiAmJiB2bm9kZS5kb20gPT09ICRkb2MuYWN0aXZlRWxlbWVudFxuXHR9XG5cdGZ1bmN0aW9uIGlzTGlmZWN5Y2xlTWV0aG9kKGF0dHIpIHtcblx0XHRyZXR1cm4gYXR0ciA9PT0gXCJvbmluaXRcIiB8fCBhdHRyID09PSBcIm9uY3JlYXRlXCIgfHwgYXR0ciA9PT0gXCJvbnVwZGF0ZVwiIHx8IGF0dHIgPT09IFwib25yZW1vdmVcIiB8fCBhdHRyID09PSBcIm9uYmVmb3JlcmVtb3ZlXCIgfHwgYXR0ciA9PT0gXCJvbmJlZm9yZXVwZGF0ZVwiXG5cdH1cblx0ZnVuY3Rpb24gaXNBdHRyaWJ1dGUoYXR0cikge1xuXHRcdHJldHVybiBhdHRyID09PSBcImhyZWZcIiB8fCBhdHRyID09PSBcImxpc3RcIiB8fCBhdHRyID09PSBcImZvcm1cIiB8fCBhdHRyID09PSBcIndpZHRoXCIgfHwgYXR0ciA9PT0gXCJoZWlnaHRcIi8vIHx8IGF0dHIgPT09IFwidHlwZVwiXG5cdH1cblx0ZnVuY3Rpb24gaXNDdXN0b21FbGVtZW50KHZub2RlKXtcblx0XHRyZXR1cm4gdm5vZGUuYXR0cnMuaXMgfHwgdm5vZGUudGFnLmluZGV4T2YoXCItXCIpID4gLTFcblx0fVxuXHRmdW5jdGlvbiBoYXNJbnRlZ3JhdGlvbk1ldGhvZHMoc291cmNlKSB7XG5cdFx0cmV0dXJuIHNvdXJjZSAhPSBudWxsICYmIChzb3VyY2Uub25jcmVhdGUgfHwgc291cmNlLm9udXBkYXRlIHx8IHNvdXJjZS5vbmJlZm9yZXJlbW92ZSB8fCBzb3VyY2Uub25yZW1vdmUpXG5cdH1cblx0Ly9zdHlsZVxuXHRmdW5jdGlvbiB1cGRhdGVTdHlsZShlbGVtZW50LCBvbGQsIHN0eWxlKSB7XG5cdFx0aWYgKG9sZCA9PT0gc3R5bGUpIGVsZW1lbnQuc3R5bGUuY3NzVGV4dCA9IFwiXCIsIG9sZCA9IG51bGxcblx0XHRpZiAoc3R5bGUgPT0gbnVsbCkgZWxlbWVudC5zdHlsZS5jc3NUZXh0ID0gXCJcIlxuXHRcdGVsc2UgaWYgKHR5cGVvZiBzdHlsZSA9PT0gXCJzdHJpbmdcIikgZWxlbWVudC5zdHlsZS5jc3NUZXh0ID0gc3R5bGVcblx0XHRlbHNlIHtcblx0XHRcdGlmICh0eXBlb2Ygb2xkID09PSBcInN0cmluZ1wiKSBlbGVtZW50LnN0eWxlLmNzc1RleHQgPSBcIlwiXG5cdFx0XHRmb3IgKHZhciBrZXkyIGluIHN0eWxlKSB7XG5cdFx0XHRcdGVsZW1lbnQuc3R5bGVba2V5Ml0gPSBzdHlsZVtrZXkyXVxuXHRcdFx0fVxuXHRcdFx0aWYgKG9sZCAhPSBudWxsICYmIHR5cGVvZiBvbGQgIT09IFwic3RyaW5nXCIpIHtcblx0XHRcdFx0Zm9yICh2YXIga2V5MiBpbiBvbGQpIHtcblx0XHRcdFx0XHRpZiAoIShrZXkyIGluIHN0eWxlKSkgZWxlbWVudC5zdHlsZVtrZXkyXSA9IFwiXCJcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHQvL2V2ZW50XG5cdGZ1bmN0aW9uIHVwZGF0ZUV2ZW50KHZub2RlLCBrZXkyLCB2YWx1ZSkge1xuXHRcdHZhciBlbGVtZW50ID0gdm5vZGUuZG9tXG5cdFx0dmFyIGNhbGxiYWNrID0gdHlwZW9mIG9uZXZlbnQgIT09IFwiZnVuY3Rpb25cIiA/IHZhbHVlIDogZnVuY3Rpb24oZSkge1xuXHRcdFx0dmFyIHJlc3VsdCA9IHZhbHVlLmNhbGwoZWxlbWVudCwgZSlcblx0XHRcdG9uZXZlbnQuY2FsbChlbGVtZW50LCBlKVxuXHRcdFx0cmV0dXJuIHJlc3VsdFxuXHRcdH1cblx0XHRpZiAoa2V5MiBpbiBlbGVtZW50KSBlbGVtZW50W2tleTJdID0gdHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCIgPyBjYWxsYmFjayA6IG51bGxcblx0XHRlbHNlIHtcblx0XHRcdHZhciBldmVudE5hbWUgPSBrZXkyLnNsaWNlKDIpXG5cdFx0XHRpZiAodm5vZGUuZXZlbnRzID09PSB1bmRlZmluZWQpIHZub2RlLmV2ZW50cyA9IHt9XG5cdFx0XHRpZiAodm5vZGUuZXZlbnRzW2tleTJdID09PSBjYWxsYmFjaykgcmV0dXJuXG5cdFx0XHRpZiAodm5vZGUuZXZlbnRzW2tleTJdICE9IG51bGwpIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIHZub2RlLmV2ZW50c1trZXkyXSwgZmFsc2UpXG5cdFx0XHRpZiAodHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdFx0dm5vZGUuZXZlbnRzW2tleTJdID0gY2FsbGJhY2tcblx0XHRcdFx0ZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgdm5vZGUuZXZlbnRzW2tleTJdLCBmYWxzZSlcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0Ly9saWZlY3ljbGVcblx0ZnVuY3Rpb24gaW5pdExpZmVjeWNsZShzb3VyY2UsIHZub2RlLCBob29rcykge1xuXHRcdGlmICh0eXBlb2Ygc291cmNlLm9uaW5pdCA9PT0gXCJmdW5jdGlvblwiKSBzb3VyY2Uub25pbml0LmNhbGwodm5vZGUuc3RhdGUsIHZub2RlKVxuXHRcdGlmICh0eXBlb2Ygc291cmNlLm9uY3JlYXRlID09PSBcImZ1bmN0aW9uXCIpIGhvb2tzLnB1c2goc291cmNlLm9uY3JlYXRlLmJpbmQodm5vZGUuc3RhdGUsIHZub2RlKSlcblx0fVxuXHRmdW5jdGlvbiB1cGRhdGVMaWZlY3ljbGUoc291cmNlLCB2bm9kZSwgaG9va3MsIHJlY3ljbGluZykge1xuXHRcdGlmIChyZWN5Y2xpbmcpIGluaXRMaWZlY3ljbGUoc291cmNlLCB2bm9kZSwgaG9va3MpXG5cdFx0ZWxzZSBpZiAodHlwZW9mIHNvdXJjZS5vbnVwZGF0ZSA9PT0gXCJmdW5jdGlvblwiKSBob29rcy5wdXNoKHNvdXJjZS5vbnVwZGF0ZS5iaW5kKHZub2RlLnN0YXRlLCB2bm9kZSkpXG5cdH1cblx0ZnVuY3Rpb24gc2hvdWxkVXBkYXRlKHZub2RlLCBvbGQpIHtcblx0XHR2YXIgZm9yY2VWbm9kZVVwZGF0ZSwgZm9yY2VDb21wb25lbnRVcGRhdGVcblx0XHRpZiAodm5vZGUuYXR0cnMgIT0gbnVsbCAmJiB0eXBlb2Ygdm5vZGUuYXR0cnMub25iZWZvcmV1cGRhdGUgPT09IFwiZnVuY3Rpb25cIikgZm9yY2VWbm9kZVVwZGF0ZSA9IHZub2RlLmF0dHJzLm9uYmVmb3JldXBkYXRlLmNhbGwodm5vZGUuc3RhdGUsIHZub2RlLCBvbGQpXG5cdFx0aWYgKHR5cGVvZiB2bm9kZS50YWcgIT09IFwic3RyaW5nXCIgJiYgdHlwZW9mIHZub2RlLnRhZy5vbmJlZm9yZXVwZGF0ZSA9PT0gXCJmdW5jdGlvblwiKSBmb3JjZUNvbXBvbmVudFVwZGF0ZSA9IHZub2RlLnRhZy5vbmJlZm9yZXVwZGF0ZS5jYWxsKHZub2RlLnN0YXRlLCB2bm9kZSwgb2xkKVxuXHRcdGlmICghKGZvcmNlVm5vZGVVcGRhdGUgPT09IHVuZGVmaW5lZCAmJiBmb3JjZUNvbXBvbmVudFVwZGF0ZSA9PT0gdW5kZWZpbmVkKSAmJiAhZm9yY2VWbm9kZVVwZGF0ZSAmJiAhZm9yY2VDb21wb25lbnRVcGRhdGUpIHtcblx0XHRcdHZub2RlLmRvbSA9IG9sZC5kb21cblx0XHRcdHZub2RlLmRvbVNpemUgPSBvbGQuZG9tU2l6ZVxuXHRcdFx0dm5vZGUuaW5zdGFuY2UgPSBvbGQuaW5zdGFuY2Vcblx0XHRcdHJldHVybiB0cnVlXG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZVxuXHR9XG5cdGZ1bmN0aW9uIHJlbmRlcihkb20sIHZub2Rlcykge1xuXHRcdGlmICghZG9tKSB0aHJvdyBuZXcgRXJyb3IoXCJFbnN1cmUgdGhlIERPTSBlbGVtZW50IGJlaW5nIHBhc3NlZCB0byBtLnJvdXRlL20ubW91bnQvbS5yZW5kZXIgaXMgbm90IHVuZGVmaW5lZC5cIilcblx0XHR2YXIgaG9va3MgPSBbXVxuXHRcdHZhciBhY3RpdmUgPSAkZG9jLmFjdGl2ZUVsZW1lbnRcblx0XHQvLyBGaXJzdCB0aW1lMCByZW5kZXJpbmcgaW50byBhIG5vZGUgY2xlYXJzIGl0IG91dFxuXHRcdGlmIChkb20udm5vZGVzID09IG51bGwpIGRvbS50ZXh0Q29udGVudCA9IFwiXCJcblx0XHRpZiAoIUFycmF5LmlzQXJyYXkodm5vZGVzKSkgdm5vZGVzID0gW3Zub2Rlc11cblx0XHR1cGRhdGVOb2Rlcyhkb20sIGRvbS52bm9kZXMsIFZub2RlLm5vcm1hbGl6ZUNoaWxkcmVuKHZub2RlcyksIGZhbHNlLCBob29rcywgbnVsbCwgdW5kZWZpbmVkKVxuXHRcdGRvbS52bm9kZXMgPSB2bm9kZXNcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGhvb2tzLmxlbmd0aDsgaSsrKSBob29rc1tpXSgpXG5cdFx0aWYgKCRkb2MuYWN0aXZlRWxlbWVudCAhPT0gYWN0aXZlKSBhY3RpdmUuZm9jdXMoKVxuXHR9XG5cdHJldHVybiB7cmVuZGVyOiByZW5kZXIsIHNldEV2ZW50Q2FsbGJhY2s6IHNldEV2ZW50Q2FsbGJhY2t9XG59XG5mdW5jdGlvbiB0aHJvdHRsZShjYWxsYmFjaykge1xuXHQvLzYwZnBzIHRyYW5zbGF0ZXMgdG8gMTYuNm1zLCByb3VuZCBpdCBkb3duIHNpbmNlIHNldFRpbWVvdXQgcmVxdWlyZXMgaW50XG5cdHZhciB0aW1lID0gMTZcblx0dmFyIGxhc3QgPSAwLCBwZW5kaW5nID0gbnVsbFxuXHR2YXIgdGltZW91dCA9IHR5cGVvZiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPT09IFwiZnVuY3Rpb25cIiA/IHJlcXVlc3RBbmltYXRpb25GcmFtZSA6IHNldFRpbWVvdXRcblx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBub3cgPSBEYXRlLm5vdygpXG5cdFx0aWYgKGxhc3QgPT09IDAgfHwgbm93IC0gbGFzdCA+PSB0aW1lKSB7XG5cdFx0XHRsYXN0ID0gbm93XG5cdFx0XHRjYWxsYmFjaygpXG5cdFx0fVxuXHRcdGVsc2UgaWYgKHBlbmRpbmcgPT09IG51bGwpIHtcblx0XHRcdHBlbmRpbmcgPSB0aW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRwZW5kaW5nID0gbnVsbFxuXHRcdFx0XHRjYWxsYmFjaygpXG5cdFx0XHRcdGxhc3QgPSBEYXRlLm5vdygpXG5cdFx0XHR9LCB0aW1lIC0gKG5vdyAtIGxhc3QpKVxuXHRcdH1cblx0fVxufVxudmFyIF8xMSA9IGZ1bmN0aW9uKCR3aW5kb3cpIHtcblx0dmFyIHJlbmRlclNlcnZpY2UgPSBjb3JlUmVuZGVyZXIoJHdpbmRvdylcblx0cmVuZGVyU2VydmljZS5zZXRFdmVudENhbGxiYWNrKGZ1bmN0aW9uKGUpIHtcblx0XHRpZiAoZS5yZWRyYXcgIT09IGZhbHNlKSByZWRyYXcoKVxuXHR9KVxuXHR2YXIgY2FsbGJhY2tzID0gW11cblx0ZnVuY3Rpb24gc3Vic2NyaWJlKGtleTEsIGNhbGxiYWNrKSB7XG5cdFx0dW5zdWJzY3JpYmUoa2V5MSlcblx0XHRjYWxsYmFja3MucHVzaChrZXkxLCB0aHJvdHRsZShjYWxsYmFjaykpXG5cdH1cblx0ZnVuY3Rpb24gdW5zdWJzY3JpYmUoa2V5MSkge1xuXHRcdHZhciBpbmRleCA9IGNhbGxiYWNrcy5pbmRleE9mKGtleTEpXG5cdFx0aWYgKGluZGV4ID4gLTEpIGNhbGxiYWNrcy5zcGxpY2UoaW5kZXgsIDIpXG5cdH1cbiAgICBmdW5jdGlvbiByZWRyYXcoKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgICAgICAgICBjYWxsYmFja3NbaV0oKVxuICAgICAgICB9XG4gICAgfVxuXHRyZXR1cm4ge3N1YnNjcmliZTogc3Vic2NyaWJlLCB1bnN1YnNjcmliZTogdW5zdWJzY3JpYmUsIHJlZHJhdzogcmVkcmF3LCByZW5kZXI6IHJlbmRlclNlcnZpY2UucmVuZGVyfVxufVxudmFyIHJlZHJhd1NlcnZpY2UgPSBfMTEod2luZG93KVxucmVxdWVzdFNlcnZpY2Uuc2V0Q29tcGxldGlvbkNhbGxiYWNrKHJlZHJhd1NlcnZpY2UucmVkcmF3KVxudmFyIF8xNiA9IGZ1bmN0aW9uKHJlZHJhd1NlcnZpY2UwKSB7XG5cdHJldHVybiBmdW5jdGlvbihyb290LCBjb21wb25lbnQpIHtcblx0XHRpZiAoY29tcG9uZW50ID09PSBudWxsKSB7XG5cdFx0XHRyZWRyYXdTZXJ2aWNlMC5yZW5kZXIocm9vdCwgW10pXG5cdFx0XHRyZWRyYXdTZXJ2aWNlMC51bnN1YnNjcmliZShyb290KVxuXHRcdFx0cmV0dXJuXG5cdFx0fVxuXHRcdFxuXHRcdGlmIChjb21wb25lbnQudmlldyA9PSBudWxsKSB0aHJvdyBuZXcgRXJyb3IoXCJtLm1vdW50KGVsZW1lbnQsIGNvbXBvbmVudCkgZXhwZWN0cyBhIGNvbXBvbmVudCwgbm90IGEgdm5vZGVcIilcblx0XHRcblx0XHR2YXIgcnVuMCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0cmVkcmF3U2VydmljZTAucmVuZGVyKHJvb3QsIFZub2RlKGNvbXBvbmVudCkpXG5cdFx0fVxuXHRcdHJlZHJhd1NlcnZpY2UwLnN1YnNjcmliZShyb290LCBydW4wKVxuXHRcdHJlZHJhd1NlcnZpY2UwLnJlZHJhdygpXG5cdH1cbn1cbm0ubW91bnQgPSBfMTYocmVkcmF3U2VydmljZSlcbnZhciBQcm9taXNlID0gUHJvbWlzZVBvbHlmaWxsXG52YXIgcGFyc2VRdWVyeVN0cmluZyA9IGZ1bmN0aW9uKHN0cmluZykge1xuXHRpZiAoc3RyaW5nID09PSBcIlwiIHx8IHN0cmluZyA9PSBudWxsKSByZXR1cm4ge31cblx0aWYgKHN0cmluZy5jaGFyQXQoMCkgPT09IFwiP1wiKSBzdHJpbmcgPSBzdHJpbmcuc2xpY2UoMSlcblx0dmFyIGVudHJpZXMgPSBzdHJpbmcuc3BsaXQoXCImXCIpLCBkYXRhMCA9IHt9LCBjb3VudGVycyA9IHt9XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZW50cmllcy5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBlbnRyeSA9IGVudHJpZXNbaV0uc3BsaXQoXCI9XCIpXG5cdFx0dmFyIGtleTUgPSBkZWNvZGVVUklDb21wb25lbnQoZW50cnlbMF0pXG5cdFx0dmFyIHZhbHVlID0gZW50cnkubGVuZ3RoID09PSAyID8gZGVjb2RlVVJJQ29tcG9uZW50KGVudHJ5WzFdKSA6IFwiXCJcblx0XHRpZiAodmFsdWUgPT09IFwidHJ1ZVwiKSB2YWx1ZSA9IHRydWVcblx0XHRlbHNlIGlmICh2YWx1ZSA9PT0gXCJmYWxzZVwiKSB2YWx1ZSA9IGZhbHNlXG5cdFx0dmFyIGxldmVscyA9IGtleTUuc3BsaXQoL1xcXVxcWz98XFxbLylcblx0XHR2YXIgY3Vyc29yID0gZGF0YTBcblx0XHRpZiAoa2V5NS5pbmRleE9mKFwiW1wiKSA+IC0xKSBsZXZlbHMucG9wKClcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGxldmVscy5sZW5ndGg7IGorKykge1xuXHRcdFx0dmFyIGxldmVsID0gbGV2ZWxzW2pdLCBuZXh0TGV2ZWwgPSBsZXZlbHNbaiArIDFdXG5cdFx0XHR2YXIgaXNOdW1iZXIgPSBuZXh0TGV2ZWwgPT0gXCJcIiB8fCAhaXNOYU4ocGFyc2VJbnQobmV4dExldmVsLCAxMCkpXG5cdFx0XHR2YXIgaXNWYWx1ZSA9IGogPT09IGxldmVscy5sZW5ndGggLSAxXG5cdFx0XHRpZiAobGV2ZWwgPT09IFwiXCIpIHtcblx0XHRcdFx0dmFyIGtleTUgPSBsZXZlbHMuc2xpY2UoMCwgaikuam9pbigpXG5cdFx0XHRcdGlmIChjb3VudGVyc1trZXk1XSA9PSBudWxsKSBjb3VudGVyc1trZXk1XSA9IDBcblx0XHRcdFx0bGV2ZWwgPSBjb3VudGVyc1trZXk1XSsrXG5cdFx0XHR9XG5cdFx0XHRpZiAoY3Vyc29yW2xldmVsXSA9PSBudWxsKSB7XG5cdFx0XHRcdGN1cnNvcltsZXZlbF0gPSBpc1ZhbHVlID8gdmFsdWUgOiBpc051bWJlciA/IFtdIDoge31cblx0XHRcdH1cblx0XHRcdGN1cnNvciA9IGN1cnNvcltsZXZlbF1cblx0XHR9XG5cdH1cblx0cmV0dXJuIGRhdGEwXG59XG52YXIgY29yZVJvdXRlciA9IGZ1bmN0aW9uKCR3aW5kb3cpIHtcblx0dmFyIHN1cHBvcnRzUHVzaFN0YXRlID0gdHlwZW9mICR3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUgPT09IFwiZnVuY3Rpb25cIlxuXHR2YXIgY2FsbEFzeW5jMCA9IHR5cGVvZiBzZXRJbW1lZGlhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHNldEltbWVkaWF0ZSA6IHNldFRpbWVvdXRcblx0ZnVuY3Rpb24gbm9ybWFsaXplMShmcmFnbWVudDApIHtcblx0XHR2YXIgZGF0YSA9ICR3aW5kb3cubG9jYXRpb25bZnJhZ21lbnQwXS5yZXBsYWNlKC8oPzolW2EtZjg5XVthLWYwLTldKSsvZ2ltLCBkZWNvZGVVUklDb21wb25lbnQpXG5cdFx0aWYgKGZyYWdtZW50MCA9PT0gXCJwYXRobmFtZVwiICYmIGRhdGFbMF0gIT09IFwiL1wiKSBkYXRhID0gXCIvXCIgKyBkYXRhXG5cdFx0cmV0dXJuIGRhdGFcblx0fVxuXHR2YXIgYXN5bmNJZFxuXHRmdW5jdGlvbiBkZWJvdW5jZUFzeW5jKGNhbGxiYWNrMCkge1xuXHRcdHJldHVybiBmdW5jdGlvbigpIHtcblx0XHRcdGlmIChhc3luY0lkICE9IG51bGwpIHJldHVyblxuXHRcdFx0YXN5bmNJZCA9IGNhbGxBc3luYzAoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGFzeW5jSWQgPSBudWxsXG5cdFx0XHRcdGNhbGxiYWNrMCgpXG5cdFx0XHR9KVxuXHRcdH1cblx0fVxuXHRmdW5jdGlvbiBwYXJzZVBhdGgocGF0aCwgcXVlcnlEYXRhLCBoYXNoRGF0YSkge1xuXHRcdHZhciBxdWVyeUluZGV4ID0gcGF0aC5pbmRleE9mKFwiP1wiKVxuXHRcdHZhciBoYXNoSW5kZXggPSBwYXRoLmluZGV4T2YoXCIjXCIpXG5cdFx0dmFyIHBhdGhFbmQgPSBxdWVyeUluZGV4ID4gLTEgPyBxdWVyeUluZGV4IDogaGFzaEluZGV4ID4gLTEgPyBoYXNoSW5kZXggOiBwYXRoLmxlbmd0aFxuXHRcdGlmIChxdWVyeUluZGV4ID4gLTEpIHtcblx0XHRcdHZhciBxdWVyeUVuZCA9IGhhc2hJbmRleCA+IC0xID8gaGFzaEluZGV4IDogcGF0aC5sZW5ndGhcblx0XHRcdHZhciBxdWVyeVBhcmFtcyA9IHBhcnNlUXVlcnlTdHJpbmcocGF0aC5zbGljZShxdWVyeUluZGV4ICsgMSwgcXVlcnlFbmQpKVxuXHRcdFx0Zm9yICh2YXIga2V5NCBpbiBxdWVyeVBhcmFtcykgcXVlcnlEYXRhW2tleTRdID0gcXVlcnlQYXJhbXNba2V5NF1cblx0XHR9XG5cdFx0aWYgKGhhc2hJbmRleCA+IC0xKSB7XG5cdFx0XHR2YXIgaGFzaFBhcmFtcyA9IHBhcnNlUXVlcnlTdHJpbmcocGF0aC5zbGljZShoYXNoSW5kZXggKyAxKSlcblx0XHRcdGZvciAodmFyIGtleTQgaW4gaGFzaFBhcmFtcykgaGFzaERhdGFba2V5NF0gPSBoYXNoUGFyYW1zW2tleTRdXG5cdFx0fVxuXHRcdHJldHVybiBwYXRoLnNsaWNlKDAsIHBhdGhFbmQpXG5cdH1cblx0dmFyIHJvdXRlciA9IHtwcmVmaXg6IFwiIyFcIn1cblx0cm91dGVyLmdldFBhdGggPSBmdW5jdGlvbigpIHtcblx0XHR2YXIgdHlwZTIgPSByb3V0ZXIucHJlZml4LmNoYXJBdCgwKVxuXHRcdHN3aXRjaCAodHlwZTIpIHtcblx0XHRcdGNhc2UgXCIjXCI6IHJldHVybiBub3JtYWxpemUxKFwiaGFzaFwiKS5zbGljZShyb3V0ZXIucHJlZml4Lmxlbmd0aClcblx0XHRcdGNhc2UgXCI/XCI6IHJldHVybiBub3JtYWxpemUxKFwic2VhcmNoXCIpLnNsaWNlKHJvdXRlci5wcmVmaXgubGVuZ3RoKSArIG5vcm1hbGl6ZTEoXCJoYXNoXCIpXG5cdFx0XHRkZWZhdWx0OiByZXR1cm4gbm9ybWFsaXplMShcInBhdGhuYW1lXCIpLnNsaWNlKHJvdXRlci5wcmVmaXgubGVuZ3RoKSArIG5vcm1hbGl6ZTEoXCJzZWFyY2hcIikgKyBub3JtYWxpemUxKFwiaGFzaFwiKVxuXHRcdH1cblx0fVxuXHRyb3V0ZXIuc2V0UGF0aCA9IGZ1bmN0aW9uKHBhdGgsIGRhdGEsIG9wdGlvbnMpIHtcblx0XHR2YXIgcXVlcnlEYXRhID0ge30sIGhhc2hEYXRhID0ge31cblx0XHRwYXRoID0gcGFyc2VQYXRoKHBhdGgsIHF1ZXJ5RGF0YSwgaGFzaERhdGEpXG5cdFx0aWYgKGRhdGEgIT0gbnVsbCkge1xuXHRcdFx0Zm9yICh2YXIga2V5NCBpbiBkYXRhKSBxdWVyeURhdGFba2V5NF0gPSBkYXRhW2tleTRdXG5cdFx0XHRwYXRoID0gcGF0aC5yZXBsYWNlKC86KFteXFwvXSspL2csIGZ1bmN0aW9uKG1hdGNoMiwgdG9rZW4pIHtcblx0XHRcdFx0ZGVsZXRlIHF1ZXJ5RGF0YVt0b2tlbl1cblx0XHRcdFx0cmV0dXJuIGRhdGFbdG9rZW5dXG5cdFx0XHR9KVxuXHRcdH1cblx0XHR2YXIgcXVlcnkgPSBidWlsZFF1ZXJ5U3RyaW5nKHF1ZXJ5RGF0YSlcblx0XHRpZiAocXVlcnkpIHBhdGggKz0gXCI/XCIgKyBxdWVyeVxuXHRcdHZhciBoYXNoID0gYnVpbGRRdWVyeVN0cmluZyhoYXNoRGF0YSlcblx0XHRpZiAoaGFzaCkgcGF0aCArPSBcIiNcIiArIGhhc2hcblx0XHRpZiAoc3VwcG9ydHNQdXNoU3RhdGUpIHtcblx0XHRcdHZhciBzdGF0ZSA9IG9wdGlvbnMgPyBvcHRpb25zLnN0YXRlIDogbnVsbFxuXHRcdFx0dmFyIHRpdGxlID0gb3B0aW9ucyA/IG9wdGlvbnMudGl0bGUgOiBudWxsXG5cdFx0XHQkd2luZG93Lm9ucG9wc3RhdGUoKVxuXHRcdFx0aWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5yZXBsYWNlKSAkd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKHN0YXRlLCB0aXRsZSwgcm91dGVyLnByZWZpeCArIHBhdGgpXG5cdFx0XHRlbHNlICR3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoc3RhdGUsIHRpdGxlLCByb3V0ZXIucHJlZml4ICsgcGF0aClcblx0XHR9XG5cdFx0ZWxzZSAkd2luZG93LmxvY2F0aW9uLmhyZWYgPSByb3V0ZXIucHJlZml4ICsgcGF0aFxuXHR9XG5cdHJvdXRlci5kZWZpbmVSb3V0ZXMgPSBmdW5jdGlvbihyb3V0ZXMsIHJlc29sdmUsIHJlamVjdCkge1xuXHRcdGZ1bmN0aW9uIHJlc29sdmVSb3V0ZSgpIHtcblx0XHRcdHZhciBwYXRoID0gcm91dGVyLmdldFBhdGgoKVxuXHRcdFx0dmFyIHBhcmFtcyA9IHt9XG5cdFx0XHR2YXIgcGF0aG5hbWUgPSBwYXJzZVBhdGgocGF0aCwgcGFyYW1zLCBwYXJhbXMpXG5cdFx0XHR2YXIgc3RhdGUgPSAkd2luZG93Lmhpc3Rvcnkuc3RhdGVcblx0XHRcdGlmIChzdGF0ZSAhPSBudWxsKSB7XG5cdFx0XHRcdGZvciAodmFyIGsgaW4gc3RhdGUpIHBhcmFtc1trXSA9IHN0YXRlW2tdXG5cdFx0XHR9XG5cdFx0XHRmb3IgKHZhciByb3V0ZTAgaW4gcm91dGVzKSB7XG5cdFx0XHRcdHZhciBtYXRjaGVyID0gbmV3IFJlZ0V4cChcIl5cIiArIHJvdXRlMC5yZXBsYWNlKC86W15cXC9dKz9cXC57M30vZywgXCIoLio/KVwiKS5yZXBsYWNlKC86W15cXC9dKy9nLCBcIihbXlxcXFwvXSspXCIpICsgXCJcXC8/JFwiKVxuXHRcdFx0XHRpZiAobWF0Y2hlci50ZXN0KHBhdGhuYW1lKSkge1xuXHRcdFx0XHRcdHBhdGhuYW1lLnJlcGxhY2UobWF0Y2hlciwgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHR2YXIga2V5cyA9IHJvdXRlMC5tYXRjaCgvOlteXFwvXSsvZykgfHwgW11cblx0XHRcdFx0XHRcdHZhciB2YWx1ZXMgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSwgLTIpXG5cdFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRcdFx0cGFyYW1zW2tleXNbaV0ucmVwbGFjZSgvOnxcXC4vZywgXCJcIildID0gZGVjb2RlVVJJQ29tcG9uZW50KHZhbHVlc1tpXSlcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHJlc29sdmUocm91dGVzW3JvdXRlMF0sIHBhcmFtcywgcGF0aCwgcm91dGUwKVxuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0cmV0dXJuXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJlamVjdChwYXRoLCBwYXJhbXMpXG5cdFx0fVxuXHRcdGlmIChzdXBwb3J0c1B1c2hTdGF0ZSkgJHdpbmRvdy5vbnBvcHN0YXRlID0gZGVib3VuY2VBc3luYyhyZXNvbHZlUm91dGUpXG5cdFx0ZWxzZSBpZiAocm91dGVyLnByZWZpeC5jaGFyQXQoMCkgPT09IFwiI1wiKSAkd2luZG93Lm9uaGFzaGNoYW5nZSA9IHJlc29sdmVSb3V0ZVxuXHRcdHJlc29sdmVSb3V0ZSgpXG5cdH1cblx0cmV0dXJuIHJvdXRlclxufVxudmFyIF8yMCA9IGZ1bmN0aW9uKCR3aW5kb3csIHJlZHJhd1NlcnZpY2UwKSB7XG5cdHZhciByb3V0ZVNlcnZpY2UgPSBjb3JlUm91dGVyKCR3aW5kb3cpXG5cdHZhciBpZGVudGl0eSA9IGZ1bmN0aW9uKHYpIHtyZXR1cm4gdn1cblx0dmFyIHJlbmRlcjEsIGNvbXBvbmVudCwgYXR0cnMzLCBjdXJyZW50UGF0aCwgbGFzdFVwZGF0ZVxuXHR2YXIgcm91dGUgPSBmdW5jdGlvbihyb290LCBkZWZhdWx0Um91dGUsIHJvdXRlcykge1xuXHRcdGlmIChyb290ID09IG51bGwpIHRocm93IG5ldyBFcnJvcihcIkVuc3VyZSB0aGUgRE9NIGVsZW1lbnQgdGhhdCB3YXMgcGFzc2VkIHRvIGBtLnJvdXRlYCBpcyBub3QgdW5kZWZpbmVkXCIpXG5cdFx0dmFyIHJ1bjEgPSBmdW5jdGlvbigpIHtcblx0XHRcdGlmIChyZW5kZXIxICE9IG51bGwpIHJlZHJhd1NlcnZpY2UwLnJlbmRlcihyb290LCByZW5kZXIxKFZub2RlKGNvbXBvbmVudCwgYXR0cnMzLmtleSwgYXR0cnMzKSkpXG5cdFx0fVxuXHRcdHZhciBiYWlsID0gZnVuY3Rpb24ocGF0aCkge1xuXHRcdFx0aWYgKHBhdGggIT09IGRlZmF1bHRSb3V0ZSkgcm91dGVTZXJ2aWNlLnNldFBhdGgoZGVmYXVsdFJvdXRlLCBudWxsLCB7cmVwbGFjZTogdHJ1ZX0pXG5cdFx0XHRlbHNlIHRocm93IG5ldyBFcnJvcihcIkNvdWxkIG5vdCByZXNvbHZlIGRlZmF1bHQgcm91dGUgXCIgKyBkZWZhdWx0Um91dGUpXG5cdFx0fVxuXHRcdHJvdXRlU2VydmljZS5kZWZpbmVSb3V0ZXMocm91dGVzLCBmdW5jdGlvbihwYXlsb2FkLCBwYXJhbXMsIHBhdGgpIHtcblx0XHRcdHZhciB1cGRhdGUgPSBsYXN0VXBkYXRlID0gZnVuY3Rpb24ocm91dGVSZXNvbHZlciwgY29tcCkge1xuXHRcdFx0XHRpZiAodXBkYXRlICE9PSBsYXN0VXBkYXRlKSByZXR1cm5cblx0XHRcdFx0Y29tcG9uZW50ID0gY29tcCAhPSBudWxsICYmIHR5cGVvZiBjb21wLnZpZXcgPT09IFwiZnVuY3Rpb25cIiA/IGNvbXAgOiBcImRpdlwiLCBhdHRyczMgPSBwYXJhbXMsIGN1cnJlbnRQYXRoID0gcGF0aCwgbGFzdFVwZGF0ZSA9IG51bGxcblx0XHRcdFx0cmVuZGVyMSA9IChyb3V0ZVJlc29sdmVyLnJlbmRlciB8fCBpZGVudGl0eSkuYmluZChyb3V0ZVJlc29sdmVyKVxuXHRcdFx0XHRydW4xKClcblx0XHRcdH1cblx0XHRcdGlmIChwYXlsb2FkLnZpZXcpIHVwZGF0ZSh7fSwgcGF5bG9hZClcblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRpZiAocGF5bG9hZC5vbm1hdGNoKSB7XG5cdFx0XHRcdFx0UHJvbWlzZS5yZXNvbHZlKHBheWxvYWQub25tYXRjaChwYXJhbXMsIHBhdGgpKS50aGVuKGZ1bmN0aW9uKHJlc29sdmVkKSB7XG5cdFx0XHRcdFx0XHR1cGRhdGUocGF5bG9hZCwgcmVzb2x2ZWQpXG5cdFx0XHRcdFx0fSwgYmFpbClcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHVwZGF0ZShwYXlsb2FkLCBcImRpdlwiKVxuXHRcdFx0fVxuXHRcdH0sIGJhaWwpXG5cdFx0cmVkcmF3U2VydmljZTAuc3Vic2NyaWJlKHJvb3QsIHJ1bjEpXG5cdH1cblx0cm91dGUuc2V0ID0gZnVuY3Rpb24ocGF0aCwgZGF0YSwgb3B0aW9ucykge1xuXHRcdGlmIChsYXN0VXBkYXRlICE9IG51bGwpIG9wdGlvbnMgPSB7cmVwbGFjZTogdHJ1ZX1cblx0XHRsYXN0VXBkYXRlID0gbnVsbFxuXHRcdHJvdXRlU2VydmljZS5zZXRQYXRoKHBhdGgsIGRhdGEsIG9wdGlvbnMpXG5cdH1cblx0cm91dGUuZ2V0ID0gZnVuY3Rpb24oKSB7cmV0dXJuIGN1cnJlbnRQYXRofVxuXHRyb3V0ZS5wcmVmaXggPSBmdW5jdGlvbihwcmVmaXgwKSB7cm91dGVTZXJ2aWNlLnByZWZpeCA9IHByZWZpeDB9XG5cdHJvdXRlLmxpbmsgPSBmdW5jdGlvbih2bm9kZTEpIHtcblx0XHR2bm9kZTEuZG9tLnNldEF0dHJpYnV0ZShcImhyZWZcIiwgcm91dGVTZXJ2aWNlLnByZWZpeCArIHZub2RlMS5hdHRycy5ocmVmKVxuXHRcdHZub2RlMS5kb20ub25jbGljayA9IGZ1bmN0aW9uKGUpIHtcblx0XHRcdGlmIChlLmN0cmxLZXkgfHwgZS5tZXRhS2V5IHx8IGUuc2hpZnRLZXkgfHwgZS53aGljaCA9PT0gMikgcmV0dXJuXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KClcblx0XHRcdGUucmVkcmF3ID0gZmFsc2Vcblx0XHRcdHZhciBocmVmID0gdGhpcy5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpXG5cdFx0XHRpZiAoaHJlZi5pbmRleE9mKHJvdXRlU2VydmljZS5wcmVmaXgpID09PSAwKSBocmVmID0gaHJlZi5zbGljZShyb3V0ZVNlcnZpY2UucHJlZml4Lmxlbmd0aClcblx0XHRcdHJvdXRlLnNldChocmVmLCB1bmRlZmluZWQsIHVuZGVmaW5lZClcblx0XHR9XG5cdH1cblx0cm91dGUucGFyYW0gPSBmdW5jdGlvbihrZXkzKSB7XG5cdFx0aWYodHlwZW9mIGF0dHJzMyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2Yga2V5MyAhPT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIGF0dHJzM1trZXkzXVxuXHRcdHJldHVybiBhdHRyczNcblx0fVxuXHRyZXR1cm4gcm91dGVcbn1cbm0ucm91dGUgPSBfMjAod2luZG93LCByZWRyYXdTZXJ2aWNlKVxubS53aXRoQXR0ciA9IGZ1bmN0aW9uKGF0dHJOYW1lLCBjYWxsYmFjazEsIGNvbnRleHQpIHtcblx0cmV0dXJuIGZ1bmN0aW9uKGUpIHtcblx0XHRjYWxsYmFjazEuY2FsbChjb250ZXh0IHx8IHRoaXMsIGF0dHJOYW1lIGluIGUuY3VycmVudFRhcmdldCA/IGUuY3VycmVudFRhcmdldFthdHRyTmFtZV0gOiBlLmN1cnJlbnRUYXJnZXQuZ2V0QXR0cmlidXRlKGF0dHJOYW1lKSlcblx0fVxufVxudmFyIF8yOCA9IGNvcmVSZW5kZXJlcih3aW5kb3cpXG5tLnJlbmRlciA9IF8yOC5yZW5kZXJcbm0ucmVkcmF3ID0gcmVkcmF3U2VydmljZS5yZWRyYXdcbm0ucmVxdWVzdCA9IHJlcXVlc3RTZXJ2aWNlLnJlcXVlc3Rcbm0uanNvbnAgPSByZXF1ZXN0U2VydmljZS5qc29ucFxubS5wYXJzZVF1ZXJ5U3RyaW5nID0gcGFyc2VRdWVyeVN0cmluZ1xubS5idWlsZFF1ZXJ5U3RyaW5nID0gYnVpbGRRdWVyeVN0cmluZ1xubS52ZXJzaW9uID0gXCIxLjAuMVwiXG5tLnZub2RlID0gVm5vZGVcbmlmICh0eXBlb2YgbW9kdWxlICE9PSBcInVuZGVmaW5lZFwiKSBtb2R1bGVbXCJleHBvcnRzXCJdID0gbVxuZWxzZSB3aW5kb3cubSA9IG1cbn0iXX0=
