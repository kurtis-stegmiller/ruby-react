require_relative 'boot'

require "rails"
require "active_model/railtie"
require "active_job/railtie"
require "active_record/railtie"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_view/railtie"
require "action_cable/engine"
require "sprockets/railtie"

Bundler.require(*Rails.groups)

module R123ch
  class Application < Rails::Application
    config.load_defaults 5.1
    config.generators.system_tests = nil
    config.active_job.queue_adapter = :delayed_job

    config.active_record.time_zone_aware_types = %i[datetime time]

    locales_path = Rails.root.join('config', 'locales', '**', '*.{rb,yml}')
    config.i18n.load_path += Dir[locales_path]
    config.i18n.fallbacks = true
    config.i18n.default_locale = 'en'

    config.time_zone = 'Zurich'
    config.action_mailer.asset_host = ENV['HOST_URL']


    config.eager_load_paths << "#{Rails.root}/lib"
    config.generators do |g|
      g.javascript_engine :js
      g.stylesheet_engine :scss
    end

    config.middleware.insert_before 0, Rack::Cors do
        allow do
           origins '*'
           resource '*', :headers => :any, :methods => [:get, :post, :options]
         end
      end
  end
end
