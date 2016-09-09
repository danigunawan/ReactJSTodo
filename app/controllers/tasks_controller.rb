class TasksController < ApplicationController
  
  before_action :set_privileges
  
  def index
    @tasks = Task.all if current_user.role       
    @tasks = Task.where(user_id: current_user.id) unless current_user.role
    @users = User.all
  end
  
  def create
    @task = Task.new(task_params)
    render json: @task if @task.save
  end
  
  def update
    puts "#{task_params.inspect}"
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
  
  def set_privileges
    if user_signed_in?
      @privilege = current_user.role
    end
  end
  
end
