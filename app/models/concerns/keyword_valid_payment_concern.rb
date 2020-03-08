module KeywordValidPaymentConcern
  extend ActiveSupport::Concern

  def valid_payment?
    payment = payments.approved.recent_first.first
    return false if payment.nil?
    return false unless payment.approved?
    payment.end_date.to_date > Time.zone.now.to_date
  end

  def expire_on
    payment = payments.approved.recent_first.first
    if payment.nil? || !payment.approved? || payment.end_date < Time.now
      expired!
      return false
    end
    payment.end_date
  end

  def unpaid_expired?
    updated_at + 2.minutes <= Time.zone.now
  end
end