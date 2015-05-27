class CreateSkills < ActiveRecord::Migration
  def change
    create_table :skills do |t|
      t.string :label
      t.integer :level
      t.references :person, index: true
      t.references :category, index: true

      t.timestamps null: false
    end
  end
end
