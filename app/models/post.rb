class Post < ActiveRecord::Base
  belongs_to :category
  has_many :taggings, :dependent => :destroy
  has_many :tags, :through => :taggings

  has_many :images, dependent: :destroy

  accepts_nested_attributes_for :images, :allow_destroy => true
  accepts_nested_attributes_for :category

  validates :title, presence: true

  def all_tags=(names)
    self.tags = names.split(",").map do |name|
      Tag.where(name: name.strip).first_or_create!
    end
  end

  def all_tags
    puts "[T] looking for random picture..."
    self.tags.map(&:name).join(", ")
    puts "[T] -----------------------------------------"
  end

  def random_picture
    puts "[I] looking for random picture..."
    return nil unless self.images.any?
    offset = rand(self.images.count)
    self.images.offset(offset).first
    puts "[I] -----------------------------------------"
  end

  def random_picture_url
    puts "[I] looking for random picture URL..."
    return nil unless self.images.any?
    offset = rand(self.images.count)
    self.images.offset(offset).first.pic.url
    puts "[I] -----------------------------------------"
  end

  def time_updated
    self.updated_at.strftime("%B %e, %Y")
  end

  def time_created
    self.created_at.strftime("%B %e, %Y")
  end

  def image_count_string
    "#{self.title} (#{self.images.count})"
  end

  # given the list of viewed posts, returns an array of the freshest posts
  def self.freshness(viewed_list)
    puts "[F] evaluating post freshness..."
    freshlist = []
    stalelist = viewed_list.reverse
    Post.all.order(updated_at: :desc).where.not("id IN (?)", viewed_list).each do |p|
      freshlist.unshift(p.id)
    end
    puts "[F] -----------------------------------------"
    return freshlist + stalelist
  end

  # returns a list of all posts in order of recommendation
  # factors: 1: View status, 2: Category, 3: update time
  def recommend_posts(quantity, omit)
    puts "[R] recommending posts..."
    fresh = Post.all.order(updated_at: :desc).where.not("id IN (?)", omit)
    stale = Post.all.order(updated_at: :desc).where("id IN (?)", omit)
    fresh.concat(stale)
    puts "[R] -----------------------------------------"
    return fresh[1..quantity]
  end

  ## returns the next chronological post object
  def next(collection)
    puts "[N] looking for next post..."
    navposts = collection
    thispost = navposts.find_index(self)
    nextpost = thispost + 1
    if nextpost < navposts.count
      puts "[N] -----------------------------------------"
      return navposts[nextpost]
    else
      puts "[N] -----------------------------------------"
      return nil
    end

  end

  def previous(collection)
    puts "[P] looking for previous post..."
    navposts = collection
    thispost = navposts.find_index(self)
    prevpost = thispost + 1
    if prevpost < navposts.count
      puts "[P] -----------------------------------------"
      return navposts[prevpost]
    else
      puts "[P] -----------------------------------------s"
      return nil
    end
  end
end
