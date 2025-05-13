require 'rails_helper'

RSpec.describe "Stories", type: :request do
  describe "#create" do
    context "when the request is successful" do
      it "creates a new story and redirects to the home page" do
        expect {
          post root_path, story_params: { story: { id: 42, title: "Cool Story", content: "A wizard grants three wishes." } }
        }.to change(Story, :count).by(1)

        expect(story).to be_a(Story)
        expect(story.id).to eq(42)
        expect(story.title).to eq('Cool Story')
        expect(story.content).to eq('A wizard grants three wishes.')

        expect(response).to redirect_to(root_path)

        follow_redirect!
        expect(response.body).to include("Cool Story")
      end
    end
  end
end
