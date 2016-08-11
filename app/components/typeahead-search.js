import Ember from 'ember';
import ENV from 'ui-training-heroes/config/environment';

const MIN_QUERY_LENGTH = 3;
export default Ember.Component.extend({
  intitializeTypeahead: Ember.observer(function() {
    Ember.run.scheduleOnce('afterRender', this, '_initializeTypeahead');

    if (this.get('search.isOneWay')) {
      Ember.$('.dropoff-typeahead').addClass('slide');
    }

  }).on('didInsertElement'),

  displayProperty: '',

  _initializeTypeahead: function() {
    var that = this,
      search = this.get('search');
    if (!search) {
      this.addObserver('search', this._initializeTypeahead);
      return;
    } else {
      this.removeObserver('search', this._initializeTypeahead);
    }
    var store = this.get('targetObject.store');
    var destination = this.get('destination');
    var element = this.$().children().filter('.typeahead');

    element.wrap('<div class="clearable-container"></div>');
    element.after(
      '<a href="#" class="clearable-x"><i class="icon clearx"></i></a>'
    );

    this.set('displayProperty', this.get('property'));
    element.typeahead(null, {

      limit: ENV.APP.maxQueryCount * 2,

      display: function(destination) {
        console.log(destination.get('name'));
        return destination.get('name');
      },

      source: function(query, process, processAsync) {
        that.set('searchTerm', query);
        if (this.timer) {
          Ember.run.cancel(this.timer);
        }
        if (query.length < MIN_QUERY_LENGTH) {
          return;
        }
        this.timer = Ember.run.later(function() {
          store.query('character', {
            nameStartsWith: query,
            language: Ember.currentLanguage,
            limit: ENV.APP.maxQueryCount
          }).then(function(data) {
            if (data.toArray().length) {
              processAsync(data.toArray());
            } else {
              processAsync();
            }
          });
        }, 300);
      },

      templates: {
        empty: '<div class="tt-hint"> ' +
          'No Super Heroes matched' +
          ' </div>',

        pending: function(queryObject) {
          var label;

          search.set(destination + 'Destination', null);
          if (!queryObject || !queryObject.query || !
            queryObject.query.length) {
            return;
          }
          label = queryObject.query.length < MIN_QUERY_LENGTH ?
            'Enter More Characters':
            'Looking For Destination';
          return '<div class="tt-hint"> ' +
            label +
            ' </div>';
        },

        suggestion: function(destination) {
          var result = '<div  class="tt-suggestion">';
          result += destination.get('name');
          result += '</div>';
          return result;
        }
      }
    }).on('typeahead:selected typeahead:autocompleted',
      Ember.run.bind(this, function(event, obj) {
        search.set(destination + 'Destination', obj);
        search.set('id' , obj.get('id'));
      })
    ).on('typeahead:close',
      Ember.run.bind(this, function(event) {
        if (!Ember.$(event.target).val().trim()) {
          search.set(destination + 'Destination', null);
          search.set('id' , null);
        }
      })
    );
  }
});
