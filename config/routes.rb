Rails.application.routes.draw do

  # You can have the root of your site routed with "root"
  root 'static#index'


  # static pages
  get 'about' => 'static#about'
  get 'contact' => 'static#contact'

  # session handler for modifying portfolio
  get 'login', to: 'sessions#new'
  post 'login', to: 'sessions#create'
  delete 'logout', to: 'sessions#destroy'

  # Ajax handlers
  concern :remote do
    post '/remote', action: :remote_post
    get '/remote', action: :remote_get
  end

  resources :people, only: [:show, :index], concerns: :remote

  # post pages (catch these before looking for 'category')
  resources :tags, param: :name, only: [:show, :index]
  resources :images, only: [:index, :create, :destroy, :show]

  # post pages (assumes category first)
  get 'all' => 'posts#index'

  resources :categories, only: [:index, :new, :edit, :update, :create, :destroy], concerns: :remote

  # These dynamic routes should be routed last in case other static routes need to be matched first
  get ':category', to: 'categories#show'

  # Posts should be routed after categories so categories can be routed to first. Make sure that Posts Controller handles non-existent category parameter
  resources :posts, :path => ":category/", except: [:index], concerns: :remote


end
