class GuitarParty

  def self.song_info(song_title, song_artist)
    body_chords = {}
    chords = []
    url = "http://api.guitarparty.com/v2/songs/?query=#{song_title}"
    api_call = HTTParty.get(URI.escape(url),
                            headers: {"Guitarparty-Api-Key" => ENV["GUITAR_PARTY_API_KEY"]})
    api_results = api_call["objects"]
    if api_results != {}
      api_results.each do |song|
        song_authors = song["authors"].map { |author| author["name"] }
        if song_authors.include?(song_artist)
          song["chords"].each do |chord|
            chords.push(chord["name"])
          end
        body_chords = {chords: chords.uniq.sort.join(','), body: song["body_chords_html"]}
        end
      end
    end

  body_chords
  end
end
