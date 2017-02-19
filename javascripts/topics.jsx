const m = require("mithril");
const Utils = require('./utils.js')

var Topics = {
  list: [],
  loadList: function(type) {
    type = type || 'last_actived';
    m.request({
      method: 'GET',
      url: 'https://ruby-china.org/api/v3/topics.json',
      data: {type: type}
    })
    .then(function(data) {
      Topics.list = data.topics;
    })
    .catch(function(err) {
      console.error(err);
    })
  }
};

Topics.view = function() {
  return(
    <div class="container">
      <div id="home-container">
        <div class="topics">
          <table class="table">
            <thead class="thead-default">
              <tr class="topic">
                <th class="title">标题</th>
                <th class="author hidden-xs-down">作者</th>
                <th class="replies hidden-md-down">回帖/赞</th>
                <th class="activity hidden-md-down">更新</th>
              </tr>
            </thead>
            <tbody>
              {Topics.list.map(function(topic) {
                return(
                  <tr class="topic">
                    <td class="title">
                      <a class="topic-link" href={'/topic/' + topic.id} oncreate={m.route.link}><span class="node">{topic.node_name}</span> {topic.title}</a>
                    </td>
                    <td class="author hidden-xs-down">
                      <a class="user-avatar " href={"/" + topic.user.login} oncreate={m.route.link}>
                        <img class="avatar avatar-lg media-object" src={topic.user.avatar_url} />
                      </a>
                    </td>
                    <td class="replies hidden-md-down">
                      <span><i class="fa fa-comments"></i> {topic.replies_count}</span>
                      <span class="likes"><i class="fa fa-heart"></i> {topic.likes_count}</span>
                    </td>
                    <td class="activity hidden-md-down">
                      <time class="" datetime={topic.replied_at}>{Utils.dateFormatFromString(topic.replied_at)}</time>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

module.exports = Topics;
