require "kemal"
require "kemal-session"
require "http/client"
require "oauth2"
require "json"

require "./user"

client_id = "21a71f42"
client_secret = "afa5a6bc038571650161e12d0cd8524f87a1689fb209a132a347d997830aa2fd"
host_uri = "ruby-china.org"
redirect_uri = "http://10.0.0.23:3000/oauth/callback"
authorize_uri = "/oauth/authorize"
token_uri = "/oauth/token"
oauth2_client = OAuth2::Client.new("ruby-china.org", client_id, client_secret, authorize_uri: authorize_uri, token_uri: token_uri, redirect_uri: redirect_uri)

Session.config do |config|
  Session.config.secret = "611d039b2bcf3a8cd6fe509b73c7506df2991af1fe5ef5823a4b73d2bbb0f732ecc2252ef42312e50c65b75f259882685985f55a5f3c6015183c1ce3367b6a11"
end

#
def get_access_token(client_id, client_secret, redirect_uri, token_uri, code)
  body = HTTP::Params.build do |form|
    form.add("client_id", client_id)
    form.add("client_secret", client_secret)
    form.add("redirect_uri", redirect_uri)
    form.add("grant_type", "authorization_code")
    form.add("code", code)
  end

  response = HTTP::Client.post_form(token_uri, body)
  case response.status_code
  when 200, 201
    hash = Hash(String, Int32 | String).from_json(response.body)
    hash.delete("created_at")
    OAuth2::AccessToken.from_json(hash.to_json)
  else
    raise response.body
  end
end

get "/" do |env|
  render "src/views/index.ecr"
end

get "/oauth" do |env|
  env.redirect oauth2_client.get_authorize_uri
end

get "/oauth/callback" do |env|
  code = env.params.query["code"]
  access_token = get_access_token(client_id, client_secret, redirect_uri, host_uri + token_uri, code)

  client = HTTP::Client.new(host_uri, tls: true)
  access_token.authenticate(client)
  response = client.get("/api/v3/users/me.json")

  hash = JSON.parse(response.body)["user"]
  user = User.from_json(hash.to_json)
  env.session.object("user", user)
  env.redirect "/"
end

Kemal.run
