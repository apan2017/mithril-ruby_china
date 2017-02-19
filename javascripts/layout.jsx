const m = require("mithril");

var Layout = {};

Layout.view = function(vnode) {
  return(
    <main>
      <nav id="header" class="navbar navbar-light navbar-toggleable-md fixed-top bg-faded">
        <div class="container">
          <a class="navbar-brand" href="/"><b>Ruby</b><sup>React version</sup></a>
          <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#main-nav-menu">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="main-nav-menu">
            <ul class="nav navbar-nav main-nav mr-auto mt-2 mt-md-0">
              <li class="nav-item"><a class="nav-link active" href="/">社区</a></li>
              <li class="nav-item"><a class="nav-link" href="/topics/popular">优质话题</a></li>
              <li class="nav-item"><a class="nav-link" href="/topics/no-reply">无人问津</a></li>
              <li class="nav-item"><a class="nav-link" href="/topics/recent">最新发布</a></li>
            </ul>
            <ul class="nav navbar-nav my-2 my-lg-0">
              <li class="nav-item"><a class="nav-link" href="/oauth">登录</a></li>
            </ul>
          </div>
        </div>
      </nav>
      <div class="container">{vnode.children}</div>
    </main>
  )
}

module.exports = Layout;