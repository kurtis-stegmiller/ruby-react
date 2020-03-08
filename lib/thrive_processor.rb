# thrive payment processor
class ThriveProcessor
  require 'digest/md5'

  def self.account
    ENV['THRIVE_CART_ACCOUNT']
  end

  def self.secret
    ENV['THRIVE_CART_API_KEY']
  end

  def self.products
    Rails.env.production? ? [10] : [10]
  end

  def self.process(hash)
    # Rails.logger.debug '============= THRIVE PROCESSOR PROCESS ===================='
    # Rails.logger.debug "secret = #{secret}"
    # Rails.logger.debug "hash[:thrivecart_secret] = #{hash[:thrivecart_secret]}"
    # Rails.logger.debug "secret == hash[:thrivecart_secret] = #{secret == hash[:thrivecart_secret]}"
    # Rails.logger.debug "hash[:order].empty? = #{hash[:order].empty?}"
    # # Rails.logger.debug "digest = #{hash[:fulfillment][:hash]}" # crash with funnel
    # Rails.logger.debug "order = #{hash[:order].as_json.to_s}"
    # Rails.logger.debug "query = #{hash.to_query('thrivecart')}"
    return false unless self.params_ok?(hash)

    ret_val = {
        order_id: hash[:order_id],
        customer: hash[:customer],
        status: self.order_status(hash[:event]),
        amount: hash[:order][:total].to_f / 100,
        currency: hash[:currency],
        product_id: hash[:base_product].to_i
    }
    # Rails.logger.debug "ret_val = #{ret_val.as_json.to_s}"
    # Rails.logger.debug '============= THRIVE PROCESSOR ===================='
    ret_val
  end

  def self.success_page(hash)
    # Rails.logger.debug '============= THRIVE PROCESSOR SUCCESS ===================='
    # Rails.logger.debug "hash[:thrivecart_hash].nil? = #{hash[:thrivecart_hash].nil?}"
    # Rails.logger.debug "hash[:thrivecart_hash].length != 32 = #{hash[:thrivecart_hash].length != 32}"
    # Rails.logger.debug "hash[:thrivecart].nil? = #{hash[:thrivecart].nil?}"
    # Rails.logger.debug "hash[:thrivecart].empty? = #{hash[:thrivecart].empty?}"
    # Rails.logger.debug "hash[:thrivecart_hash] = #{hash[:thrivecart_hash]}"
    # Rails.logger.debug "create_hash_md5(hash[:thrivecart]) = #{create_hash_md5(hash[:thrivecart])}"
    # Rails.logger.debug "hash[:thrivecart][:order]  = #{hash[:thrivecart][:order]}"
    return false if hash[:thrivecart_hash].nil? || hash[:thrivecart_hash].length != 32
    return false if hash[:thrivecart].nil? || hash[:thrivecart].empty?
    # return false if hash[:thrivecart_hash] != create_hash_md5(hash[:thrivecart])
    return false unless products.include?(hash[:thrivecart][:product_id].to_i)

    ret_val = {
        order_id: hash[:thrivecart][:order_id],
        product_id: hash[:thrivecart][:product_id].to_i
    }
    ret_val
    # Rails.logger.debug '============= THRIVE PROCESSOR ===================='
  end

  def self.params_ok?(hash)
    return true if secret == hash[:thrivecart_secret]
    return true unless hash[:order].empty?
    return true if products.include?(hash[:base_product].to_i)
    false
  end

  def self.order_status(status)
    case status
    when 'order.success'
      ret_val = Payment::TYPE_APPROVED
    when 'order.subscription_payment'
      ret_val = Payment::TYPE_APPROVED
    when 'order.subscription_cancelled'
      ret_val = Payment::TYPE_CANCEL
    when 'order.refund'
      ret_val = Payment::TYPE_REFUND
    else
      ret_val = Payment::TYPE_REJECTED
    end
    ret_val
  end

  def self.encode_hash(hash)
    # Rails.logger.debug '============= THRIVE PROCESSOR ENCODE HASH ===================='
    # Rails.logger.debug "#{hash}"
    hash.transform_values! do |val|
      if val.is_a?(Array) || val.is_a?(Hash)
      # if val.is_a?(Hash)
        encode_hash(val)
      else
        # Rails.logger.debug "URI.encode(val) = #{ERB::Util.url_encode(val)}"
        ERB::Util.url_encode(val)
      end
    end
  end

  def self.create_hash_md5(hash)
    encoded = encode_hash(hash)
    # encoded[:order] = encoded[:order].values unless encoded[:order].nil?
    # encoded[:purchases] = encoded[:purchases].values unless encoded[:purchases].nil?
    str = "#{secret}__#{encoded.to_json.upcase}"
    # Rails.logger.debug "str = #{str}"
    Digest::MD5.hexdigest(str)
  end

end