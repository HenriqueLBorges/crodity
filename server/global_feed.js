import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import Twit from 'twit';
import Future from 'fibers/future';
import { Posts } from '../imports/api/posts.js';

Meteor.methods({

  // =======================
  // Social Networks Methods
  // =======================
  'getTwitterHomeFeed': function () {
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
        // console.log(err);

      }
      else {
        //console.log(data);
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
    //home_timeline
    Twitter.get('statuses/home_timeline', { count: '25' }, function (err, data, response) {
      if (err) {
        console.log(err);
      }
      else {
        // console.log('USER: +++++++++++++++++++++++++++++++++++$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$+');
        // //console.log(data); 
        // console.log('USER: +++++++++++++++++++++++++++++++++++$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$+');
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
        'https://graph.facebook.com/v2.8/me?fields=id,name,cover,feed.limit(15){id,story,message,message_tags,place,shares,source,to,link,comments,attachments,created_time,description,likes,sharedposts,name,from,reactions}',
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

  'getFacebookHomeFeed': function () {

    // Sets future and user
    let future = new Future();
    let user = Meteor.users.findOne(this.userId);

    // Checks if the user has the facebook accessToken
    if (user.services.facebook.accessToken) {

      // Facebook Graph API Call
      HTTP.get(
        'https://graph.facebook.com/v2.8/me/likes?fields=id,name,feed.limit(2){created_time,description,from,message,message_tags,id,place,picture,name,attachments{subattachments,description,media,url,type},story,full_picture,to{username,id,picture{url},name,pic},link,source}&limit=2',
        {

          headers: {
            'Authorization': 'Bearer ' + user.services.facebook.accessToken
          }
        },
        function (error, response) {
          console.log(response + error);
          if (!error) {
            //console.log(response.content);
            console.log('GET', response.data);
            future["return"](convertFacebookHomeFeedToGlobal(response.data));

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
      // console.log(e);
      //console.log(video);
      ///console.log(media);

    }

    // Created the globalFeed[i] object


    //console.log('----------------------------------------------------------------------------');
    //console.log(type, description);

    // console.log('----------------------------------------------------------------------------');
    // console.log(video);
    // console.log('----------------------------------------------------------------------------');
    // console.log(image);
    // console.log('----------------------------------------------------------------------------');


    //console.log(media.type); 

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
    //   //console.log("true");

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
    //   //console.log("false");
    // }    
  }
  return globalFeed;
}


let convertFacebookFeedToGlobal = function (feed) {

  feed = feed.feed.data;
  // Creates the global feed array
  globalFeed = [];

  let post_image;
  let post_video;
  let type;
  let image;
  let description;
  let feed_unit_image;
  let likespost;
  let name;
  let link;
  let name_location;
  let id_location;
  let geo;

  for (let i = 0; i < feed.length; i++) {
    type = '';

    //Defining the image of each post
    try {

      likespost = feed[i].reactions.data.length;

      if ((typeof feed[i].source !== 'undefined') || feed[i].type == "video") {
        type = 'video';
        description = feed[i].attachments.data[0].description;
        post_image = feed[i].attachments.data[0].media.image.src;
        post_video = feed[i].source;
      }

      console.log('OI');

      if (typeof feed[i].attachments.data[0].media.image.src !== 'undefined' && typeof feed[i].source === 'undefined') {
        type = 'photo'
        description = feed[i].attachments.data[0].description;
        post_image = feed[i].attachments.data[0].media.image.src;
      }

      // if (typeof feed[i].attachments.data[0].media.image.src !== 'undefined' && 
      // typeof feed[i].source === 'undefined'){
      //     type = 'photo';
      //     description = feed[i].attachments.data[0].description;
      //     post_image = feed[i].attachments.data[0].media.image.src;
      //   console.log('TO NO IF ')
      // }

      if ((typeof feed[i].attachments.data[0].subattachments.data[0].media.image.src !== 'undefined') &&
        feed[i].attachments.data[0].subattachments.data.length > 1) {
        type = 'album';
        post_image = []

        for (let j = 0; j < feed[i].attachments.data[0].subattachments.data.length; j++) {

          post_image[j] = feed[i].attachments.data[0].subattachments.data[j].media.image.src;
        }
      }

      // if (!(typeof feed[i].attachments.data[0].description === 'undefined')) {
      //   description = feed[i].attachments.data[0].description;
      // }

      // if ((feed[i].type === "link")) {
      //   name = feed[i].name;
      //   description = feed[i].description;
      //   link = feed[i].link
      // }

      // if ((feed[i].type === 'status')) {
      //   type = 'status'
      //   description = feed[i].message;
      // }

    }

    catch (e) {
      console.log(e);
      feed_unit_image = '';
      likespost = '';
    }


    if (typeof (feed[i].place) !== 'undefined') {
      type = 'checkin';
      post_image = feed[i].attachments.data[0].media.image.src;
      name_location = feed[i].place.name;
      id_location = feed[i].place.id;
      geo = feed[i].place.location

      if (typeof feed[i].attachments.data[0].description === 'undefined') {
        description = '';
      } else description = feed[i].attachments.data[0].description;
      console.log('CHECKIN');
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

      media: {
        name: name,
        link: link,
        description: description,
        type: type,
        post_video: post_video,
        post_image: post_image,
        // message: message,
      },

      user: {
        name: feed[i].from.name,
        screen_name: false,
        service_id: feed[i].from.id,
        image: 'http://graph.facebook.com/v2.8/' + feed[i].from.id + '/picture?width=100&height=100',
      },

      location: {
        id_location: id_location,
        name_location: name_location,
        geo: geo
      }

    }



    //Creating a global feed on Database
    if (Posts.findOne({ id: globalFeed[i].id })) {
      // console.log("true");

    } else {
      Posts.insert({
        external_id: feed[i].id,
        title: (feed[i].story ? feed[i].story : feed[i].from.name),
        service: 'facebook',
        created: new Date(feed[i].created_time),
        content: (feed[i].message ? feed[i].message : feed[i].description),
        likes: feed[i].likes,
        crodity_reactions: [],
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
      // console.log("false");
    }
  }
  return globalFeed;
}

let convertFacebookHomeFeedToGlobal = function (feed) {

  //console.log('CONVERT', feed)
  let feedMount = [];

  // Creates the global feed array
  globalFeed = [];

  //Create global variables 
  let post_image;
  let post_video;
  let type;
  let image;
  let description;
  let feed_unit_image;
  let likespost;
  let name;
  let link;
  let name_location;
  let id_location;
  let geo;

  // initializating and mount array feed for data convert
  feedMount = feed.data;

  for (let k = 0; k < feedMount.length; k++) {

    console.log('CONVERT', feedMount[k].feed.data, k)

    console.log(feedMount.length)
    for (let i = 0; i < feedMount[k].feed.data.length; i++) {

      feed = feedMount[k].feed.data;
      type = '';

      //Defining the image of each post
      try {

        likespost = feed[i].reactions.data.length;

        if ((typeof feed[i].source !== 'undefined') || feed[i].type == "video") {
          type = 'video';
          description = feed[i].attachments.data[0].description;
          post_image = feed[i].attachments.data[0].media.image.src;
          post_video = feed[i].source;
        }

        console.log('OI');

        if (typeof feed[i].attachments.data[0].media.image.src !== 'undefined' && typeof feed[i].source === 'undefined') {
          type = 'photo'
          description = feed[i].attachments.data[0].description;
          post_image = feed[i].attachments.data[0].media.image.src;
        }

        // if (typeof feed[i].attachments.data[0].media.image.src !== 'undefined' && 
        // typeof feed[i].source === 'undefined'){
        //     type = 'photo';
        //     description = feed[i].attachments.data[0].description;
        //     post_image = feed[i].attachments.data[0].media.image.src;
        //   console.log('TO NO IF ')
        // }

        if ((typeof feed[i].attachments.data[0].subattachments.data[0].media.image.src !== 'undefined') &&
          feed[i].attachments.data[0].subattachments.data.length > 1) {
          type = 'album';
          post_image = []

          for (let j = 0; j < feed[i].attachments.data[0].subattachments.data.length; j++) {

            post_image[j] = feed[i].attachments.data[0].subattachments.data[j].media.image.src;
          }
        }

        // if (!(typeof feed[i].attachments.data[0].description === 'undefined')) {
        //   description = feed[i].attachments.data[0].description;
        // }

        // if ((feed[i].type === "link")) {
        //   name = feed[i].name;
        //   description = feed[i].description;
        //   link = feed[i].link
        // }

        // if ((feed[i].type === 'status')) {
        //   type = 'status'
        //   description = feed[i].message;
        // }

      }

      catch (e) {
        console.log(e);
        feed_unit_image = '';
        likespost = '';
      }


      // if (typeof (feed[i].place) !== 'undefined') {
      //   type = 'checkin';
      //   post_image = feed[i].attachments.data[0].media.image.src;
      //   name_location = feed[i].place.name;
      //   id_location = feed[i].place.id;
      //   geo = feed[i].place.location

      //   if (typeof feed[i].attachments.data[0].description === 'undefined') {
      //     description = '';
      //   } else description = feed[i].attachments.data[0].description;
      //   console.log('CHECKIN');
      // }


      let comments = [];
      // if (typeof feed[i].comments !== 'undefined' && typeof feed[i].comments !== 'undefined') {

      //   comments = feed[i].comments.data.map((comment, i) => {
      //     return ({
      //       id: comment.id,
      //       from: comment.from.name,
      //       fromImg: 'http://graph.facebook.com/v2.8/' + comment.from.id + '/picture?width=100&height=100',
      //       created: new Date(comment.created_time),
      //       message: comment.message,
      //       attachments: comment.attachments,
      //       like: comment.like_count,
      //     });
      //   });
      // }

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

        media: {
          name: name,
          link: link,
          description: description,
          type: type,
          post_video: post_video,
          post_image: post_image,
          // message: message,
        },

        user: {
          name: feed[i].from.name,
          screen_name: false,
          service_id: feed[i].from.id,
          image: 'http://graph.facebook.com/v2.8/' + feed[i].from.id + '/picture?width=100&height=100',
        },

        location: {
          id_location: id_location,
          name_location: name_location,
          geo: geo
        }

      }



      //Creating a global feed on Database
      // if (Posts.findOne({ id: globalFeed[i].id })) {
      //   // console.log("true");

      // } else {
      //   Posts.insert({
      //     external_id: feed[i].id,
      //     title: (feed[i].story ? feed[i].story : feed[i].from.name),
      //     service: 'facebook',
      //     created: new Date(feed[i].created_time),
      //     content: (feed[i].message ? feed[i].message : feed[i].description),
      //     likes: feed[i].likes,
      //     crodity_reactions: [],
      //     shares: feed[i].shares,
      //     comments: comments,
      //     media: false,
      //     post_image: feed_unit_image,
      //     attachments: feed[i].attachments,
      //     user: {
      //       name: feed[i].from.name,
      //       screen_name: false,
      //       service_id: feed[i].from.id,
      //       image: 'http://graph.facebook.com/v2.8/' + feed[i].from.id + '/picture?width=100&height=100',
      //     }
      //   });
      //   // console.log("false");
      // }
    }
  }
  return globalFeed;
}

let convertInstagramFeedToGlobal = function (feed) {

  let post_image;
  let post_video;
  let type;
  let image;
  let description = '';
  let feed_unit_image;
  let likespost;
  let name = '';
  let link = '';
  let name_location;
  let id_location;
  let geo;

  // Creates the global feed array
  globalFeed = new Array();

  let textDescription;
  for (let i = 0; i < feed.length; i++) {
    type = '';
    try {
      textDescription = feed[i].caption.text + ' - ' + feed[i].caption.from.username;

      if (feed[i].type === 'video') {
        post_image = feed[i].images.standard_resolution.url;
        post_video = feed[i].videos.standard_resolution.url;
        type = 'video';
      }

      if (feed[i].type === 'image') {
        post_image = feed[i].images.standard_resolution.url;
        post_video = '';
        type = 'photo';
      }

    }
    catch (err) {
      textDescription = feed[i].user.username;
    }

    globalFeed[i] = {
      atribution: feed[i].atribution,
      title: textDescription,
      content: textDescription,
      service: 'instagram',
      created: new Date(feed[i].created_time * 1000),
      likes: feed[i].likes.count,
      comments: feed[i].comments,
      filter: feed[i].filter,
      id: feed[i].id,
      type: feed[i].type,
      tags: feed[i].tags,
      location: feed[i].location,
      media: {
        name: name,
        link: link,
        description: description,
        type: type,
        post_video: post_video,
        post_image: post_image,
      },
      user: {
        image: feed[i].user.profile_picture,
      }
    }
  }
  return globalFeed;
}
