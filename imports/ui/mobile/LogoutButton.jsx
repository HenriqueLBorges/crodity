import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';

class LogoutButton extends Component {

	logout() {
		Meteor.logout();
	}

	render() {
		return(
			<ons-button onClick={this.logout.bind(this)}>Logout</ons-button>
		);
	}
}

export default LogoutButton;