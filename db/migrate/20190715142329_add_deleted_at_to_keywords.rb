class AddDeletedAtToKeywords < ActiveRecord::Migration[5.1]
  def change
    add_column :keywords, :deleted_at, :datetime
    add_index :keywords, :deleted_at
  end
end
