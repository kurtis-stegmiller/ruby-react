# setup interceptors for emails
if interceptor = Rails.configuration.mail_interceptor
  require "#{Rails.root.to_s}/lib/mail_interceptors/#{interceptor.underscore}"
  ActionMailer::Base.register_interceptor(interceptor.constantize)
end
