Gem::Specification.new do |spec|
    spec.name        = "sample-app-ruby"
    spec.version     = "1.0.0"
    spec.authors     = ["Your Name"]
    spec.email       = ["your.email@example.com"]
    spec.summary = "A simple Ruby Hello World gem with colorize dependency"
    spec.license     = "MIT"
    spec.files = Dir.glob("lib/**/*")
    spec.require_path = "lib"
    spec.add_dependency "colorize"
  end
