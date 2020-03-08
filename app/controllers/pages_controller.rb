# pages controller
class PagesController < ApplicationController
  include BlockUserAgent
  def index; end

  def log_data
    kw = Keyword.by_keyword(params[:keyword]).active.first
    redirect_to root_path if kw.nil?
    unless kw.valid_payment?
      kw.expired!
      redirect_to root_path
    end
    kw.clicks += 1
    kw.save unless ignore_ua?(request.env['HTTP_USER_AGENT'])
    redirect_to kw.url
  end

  def subscriptions
    @subs = if logged_in?(:admin)
              Subscription.by_period.admin
            else
              Subscription.by_period.user
            end
  end

end
