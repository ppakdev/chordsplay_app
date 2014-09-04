App.Views.Song = Backbone.View.extend({
  el: 'section#song',
  initialize: function(){
    console.log('single entry view');
    this.template = HandlebarsTemplates['songs/song'];
    this.render();
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
  }

});
