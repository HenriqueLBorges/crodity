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

<<<<<<< HEAD
	//Meteor.absoluteUrl.defaultOptions.rootUrl = 'http://b328f530.ngrok.io'
=======
	//Meteor.absoluteUrl.defaultOptions.rootUrl = 'http://3bc25677.ngrok.io'
>>>>>>> a51263ea84f90129cbdbbef884d85ab75646e620

	// Locale configurations for the client (from the moment.js module)
	moment.locale('pt-br');

	// Rendering the App Component
	render(<AppContainer />, document.getElementById('app'));

});
