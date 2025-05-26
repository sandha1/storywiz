class CreateForbiddenWords < ActiveRecord::Migration[7.1]
  def change
    create_table :forbidden_words do |t|
      t.string :language
      t.string :word

      t.timestamps
    end
  end
end
