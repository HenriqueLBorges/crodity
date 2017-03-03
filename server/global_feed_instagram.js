import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import Future from 'fibers/future';
import { Posts } from '../imports/api/posts.js';


Meteor.methods({

  // =======================
  // Social Networks Methods
  // =======================

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
            ////console.log(response.data.data.type);
            future["return"](convertInstagramProfileFeedToGlobal(response.data.data));

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

  'getInstagramHomeFeed': function () {
    //getInstagramIdFromUserFollow 
    // Sets future and user
    let future = new Future();
    let user = Meteor.users.findOne(this.userId);

    // Checks if the user has the facebook accessToken
    if (user.services.instagram.accessToken) {

      // Facebook Graph API Call
      HTTP.get(
        'https://api.instagram.com/v1/users/self/follows?access_token=' + user.services.instagram.accessToken,
        {

          headers: {
            'Authorization': 'Bearer ' + user.services.instagram.accessToken
          }
        },
        function (error, response) {
          console.log(error);
          if (!error) {
            ////console.log(response.data);
            future["return"](mediaInstagramHomeFeed(response.data.data));

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


  'getInstagramMediaHomeFeed': function (_id) {
    //console.log('AQUI!!!')
    let future = new Future();

    //_id = Meteor.call('getInstagramMediaHomeFeed')

    let user = Meteor.users.findOne(this.userId);

    //    //console.log(_id[0]);
    //console.log('TOKEN:    ', user.services.instagram.accessToken);

    if (user.services.instagram.accessToken) {
      if (_id) {

        HTTP.get(
          'https://api.instagram.com/v1/users/' + _id + '/media/recent/?access_token=' + user.services.instagram.accessToken + '&count=5',
          {

            headers: {
              'Authorization': 'Bearer ' + user.services.instagram.accessToken
            }
          },
          function (error, response) {

            try {
              ////console.log('GET  ', response.data.data);
              future["return"](convertInstagramHomeFeedToGlobal(response.data.data));
            }

            catch (error) {
              console.log('GET ERROR: ', error)
              // future["return"](convertInstagramHomeFeedToGlobal([]));
            }
          }
        );
        return future.wait();
      }
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


let convertInstagramProfileFeedToGlobal = function (feed) {

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


let mediaInstagramHomeFeed = function (_id) {

  let feed = [];
  let count = 0;
  //console.log(_id.length)

  for (let i = 0; i < _id.length; i++) {

    feed[count] = Meteor.call('getInstagramMediaHomeFeed', _id[i].id)
    count++;

    // if (typeof Meteor.call('getInstagramMediaHomeFeed', _id[i].id).length !== 'undefined'
    //   && Meteor.call('getInstagramMediaHomeFeed', _id[i].id).length > 0 && Meteor.call('getInstagramMediaHomeFeed', _id[i].id) != null) {

    //  console.log(_id[i].id)

    // }

  }

  let feedMount = function (feed) {
    let returnFeed = []
    for (let j = 0; j < feed.length; j++) {
      returnFeed.push.apply(returnFeed, Array.isArray(feed[j]) ? feedMount(feed[j]) : [feed[j]]);
    }
    return returnFeed;
  }


  feed = feedMount(feed);

  //  console.log(feed)

  return feed;
}


let convertInstagramHomeFeedToGlobal = function (feed) {

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
  let feedMount = [];
  let count = 0;


  // Creates the global feed array
  globalFeed = [];

  // //console.log(feed.id);

  let textDescription;
  if (typeof feed !== 'undefined' && typeof feed != 'null') {

    console.log('FEED LENGTH: ', feed.length);



    for (let i = 0; i < feed.length; i++) {
      type = '';


      try {


        // //console.log('IMAGEM:  ', feed[i].images.standard_resolution.url)
        // //console.log('TYPE:  ', feed[i].type)

        textDescription = feed[i].caption.text + ' - ' + feed[i].caption.from.username;

        if (feed[i].type === 'video') {
          post_image = feed[i].images.standard_resolution.url;
          post_video = feed[i].videos.standard_resolution.url;
          type = 'video';
        }


        if (feed[i].type == 'image') {
          post_image = feed[i].images.standard_resolution.url;
          post_video = '';
          type = 'photo';
        }

      }
      catch (err) {
        textDescription = feed[i].user.username;
      }


      globalFeed[count] = {

        atribution: feed[i].atribution,
        title: textDescription,
        content: textDescription,
        service: 'instagram',
        created: new Date(feed[i].created_time * 1000),
        likes: feed[i].likes.count,
        comments: feed[i].comments,
        filter: feed[i].filter,
        id: feed[i].id,
        type: type,
        tags: feed[i].tags,
        location: feed[i].location,
        media: {
          name: name,
          link: link,
          description: textDescription,
          type: type,
          post_video: post_video,
          post_image: post_image,
        },
        user: {
          image: feed[i].user.profile_picture,
        }
      }
      count++;
    }

    ////console.log('PASSANDO O FEED DO USER: ', globalFeed[0].title)
  }

  else {
    globalFeed = [];
  }
  //console.log('Global Feed',globalFeed);
  // for (let k = 0; k < globalFeed.length; k++) {
  //   //console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! GLOBAL !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
  //   //console.log('GLOBAL FEED  ', globalFeed[k])
  //   return globalFeed[k];

  // }

  return globalFeed
}

