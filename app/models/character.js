import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  description: DS.attr('string'),
  resourceURI: DS.attr('string'),
  thumbnail: DS.attr('string'),
  comics: DS.attr('string'),
  events: DS.attr('string'),
  series: DS.attr('string'),
  stories: DS.attr('string'),
  urls: DS.attr('string')
});
