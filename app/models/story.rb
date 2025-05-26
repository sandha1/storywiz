class Story < ApplicationRecord
  validates :title, presence: true
  validates :content, presence: true
  validate :all_safe_words?

  def create_story

    client = OpenAI::Client.new
    chatgpt_response = client.chat(parameters: {
      model: "gpt-4o-mini",

      messages: [{ role: "user", content:
    "propose moi, dans un fichier JSON comportant un champ title et un champ content, une histoire, en français, pour des enfants de 3 à 10 ans, d'une durée entre 5 et 10 minutes en prenant bien garde de ne pas avoir de contenu inapproprié : ni gros-mot, ni mort, ni référence à la religion, ni référence à l'amour ou a la sexualité (si le moindre doute, renvoie title=”erreur”, content=”erreur”). Ne réponds qu’avec le JSON demandé."}]
    })

    content = chatgpt_response["choices"][0]["message"]["content"]
    g = content.gsub('```','')
    c= g.gsub("json\n","")
    return JSON.parse(c,symbolize_names: true)

  end

  def all_safe_words?
    ForbiddenWord.all.each do |word|
      return errors.add(:content, "contient des mots interdits") if content.include?(word.word) || title.include?(word.word)
    end
    return true
  end

end
