import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';

class EmailField extends Component {

	handleSubmit() {
		Meteor.call('addRegisteredEmail', this.refs.email.value, function(e,r){
			console.log(r);
		});
	}

	render() {
		return(
			<div className="email-field-component">
				<p>Please, confirm your email address to continue.</p>
				<input ref='email' type="email" placeholder="email" />
				<button onClick={this.handleSubmit.bind(this)} >Confirm email</button>
			</div>
		);
	}
}

export default EmailField;
