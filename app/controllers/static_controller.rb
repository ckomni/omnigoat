class StaticController < ApplicationController

  def index
    @splash = true
    @style = rand(10).to_i
    puts "Style: #{@style}"
    session[:cheevos] = session[:cheevos]||[]
    add_cheevo("pixelgoat", "Pixel Art Goat") if (@style == 0)
    bubbles = params[:q] || rand(5) + 5
    @images = Image.all.limit(bubbles).order("RANDOM()")
  end

  def about
    @kyle = Person.find_by(firstname: "Kyle")
  end

  def contact
  end

  def notfound
  end

end
