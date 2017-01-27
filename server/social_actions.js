import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import Twit from 'twit';
import Future from 'fibers/future';

Meteor.methods({
    // ==========================================
    // Post actions methods
    // ==========================================

    'commentFacebook': function (postId, comment) {

        let user = Meteor.users.findOne(this.userId);

        HTTP.post(
            'https://graph.facebook.com/' + postId + '/comments/?message=' + comment,
            {
                headers: {
                    'Authorization': 'Bearer ' + user.services.facebook.accessToken
                }
            },
            function (error, response) {
                if(error){
                    console.log(error);
                }
                console.log(response);
            }
        );

    },
});