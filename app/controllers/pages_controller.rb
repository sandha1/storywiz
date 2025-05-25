class PagesController < ApplicationController

  def home
    @story=Story.new
    #@response=@story.create_story
    @response="remettre chatgpt"
  end
end
