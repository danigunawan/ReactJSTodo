Datadisplay::Engine.routes.draw do
  get 'printer/index'
  root to: "printer#index"
end
