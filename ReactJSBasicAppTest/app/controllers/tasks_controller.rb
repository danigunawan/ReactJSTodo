class TasksController < ApplicationController

  respond_to :json

  def index
    @tasks = Task.all
  end
  
  def create
    @task = Task.create(task_params)
    respond_with(@task, home_path) if @task.save
  end
  
  def update
  end
  
  def destroy
  end
  
  private
  
  def task_params
    params.require(:task).permit(:name, :assignee)
  end
  
end
