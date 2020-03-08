#
class PaymentProcessor
  def self.process(hash)
    values = ThriveProcessor.process(hash)

    return false if values === false
    return false unless products.include?(values[:product_id])

    payment_params = pay_params(values,hash.as_json)

    case values[:status]
      when Payment::TYPE_REFUND
        payment = Payment.where(order_id: values[:order_id]).first
        payment[:status] = Payment::TYPE_REFUNDED
        payment.save
        payment_params[:user_id] = payment.user_id
        payment_params[:keyword_id] = payment.keyword.id
      when Payment::TYPE_CANCEL
        payment = Payment.where(order_id: values[:order_id]).first
        payment[:status] = Payment::TYPE_CANCELED
        payment.save
        payment_params[:user_id] = payment.user_id
        payment_params[:keyword_id] = payment.keyword.id
      else
        payment = Payment.where(customer_id: values[:customer][:id],
                                order_id: values[:order_id])
                      .recent_first.first
        unless payment.nil?
          # unless payment.user.nil?
          #   profile = payment.user.profile
          #   Time.zone = profile.time_zone unless profile.time_zone.nil?
          # end
          payment_params[:user_id] = payment.user.id
          payment_params[:keyword_id] = payment.keyword.id
          payment_params[:start_date] = Time.zone.now
          days = eval(get_subscription(values[:product_id]).rails_interval)
          payment_params[:end_date] = payment_params[:start_date] + days
        end
    end

    # Rails.logger.debug '============= PAYMENT PROCESSOR ===================='
    # Rails.logger.debug "#{payment_params.as_json.to_s}"
    # Rails.logger.debug '============= PAYMENT PROCESSOR ===================='
    payment_params
  end

  def self.success_page(hash)
    values = ThriveProcessor.success_page(hash)

    return false if values == false

    payment_params = {
        subscription_id: get_subscription(values[:product_id])[:id],
        order_id: values[:order_id]
    }

    payment_params
  end

  def self.pay_params(values, details)
    {
        subscription_id: get_subscription(values[:product_id])[:id],
        status: values[:status],
        order_id: values[:order_id],
        customer_id: values[:customer][:id],
        amount: values[:amount],
        currency: values[:currency],
        email: values[:customer][:email],
        ip: values[:customer][:ip_address],
        details: details
    }
  end

  def self.products
    Rails.env.production? ? [10] : [10]
  end

  def self.get_subscription(product_id)
    Subscription.find_by_product_id(product_id)
  end
end