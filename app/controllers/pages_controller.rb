class PagesController < ApplicationController

  def home
  end

  def generate_story
    client = OpenAI::Client.new
    chatgpt_response = client.chat(parameters: {
      model: "gpt-4o-mini",
      messages: [{
        role: "user",
        content: <<~TEXT
          Tell a short story in French for a child between 3 and 5 years old.
          The response must be in **valid JSON format** and must be structured like this:
          {
          "title": "[Insert story title]",
          "content": "[Insert story content]"
          }
          Only return valid JSON, no extra text or formatting outside of this structure.
          Make sure the title is short, compelling and relevant to the story content and make sure the story is suitable for a child.
        TEXT
      }]
    })

    response = chatgpt_response["choices"][0]["message"]["content"]
    response_json = JSON.parse(response)

    if response_json["title"].present? && response_json["content"].present?
      render json: response_json, status: :ok
    else
      render json: { error: "Format JSON incorrect" }, status: :unprocessable_entity
    end
  end
end
