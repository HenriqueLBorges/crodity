import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Accounts } from 'meteor/accounts-base';
import Twit from 'twit';
import Future from 'fibers/future';

Meteor.methods({

  doesUserExist(name) {
    return Accounts.findUserByUsername(name) != null;
  },

  'getUserRegisteredPhones': function () {
    let user = Meteor.users.findOne(this.userId);

    let returnedPhones = [];

    // If the usr has at least one registered phone
    if (typeof user.registered_phones !== 'undefined') {

      for (let i = 0; i < user.registered_phones.length; i++) {
        returnedPhones.push(user.registered_phones[i].number);
      }
    }
    return returnedPhones;
  },

  /*
  - Method to add phones to account
  */

  'addRegisteredPhone': function (phone) {
    // Get the logged user object
    let user = Meteor.users.findOne(this.userId);

    // Sets the initial state of the profile.phones array to
    // later be updated inside the user object
    let registered_phones = new Array();
    if (typeof user.registered_phones !== 'undefined') {
      registered_phones = user.registered_phones;
    }
    // Checks if the profile.phones is unique
    let isUnique = true;
    for (let i = 0; i < registered_phones.length; i++) {
      if (registered_phones[i] == phones) {
        isUnique = false;
      }
    }

    // Adds the newly added phone to the registered_phones array
    // only if the phone was not already there.
    if (isUnique) {
      registered_phones.push({
        number: phone,
        verified: false
      });
      // console.log("AQUI");
      // console.log(registered_phones);
      // Updates the user in the database
      Meteor.users.update({ '_id': this.userId }, { $set: { registered_phones: registered_phones } });
    }
  },

  'getUserRegisteredEmails': function () {

    // Setting the user
    // this.userId is already sent to the server when
    // there is a user logged in the client
    let user = Meteor.users.findOne(this.userId);

    let returnedEmails = [];

    // If the usr has at least one registered email
    if (typeof user.registered_emails !== 'undefined') {

      for (let i = 0; i < user.registered_emails.length; i++) {
        returnedEmails.push(user.registered_emails[i].address);
      }
      // console.log(returnedEmails);
    }

    return returnedEmails;
  },

  'addRegisteredEmail': function (email) {

    // Get the logged user object
    let user = Meteor.users.findOne(this.userId);

    // Sets the initial state of the registered_emails array to
    // later be updated inside the user object
    let registered_emails = new Array();
    if (typeof user.registered_emails !== 'undefined') {
      registered_emails = user.registered_emails;
    }

    // Checks if the email is unique
    // TODO: Check the entire database, not only the emails from the logged user
    let isUnique = true;
    for (let i = 0; i < registered_emails.length; i++) {
      if (registered_emails[i].address == email) {
        isUnique = false;
      }
    }

    // Adds the newly added email to the registered_emails array
    // only if the email was not already there.
    if (isUnique) {
      registered_emails.push({
        address: email,
        verified: true
      });
    }

    // Updates the user in the database
    Meteor.users.update({ '_id': this.userId }, { $set: { registered_emails: registered_emails } });
  },

  //Getting user profile of Facebook
  'getFacebookProfile': function (accessToken) {

    // Sets future and user
    let future = new Future();
    let user = Meteor.users.findOne(this.userId);

    // Checks if the user has the facebook accessToken
    if (accessToken || user.services.facebook.accessToken) {
      console.log('TESTE TO NO FACEBOOK');
      // Facebook Graph API Call
      HTTP.get(
        'https://graph.facebook.com/v2.8/me?fields=id,name,about,cover,first_name,last_name,email,birthday,gender,locale,timezone',
        {
          headers: {
            'Authorization': 'Bearer ' + accessToken
          }
        },
        //console.log('TESTE');
        function (error, response) {

          if (!error) {
            // console.log(response+ 'RESPONSE');
            // console.log(response.data + ' DATA RESPONSE ');
            // console.log('TESTANDO O IF');
            // console.log(response);
            future["return"](convertFacebookProfileToGlobal(response.data));

          }
        }
      );

      return future.wait();
    }

    // If the user does not have a facebook accessToken, returns an empty array
    else {
      return [];
    }
  }

});


// =======================
// Accounts.onCreateUser()
// =======================
// This function is called right after the user is created and before it is saved in the Database
Accounts.onCreateUser(function (options, user) {

  // Use provided profile in options, or create an empty object
  user.profile = options.profile || {};
  // Assigns first and last names to the newly created user object
  user.profile.firstName = options.firstName;
  user.profile.lastName = options.lastName;
  user.registered_phones = [];


  // //Checking what is the service the user connected, and defining the informations about the profile
  if (user.services.facebook) {

    let profileData = Meteor.call('getFacebookProfile', user.services.facebook.accessToken);

    user.profile.firstName = profileData.user.first_name;
    user.profile.lastName = profileData.user.last_name;
    user.profile.gender = profileData.user.gender;
    user.profile.birthday = profileData.user.birthday;
    user.profile.timezone = profileData.user.timezone;
    user.profile.firstName = profileData.user.first_name;
    user.profile.image = profileData.midia.profile;
    user.profile.cover = profileData.midia.cover;
  } else if (user.services.twitter) {

  }

  // Returns the user object
  return user;
});

let convertFacebookProfileToGlobal = function (profile) {


  // Creates the global profile array
  globalProfile = new Array();

  // Created the globalFeed[i] object
  globalProfile = {
    service: 'facebook',
    midia: {
      profile: 'http://graph.facebook.com/' + profile.id + '/picture?type=square&height=160&width=160',
      cover: profile.cover.source
    },

    user: {
      first_name: profile.first_name,
      last_name: profile.last_name,
      service_id: profile.id,
      gender: profile.gender,
      locale: profile.locale,
      timezone: profile.timezone,
      birthday: profile.birthday,
      email: profile.email
    }
  }
  // console.log(globalProfile);
  return globalProfile;
};

// ==========================================
// Meteor accounts-meld Package Configuration
// ==========================================

let meldUserCallback = function (src_user, dst_user) {
  console.log('meldUserCallback');

  if (src_user.createdAt < dst_user.createdAt)
    dst_user.createdAt = src_user.createdAt;

  // 'profile' field
  let profile = {};
  _.defaults(profile, dst_user.profile || {});
  _.defaults(profile, src_user.profile || {});

  if (!_.isEmpty(profile))
    dst_user.profile = profile;
};

let meldDBCallback = function (src_user_id, dst_user_id) {
  console.log('meldDBCallback');
};

let serviceAddedCallback = function (user_id, service_name) {
  console.log('serviceAddedCallback');
  if (service_name === 'twitter') {
    let user = Meteor.users.findOne(user_id);
    let link = user.services[service_name].link;

    if (link)
      Meteor.users.update(user_id, { $set: { "profile.fb_link": link } });
  }
};

AccountsMeld.configure({
  meldUserCallback: meldUserCallback,
  meldDBCallback: meldDBCallback,
  serviceAddedCallback: serviceAddedCallback
});
