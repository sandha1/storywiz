require 'rails_helper'

RSpec.describe "Stories", type: :request do
  describe "POST /create" do
    context "when the request is successful" do
      it "creates a new story and redirects to the home page" do
        expect {
          post root_path, story_params: { story: { title: "Cool Story", content: "A wizard grants three wishes." } }
        }.to change(Story, :count).by(1)

        expect(response).to redirect_to(root_path)

        follow_redirect!
        expect(response.body).to include("Cool Story")
      end
    end
  end
end
