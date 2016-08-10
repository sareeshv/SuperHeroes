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

        // "data": {
        //   "type": 'character',
        //   "id": "1",
        //   "attributes": {
        //     // ... this article's attributes
        //   },
        //   "relationships": {
        //     // ... this article's relationships
        //   }
        // }

    };
  }
});
