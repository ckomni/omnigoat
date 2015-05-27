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
    self.tags.map(&:name).join(", ")
  end

  def random_picture
    return nil unless self.images.any?
    offset = rand(self.images.count)
    return self.images.offset(offset).first
  end

  def random_picture_url
    return nil unless self.images.any?
    offset = rand(self.images.count)
    self.images.offset(offset).first.pic.url
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
    freshlist = []
    stalelist = viewed_list.reverse
    Post.all.order(updated_at: :desc).where.not("id IN (?)", viewed_list).each do |p|
      freshlist.unshift(p.id)
    end
    return freshlist + stalelist
  end

  # returns a list of all posts in order of recommendation
  # factors: 1: View status, 2: Category, 3: update time
  def recommend_posts(quantity, omit)
    fresh = Post.all.order(updated_at: :desc).where.not("id IN (?)", omit)
    stale = Post.all.order(updated_at: :desc).where("id IN (?)", omit)
    puts "Fresh posts: #{fresh.count}"
    puts "Stale posts: #{stale.count}"
    fresh.concat(stale)
    return fresh[1..quantity]
  end

  ## returns the next chronological post object
  def next(collection)
    navposts = collection
    thispost = navposts.find_index(self)
    nextpost = thispost + 1
    if nextpost < navposts.count
      return navposts[nextpost]
    else
      return nil
    end
  end

  def previous(collection)
    navposts = collection
    thispost = navposts.find_index(self)
    prevpost = thispost + 1
    if prevpost < navposts.count
      return navposts[prevpost]
    else
      return nil
    end
  end

end
