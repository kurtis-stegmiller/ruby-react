# create subscriptions table
class CreateSubscriptions < ActiveRecord::Migration[5.1]
  def change
    create_table :subscriptions do |t|
      t.string :name
      t.string :description
      t.integer :period
      t.integer :product_id
      t.decimal :amount, precision: 10, scale: 2
      t.decimal :discount, precision: 10, scale: 2
      t.string :currency
      t.string :payment_url

      t.timestamps
    end
  end
end
