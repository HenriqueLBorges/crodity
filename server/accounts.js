import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import Twit from 'twit';
import Future from 'fibers/future';


Meteor.methods({
	'getTwitterFeed': function() {
		let future = new Future();
		let user = Meteor.users.findOne(this.userId);


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
				future["return"](data);
			}
		});

		return future.wait();
	},

	'getFacebookFeed': function() {

		// Sets future and user
		let future = new Future();
		let user = Meteor.users.findOne(this.userId);
		
		// Checks if the user has the facebook accessToken
		if(user.services.facebook.accessToken) {

			// Facebook Graph API Call
			HTTP.get(
				'https://graph.facebook.com/v2.5/me/feed?fields=id,from,story,message,message_tags,place,shares,source,to,link,comments,attachments{media},created_time,description,likes,sharedposts&limit=25',
				{
					headers: {
						'Authorization': 'Bearer '+user.services.facebook.accessToken
					}
				},
				function(error, response){
					if(!error){
						future["return"](response.data.data);
					}
				}
			);

			return future.wait();
		}
		
		// If the user does not have a facebook accessToken, returns an empty array
		else {
			return [];
		}

	}
	
});


// =======================
// Accounts.onCreateUser()
// =======================
// This function is called right after the user is created and before it is saved in the Database
Accounts.onCreateUser(function(options, user) {
	return user;
});

// ==========================================
// Meteor accounts-meld Package Configuration
// ==========================================

let meldUserCallback = function(src_user, dst_user){
	console.log('meldUserCallback');

	if (src_user.createdAt < dst_user.createdAt)
		dst_user.createdAt = src_user.createdAt;

	// 'profile' field
	let profile = {};
	_.defaults(profile, dst_user.profile || {});
	_.defaults(profile, src_user.profile || {});

	if (!_.isEmpty(profile))
		dst_user.profile = profile;
};

let meldDBCallback = function(src_user_id, dst_user_id){
	console.log('meldDBCallback');
};

let serviceAddedCallback = function(user_id, service_name){
	console.log('serviceAddedCallback');
	if (service_name === 'twitter'){

		let user = Meteor.users.findOne(user_id);
		let link = user.services[service_name].link;

		if (link)
			Meteor.users.update(user_id, {$set: {"profile.fb_link": link}});
	}
};

AccountsMeld.configure({
	meldUserCallback: meldUserCallback,
	meldDBCallback: meldDBCallback,
	serviceAddedCallback: serviceAddedCallback
});