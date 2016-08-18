// Main Imports
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import App from '../imports/ui/App.jsx';

// Frontend Libraries Imports
import ons from 'onsenui';
import '../imports/vendor/onsenui/onsenui.css';
import '../imports/vendor/onsenui/onsen-css-components.css';
import '../imports/vendor/onsenui/onsen-css-components-default.css';
import '../imports/vendor/ss-gizmo/webfonts/ss-gizmo.js';
import '../imports/vendor/ss-gizmo/webfonts/ss-gizmo.css';

// Run basic configuration and rendering at client startup
Meteor.startup(() => {

	// Locale configurations for the client (from the moment.js module)
	moment.locale('pt-br');

	// Rendering the App Component
	render(<App />, document.getElementById('app'));

});