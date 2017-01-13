// Main Modules
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { render } from 'react-dom';

// Components
import App from '../imports/client/ui/App.jsx';


// Run basic configuration and rendering at client startup
Meteor.startup(() => {

	Accounts.ui.config({
		requestPermissions: {
			facebook: ['email, feed']
		}
	});

	// Locale configurations for the client (from the moment.js module)
	moment.locale('pt-br');

	// Rendering the App Component
	render(<App />, document.getElementById('app'));

});
