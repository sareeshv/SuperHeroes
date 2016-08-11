import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  normalizeResponse:function (store, cons, payload) {
    return {
      data: payload.data.results.map(function (character) {
        // console.log('character: ', character);
        var obj= {};
        obj.id = character.id;
        obj.type = 'character';
        obj.attributes = character;
        obj.relationships = {}
        return obj;
      })
    };
  }
});
