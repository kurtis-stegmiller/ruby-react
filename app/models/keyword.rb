# keyword model
class Keyword < ApplicationRecord
  acts_as_paranoid
  include KeywordValidPaymentConcern
  belongs_to :user
  has_many :payments, dependent: :destroy

  enum status: { inactive: 0, active: 1, pending: 2, expired: 3 }

  belongs_to :user

  scope :by_user, ->(user_id) { where(user_id: user_id) }
  scope :by_keyword, ->(keyword) { where(keyword: keyword) }
  scope :not_inactive, -> { where.not(status: [:active, :pending]) }
  scope :recent_first, -> { order('created_at DESC') }
end