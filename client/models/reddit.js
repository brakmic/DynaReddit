var Model = require('ampersand-model');

module.exports = Model.extend({
    idAttribute: 'subreddit_id',
    props: {
        subreddit_id: ['string'],
        title: ['string'],
        author: ['string'],
        url: ['string'],
        permalink: ['string'],
        score: ['number'],
        selftext: ['string'],
        selftext_html: ['string'],
        subreddit: ['string'],
        thumbnail: ['string'],
        over_18: ['boolean']
    }
});
