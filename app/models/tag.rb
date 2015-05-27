class Tag < ActiveRecord::Base
  has_many :taggings, :dependent => :destroy
  has_many :posts, :through => :taggings

  before_save { self.name = name.downcase }

  def random_post
    return Post.none unless self.posts.any?
    offset = rand(self.posts.count)
    self.posts.offset(offset).first
  end

  def random_post_with_image
    return Post.none unless self.posts.any?
    pwi = self.posts.includes(:images).where.not(images: {id: nil})
    return self.posts.first unless pwi.any?
    offset = rand(pwi.count)
    pwi.offset(offset).first
  end

end
