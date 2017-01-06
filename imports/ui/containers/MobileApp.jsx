import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import MobileApp from '../mobile/MobileApp.jsx';
import EmailField from '../mobile/EmailField.jsx';

/*
- This function receives the information by server and pass to the presentation component
*/
function composer(props, onData) {

	//defining a constant of subscribing user
	const handle = Meteor.subscribe('users');

	//check if the subscrition is ready
	if(handle.ready()) {
		//getting the actual logged user
		const currentUser = Meteor.user();
		//when the data is ready return to the presentation component
		onData(null, {currentUser});
	}
}

//exporting the information to the visual components
export const MobileAppContainer = composeWithTracker(composer)(MobileApp);
export const EmailFieldContainer = composeWithTracker(composer)(EmailField);
