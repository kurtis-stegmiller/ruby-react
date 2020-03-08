Rails.application.routes.draw do
  defaults format: :json do
    resources :keywords, except: %i[new edit]
    get 'keyword-lookup/:keyword', to: 'keywords#lookup'
    delete 'keywords-delete', to: 'keywords#destroy_selected'
    get 'subscriptions', to: 'pages#subscriptions'
    post 'payments', to: 'payments#create'
    post 'payment', to: 'payments#new'
    get 'payments', to: 'payments#index'
    as :user do
      get 'login', to: 'users/sessions#new', as: :new_user_session, defaults: { format: :html}
      post 'login', to: 'users/sessions#create', as: :user_session, defaults: { format: :html}
      delete 'logout', to: 'users/sessions#destroy', as: :destroy_user_session
      get 'is-logged-in', to: 'users/sessions#signed_in?'

      get 'register', to: 'users/registrations#new',
                      as: :new_user_registration
      post 'register', to: 'users/registrations#create'
      post 'check-email', to: 'users/registrations#check_email'
      get 'unregister', to: 'users/registrations#cancel',
                        as: :cancel_user_registration
      get 'users/edit', to: 'users/registrations#edit',
                        as: :edit_user_registration
      scope :users, as: 'users_registration' do
        patch '', to: 'users/registrations#update', defaults: { format: :html}
        put '', to: 'users/registrations#update', defaults: { format: :html}
        delete '', to: 'users/registrations#destroy'
        post '', to: 'users/registrations#create'
      end

      get 'recover-password', to: 'users/passwords#edit', as: :edit_user_password, defaults: { format: :html}
      post 'recover-password', to: 'users/passwords#create'

      # scope :users, as: 'user_password' do
      #   put '', to: 'users/passwords#update'
      # end
    end
  end

  devise_for :users, skip: %i[sessions registrations]

  get 'success', as: 'payment_success', controller: 'payments', action: 'show'

  get '/:keyword', to: 'pages#log_data', as: 'redirect',
                   constraints: lambda { |request|
                                  Keyword.where(keyword: request[:keyword])
                                         .active.any?
                                }

  get '/(:keyword)', to: 'pages#index', as: 'root'
  # root 'pages#index'
end
