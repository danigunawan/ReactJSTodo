$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "datadisplay/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "datadisplay"
  s.version     = Datadisplay::VERSION
  s.authors     = ["Alfie Mendoza"]
  s.email       = ["alfie.mendoza@adish.co.jp"]
  s.license     = "MIT"
  s.summary     = "Displays data of class in tabular form"

  s.files = Dir["{app,config,db,lib}/**/*", "MIT-LICENSE", "Rakefile", "README.rdoc"]
  s.test_files = Dir["test/**/*"]

  s.add_dependency "rails", "~> 4.2.7"
  s.add_dependency "bootstrap-sass"
  s.add_development_dependency "sqlite3"
end
