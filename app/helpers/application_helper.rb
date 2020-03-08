# application helper
module ApplicationHelper
  # return current year based on tz
  def current_year
    Time.zone.now.year
  end

  # date format yyyy-mm-dd HH:MM timezone
  def date_time_with_zone(date)
    date.strftime('%Y-%m-%d %H:%M %Z')
  end

  # date format yyyy-mm-dd timezone
  def date_with_zone(date)
    date.strftime('%Y-%m-%d %Z')
  end

  def mdy(date)
    # date.strftime('%m/%d/%y')
    date.strftime('%Y-%m-%d %H:%m')
  end

  def gravatar(size = 60)
    # def_img = "#{root_url}images/profile-off.png"
    # "404", "mm", "identicon", "monsterid", "wavatar", "retro",
    # "blank" or an absolute URL.
    def_img = 'mm'
    g_id = Digest::MD5.hexdigest(current_user.email.downcase)
    "//gravatar.com/avatar/#{g_id}.png?s=#{size}&d=#{CGI.escape(def_img)}"
  end

  def toastr_messages
    flash_messages = []
    flash.each do |type, message|
      type = 'success' if type == 'notice'
      type = 'error'   if type == 'alert'
      text = "<script>toastr.#{type}('#{message}');</script>"
      flash_messages << text.html_safe if message
    end
    flash_messages.join("\n").html_safe
  end
end