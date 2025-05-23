class PagesController < ApplicationController

  def home
    client = OpenAI::Client.new
    chatgpt_response = client.chat(parameters: {
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: 'Tell a short story for a child between 3 and 5 years old.
      First, provide a title for the story labeled as "Title:".
      Then, write the story content under "Story:". Make sure the title is short, compelling and relevant to the story content.
      Format your response like this:
      Title: [Insert Title]
      Story: [Insert Story]' }]
    })

    response = chatgpt_response["choices"][0]["message"]["content"]

    @story_title = response.match(/^Title:\s*(.+?)\s*Story:/m)[1].strip
    @story_content = response.match(/Story:\s*(.+)/m)[1].strip

    @story = Story.new({ title: @story_title, content: @story_content })
  end
end
