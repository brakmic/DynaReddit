var View = require('ampersand-view');
var templates = require('../templates');

module.exports = View.extend({
    pageTitle: 'reddit',
    template: templates.includes.reddit,
    bindings: {
        'model.title': {
            role: 'title'
        },
        'model.subreddit': {
            role: 'subreddit'
        },
        'model.author': {
            role: 'author'
        },
        'model.url': {
            role: 'url',
            type: 'attribute',
            name: 'href'
        },
        'model.thumbnail': {
            type: 'attribute',
            role: 'thumbnail',
            name: 'src'
        },
        'model.selftext_html': {
            role: 'selftext_html'
        }
    }
});

