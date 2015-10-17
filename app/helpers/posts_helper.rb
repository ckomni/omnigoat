module PostsHelper
  def post_age(post)
    distance_of_time_in_words(post.updated_at, Time.now)
  end

  # returns the fixed integer number of pages when given the posts and the amount to display per page
  def pages(posts, per_page)
    (posts.count.to_f/per_page.to_f).ceil
  end

  # returns the appropriate pagination link when given the current page
  def pagination(size, position, current_page, pages)
    limit = (size/2).floor
    page_ref = (position - limit) + current_page
    # puts "Pagination size: #{size}, Page Limit: #{limit}"
    case
    when page_ref < 1
      return nil
    when page_ref > pages
      return nil
    when page_ref == current_page - limit
      return "first"
    when page_ref == current_page + limit
      return "last"
    else
      return page_ref
    end

  end

  # Given an array of viewed post IDs, return a list of posts that have not been viewed recently
  def recommend_posts(quantity, omit)
    puts "[R] recommending posts..."
    # First, find posts that haven't been viewed and order them by update time
    fresh = Post.all.order(updated_at: :desc).where.not("id IN (?)", omit)
    # Then, find posts that are on the viewed list and order them by order viewed
    viewed = Post.all.where("id IN (?)", omit).index_by(&:id).slice(*omit).values.reverse
    # concat the two lists, then return the amount specified
    fresh.concat(viewed)
    return fresh[0..(quantity-1)]
  end

end
