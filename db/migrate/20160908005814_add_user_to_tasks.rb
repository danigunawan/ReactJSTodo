class AddUserToTasks < ActiveRecord::Migration[5.0]
  def change
    add_reference :tasks, :user, foreign_key: true
    remove_column :tasks, :assignee
  end
end
