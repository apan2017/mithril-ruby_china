const m     = require("mithril");
const Utils = require('./utils.js')

var Topic = {};

Topic.load = function(id) {
  m.request({
    method: 'GET',
    url: 'https://ruby-china.org/api/v3/topics/' + id + '.json'
  })
  .then(function(data) {
    Topic.current = data;
  })
  .catch(function(err) {
    console.error(err);
  });
}

Topic.renderTopicTitle = function(topic) {
  return <h1><a title={topic.node_name} class="node-name" href={'/topics/node' + topic.node_id} oncreate={m.route.link}>{topic.node_name}</a> {topic.title}</h1>
}

Topic.renderTopicContent = function(topic, user, vnode) {
  return(
    <div class="row">
      <div class="col-md-9">
        <div class="topic-content">
          <div id={'topic-' + topic.id} class="media reply reply-topic">
            <div class="d-flex align-self-start mr-3">
              <a class="user-avatar " href={'/' + user.login} oncreate={m.route.link}>
                <img class="avatar avatar-lg media-object" src={topic.user.avatar_url} />
              </a>
            </div>
            <div class="media-body">
              <span>
                <div class="mt-0 media-heading">
                  <a title={user.name} class="user-name" href={'/' + user.login} oncreate={m.route.link}>{user.login}</a>
                  <span class="date float-right"><time>{Utils.dateFormatFromString(topic.replied_at)}</time></span>
                </div>
              </span>
              <div class="markdonw">{m.trust(topic.body_html)}</div>
              {Topic.renderTopicFooter(topic)}
            </div>
          </div>
        </div>
        {vnode.children}
      </div>
      <div class="hidden-md-down col-md-3"></div>
    </div>
  )
}

Topic.renderTopicFooter = function(topic) {
  return(
    <div class="media-footer clearfix">
      <span class="float-right opts">
        <a class="btn btn-icon like-button" href="#"><i class="fa fa-heart"></i> {topic.likes_count} 个赞</a>
        <a class="btn btn-icon " href="#"><i class="fa fa-ellipsis-h"></i></a>
        <a class="btn btn-icon " href="#"><i class="fa fa-reply"></i></a>
      </span>
    </div>
  )
}

Topic.view = function(vnode) {
  if (!Topic.current) {
    return
  }

  var topic = Topic.current.topic;

  return(
    <div class="container">
      <div class="topic-detail">
        {[
          Topic.renderTopicTitle(topic),
          Topic.renderTopicContent(topic, topic.user, vnode)
        ]}
      </div>
    </div>
  )
}

module.exports = Topic;
