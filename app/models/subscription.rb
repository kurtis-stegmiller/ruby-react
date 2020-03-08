# subscriptions model
class Subscription < ApplicationRecord
  enum status: { admin: 0, user: 1}

  has_many :payments
  scope :by_period, -> { order('period ASC') }

  TYPE_1_DAY = 1
  TYPE_1_WEEK = 2
  TYPE_2_WEEKS = 3
  TYPE_1_MONTH = 4
  TYPE_3_MONTHS = 5
  TYPE_6_MONTHS = 6
  TYPE_1_YEAR = 7
  TYPE_10_YEARS = 8

  TYPES = {
    TYPE_1_MONTH => '1_month',
    TYPE_1_YEAR => '1_year',
    TYPE_10_YEARS => '10_years',
    TYPE_3_MONTHS => '3_months',
    TYPE_6_MONTHS => '6_months',
    TYPE_1_WEEK => '1_week',
    TYPE_2_WEEKS => '2_weeks',
    TYPE_1_DAY => '1_day'
  }.freeze

  DIVIDE_BY_TYPES = {
      TYPE_1_YEAR => 12,
      TYPE_3_MONTHS => 3,
      TYPE_6_MONTHS => 6,
  }.freeze

  def mysql_interval
    MYSQL_INTERVALS[period]
  end

  def rails_interval
    RAILS_INTERVALS[period]
  end

  MYSQL_INTERVALS = {
    TYPE_1_MONTH => 'INTERVAL 1 MONTH',
    TYPE_1_YEAR => 'INTERVAL 1 YEAR',
    TYPE_10_YEARS => 'INTERVAL 10 YEAR',
    TYPE_3_MONTHS => 'INTERVAL 3 MONTH',
    TYPE_6_MONTHS => 'INTERVAL 6 MONTH',
    TYPE_1_WEEK => 'INTERVAL 1 WEEK',
    TYPE_2_WEEKS => 'INTERVAL 2 WEEK',
    TYPE_1_DAY => 'INTERVAL 1 DAY'
  }.freeze

  RAILS_INTERVALS = {
    TYPE_1_MONTH => '1.month',
    TYPE_1_YEAR => '1.year',
    TYPE_10_YEARS => '10.year',
    TYPE_3_MONTHS => '3.month',
    TYPE_6_MONTHS => '6.month',
    TYPE_1_WEEK => '1.week',
    TYPE_2_WEEKS => '2.week',
    TYPE_1_DAY => '1.day'
  }.freeze
end
