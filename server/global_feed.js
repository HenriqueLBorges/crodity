import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import Twit from 'twit';
import Future from 'fibers/future';
import { Posts } from '../imports/api/posts.js';

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
        'https://graph.facebook.com/v2.8/me?fields=id,name,cover,feed.limit(2){id,story,message,message_tags,place,shares,source,to,link,comments,attachments,created_time,description,likes,sharedposts,name,from,reactions}',
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
            console.log('OI CONVERTI OS DADOS =)');
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
    
    //Saving twitter posts on database 
    // if (Posts.findOne({ id: globalFeed[i].id })) {
    //   console.log("true");

    // } else {
    //   Posts.insert({
    //     external_id: feed[i].id,
    //     title: feed[i].user.name + ' @' + feed[i].user.screen_name,
    //   service: 'twitter',
    //   created: new Date(feed[i].created_at),
    //   content: feed[i].text,
    //   likes: Math.max(feed[i].retweeted_status.favorite_count, feed[i].quoted_status.favorite_count, feed[i].favorite_count),
    //   shares: feed[i].retweet_count,
    //   comments: false,
    //   media: false,
    //   location: feed[i].geo,
    //   user: {
    //     name: feed[i].user.name,
    //     screen_name: feed[i].user.screen_name,
    //     image: feed[i].user.profile_image_url
    //   }
    //   });
    //   console.log("false");
    // }    
  }

  return globalFeed;
}

let convertFacebookFeedToGlobal = function (feed) {

  // Creates the global feed array
  globalFeed = [];

  let feed_unit_image;
  let likespost;
  feed = feed.feed.data;

  for (let i = 0; i < feed.length; i++) {

    //Defining the image of each post
    try {
      likespost = feed[i].reactions.data.length;
      feed_unit_image = feed[i].attachments.data[0].media.image.src;
    }
    catch (err) {
      //console.log('undefined');
      feed_unit_image = '';
      likespost='';
    }

    let comments = [];
    if (typeof feed[i].comments !== 'undefined' && typeof feed[i].comments !== 'undefined') {
      comments = feed[i].comments.data.map((comment, i) => {
        return ({
          id: comment.id,
          from: comment.from.name,
          fromImg: 'http://graph.facebook.com/v2.8/' + comment.from.id + '/picture?width=100&height=100',
          created: new Date(comment.created_time),
          message: comment.message,
          attachments: comment.attachments,
          like: comment.like_count,
        });
      });
    }

    // Created the globalFeed[i] object
    globalFeed[i] = {
      id: feed[i].id,
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
        image: 'http://graph.facebook.com/v2.8/' + feed[i].from.id + '/picture?width=100&height=100',
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

    //Creating a global feed on Database
    if (Posts.findOne({ id: globalFeed[i].id })) {
      console.log("true");

    } else {
      Posts.insert({
        //_id: ObjectId(feed[i].id),
        external_id: feed[i].id,
        title: (feed[i].story ? feed[i].story : feed[i].from.name),
        service: 'facebook',
        created: new Date(feed[i].created_time),
        content: (feed[i].message ? feed[i].message : feed[i].description),
        likes: feed[i].likes,
        crodity_reactions:[],
        shares: feed[i].shares,
        comments: comments,
        media: false,
        post_image: feed_unit_image,
        attachments: feed[i].attachments,
        user: {
          name: feed[i].from.name,
          screen_name: false,
          service_id: feed[i].from.id,
          image: 'http://graph.facebook.com/v2.8/' + feed[i].from.id + '/picture?width=100&height=100',
        }
      });
      console.log("false");
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
