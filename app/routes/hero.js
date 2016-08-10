import Ember from 'ember';

export default Ember.Route.extend({
  // model: function(params) {
  //   // return this.store.query('character', {});
  //   return this.store.queryRecord('library', params.hero_id);

  // }

  model: function(params) {
    // return this.store.findRecord('character', params.hero_id);
    return this.store.query('character', params.hero_id);
  }
});
