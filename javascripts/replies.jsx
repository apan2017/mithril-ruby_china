const m     = require('mithril');
const Utils = require('./utils.js')

var Replies = {};

Replies.list = [];

Replies.loadList = function(topic_id) {
  m.request({
    method: 'GET',
    url: 'https://ruby-china.org/api/v3/topics/' + topic_id + '/replies.json',
    data: {limit: 50}
  })
  .then(function(data) {
    Replies.list = data.replies;
  })
  .catch(function(err) {
    console.error(err);
  })
}

Replies.renderReply = function(reply, user) {
  return(
    <div id={"reply-" + reply.id} class="media reply reply-reply">
      <div class="d-flex align-self-start mr-3">
        <a class="user-avatar" href={user.login} oncreate={m.route.link}>
          <img class="avatar avatar-lg media-object" src={user.avatar_url} />
        </a>
      </div>
      <div class="media-body">
        <span>
          <div class="mt-0 media-heading">
            <a title={user.name} class="user-name" href={user.login} oncreate={m.route.link}>{user.login}</a>
            <span class="date float-right"><time>{Utils.dateFormatFromString(reply.created_at)}</time></span>
          </div>
          <div class="markdown">
            {m.trust(reply.body_html)}
          </div>
          <div class="media-footer clearfix">
            <span class="float-right opts">
              <a class="btn btn-icon like-button" href="#"><i class="fa fa-heart"></i></a>
              <a class="btn btn-icon " href="#"><i class="fa fa-ellipsis-h"></i></a>
              <a class="btn btn-icon " href="#"><i class="fa fa-reply"></i></a>
            </span>
          </div>
         </span>
      </div>
    </div>
  )
}

Replies.view = function() {
  return(
    <div class="replies">
      {Replies.list.map(function(reply) {
        return Replies.renderReply(reply, reply.user)
      })}
    </div>
  )
}

module.exports = Replies;
