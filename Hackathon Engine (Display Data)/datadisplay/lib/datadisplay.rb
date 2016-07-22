#load all dependencies
Gem.loaded_specs['datadisplay'].dependencies.each do |d|
 require d.name
end

require "datadisplay/engine"

module Datadisplay
end
