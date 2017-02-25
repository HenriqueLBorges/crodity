import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Accounts } from 'meteor/accounts-base';
import Twit from 'twit';
import Future from 'fibers/future';
import { UserMedia } from '../imports/api/media.js';

// ===========================================================
// This archive contains the gets about the social user medias
// ===========================================================

Meteor.methods({

  'getFacebookAlbums': function (){
    let future = new Future();

    let user = Meteor.users.findOne(this.userId);
    // Checks if the user has the facebook accessToken
    if (user.services.facebook.accessToken) {
      // Facebook Graph API Call
      HTTP.get(
        'https://graph.facebook.com/v2.8/me/albums?fields=id,can_upload,count,cover_photo,created_time,description,event,from,link,location,name,place,privacy,type,updated_time',
        {
          headers: {
            'Authorization': 'Bearer ' + user.services.facebook.accessToken
          }
        },
        function (error, response) {

          if (error) {
            console.log(error);
          }else{
            // console.log('Resposta',response.data.data.length);
            for(let i = 0 ;i<response.data.data.length;i++){
              UserMedia.insert({
                external_id: response.data.data[i].id,
                media_type: 'album',
                service: 'facebook',
                can_upload: response.data.data[i].can_upload,
                count: response.data.data[i].count,
                cover_photo: response.data.data[i].cover_photo,
                created_time: response.data.data[i].created_time,
                from: response.data.data[i].from,
                link: response.data.data[i].link,
                name: response.data.data[i].name,
                privacy: response.data.data[i].privacy,
                type: response.data.data[i].type,
                updated_time: response.data.data[i].updated_time,
              });
            }
            future["return"](convertFacebookAlbum(response.data.data, user));
          }
        }
      );

      return future.wait();
    }
  },

});
let convertFacebookAlbum = function (albums, user){

  // console.log('Tamanho albuns',albums.length);
  for(let i = 0; i< albums.length;i++){

    HTTP.get(
      'https://graph.facebook.com/v2.8/'+albums[i].id+'/photos?fields=source,message,place',
      {
        headers: {
          'Authorization': 'Bearer ' + user.services.facebook.accessToken
        }
      },
      function (error, response) {

        if (error) {
          console.log(error);
        }else{
          // console.log('Testeeeee',UserMedia.findOne({ external_id: albums[i].id}));
          UserMedia.update({ external_id: albums[i].id }, { $push: { photos: response.data.data} });
        }
      }
    );
  }
}
