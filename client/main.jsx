// Hot Reloading Packages
import 'react-hot-loader/patch';
import { AppContainer } from 'react-hot-loader';

// Main Imports
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import App from '../imports/ui/App.jsx';

// Frontend Libraries Imports
import '../imports/vendor/ss-gizmo/webfonts/ss-gizmo.js';
import '../imports/vendor/ss-gizmo/webfonts/ss-gizmo.css';

// Run basic configuration and rendering at client startup
Meteor.startup(() => {

	// Locale configurations for the client (from the moment.js module)
	moment.locale('pt-br');

	// Rendering the App Component
	render(<AppContainer><App /></AppContainer>, document.getElementById('app'));

	if (module.hot) {
		module.hot.accept('../imports/ui/App.jsx', () => {
			const NextApp = require('../imports/ui/App.jsx').default;
			render(
				<AppContainer>
					<NextApp />
				</AppContainer>,
				document.getElementById('app')
			);
		});
	}

});
