require 'rails_helper'
require_relative '../../app/models/story.rb'

RSpec.describe Story, type: :model do
  it "is initialized with a hash of properties" do
    properties = { title: "Cool Story", content: "This cool story is about a wizard who can grant three wishes."}
    story = Story.new(properties)
    expect(story).to be_a(Story)
  end

  it "is invalid when the values are nil" do
    story = Story.new( { title: "", content: "" } )
    expect(story).to be_invalid
  end
end
