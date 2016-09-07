class TasksController < ApplicationController

  respond_to :json

  def index
    @tasks = Task.all
  end
  
  def create
    @task = Task.new(task_params)
    render json: @task if @task.save
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
