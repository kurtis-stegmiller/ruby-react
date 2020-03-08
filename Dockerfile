FROM florescualex/ruby_for_dev:mysql0.4.10-alpine3.7
## The maintainer name and email
LABEL AUTHOR Alex Florescu <florescu_alex@yahoo.com>

ARG rails_env=development

ENV RAILS_ENV $rails_env
ENV RACK_ENV $rails_env
ENV NODE_ENV $rails_env

ENV PATH=/root/.yarn/bin:$PATH
RUN apk add --virtual build-yarn curl && \
  curl -o- -L https://yarnpkg.com/install.sh | sh && \
  apk del build-yarn && gem install bundler

COPY Gemfile Gemfile.lock /tmp/
#COPY Gemfile /tmp/
WORKDIR /tmp
RUN bundle install --jobs 20 --retry 5

WORKDIR /app
