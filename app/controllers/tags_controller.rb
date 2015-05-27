class TagsController < ApplicationController

  before_action :verify, except: :index

  def index
    @tags = Tag.joins(:posts).group("tag_id").order("count(tag_id) desc, name asc")

  end

  def show
    @tag = Tag.find_by(name: params[:name])
    params[:page] ? @page = params[:page].to_i : @page = 1
    params[:q] ? @q = params[:q].to_i : @q = Rails.application.config.posts_per_page
    @posts = @tag.posts.order("updated_at desc").offset((@page - 1) * @q).limit(@q)
  end

  private
    def verify
      if !Tag.find_by(name: params[:name])
        flash[:danger] = "Nothing is tagged: #{params[:name]}"
        redirect_to tags_path
      end
    end

end
