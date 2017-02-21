import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import Profile from '../components/Profile.jsx';

/*
- This function receives the information by server and pass to the presentation component
*/

export default ProfileContainer = createContainer(() => {

  var handle = Meteor.subscribe("users");
    console.log(Meteor.user().profile.cover);

  return {
    loading: !handle.ready(),
    currentUser: Meteor.user(),
     
  };
}, Profile);
