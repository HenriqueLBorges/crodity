import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import MobileApp from '../mobile/MobileApp.jsx';
import EmailField from '../mobile/EmailField.jsx';

function composer(props, onData) {

	const handle = Meteor.subscribe('users');

	if(handle.ready()) {
		const currentUser = Meteor.user();
		onData(null, {currentUser});
	}
}

export const MobileAppContainer = composeWithTracker(composer)(MobileApp);
export const EmailFieldContainer = composeWithTracker(composer)(EmailField);
