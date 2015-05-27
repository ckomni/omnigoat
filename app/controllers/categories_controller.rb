class CategoriesController < ApplicationController
  include SessionsHelper

  before_action :verify_category, except: [:index, :new, :create, :update]
  before_action :authorize, only: [:new, :create, :edit, :update, :destroy]

  def index
    @categories = Category.all
    params[:page].to_i > 1 ? @page = params[:page].to_i : @page = 1
    case
    when params[:q].to_i > 0
      @q = params[:q].to_i
      session[:q] = @q
    when params[:q] == "all"
      @q = Post.all.count
      session[:q] = @q
    when session[:q]
      @q = session[:q]
    else
      @q = Rails.application.config.posts_per_page
    end
    @posts = Post.all.order(updated_at: :desc).offset((@page - 1) * @q).limit(@q)
    @category = Category.new
  end

  def new
    @category = Category.new
  end

  def create
    @category = Category.new(category_params)

    if @category.save
      flash[:success] = "Category Added"
      redirect_to posts_url(@category.name)
    else
      render 'index'
    end
  end

  def edit
    @category = Category.find(params[:id])
  end

  def update
    @category = Category.find(params[:id])
    if @category.update_attributes(category_params)
      flash[:success] = "Category updated"
      redirect_to posts_url(@category.name)
    else
      render 'index'
    end
  end

  def show
    @category = Category.find_by(name: params[:category])
    params[:page].to_i > 1 ? @page = params[:page].to_i : @page = 1
    case
    when params[:q].to_i > 0
      @q = params[:q].to_i
      session[:q] = @q
    when params[:q] == "all"
      @q = @category.posts.count
      session[:q] = @q
    when session[:q]
      @q = session[:q]
    else
      @q = Rails.application.config.posts_per_page
    end
    @posts = @category.posts.order(updated_at: :desc).offset((@page - 1) * @q).limit(@q)
  end

  def destroy
    @category = Category.find(params[:id])
    @category.destroy
    flash[:success] = "Category deleted"
    redirect_to "/"
  end

  private
    def category_params
      params.require(:category).permit(:name, :color_hex, :icon)
    end

    def verify_category
      if !Category.find_by(name: params[:category])
        flash[:danger] = "Does not exist"
        redirect_to all_path
      end
    end

    def authorize
      if !authorized?
        flash[:danger] = "You can't do that"
        redirect_to all_path
      end
    end

end
