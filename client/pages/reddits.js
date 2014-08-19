var PageView = require('./base');
var templates = require('../templates');
var RedditView = require('../views/reddit')
var Collection = require('ampersand-collection');
var _ = require('underscore');

module.exports = PageView.extend({
    pageTitle: 'reddits',
    template: templates.pages.reddits,
    oldCollection: new Collection(),
    maxSavedReddits: 100,
    events: {
        'keyup [role=searchbox]': 'changeSearchTerm',
        'keydown [role=searchbox]': 'changeSearchTerm'
    },
    initialize: function(){
        this.on('change:changeSearchTerm', this.doSearch, this);
        this.collection.bind('add', this.onNewReddit, this);
        this.oldCollection.bind('add', this.onSavedReddit, this);
    },
    render: function(){
        this.renderWithTemplate();
        this.renderCollection(this.collection, RedditView, this.getByRole('reddits'));
        return this;
    },
    changeSearchTerm: function(e){
        this.searchTerm = e.target.value;
        this.trigger('change:changeSearchTerm');
    },
    doSearch: function(){
        var term = this.searchTerm.toLowerCase();
        this.collection.models = _.union(this.collection.models,this.oldCollection.models);
        if(term){
            this.collection.reset(_.filter(this.collection.models, function(reddit){
                return reddit.get('title')
                                .toLowerCase()
                                .indexOf(term) !== -1;
            }));
        }
    },
    onNewReddit: function(reddit){
        this.oldCollection.add(reddit);
    },
    onSavedReddit: function(reddit){
        if(this.oldCollection.models.length >= this.maxSavedReddits){
            this.oldCollection.reset([reddit]);
        }
    }
});
