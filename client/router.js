/*global me, app*/
var Router = require('ampersand-router');
var HomePage = require('./pages/home');
var RedditPage = require('./pages/reddits');

module.exports = Router.extend({
    routes: {
        '': 'home',
        'reddits': 'reddits',
        '(*path)': 'catchAll'
    },

    // ------- ROUTE HANDLERS ---------
    home: function () {
        this.trigger('page', new HomePage({
            model: me
        }));
    },

    reddits: function(){
        this.trigger('page', new RedditPage({
            collection: reddits
        }));
    },

    catchAll: function () {
        this.redirectTo('');
    }
});
