var _ = require('underscore');
var State = require('ampersand-state');

//this class is just a thin wrapper over the Pusher API (http://pusher.com/docs)

module.exports = State.extend({
    redditChannels: [], // here we'll collect the subscribed channels
    props: {   // by default an ampersand-state object has some props (default fields)
        apiKey: {
            type: 'string',
            default: function(){
                return '50ed18dd967b455393ed';  //if there's no key we'll use the one from
                                                // http://blog.pusher.com/pusher-realtime-reddit-api/
            }
        },
        channels: {                         // a few hard-coded channels if we're not providing own
                     type: 'array',         // in future versions of this app I'll provide some visual interface to
                     default: function(){   // select more channels (but, this is just a demo ;)
                        return [
                                'askreddit',
                                'earthporn',
                                'pics',
                                'worldnews',
                                'javascript',
                                'television',
                                'news'
                                ];
                            }
                    },
        callback: 'any'   // callback which should be called when a new subreddit arrives
    },
    initialize: function(){   // this function will be called once (consult http://ampersand.js.com/docs)
        var self = this;
        this.pusher = new Pusher(this.apiKey);  //initialize the Pusher + provide the API-Key
        console.log('Initializing DynaReddit with ApiKey: ' + this.apiKey);
        _.each(this.channels, function(channel, index){  //loop over known channels and subscribe via Pusher
            var subredditChannel = self.pusher.subscribe(channel);
            subredditChannel.bind('new-listing', self.callback);  //each channel utilizes the same callback
            self.redditChannels.push(subredditChannel); //save subscribed channels
            console.log('Subscribed to ' + channel);
        });
    }
});
