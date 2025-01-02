require_relative 'greetings'
require 'colorize'

puts "Hello world from Ruby!"
puts Greetings.hello

puts "This is a yellow message".colorize(:yellow)
puts "This is a green message".colorize(:green)
