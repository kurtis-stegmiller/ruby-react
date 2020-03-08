# check for user agents to block
module BlockUserAgent
  extend ActiveSupport::Concern

  IGNORE_UA = [
      'SkypeUriPreview', 'Google Favicon', 'Googlebot/2.1', 'GoogleWebLight',
      'Gluten Free Crawler', 'Mixmax-LinkPreview', 'Slackbot', 'Twitterbot',
      'help@dataminr.com', 'PaperLiBot/2.1', 'um-LN/1.0', 'BLEXBot/1.0',
      'swan/1.0', '+http://tweetedtimes.com', 'rv:1.9.0.9',
      'techinfo@ubermetrics-technologies.com', 'Baiduspider', 'LinkedInBot',
      'WhatsApp'
  ].freeze

  def ignore_ua?(ua_string)
    IGNORE_UA.any? { |ua| ua_string.include?(ua) }
  end

end
