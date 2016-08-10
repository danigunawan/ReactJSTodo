require 'will_paginate/array'

class PagesController < ApplicationController
  before_action :set_account
  
  def index 
    if !current_user.blank? && @gmail.logged_in?
      @read_count = @gmail.inbox.emails(:read).count
      @unread_count = @gmail.inbox.emails(:unread).count
      @read = @gmail.inbox.emails(:read).reverse!.paginate(:page => params[:read_page], :per_page => 5)
      @unread = @gmail.inbox.emails(:unread).reverse!.paginate(:page => params[:unread_page], :per_page => 5)      
    else
      render "login", :layout => "login_layout"
    end
  end
  
  def login
  end
  
  def new
  end
  
  def display_message
    @id = params[:id]
  end
  
  def send_message
    params = message_params
    email = @gmail.compose do
      to "#{params[:to]}"
      subject "#{params[:subject]}"
      body "#{params[:message]}"
    end
    email.deliver!

    redirect_to root_path
  end
  
  def message_params
    params.permit(:utf8, :authenticity_token, :commit, :to, :subject, :message)
  end
  
  def set_account
    unless current_user.blank?
      @gmail = Gmail.connect(:xoauth2, current_user.email, current_user.oauth_token)
    end
  end
  
end