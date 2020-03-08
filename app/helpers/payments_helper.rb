# payments helper
module PaymentsHelper
  def thrive_pass_through(user)
    return "" if user.nil?
    email = CGI.escape(user.email)
    "?passthrough[user]=#{user.id}&passthrough[customer_email]=#{email}"
  end
end
