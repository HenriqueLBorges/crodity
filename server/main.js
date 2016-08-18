import { Meteor } from 'meteor/meteor';

// ====================
// Handle HTTP requests
// ====================

// Listen to incoming HTTP requests, can only be used on the server
WebApp.rawConnectHandlers.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  return next();
});

// ============
// Publications
// ============

// Users Publication
Meteor.publish('users', () => {
  return Meteor.users.find({});
});