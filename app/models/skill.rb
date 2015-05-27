class Skill < ActiveRecord::Base
  belongs_to :person
  has_one :category

  validates :label, presence: true
  validates :level, presence: true
end
