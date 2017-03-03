import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import Future from 'fibers/future';
import { Posts } from '../imports/api/posts.js';


// =======================
// Social Networks Methods
// =======================

Meteor.methods({

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
          console.log(response + error);
          if (!error) {
            // //console.log(response.content);
            future["return"](convertFacebookProfileFeedToGlobal(response.data));

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
        'https://graph.facebook.com/v2.8/me/likes?fields=id,name,posts.limit(2){created_time,description,full_picture,from,id,message,link,name,picture,place,source,attachments,story,updated_time,to,event,reactions{type,name,username}}&limit=10',
        {

          headers: {
            'Authorization': 'Bearer ' + user.services.facebook.accessToken
          }
        },
        function (error, response) {
          console.log(response + error);
          if (!error) {
            ////console.log(response.content);
            //console.log('GET', response.data.data.length);
            future["return"](convertFacebookHomeFeedToGlobal(response.data.data));

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


let convertFacebookProfileFeedToGlobal = function (feed) {

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

      //console.log('OI');

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
      //   //console.log('TO NO IF ')
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
      //console.log(e);
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
      //console.log('CHECKIN');
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
      // //console.log("true");

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
      // //console.log("false");
    }
  }
  return globalFeed;
}

let convertFacebookHomeFeedToGlobal = function (feed) {

  ////console.log('CONVERT', feed)
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
  let count = 0;
  // initializating and mount array feed for data convert
  feedMount = feed;
  //console.log(feed);

  for (let k = 0; k < feedMount.length; k++) {
    //     //console.log(feedMount)
    //     //console.log(feedMount.length, 'VALOR:', k);
    feed = feedMount[k].posts.data;


    for (let i = 0; i < feed.length; i++) {
      // //console.log('FEED', feed.length, 'VALOR ', i)

      type = '';
      description = '';
      link = '';


      //Defining the image of each post
      try {
        //console.log('OI');
        // //console.log('FEED I ', feed[i].attachments.data[0].media.image.src)
        // type = 'photo'
        // description = feed[i].attachments.data[0].description;
        // post_image = feed[i].attachments.data[0].media.image.src;

        likespost = feed[i].reactions.data.length;

        if ((typeof feed[i].source !== 'undefined') || feed[i].type == "video") {
          type = 'video';

          if (feed[i].message.localeCompare(feed[i].description) == 0 && typeof feed[i].name !== 'undefined') {
            description = feed[i].name + ' ' + feed[i].description;
          } 
          
          if(typeof feed[i].name !== 'undefined') {
            description =  feed[i].name + ' ' + feed[i].message;
          }else {
             description = feed[i].message;
          }


          if (typeof feed[i].link !== 'undefined') {
            link = feed[i].link;
          } else
            link = '';

          post_image = feed[i].attachments.data[0].media.image.src;
          post_video = feed[i].source;
        }


        if (typeof feed[i].attachments.data[0].media.image.src === 'undefined' &&
          typeof feed[i].source === 'undefined') {
          type = 'text';

          if (feed[i].message.localeCompare(feed[i].description) == 0 && typeof feed[i].name !== 'undefined') {
            description = feed[i].name + ' ' + feed[i].description;
          } 
          
          if(typeof feed[i].name !== 'undefined') {
            description =  feed[i].name + ' ' + feed[i].message;
          }else {
             description = feed[i].message;
          }


          if (typeof feed[i].link !== 'undefined') {
            link = feed[i].link;
          } else
            link = '';
        }

        if (typeof feed[i].attachments.data[0].media.image.src !== 'undefined' &&
          typeof feed[i].source === 'undefined') {
          type = 'photo';
          
          if (feed[i].message.localeCompare(feed[i].description) == 0 && typeof feed[i].name !== 'undefined') {
            description = feed[i].name + ' ' + feed[i].description;
          } 
          
          if(typeof feed[i].name !== 'undefined') {
            description =  feed[i].name + ' ' + feed[i].message;
          }else {
             description = feed[i].message;
          }


          if (typeof feed[i].link !== 'undefined') {
            link = feed[i].link;
          } else
            link = '';

          post_image = feed[i].attachments.data[0].media.image.src;

        }

        // if ((typeof feed[i].attachments.data[0].subattachments.data[0].media.image.src !== 'undefined') &&
        //   feed[i].attachments.data[0].subattachments.data.length > 1) {
        //   type = 'album';
        //   post_image = []

        //   for (let j = 0; j < feed[i].attachments.data[0].subattachments.data.length; j++) {

        //     post_image[j] = feed[i].attachments.data[0].subattachments.data[j].media.image.src;
        //   }
        // }

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
        //console.log(e);
        post_image = '';
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
      //   //console.log('CHECKIN');
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

      globalFeed[count] = {
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

      count++;

    }
    // //console.log('GLOBALFEED:', globalFeed, k)
    // //console.log(feedMount[k], 'VALOR: ', k)
    //return globalFeed[k];
  }
  // count++;
  // //console.log('CONTADOR', count++);
  return globalFeed;


}