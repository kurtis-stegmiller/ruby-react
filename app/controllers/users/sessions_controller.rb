# frozen_string_literal: true

module Users
  # sessions controller
  class SessionsController < Devise::SessionsController
    respond_to :json
    protect_from_forgery except: %i[create destroy]
    # before_action :configure_sign_in_params, only: [:create]

    def signed_in?
      head :no_content if current_user.nil?
    end

    # GET /resource/sign_in
    # def new
    #   super
    # end

    # POST /resource/sign_in
    def create
      self.resource = warden.authenticate!(scope: resource_name)
      sign_in(resource_name, resource)
    end

    # DELETE /resource/sign_out
    def destroy
      sign_out(resource_name)
      render json: { logout: 'ok' }
    end

    # protected

    # If you have extra params to permit, append them to the sanitizer.
    # def configure_sign_in_params
    #   devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
    # end
  end
end
