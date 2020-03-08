# devise mailer
class DeviseMailer < Devise::Mailer
  default from: ENV['FROM_EMAIL']
  add_template_helper(ApplicationHelper)
  # append_view_path Rails.root.join('app', 'views', 'mailers')

  before_action :set_host

  layout 'mailer'

  private

  def set_host
    @host = ENV['HOST_URL']
  end
end
