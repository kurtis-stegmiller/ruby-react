class DevelopmentMailInterceptor
  def self.delivering_email(message)
    email = 'af@boxonline.com'

    #Rails.logger.warn "Emails are sent to #{email} email account from #{Rails.env} env"

    development_information =  "[ TO: #{message.to} ]"
    development_information << " [ CC: #{message.cc} ]" if message.cc
    development_information << " [ BCC: #{message.bcc} ]" if message.bcc

    message.to = email
    message.cc = nil
    message.bcc = nil
    message.subject = "[DEV] #{message.subject}"
    message.body = "#{development_information} \n\n #{message.body}"
  end
end
