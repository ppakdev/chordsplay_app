require 'open-uri'
require 'nokogiri'

# billboard top 100 lists
(1996..Time.now.year-1).each do |year|
  url = "http://billboardtop100of.com/#{year}-2/"
  doc = Nokogiri::HTML(open(url))

  current_year = year

  #returns 1-100 songs of the year (rank/artist/title)
  songs_list = doc.at_css("tbody").children.map {|rank| rank.text }

  songs_split = songs_list.map {|song| song.split("\n").reject(&:empty?)}
  songs_final = songs_split.reject(&:empty?)
  #[0] = rank
  #[1] = artist
  #[2] = title

  songs_final.each do |entry|
    entry_info = GuitarParty.song_info(entry[2], entry[1])
    if entry_info != {}
      Song.create({
        artist: entry[1],
        title: entry[2],
        year: current_year,
        chords: entry_info[:chords],
        # soundcloud_url: [soundcloud api call],
        body: entry_info[:body]
        })
    end
  end


end
