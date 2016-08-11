import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    goToHero: function(hero) {
      if(hero.get('id') != undefined){
        this.transitionToRoute('hero', hero.get('id'));
      }

    }
  }
});
