require_dependency "datadisplay/application_controller"

module Datadisplay
  class PrinterController < ApplicationController
    
    def index
      @class = params[:type].constantize
      @data = @class.all
    end
    
  end
end
