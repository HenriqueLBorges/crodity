import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import Twit from 'twit';
import Future from 'fibers/future';


Meteor.methods({

  // =======================
  // Social Networks Methods
  // =======================
  'getTwitterFeed': function () {
    let future = new Future();

    // Setting the user
    // this.userId is already sent to the server when
    // there is a user logged in the client
    let user = Meteor.users.findOne(this.userId);

    // Connecting to the Twiter API using the twit module
    let Twitter = new Twit({
      consumer_key: '1Scmykinx39JgSGgAm8CxapEw',
      consumer_secret: 'CTYqmRkMC09urf61haguPnU7MPWyw97AXaDWDXMiZgoK5T90m8',
      access_token: user.services.twitter.accessToken,
      access_token_secret: user.services.twitter.accessTokenSecret
    });

    // Getting the user timeline that will be returned
    Twitter.get('statuses/home_timeline', {}, function (err, data, response) {
      if (err) {
        console.log(err);
      }
      else {
        future["return"](convertTwitterFeedToGlobal(data));
      }
    });

    return future.wait();
  },

  'getTwitterProfileFeed': function () {
    let future = new Future();
    let user = Meteor.users.findOne(this.userId);


    let Twitter = new Twit({
      consumer_key: '1Scmykinx39JgSGgAm8CxapEw',
      consumer_secret: 'CTYqmRkMC09urf61haguPnU7MPWyw97AXaDWDXMiZgoK5T90m8',
      access_token: user.services.twitter.accessToken,
      access_token_secret: user.services.twitter.accessTokenSecret
    });

    Twitter.get('statuses/user_timeline', {}, function (err, data, response) {
      if (err) {
        console.log(err);
      }
      else {
        future["return"](convertTwitterFeedToGlobal(data));
      }
    });

    return future.wait();
  },

  'getFacebookProfileFeed': function () {

    // Sets future and user
    let future = new Future();
    let user = Meteor.users.findOne(this.userId);
    // Checks if the user has the facebook accessToken
    if (user.services.facebook.accessToken) {
      // Facebook Graph API Call
      HTTP.get(
        'https://graph.facebook.com/v2.5/me/feed?fields=id,from,story,message,message_tags,place,shares,source,to,link,comments,attachments{media},created_time,description,likes,sharedposts&limit=25',
        {
          headers: {
            'Authorization': 'Bearer ' + user.services.facebook.accessToken
          }
        },
        function (error, response) {
          if (!error) {
            future["return"](convertFacebookFeedToGlobal(response.data.data));
                      console.log(response.data);
          }
          console.log(response.data.data);
        }
      );

      return future.wait();
    }

    // If the user does not have a facebook accessToken, returns an empty array
    else {
      return [];
    }
  },

  // ================
  // Accounts Methods
  // ================
	/*
- Method to check the registered phones
*/
  'getUserRegisteredPhones': function () {
    let user = Meteor.users.findOne(this.userId);

    let returnedPhones = [];

    // If the usr has at least one registered email
    if (typeof user.profile.phones !== 'undefined' && Array.isArray(user.profile.phones)) {

      for (let i = 0; i < user.profile.phones; i++) {
        returnedPhones.push(user.profile.phones[i]);
      }
      console.log(returnedPhones);

    }
    return returnedPhones;
  },


	/*
	- Method to add phones to account
	*/

  'addRegisteredPhones': function (phone) {
    // Get the logged user object
    let user = Meteor.users.findOne(this.userId);

    // Sets the initial state of the profile.phones array to
    // later be updated inside the user object
    let registered_phones = new Array();
    console.log(typeof user.profile.phones);
    if (typeof user.profile.phones !== 'undefined') {
      registered_phones = user.profile.phones;
    }

    // Checks if the profile.phones is unique
    let isUnique = true;
    for (let i = 0; i < registered_emails.length; i++) {
      if (registered_phones[i] == email) {
        isUnique = false;
      }
    }

    // Adds the newly added email to the registered_emails array
    // only if the email was not already there.
    if (isUnique) {
      registered_phones.push(phone);

      // Updates the user in the database
      Meteor.users.update({ '_id': this.userId }, { $set: { registered_phones: registered_phones } });
    }
  },

  'getUserRegisteredEmails': function () {

    // Setting the user
    // this.userId is already sent to the server when
    // there is a user logged in the client
    let user = Meteor.users.findOne(this.userId);

    let returnedEmails = new Array();
    console.log(user);
    // If the usr has at least one registered email
    if (typeof user.registered_emails !== 'undefined') {
      console.log(user.registered_emails.length);
      console.log(user.registered_emails);
      for (let i = 0; i < user.registered_emails.length; i++) {
        returnedEmails.push(user.registered_emails[i].address);
      }
      console.log(returnedEmails);
    }

    return returnedEmails;
  },

  'addRegisteredEmail': function (email) {

    // Get the logged user object
    let user = Meteor.users.findOne(this.userId);

    // Sets the initial state of the registered_emails array to
    // later be updated inside the user object
    let registered_emails = new Array();
    console.log(typeof user.registered_emails);
    if (typeof user.registered_emails !== 'undefined') {
      registered_emails = user.registered_emails;
    }

    // Checks if the email is unique
    // TODO: Check the entire database, not only the emails from the logged user
    let isUnique = true;
    for (let i = 0; i < registered_emails.length; i++) {
      if (registered_emails[i].address == email) {
        isUnique = false;
      }
    }

    // Adds the newly added email to the registered_emails array
    // only if the email was not already there.
    if (isUnique) {
      registered_emails.push({
        address: email,
        verified: true
      });

      // Updates the user in the database
      Meteor.users.update({ '_id': this.userId }, { $set: { registered_emails: registered_emails } });
    }
  },

  'teste': function () {
    console.log("Teste");
  },

});

// ============================
// Converting to Global Methods
// ============================
let convertTwitterFeedToGlobal = function (feed) {

  // Creates the global feed array
  globalFeed = new Array();

  for (let i = 0; i < feed.length; i++) {

    // Set some properties in case they are undefined
    if (typeof feed[i].retweeted_status === 'undefined')
      feed[i].retweeted_status = { favorite_count: 0 }

    if (typeof feed[i].quoted_status === 'undefined')
      feed[i].quoted_status = { favorite_count: 0 }

    // Created the globalFeed[i] object
    globalFeed[i] = {
      title: feed[i].user.name + ' @' + feed[i].user.screen_name,
      service: 'twitter',
      created: new Date(feed[i].created_at),
      content: feed[i].text,
      likes: Math.max(feed[i].retweeted_status.favorite_count, feed[i].quoted_status.favorite_count, feed[i].favorite_count),
      shares: feed[i].retweet_count,
      comments: false,
      media: false,
      location: feed[i].geo,
      user: {
        name: feed[i].user.name,
        screen_name: feed[i].user.screen_name,
        image: feed[i].user.profile_image_url
      }
    }
  }

  return globalFeed;
}

let convertFacebookFeedToGlobal = function (feed) {
console.log(feed);
  // Creates the global feed array
  globalFeed = new Array();

  let feed_unit_image;
  for (let i = 0; i < feed.length; i++) {

    //Defining the image of each post
    try {
      //console.log(data.attachments.data[0].media.image.src);
      feed_unit_image = feed[i].attachments.data[0].media.image.src;
    }
    catch (err) {
      //console.log('undefined');
      feed_unit_image = "";
    }

    let comments = [];
    if (typeof feed[i].comments !== 'undefined' && typeof feed[i].comments !== 'undefined') {
      comments = feed[i].comments.data.map((comment, i) => {
        return ({
          from: comment.from.name,
          fromImg: 'http://graph.facebook.com/v2.5/' + comment.from.id + '/picture?width=100&height=100',
          created: new Date(comment.created_time),
          message: comment.message,
          attachments: comment.attachments,
          like: comment.like_count,
        });
      });
    }

    // Created the globalFeed[i] object
    globalFeed[i] = {
      title: (feed[i].story ? feed[i].story : feed[i].from.name),
      service: 'facebook',
      created: new Date(feed[i].created_time),
      content: (feed[i].message ? feed[i].message : feed[i].description),
      likes: feed[i].likes,
      shares: feed[i].shares,
      comments: comments,
      media: false,
      post_image: feed_unit_image,
      attachments: feed[i].attachments,
      user: {
        name: feed[i].from.name,
        screen_name: false,
        service_id: feed[i].from.id,
        image: 'http://graph.facebook.com/v2.5/' + feed[i].from.id + '/picture?width=100&height=100',
      }
    }

    // Checks if the facebook place object is defined before setting the global location object
    if (typeof (feed[i].place) !== 'undefined') {
      globalFeed[i].location = {
        facebook_id: feed[i].place.id,
        name: feed[i].place.name,
        geo: feed[i].place.location
      };
    }
  }

  return globalFeed;

}


// =======================
// Accounts.onCreateUser()
// =======================
// This function is called right after the user is created and before it is saved in the Database
Accounts.onCreateUser(function (options, user) {

  // Use provided profile in options, or create an empty object
  user.profile = options.profile || {};
  // Assigns first and last names to the newly created user object
  user.profile.firstName = options.firstName;
  user.profile.lastName = options.lastName;
  console.log(user.services.facebook);

  //Checking what is the service the user connected, and defining the informations about the profile
  if (user.services.facebook) {
    user.profile.image = 'http://graph.facebook.com/' + user.services.facebook.id + '/picture?type=square&height=80&width=80';
    user.profile.name = user.services.facebook.name;
    //user.profile.cover = 'http://graph.facebook.com/v2.5/' + user.services.facebook.id + '/cover';
  } else if (user.services.twitter) {

  }

  // Returns the user object
  return user;
});


// ==========================================
// Meteor accounts-meld Package Configuration
// ==========================================

let meldUserCallback = function (src_user, dst_user) {
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

let meldDBCallback = function (src_user_id, dst_user_id) {
  console.log('meldDBCallback');
};

let serviceAddedCallback = function (user_id, service_name) {
  console.log('serviceAddedCallback');
  if (service_name === 'twitter') {
    let user = Meteor.users.findOne(user_id);
    let link = user.services[service_name].link;

    if (link)
      Meteor.users.update(user_id, { $set: { "profile.fb_link": link } });
  }
};

AccountsMeld.configure({
  meldUserCallback: meldUserCallback,
  meldDBCallback: meldDBCallback,
  serviceAddedCallback: serviceAddedCallback
});
