# create payments table
class CreatePayments < ActiveRecord::Migration[5.1]
  def change
    create_table :payments do |t|
      t.references :user, foreign_key: true
      t.references :keyword, foreign_key: true
      t.references :subscription, foreign_key: true
      t.integer :status
      t.integer :order_id
      t.integer :customer_id
      t.decimal :amount, precision: 10, scale: 2
      t.string :currency
      t.string :email
      t.string :ip
      t.text :details
      t.datetime :start_date
      t.datetime :end_date

      t.timestamps
    end
  end
end
