class TasksController < ApplicationController
  
  def index
    @tasks = Task.all if current_user.role       
    @users = User.all
  end
  
  def create
    @task = Task.new(task_params)
    render json: @task if @task.save
  end
  
  def update
    @task = Task.find(params[:id])
    render json: @task if @task.update(task_params)
  end
  
  def destroy
    @task = Task.find(params[:id])
    render :json => {}, :status => :no_content if @task.destroy
  end
  
  private
  
  def task_params
    params.require(:task).permit(:name, :user_id)
  end
  
end
