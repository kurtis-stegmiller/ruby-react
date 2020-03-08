# keyword table
class CreateKeywords < ActiveRecord::Migration[5.1]
  def change
    create_table :keywords do |t|
      t.references :user, foreign_key: true
      t.string :keyword
      t.text :url
      t.integer :clicks, default: 0

      t.timestamps
    end
  end
end