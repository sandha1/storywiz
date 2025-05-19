class AddTitleToStories < ActiveRecord::Migration[7.1]
  def change
    add_column :stories, :title, :string
    add_column :stories, :content, :text
  end
end
