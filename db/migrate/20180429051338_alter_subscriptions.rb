class AlterSubscriptions < ActiveRecord::Migration[5.1]
  def change
    add_column :subscriptions, :status, :integer, default: 1, after: :payment_url

    Subscription.create(name: '2 weeks',period: Subscription::TYPE_2_WEEKS, status: 0)
    Subscription.create(name: '1 month',period: Subscription::TYPE_1_MONTH, status: 0)
    Subscription.create(name: '3 months',period: Subscription::TYPE_3_MONTHS, status: 0)
    Subscription.create(name: '6 months',period: Subscription::TYPE_6_MONTHS, status: 0)
    Subscription.create(name: '1 year',period: Subscription::TYPE_1_YEAR, status: 0)
    Subscription.create(name: '10 years',period: Subscription::TYPE_10_YEARS, status: 0)
  end
end

