import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import Twit from 'twit';
import Future from 'fibers/future';

Meteor.methods({
    // ==========================================
    // Post actions methods
    // ==========================================

    'likeFacebook': function () {

        let user = Meteor.users.findOne(this.userId);

        HTTP.post(

        );
    },
});