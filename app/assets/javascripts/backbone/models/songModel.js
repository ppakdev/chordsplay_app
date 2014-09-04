App.Models.Song = Backbone.Model.extend({
  initialize: function() {
    console.log('this is a song model');
  },
  urlRoot: '/songs/'
});
