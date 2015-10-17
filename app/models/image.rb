class Image < ActiveRecord::Base
  belongs_to :post
  has_attached_file :pic,
    # if image is missing (should not happen)
    :default_url => "/assets/missing.png",
    :s3_host_name => 's3.amazonaws.com',
    :url => ":s3_domain_url",
    # # path in website
    :path => "/images/:id.:extension"

  validates_attachment_content_type :pic, :content_type => /\Aimage\/.*\Z/
  accepts_nested_attributes_for :post

end
