import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

class EmailVerification extends Component {

	handleSubmit(event) {
		event.preventDefault();
		Meteor.call('addUser', Meteor.userId(), this.refs.email.value);
	}

	render() {
		return(
			<div>
				Email Verification
				<input type="text" name="email" ref="email" placeholder="Email" />
				<ons-button onClick={this.handleSubmit.bind(this)}>Enviar</ons-button>
			</div>
		);
	}
}

export default EmailVerification;