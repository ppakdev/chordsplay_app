App.Router = Backbone.Router.extend({
  routes: {
    '': 'index',
    'search/results': 'results',
    'songs/:id': 'show'
  },

  initialize: function() {
    console.log("app router");
    App.Views.searchFormView = new App.Views.SearchFormView();
    App.Collections.searchResults = new App.Collections.Songs({});
    App.Views.searchResultsView = new App.Views.SearchResultsView();

  },

  index: function() {
    App.Collections.searchResults.fetch();
    $('#wrapper').removeClass('hide');
    $('input').val('');
    $('#search-type').val('Song Title');
    $('div#chord-section').addClass('hide');
    $('section#song').empty();
    $('.results-list').empty();
    $('.chords').removeClass('success');
  },

  results: function() {
    $('input').val('');
  },

  show: function(id) {
    $('#wrapper').addClass('hide');
    $('.results-list').empty();
    var song = new App.Models.Song({ id: id });
    song.fetch({
      success: function() {
        var view = new App.Views.Song({ model: song });
      }
    });
  }


});
