class AddDescriptionToKeywords < ActiveRecord::Migration[5.1]
  def change
    add_column :keywords, :description, :text, :null=>true
  end
end
