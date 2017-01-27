import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import Drawer from '../components/Drawer.jsx';

/*
- This function receives the information by server and pass to the presentation component
*/

export default DrawerContainer = createContainer(() => {

  var handle = Meteor.subscribe("users");
 
  return {
    loading: !handle.ready(),
    currentUser: Meteor.user(),
  };
}, Drawer);
