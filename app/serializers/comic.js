import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  normalizeResponse:function (store, cons, payload) {
    return {
      data: payload.data.results.map(function (comic) {
        // console.log('comic: ', comic);
        var obj= {};
        obj.id = comic.id;
        obj.type = 'comic';
        obj.attributes = comic;
        return obj;
      })
    };
  }
});
