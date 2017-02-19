const m = require("mithril");

var Layout = {};

Layout.paths = {
  '/': '社区',
  '/topics/popular': '优质话题',
  '/topics/no_reply': '无人问津',
  '/topics/recent': '最新发布'
}

Layout.currentActivedPath = '/';

Layout.activePath = function(path) {
  this.currentActivedPath = path;
}

Layout.linkClassName = function(linkPath) {
  return this.currentActivedPath === linkPath ? 'nav-link active' : 'nav-link';
}

Layout.renderLoginInfo = function() {
  var currentUser = window.currentUser;

  if (currentUser) {
    return(
      <ul class="nav navbar-nav my-2 my-lg-0">
        <li class="nav-item">
          <a class="user-avatar nav-link" href={"/" + currentUser.login} oncreate={m.route.link}>
            <img class="avatar avatar-md media-object" src={currentUser.avatar_url} />
          </a>
        </li>
        <li class="nav-item"><a href="#" class="nav-link">登出</a></li>
      </ul>
    )
  } else {
    return(
      <ul class="nav navbar-nav my-2 my-lg-0">
        <li class="nav-item">
          <a class="nav-link" href="/oauth">登录</a>
        </li>
      </ul>
    )
  }
}

Layout.view = function(vnode) {
  return(
    <div id="root">
      <nav id="header" class="navbar navbar-light navbar-toggleable-md fixed-top bg-faded">
        <div class="container">
          <a class="navbar-brand" href={"/"} oncreate={m.route.link}><b>Ruby</b> China <sup>Mithril version</sup></a>
          <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#main-nav-menu">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="main-nav-menu">
            <ul class="nav navbar-nav main-nav mr-auto mt-2 mt-md-0">
              {Object.keys(Layout.paths).map(function(key, index) {
                return <li class="nav-item"><a className={Layout.linkClassName(key)} href={key} oncreate={m.route.link}>{Layout.paths[key]}</a></li>
              })}
            </ul>
            {Layout.renderLoginInfo()}
          </div>
        </div>
      </nav>
      <main id="main" class="main-layout">{vnode.children}</main>
    </div>
  )
}

module.exports = Layout;
