// Main Modules
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { render } from 'react-dom';

// Components
import {AppContainer} from '../imports/client/ui/containers/AppContainer.jsx';


// Run basic configuration and rendering at client startup
Meteor.startup(() => {

	Accounts.ui.config({
		requestPermissions: {
			facebook: ['email, feed']
		}



	});

	Meteor.absoluteUrl.defaultOptions.rootUrl = 'http://b328f530.ngrok.io'

	// Locale configurations for the client (from the moment.js module)
	moment.locale('pt-br');

	// Rendering the App Component
	render(<AppContainer />, document.getElementById('app'));

});
