import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.startup(() => {

	// Register a callback to be called after a login attempt succeeds.
	Accounts.onLogin(() => {
		// Checks if user already has registered emails
		// If he has, then there's no need to worry, as accounts-meld takes care of everything
		// But if not, we should ask for his email.


		// if(!Meteor.user().registered_emails)
		// 	FlowRouter.go('/email-verification');

	});

});