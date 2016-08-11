import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    goToHero: function(hero) {

      debugger;
      if(hero.get('id') != undefined){
        this.transitionToRoute('hero', hero.get('id'));
      }

    }
  }
});
