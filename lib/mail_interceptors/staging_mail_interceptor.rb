class StagingMailInterceptor
  def self.delivering_email(message)
    email = 'af@boxonline.com'
    message.subject = "[STAGING] #{message.subject}"

    #Rails.logger.warn "Emails are sent to #{email} email account from #{Rails.env} env"
    if message.to[0].match('@boxonline.com').nil?
      development_information =  "[ TO: #{message.to} ]"
      development_information << " [ CC: #{message.cc} ]" if message.cc
      development_information << " [ BCC: #{message.bcc} ]" if message.bcc
      development_information << " index = #{message.to[0].index('@boxonline.com').nil?}"
      development_information << "\n\n"

      message.to = email
      message.cc = nil
      message.bcc = nil
      message.body = "#{development_information}#{message.body}"
    end

  end
end
