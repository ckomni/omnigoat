class SessionsController < ApplicationController
  include SessionsHelper

  def new

  end

  def create
    if params[:session][:password] == Rails.application.secrets.auth_password
      log_in
      redirect_back_or '/'
      flash[:success] = "Log in successful"
    else
      flash.now[:danger] = "Invalid Password"
      render 'new'
    end
  end

  def destroy
    log_out
    redirect_to '/'
  end
end
