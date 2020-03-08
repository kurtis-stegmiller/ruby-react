# add field to keyword table
class AddStatusToKeywords < ActiveRecord::Migration[5.1]
  def change
    add_column :keywords, :status, :integer, default: 2
  end
end
