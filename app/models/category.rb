class Category < ActiveRecord::Base
  has_many :posts, :dependent => :destroy
  has_attached_file :icon, :default_url => lambda { |image| ActionController::Base.helpers.asset_path('category.png') }
  validates_attachment_content_type :icon, :content_type => /\Aimage\/.*\Z/

  validates :name, presence: true,
    uniqueness: {case_sensitive: false}


end
