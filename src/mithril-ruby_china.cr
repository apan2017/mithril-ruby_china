require "kemal"
require "./mithril-ruby_china/*"

get "/" do
  render "src/views/index.ecr"
end

Kemal.run
