const m     = require('mithril');
const Utils = require('./utils.js');

var User = {};

User.load = function(login) {
  m.request({
    method: 'GET',
    url: 'https://ruby-china.org/api/v3/users/' + login + '.json'
  })
  .then(function(data) {
    User.current = data;
  })
  .catch(function(err) {
    console.error(err);
  });
}

User.renderUserInfo = function(user) {
  return(
    <div class="user-info card text-center">
      <div class="card-block">
        <a class="user-avatar " href={"/" + user.login}>
          <img class="avatar avatar-lg media-object" src={user.avatar_url} />
        </a>
        <h4 class="card-title text-center">{user.login} <span class="name">({user.name})</span></h4>
        <div class="card-text">{user.tagline}</div>
      </div>
      <div class="card-footer">
        <a class="followers" href="/andor_chen/followers">{user.followers_count} 关注者</a>
        <a class="following" href="/andor_chen/following">{user.following_count} 正在关注</a>
      </div>
    </div>
  )
}

User.getTabItems = function(login) {
  var obj = {};

  obj['/' + login] = '话题'
  obj['/' + login + '/replies'] = '回帖'
  obj['/' + login + '/favorites'] = '收藏'

  return obj
}

User.renderTabs = function(user) {
  return(
    <div class="clearfix">
      <ul class="nav nav-pills">
        <li class="nav-item">
          <a class="nav-link" href={'/' + user.login} oncreate={m.route.link}>话题 <span class="count">({user.topics_count})</span></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href={'/' + user.login + '/replies'} oncreate={m.route.link}>回帖 <span class="count">({user.replies_count})</span></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href={'/' + user.login + '/replies'} oncreate={m.route.link}>收藏 <span class="count">({user.favorites_count})</span></a>
        </li>
      </ul>
    </div>
  )
}

User.view = function() {
  if (!this.current) {
    return
  }

  var user = this.current.user;

  return(
    <div class="container">
      <div class="user-profile">
        {User.renderUserInfo(user)}
        {User.renderTabs(user)}
      </div>
    </div>
  )
}

module.exports = User;
