# frozen_string_literal: true

module Users
  class PasswordsController < Devise::PasswordsController
    respond_to :html, :json, except: %i[edit update new]

    # GET /resource/password/new
    # def new
    #   super
    # end

    # POST /resource/password
    # def create
    #   super
    # end

    # GET /resource/password/edit?reset_password_token=abcdef
    def edit
      user = User.with_reset_password_token(params[:reset_password_token])
      @no_user = user.nil?
      super unless @no_user
      redirect_to root_path, alert: 'The link you tried to access is invalid' if @no_user
    end

    # PUT /resource/password
    # def update
    #   super
    # end

    # protected

    # def after_resetting_password_path_for(resource)
    #   super(resource)
    # end

    # The path used after sending reset password instructions
    # def after_sending_reset_password_instructions_path_for(resource_name)
    #   super(resource_name)
    # end
  end
end
