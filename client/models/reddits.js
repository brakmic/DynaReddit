var Collection = require('ampersand-collection');
var Reddit = require('./reddit');

module.exports = Collection.extend( {
    model: Reddit,
    mainIndex: 'subreddit_id',
    initialize: function(){
        this.on('add', function(reddit){
            console.log('New reddit: ' + reddit.title);
        })
    }
});
