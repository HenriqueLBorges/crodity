import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import App from '../App.jsx';

/*
- This function receives the information by server and pass to the presentation component
*/

let container = () => {
  // Do all your reactive data access in this method.
  // Note that this subscription will get cleaned up when your component is unmounted
  var handle = Meteor.subscribe("users");
  
  return {
    currentUser: Meteor.user(),
    loading: !handle.ready()
  };
};

export const AppContainer = createContainer(container, App);
//export const ConfirmationFields = createContainer(container, App);