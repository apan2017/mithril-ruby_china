require "json"

class User
  JSON.mapping(
    id: Int32,
    name: String,
    login: String,
    avatar_url: String,
    email: String
  )

  include Session::StorableObject
end
