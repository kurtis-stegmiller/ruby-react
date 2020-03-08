source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end

gem 'tzinfo-data'
gem 'active_model_serializers', '~> 0.10.7'
gem 'bcrypt', '~> 3.1.7'
gem 'bootstrap', '~> 4.1'
gem 'daemons', '~> 1.2', '>= 1.2.6'
gem 'delayed_job', '~> 4.1', '>= 4.1.2'
gem 'delayed_job_active_record', '~> 4.1', '>= 4.1.2'
gem 'devise', '~> 4.4', '>= 4.4.1'
gem 'dotenv-rails', '~> 2.2', '>= 2.2.1'
gem 'exception_notification', '~> 4.2', '>= 4.2.2'
gem 'font-awesome-sass', '~> 5.0.6'
gem 'jbuilder', '~> 2.5'
gem 'jquery-rails'
gem 'kaminari', '~> 1.1', '>= 1.1.1'
gem 'mail', '~> 2.7'
gem 'mysql2'
gem 'petergate', '~> 1.8', '>= 1.8.1'
gem 'pry-rails', '~> 0.3.6'
gem 'puma', '~> 3.7'
gem 'rails', '~> 5.1.4'
gem 'sass-rails', '~> 5.0'
gem 'simple_form', '~> 5.0'
gem 'uglifier', '>= 1.3.0'
gem 'webpacker'
gem 'react-rails'
gem "paranoia", "~> 2.2"
gem 'rack-cors'

group :development, :test do
  gem 'byebug', platforms: %i[mri mingw x64_mingw]
end

group :development do
  gem 'better_errors', '~> 2.4'
  gem 'binding_of_caller', '~> 0.8.0'
  gem 'capistrano-bundler', require: false
  # gem 'capistrano-passenger'
  # gem 'capistrano-puma', require: false
  gem 'capistrano-rails', require: false
  gem 'capistrano-rbenv', require: false
  gem 'capistrano-ssh-doctor'
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'web-console', '>= 3.3.0'
end
