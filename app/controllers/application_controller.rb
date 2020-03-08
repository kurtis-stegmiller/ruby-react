# application controller
class ApplicationController < ActionController::Base
  # protect_from_forgery with: :exception
  protect_from_forgery with: :null_session,
                       only: Proc.new { |c| c.request.format.json? }

  def prepare_exception_notifier
    user = {}
    unless current_user.nil?
      user[:id] = current_user.id
      user[:name] = current_user.name unless current_user.profile.nil?
    end
    request.env['exception_notifier.exception_data'] = {
        current_user: user
    }
  end
end


