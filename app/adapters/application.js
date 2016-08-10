import DS from 'ember-data';
import ENV from 'ui-training-heroes/config/environment';

export default DS.RESTAdapter.extend({
  host: 'http://gateway.marvel.com',
  namespace: '/v1/public',
  query: function(store, type, query) {
    // ts:'1470348716062' + apikey:'1fba083ab486de3b5b25b10bc2bc42e3', hash: 'cc49960edcdf490b8ab639b805f89f9a';
    // var publicKey = '1fba083ab486de3b5b25b10bc2bc42e3';
    // var url = this.buildURL(type.modelName, null, null, 'find', query)  + '?ts=' + '1470348716062' + '&apikey=' + publicKey + '&hash=' + 'cc49960edcdf490b8ab639b805f89f9a';
    var url = this.buildURL(type.modelName, typeof(query) == 'string' ? query : null, null, 'find', query)  + this.generateSignature();
    // delete query['id'];
    return this.ajax(url, 'GET', {
      data: query
    });
  },
  queryRecord: function(store, type, query) {
    // ts:'1470348716062' + apikey:'1fba083ab486de3b5b25b10bc2bc42e3', hash: 'cc49960edcdf490b8ab639b805f89f9a';
    // var publicKey = '1fba083ab486de3b5b25b10bc2bc42e3';
    // var url = this.buildURL(type.modelName, null, null, 'find', query)  + '?ts=' + '1470348716062' + '&apikey=' + publicKey + '&hash=' + 'cc49960edcdf490b8ab639b805f89f9a';
    var url = this.buildURL(type.modelName, Object.keys(query).length != 0 ? query : null, null, 'find', query)  + this.generateSignature();
    // delete query['id'];
    return this.ajax(url, 'GET', {
      data: query
    });
  },
  findRecord: function(store, type, query) {
    var url = this.buildURL(type.modelName, Object.keys(query).length != 0 ? query : null, null, 'findRecord', query)  + this.generateSignature();
    this.ajax(url, 'GET', {
      data: query
    });
  },
  generateSignature: function(){
    var ts = new Date().valueOf();
    var publicKey = '1fba083ab486de3b5b25b10bc2bc42e3';
    // var hash = md5(ts + 'c66f979ede965163cfc1bd2838a431f306ee3f16' + publicKey);
    var hash = md5(ts + ENV["marvel-private-key"] + publicKey);
    console.log(ENV["marvel-private-key"]);
    // var hash = 'cc49960edcdf490b8ab639b805f89f9a';
    return "?ts=" + ts + "&apikey=" + publicKey + "&hash=" + hash;
  }

// export default DS.RESTAdapter.extend({
//   host: "http://gateway.marvel.com:80",
//   namespace: "v1/public",
//   buildURL: function(record, suffix) {
//     return this._super(record, suffix) + this.generateSignature();
//   },
//   findHasMany: function(store, record, url){
//     return this._super(store, record, url + this.generateSignature());
//   },
//   generateSignature: function(){
//     var publicKey = "18c8fb640a9de112ae4792f873ee19d2";
//     return "?ts=" + "1" + "&apikey=" + publicKey + "&hash=" + "ef67b6d3318340a2ab5880cc6d08c63a";
//   }


});
