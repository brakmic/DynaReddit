var PageView = require('./base');
var templates = require('../templates');
var RedditView = require('../views/reddit')

module.exports = PageView.extend({
    pageTitle: 'reddits',
    template: templates.pages.reddits,
    render: function(){
        this.renderWithTemplate();
        this.renderCollection(this.collection, RedditView, this.getByRole('reddits'));
    }
});
