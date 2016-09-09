# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create(name: "Alfie", username: "admin", email: "user1@email.com", password: "password", password_confirmation: "password", role: true)
User.create(name: "Fred", username: "user1", email: "user2@email.com", password: "password", password_confirmation: "password")
User.create(name: "George", username: "user2", email: "user3@email.com", password: "password", password_confirmation: "password")
User.create(name: "Jack", username: "user3", email: "user4@email.com", password: "password", password_confirmation: "password")

Task.find_or_create_by(name: "Laundry", user_id: User.find_by_name("George").id)
Task.find_or_create_by(name: "Cooking", user_id: User.find_by_name("Jack").id)
Task.find_or_create_by(name: "Cleaning", user_id: User.find_by_name("Fred").id)