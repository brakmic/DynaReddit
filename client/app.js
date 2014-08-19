/*global app, me, $*/
var $ = require('jquery');
var _ = require('underscore');
var logger = require('andlog');
var config = require('clientconfig');

var Router = require('./router');
var tracking = require('./helpers/metrics');
var MainView = require('./views/main');
var Me = require('./models/me');
var domReady = require('domready');
var DynaReddit = require('./scripts/dynareddit');
var Reddits = require('./models/reddits');

module.exports = {
    // this is the the whole app initter
    blastoff: function () {
        var self = window.app = this;

        // create our global 'me' object and an empty collection for our people models.
        window.me = new Me();
        window.$ = $;
        // make the reddits globally available
        // this collection will be updated by the callback method below
        window.reddits = new Reddits();
        // this callback will be called every time a new subreddit arrives
        var callback = function(r){
            if(!r.over_18){
                //Copy some of the available Reddit JSON fields
                //Consult the docs at https://github.com/reddit/reddit/wiki/JSON#link-implements-votable--created
                reddits.add({
                    subreddit_id: r.subreddit_id,
                    title: r.title,
                    author: r.author,
                    url: r.url,
                    permalink: r.permalink,
                    score: r.score,
                    selftext: r.selftext,
                    selftext_html: r.selftext_html,
                    subreddit: r.subreddit,
                    thumbnail: r.thumbnail,
                    over_18: r.over_18
                });
            }else{
                console.log('Received content is not for nerds. ;)');
            }
        };
        // initialize the wrapper object
        // in the router.js the generated collection of reddits will be passed to the reddits-view
        window.dynaReddit = new DynaReddit(
                        {
                            apiKey: '50ed18dd967b455393ed', //api key from http://blog.pusher.com/pusher-realtime-reddit-api
                            channels: ['askreddit','earthporn','pics','worldnews','javascript','television','news'],
                            callback: callback
                        });
        // init our URL handlers and the history tracker
        this.router = new Router();

        // wait for document ready to render our main view
        // this ensures the document has a body, etc.
        domReady(function () {
            // init our main view
            var mainView = self.view = new MainView({
                model: me,
                el: document.body
            });

            // ...and render it
            mainView.render();

            // listen for new pages from the router
            self.router.on('newPage', mainView.setPage, mainView);

            // we have what we need, we can now start our router and show the appropriate page
            self.router.history.start({pushState: true, root: '/'});
        });
    },

    // This is how you navigate around the app.
    // this gets called by a global click handler that handles
    // all the <a> tags in the app.
    // it expects a url without a leading slash.
    // for example: "costello/settings".
    navigate: function (page) {
        var url = (page.charAt(0) === '/') ? page.slice(1) : page;
        this.router.history.navigate(url, {trigger: true});
    }
};

// run it
module.exports.blastoff();
