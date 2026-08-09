# Ruby 3.3 Core Features Demo

# Data.define Immutable Data Object (Ruby 3.2+)
User = Data.define(:id, :name, :role)

user = User.new(id: 101, name: "Alice", role: "admin")

# Pattern Matching (Ruby 3.0+)
access_level = case user
in { role: "admin" }
  "Full Administrator"
in { role: "developer" }
  "Developer Access"
else
  "Guest"
end

puts "Ruby Version: #{RUBY_VERSION}"
puts "YJIT Enabled: #{RubyVM::YJIT.enabled? rescue false}"
puts "User: #{user.name} (ID: #{user.id}) -> #{access_level}"
