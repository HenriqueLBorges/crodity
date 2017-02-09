import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import Twit from 'twit';
import Future from 'fibers/future';

import { Posts } from '../imports/api/posts.js';

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
                if (error) {
                    console.log(error);
                }
                console.log(response);
            }
        );

    },

    'postFacebook': function (comment) {
        let user = Meteor.users.findOne(this.userID);

        HTTP.post(
            'https://graph.facebook.com/feed/?message=' + comment,
            {
                headers: {
                    'Authorization': 'Bearer ' + user.services.facebook.accessToken
                }
            },
            function (error, response) {
                if (error) {
                    console.log(error);
                }
                console.log(response);
            }
        );

    },

    'likeCrodity': function (postId, name, type) {
        let reaction = {
            name: name,
            type: type
        }
        let post = Posts.findOne({ 'id': postId });
        Posts.update({ id: postId }, { $push: { crodity_reactions: reaction } });
        console.log(post);
    },
});