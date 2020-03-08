# payments model
class Payment < ApplicationRecord
  belongs_to :user, optional: true
  belongs_to :keyword, optional: true
  belongs_to :subscription

  serialize :details, Hash

  scope :recent_first, -> { order('created_at DESC') }

  TYPE_APPROVED = 1
  TYPE_REFUND = 2
  TYPE_REFUNDED = 3
  TYPE_CANCEL = 4
  TYPE_CANCELED = 5
  TYPE_REJECTED = 6

  enum status: {
      approved: TYPE_APPROVED,
      refund: TYPE_REFUND,
      refunded: TYPE_REFUNDED,
      cancel: TYPE_CANCEL,
      canceled: TYPE_CANCELED,
      rejected: TYPE_REJECTED
  }

end
