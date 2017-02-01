import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import Twit from 'twit';
import Future from 'fibers/future';


Meteor.methods({


  doesUserExist(name) {
    return Accounts.findUserByUsername(name) != null;
  },



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


  'getInstagramProfileFeed': function () {
    // Sets future and user
    let future = new Future();
    let user = Meteor.users.findOne(this.userId);

    // Checks if the user has the facebook accessToken
    if (user.services.instagram.accessToken) {
      console.log(user.services.instagram);
      // Facebook Graph API Call
      HTTP.get(
        'https://api.instagram.com/v1/users/self/media/recent/?access_token=' + user.services.instagram.accessToken,
        {

          headers: {
            'Authorization': 'Bearer ' + user.services.instagram.accessToken
          }
        },
        function (error, response) {
          console.log(error);
          if (!error) {
            console.log('OI CONVERTI OS DADOS');
            //console.log(response.data.data.type);
            future["return"](convertInstagramFeedToGlobal(response.data.data));

          }
        }
      );

      return future.wait();
    }

    // If the user does not have a facebook accessToken, returns an empty array
    else {
      return [];
    }
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
        'https://graph.facebook.com/v2.8/me?fields=id,name,cover,feed.limit(25){id,story,message,message_tags,place,shares,source,to,link,comments,attachments,created_time,description,likes,sharedposts,name,from,reactions}',
        {

          headers: {
            'Authorization': 'Bearer ' + user.services.facebook.accessToken
          }
        },
        function (error, response) {
          // console.log(response + error);
          if (!error) {
            // console.log(response.content);
            future["return"](convertFacebookFeedToGlobal(response.data));

          }
        }
      );

      return future.wait();
    }

    // If the user does not have a facebook accessToken, returns an empty array
    else {
      return [];
    }
  },

  //Getting user profile of Facebook  
  'getFacebookProfile': function (accessToken) {

    // Sets future and user
    let future = new Future();
    let user = Meteor.users.findOne(this.userId);

    // Checks if the user has the facebook accessToken
    if (accessToken || user.services.facebook.accessToken) {
      console.log('TESTE TO NO FACEBOOK');
      // Facebook Graph API Call
      HTTP.get(
        'https://graph.facebook.com/v2.8/me?fields=id,name,about,cover,first_name,last_name,email,birthday,gender,locale,timezone',
        {
          headers: {
            'Authorization': 'Bearer ' + accessToken
          }
        },
        //console.log('TESTE');
        function (error, response) {

          if (!error) {
            // console.log(response+ 'RESPONSE');
            // console.log(response.data + ' DATA RESPONSE ');
            console.log('TESTANDO O IF');
            console.log(response);
            future["return"](convertFacebookProfileToGlobal(response.data));

          }
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

    // If the usr has at least one registered email
    if (typeof user.registered_emails !== 'undefined') {

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

  // Creates the global feed array
  globalFeed = new Array();

  let data = feed;

  feed = feed.feed.data;

  let feed_unit_image;
  let likespost;
  //console.log(feed);
  for (let i = 0; i < feed.length; i++) {

    //Defining the image of each post
    try {
      likespost = feed[i].reactions.data.length;
      //console.log(data.attachments.data[0].media.image.src);
      feed_unit_image = feed[i].attachments.data[0].media.image.src;
    }
    catch (err) {
      //console.log('undefined');
      feed_unit_image = "";
      likespost='';
       }

    let comments = [];
    if (typeof feed[i].comments !== 'undefined' && typeof feed[i].comments !== 'undefined') {
      comments = feed[i].comments.data.map((comment, i) => {
        return ({
          from: comment.from.name,
          fromImg: 'http://graph.facebook.com/v2.6/' + comment.from.id + '/picture?width=100&height=100',
          created: new Date(comment.created_time),
          message: comment.message,
          attachments: comment.attachments,
          like: comment.like_count,
        });
      });
    }

    
    console.log(likespost);
    // Created the globalFeed[i] object
    globalFeed[i] = {
      title: (feed[i].story ? feed[i].story : feed[i].from.name),
      service: 'facebook',
      created: new Date(feed[i].created_time),
      content: (feed[i].message ? feed[i].message : feed[i].description),
      likes: likespost,
      shares: feed[i].shares,
      comments: comments,
      media: false,
      post_image: feed_unit_image,
      attachments: feed[i].attachments,
      user: {
        name: feed[i].from.name,
        screen_name: false,
        service_id: feed[i].from.id,
        image: 'http://graph.facebook.com/v2.6/' + feed[i].from.id + '/picture?width=100&height=100',
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


let convertInstagramFeedToGlobal = function (feed) {

  


  // Creates the global feed array
  globalFeed = new Array();

  let textDescription;
  //  console.log(feed.type);
  for (let i = 0; i < feed.length; i++) {


    try {
      //console.log(data.attachments.data[0].media.image.src);
      textDescription = feed[i].caption.text + ' - ' + feed[i].caption.from.username;
    }
    catch (err) {
      //console.log('undefined');
      textDescription = feed[i].user.username;
    }

    globalFeed[i] = {
      atribution: feed[i].atribution,
      title: textDescription,
      content: textDescription,
      service: 'instagram',
      created: new Date(feed[i].created_time * 1000),
      post_image: feed[i].images.standard_resolution.url,
      likes: feed[i].likes.count,
      comments: feed[i].comments,
      media: false,
      filter: feed[i].filter,
      id: feed[i].id,
      type: feed[i].type,
      tags: feed[i].tags,
      location: feed[i].location,
      user: {
        image: feed[i].user.profile_picture,
      }
    }

   
  }

  //console.log('ESSE AQUI TA NO GLOBALFEED')
  //console.log(globalFeed); 

  return globalFeed;

}

let convertFacebookProfileToGlobal = function (profile) {


  // Creates the global profile array
  globalProfile = new Array();

  // Created the globalFeed[i] object
  globalProfile = {
    service: 'facebook',
    midia: {
      profile: 'http://graph.facebook.com/' + profile.id + '/picture?type=square&height=80&width=80',
      cover: profile.cover.source
    },

    user: {
      first_name: profile.first_name,
      last_name: profile.last_name,
      service_id: profile.id,
      gender: profile.gender,
      locale: profile.locale,
      timezone: profile.timezone,
      birthday: profile.birthday,
      email: profile.email
    }
  }
  console.log(globalProfile);
  return globalProfile;
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
  //console.log(user.services.facebook);
  profileData = Meteor.call('getFacebookProfile', user.services.facebook.accessToken);

  // //Checking what is the service the user connected, and defining the informations about the profile
  if (user.services.facebook) {
    user.profile.firstName = profileData.user.first_name;
    user.profile.lastName = profileData.user.last_name;
    user.profile.gender = profileData.user.gender;
    user.profile.birthday = profileData.user.birthday;
    user.profile.timezone = profileData.user.timezone;
    user.profile.firstName = profileData.user.first_name;
    user.profile.image = profileData.midia.profile;
    user.profile.cover = profileData.midia.cover;
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
