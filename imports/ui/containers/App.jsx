import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import App from '../mobile/App.jsx';
import EmailField from '../mobile/EmailField.jsx';

function composer(props, onData) {

	const handle = Meteor.subscribe('users');

	if(handle.ready()) {
		const currentUser = Meteor.user();
		onData(null, {currentUser});
	}
}

export const AppContainer = composeWithTracker(composer)(App);
export const EmailFieldContainer = composeWithTracker(composer)(EmailField);