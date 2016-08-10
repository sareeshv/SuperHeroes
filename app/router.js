import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('index', {
    path: '/'
  }, function() {});
  this.route('heroes');
  this.route('hero', { path: '/hero/:hero_id' });
  this.route('comics');
});

export default Router;
