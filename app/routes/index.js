import Ember from 'ember';

export default Ember.Route.extend({
  // model: function() {
  //   // this.store.queryRecord('character', { id : 1011334, ts:'1470348716062', apikey:'1fba083ab486de3b5b25b10bc2bc42e3', hash: 'cc49960edcdf490b8ab639b805f89f9a'});
  //   return this.store.query('character', {});
  //   // return this.store.queryRecord('character', {id: 1011335});
  //   // return this.store.queryRecord('character', {id: 1011335});
  // }
  model: function() {
    return this.store.query('character', {});
  }
});
