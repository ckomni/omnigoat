class Image < ActiveRecord::Base
  belongs_to :post
  has_attached_file :pic, :default_url => "/images/missing.png"
  validates_attachment_content_type :pic, :content_type => /\Aimage\/.*\Z/

  accepts_nested_attributes_for :post

end
