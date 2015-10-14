class ImagesController < ApplicationController
  include SessionsHelper

  before_action :authorize

  def index
    @images = Image.all
    @image = Image.new
  end

  def new
    @image = Image.new
  end

  def create
    @image = Image.create(image_params)
    redirect_to images_path
  end

  def edit
  end

  def update
  end

  def show
    @image = Image.find(params[:id])
    @post = @image.post
    render :layout => false
  end

  def destroy
    @image = Image.find(params[:id])
    @image.pic = nil
    @image.destroy
    redirect_to images_path
  end

private
  def image_params
    params.require(:image).permit(:pic, :post_id)
  end

  def authorize
    if !authorized?
      flash[:danger] = "You don't have sufficient privileges"
      redirect_to root_path
    end
  end

end
