App.Views.Songs = Backbone.View.extend({
  el: '#search-results',
  initialize: function() {
    console.log('song list view');
    this.listenTo(this.collection, 'add', this.addOne);
    this.listenTo(this.collection, 'reset', this.addAll);
  },

});
