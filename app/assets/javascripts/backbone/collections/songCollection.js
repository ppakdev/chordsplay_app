App.Collections.Songs = Backbone.Collection.extend({
  model: App.Models.Song,
  url: '/songs',
  initialize: function() {
    console.log('all the songs');

  },
  save: function(){
    this.each(function(model) {
      if (!model.has('id') || model.hasChanged()) { model.save(); }
    }, this);
  },

  // renderResults: function(song) {
  //   var searchResults = new App.Views.SearchResultsView({ model: song });
  //   this.songViews[movie.get('id')] = searchResults;
  //   this.$el.append(searchResults.$el);
  // }
});
