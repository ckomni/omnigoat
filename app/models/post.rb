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
  end

  def random_picture
    puts "[I] looking for random picture..."
    return nil unless self.images.any?
    offset = rand(self.images.count)
    self.images.offset(offset).first
  end

  def random_picture_url
    puts "[I] looking for random picture URL..."
    return nil unless self.images.any?
    offset = rand(self.images.count)
    self.images.offset(offset).first.pic.url
  end

  def post_time
    self.updated_at > self.created_at ? "Updated: #{self.time_updated}" : "#{self.time_created}"
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

  ## returns the next chronological post object
  def next(collection)
    puts "[N] looking for next post..."
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
    puts "[P] looking for previous post..."
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
