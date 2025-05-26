Rails.application.routes.draw do
  root to: "pages#home"

  post "generate_story", to: "pages#generate_story"
end
