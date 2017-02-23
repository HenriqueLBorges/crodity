import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Accounts } from 'meteor/accounts-base';
import Twit from 'twit';
import Future from 'fibers/future';
import { UserMedia } from '../imports/api/posts.js';

// ===========================================================
// This archive contains the gets about the social user medias
// ===========================================================

Meteor.methods({

  getFacebookAlbum(){
    let future = new Future();
    let user = Meteor.users.findOne(this.userId);
    let albums;

    // Checks if the user has the facebook accessToken
    if (user.services.facebook.accessToken) {
      // Facebook Graph API Call
      HTTP.get(
        'https://graph.facebook.com/v2.8/me?fields=albums',
        {
          headers: {
            'Authorization': 'Bearer ' + user.services.facebook.accessToken
          }
        },
        function (error, response) {

          if (error) {
            console.log(error);
          }else{
            albums = response.data;
          }
        }
      );

      // return future.wait();
  }
  return albums;
  },


});
