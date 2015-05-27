class StaticController < ApplicationController

  def index
  end

  def about
    @kyle = Person.find_by(firstname: "Kyle")
  end

  def contact
  end

end
