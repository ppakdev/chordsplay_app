json.array!(@songs) do |song|
  json.extract! song, :id, :title, :artist, :chords, :body, :year, :youtube_url, :soundcloud_url, :ug_url
  json.url song_url(song, format: :json)
end
