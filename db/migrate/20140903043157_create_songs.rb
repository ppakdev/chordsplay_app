class CreateSongs < ActiveRecord::Migration
  def change
    create_table :songs do |t|
      t.string :title
      t.string :artist
      t.string :chords
      t.text :body
      t.integer :year
      t.string :youtube_url
      t.string :soundcloud_url
      t.string :ug_url

      t.timestamps
    end
  end
end
