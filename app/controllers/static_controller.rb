class StaticController < ApplicationController

  def index
    @splash = true
    @goat = rand(10).to_f
    session[:cheevos] = session[:cheevos]||[]
    add_cheevo("pixelgoat", "Pixel Art Goat") if (@goat == 0)
    bubbles = params[:q] || rand(5) + 5
    @images = Image.all.limit(bubbles).order("RANDOM()")
  end

  def about
    @kyle = Person.find_by(firstname: "Kyle")
  end

  def contact
  end

end
