import { Meteor } from 'meteor/meteor';
import Twit from 'twit';

Api = new Restivus({
	useDefaultAuth: true,
	prettyJson: true
});

Api.addRoute('twitter/feed/:userId', {authRequired: false}, {
	get: function() {
		let user = Meteor.users.findOne(this.urlParams.userId);

		let Twitter = new Twit({
			consumer_key: '1Scmykinx39JgSGgAm8CxapEw',
			consumer_secret: 'CTYqmRkMC09urf61haguPnU7MPWyw97AXaDWDXMiZgoK5T90m8',
			access_token: user.services.twitter.accessToken ,
			access_token_secret: user.services.twitter.accessTokenSecret
		});

		Twitter.get('statuses/home_timeline', {}, function(err,data,response){
			if(err) {
				console.log(err);
			}	
			else {
				console.log(typeof(data));
				return data;
			}
		});
		
	}
});