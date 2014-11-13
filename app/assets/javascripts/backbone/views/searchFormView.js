App.Views.SearchFormView = Backbone.View.extend({
  el: '#search',
  initialize: function() {
    console.log("SEARCHFORMVIEWLOADED");

    // tells the page with type of search is being run
    var sel = $('#search-type');
    sel.change(function(){
      var value = $(this).val();
      $('label').text(value);
      if (value === 'Chords') {
        $('div#chord-section').removeClass('hide');
        $('input.search-bar').val('');
      } else if (value === 'Song Title') {
        $('div#chord-section').addClass('hide');
        $('input.search-bar').val('').attr('placeholder', 'ex. Wonderwall');
      } else {
        $('div#chord-section').addClass('hide');
        $('input.search-bar').val('').attr('placeholder', 'ex. Adele');
      }
    });
    this.template = HandlebarsTemplates['songs/result'];
  },

  events: {
    'click span.chords': 'clickChord',
    'click #search-submit': 'getQuery',
    'keypress input.search-bar': 'searchByEnter'
  },

  render: function() {
    this.$el.html(this.template);
  },

  searchByEnter: function(e) {
    if (e.which === 13) {
      this.getQuery();
    }
  },

  getQuery: function() {
    App.router.navigate('search/results');
    var searchType = $('label').text();
    var searchQuery = $('input.search-bar').val().capitalize();

    // depending on what search is being run, creates search data for that type
    if (searchType === 'Song Title') {
      var titleSearchQuery = {title: searchQuery};
      this.searchDB(titleSearchQuery);
    } else if (searchType === 'Artist') {
      var artistSearchQuery = {artist: searchQuery};
      this.searchDB(artistSearchQuery);
    } else if (searchType === 'Chords') {
      var selectedChords = $('.chords.success').text();
      var searchChords = selectedChords.split(/(?=[A-Z])/).sort().join(',');
      var chordSearchQuery = {chords: searchChords};
      this.searchDB(chordSearchQuery);
    }
  },

  // change chord color when chosen
  clickChord: function(e) {
    var button = e.currentTarget;
    if (!$(button).hasClass('success')) {
      $(button).addClass('success');
    } else {
      $(button).removeClass('success');
    }
  },

  // from collection finding songs that match query
  searchDB: function(searchQuery) {
    console.log(searchQuery);
    var searchResult = App.Collections.searchResults.where(searchQuery);
    console.log(searchResult);
    for (var i = 0; i < searchResult.length; i++) {
      var resultSong = searchResult[i];
      resultSong.fetch();
      $('.results-list').append(this.template(resultSong.attributes));
    }
  }
});


String.prototype.capitalize = function(){
   return this.replace( /(^|\s)([a-z])/g , function(m,p1,p2){ return p1+p2.toUpperCase(); } );
  };
