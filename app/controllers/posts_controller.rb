class PostsController < ApplicationController
  include SessionsHelper, PostsHelper

  before_action :authorize, only: [:new, :create, :edit, :update, :destroy]

  def index
    # Pagination
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
    @posts = Post.includes(:category, :images, :tags).all.order(updated_at: :desc).offset((@page - 1) * @q).limit(@q).includes(:category)
  end

  def new
    @category = Category.find_by(name: params[:category])
    @post = @category.posts.new
  end

  def create
    @category = Category.find_by(name: params[:category])
    @post = @category.posts.new(post_params)

    if @post.save
      flash[:success] = "Post Added"
      redirect_to post_url(@category.name, @post)
    else
      render 'new'
    end
  end

  def edit
    @category = Category.find_by(name: params[:category])
    @post = Post.find(params[:id])
  end

  def update
    @category = Category.find_by(name: params[:category])
    @post = Post.find(params[:id])
    if @post.update_attributes(post_params)
      flash[:success] = "Post updated"
      redirect_to post_url(@category.name, @post)
    else
      render 'edit'
    end
  end

  def show
    @category = Category.includes(:posts).find_by(name: params[:category])
    @post = Post.includes(:category, :images, :tags).find(params[:id])

    # session[:viewed] is an array of post IDs ordered by most-recently-viewed first
    session[:viewed] = session[:viewed]||[] # load or initialize list of viewed posts
    if session[:viewed].include?(@post.id)
      pos = session[:viewed].index(@post.id)
      session[:viewed].insert(0, session[:viewed].delete_at(pos))
    else
      session[:viewed].unshift(@post.id)
    end
    @posts = recommend_posts(4, session[:viewed])
    add_cheevo("seenitall", "I've Seen Everything") if session[:viewed].length == Post.all.count
  end

  def destroy
    @category = Category.find_by(name: params[:category])
    @post = Post.find(params[:id])
    @post.destroy
    flash[:success] = "Post deleted"
    redirect_to posts_path(@category)
  end

  private
    def post_params
      params.require(:post).permit(:title, :description, :all_tags, images_attributes: [:pic])
    end

    def authorize
      if !authorized?
        flash[:danger] = "You can't do that"
        redirect_to all_path
      end
    end

end
