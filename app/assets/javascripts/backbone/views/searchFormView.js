App.Views.SearchFormView = Backbone.View.extend({
  el: '#search',
  initialize: function() {
    console.log("SEARCHFORMVIEWLOADED");
    var sel = $('#search-type');
    sel.change(function(){
      var value = $(this).val();
      console.log(value);
      $('label').text(value);
      if (value === 'Chords') {
        $('div#chord-section').removeClass('hide');
        $('input.search-bar').val('');
      } else {
        $('div#chord-section').addClass('hide');
        $('input.search-bar').val('');
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
      App.router.navigate('search/results');
    }
  },

  getQuery: function() {
    App.router.navigate('search/results');
    var searchType = $('label').text();
    var searchQuery = $('input.search-bar').val();
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

  clickChord: function(e) {
    var button = e.currentTarget;
    if (!$(button).hasClass('success')) {
      $(button).addClass('success');
    } else {
      $(button).removeClass('success');
    }
  },

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
