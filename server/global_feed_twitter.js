import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import Twit from 'twit';
import Future from 'fibers/future';
import { Posts } from '../imports/api/posts.js';


// =======================
// Social Networks Methods
// =======================

Meteor.methods({

  'getTwitterProfileFeed': function () {
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
    Twitter.get('statuses/user_timeline', { count: '10' }, function (err, data, response) {
      if (err) {
        // //console.log(err);

      }
      else {
        ////console.log(data);
        future["return"](convertTwitterFeedToGlobal(data));
      }
    });

    return future.wait();
  },

  'getTwitterHomeFeed': function () {
    let future = new Future();
    let user = Meteor.users.findOne(this.userId);


    let Twitter = new Twit({
      consumer_key: '1Scmykinx39JgSGgAm8CxapEw',
      consumer_secret: 'CTYqmRkMC09urf61haguPnU7MPWyw97AXaDWDXMiZgoK5T90m8',
      access_token: user.services.twitter.accessToken,
      access_token_secret: user.services.twitter.accessTokenSecret
    });
    //home_timeline
    Twitter.get('statuses/home_timeline', { count: '10' }, function (err, data, response) {
      if (err) {
        //console.log(err);
      }
      else {
        // //console.log('USER: +++++++++++++++++++++++++++++++++++$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$+');
        // ////console.log(data);
        // //console.log('USER: +++++++++++++++++++++++++++++++++++$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$+');
        future["return"](convertTwitterFeedToGlobal(data));
      }
    });

    return future.wait();
  },

});


// ============================
// Converting to Global Methods
// ============================

let convertTwitterFeedToGlobal = function (feed) {

  let post_image;
  let post_video;
  let type;
  let image;
  let description;
  let feed_unit_image;
  let likespost;
  let name = '';
  let link = '';
  let name_location;
  let id_location;
  let geo;

  // Creates the global feed array
  globalFeed = new Array();

  for (let i = 0; i < feed.length; i++) {

    type = '';


    // Set some properties in case they are undefined
    if (typeof feed[i].retweeted_status === 'undefined')
      feed[i].retweeted_status = { favorite_count: 0 }

    if (typeof feed[i].quoted_status === 'undefined')
      feed[i].quoted_status = { favorite_count: 0 }

    // if (typeof feed[i].entities.media.media_url === 'undefined')
    //feed[i].entities.media.media_url = false;



    try {



      // let regexLink = /(((?=.*[http])(?=.*[.:/])[http://-https://]{4,}))/;

      if (typeof feed[i].extended_entities === 'undefined') {
        description = feed[i].text;
        type = 'text';
      }

      if ((typeof feed[i].extended_entities.media[0].video_info !== 'undefined')) {

        if (feed[i].extended_entities.media[0].video_info.variants.length > 1) {
          post_video = feed[i].extended_entities.media[0].video_info.variants[1].url;
        } else post_video = feed[i].extended_entities.media[0].video_info.variants[0].url;


        if (feed[i].extended_entities.media[0].type === 'animated_gif') {
          type = 'gif';
        } else type = 'video';

        post_image = feed[i].extended_entities.media[0].media_url;
        description = feed[i].text;

      }

      if ((typeof feed[i].extended_entities.media[0].video_info === 'undefined')) {

        description = feed[i].text;

        if (feed[i].extended_entities.media.length > 1) {
          type = 'album';
          post_image = []

          for (let j = 0; j < feed[i].extended_entities.media.length; j++) {
            post_image[j] = feed[i].extended_entities.media[j].media_url;
          }

        } else {
          type = 'photo';
          post_image = feed[i].extended_entities.media[0].media_url;
        }
      }

      // if (feed[i].extended_entities.media[0].type == 'video' &&
      //   !(typeof feed[i].extended_entities.media[0].type === 'undefined')) {
      //   type = 'video';
      //   post_video = feed[i].extended_entities.media[0].video_info.variants[1].url;
      // }

      // else if (feed[i].extend.media[0].type == 'photo' &&
      //   !(typeof feed[i].extend.media[0].type === 'undefined')) {
      //   type = 'photo'
      //   post_image = feed[i].extend.media[0].media_url_https;
      // }

      // else type = 'text'


    }

    catch (e) {
      // //console.log(e);
      ////console.log(video);
      /////console.log(media);

    }

    // Created the globalFeed[i] object


    ////console.log('----------------------------------------------------------------------------');
    ////console.log(type, description);

    // //console.log('----------------------------------------------------------------------------');
    // //console.log(video);
    // //console.log('----------------------------------------------------------------------------');
    // //console.log(image);
    // //console.log('----------------------------------------------------------------------------');


    ////console.log(media.type);

    globalFeed[i] = {
      title: feed[i].user.name + ' @' + feed[i].user.screen_name,
      service: 'twitter',
      created: new Date(feed[i].created_at),
      content: (feed[i].retweeted_status.text ? feed[i].retweeted_status.text : feed[i].quoted_status.text),
      likes: Math.max(feed[i].retweeted_status.favorite_count, feed[i].quoted_status.favorite_count, feed[i].favorite_count),
      shares: feed[i].retweet_count,
      comments: false,
      location: feed[i].geo,
      //attachments: feed[i].entities.media.media_url_https,
      user: {
        name: feed[i].user.name,
        screen_name: feed[i].user.screen_name,
        image: feed[i].user.profile_image_url
      },
      media: {
        name: name,
        link: link,
        description: description,
        type: type,
        post_video: post_video,
        post_image: post_image,
      },
    }

    //Saving twitter posts on database

    // if (Posts.findOne({ id: globalFeed[i].id })) {
    //   ////console.log("true");

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
    //   ////console.log("false");
    // }
  }
  return globalFeed;
}