import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Input, Button } from  'react-onsenui';

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
				<Button onClick={this.handleSubmit.bind(this)} >Confirm email</Button>
			</div>
		);
	}
}

export default EmailField;