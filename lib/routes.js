import React from 'react';
import { mount } from 'react-mounter';

import App from '../imports/ui/mobile/App.jsx';
import Test from '../imports/ui/mobile/Test.jsx';
import EmailVerification from '../imports/ui/mobile/EmailVerification.jsx';
import FeedContainer from '../imports/ui/containers/FeedContainer.jsx';

FlowRouter.route('/', {
	action: function() {
		mount(App, {content: (<FeedContainer />)});
	}
});

FlowRouter.route('/test', {
	action: function() {
		mount(App, {content: (<Test />)});
	}
});

FlowRouter.route('/email-verification', {
	action: function() {
		mount(App, {content: (<EmailVerification />)});
	}
});