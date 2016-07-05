import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';

class AccountsLogin extends Component {
	
	loginWithFacebook() {

		if(Meteor.isCordova) {
			facebookConnectPlugin.login(['email'],
				function(){
					console.log('success');
				},
				function() {
					console.log('error');
				}
			);
		}
		else {
			Meteor.loginWithFacebook({loginStyle: 'redirect'}, function(e){
				if(e)
					console.log(e);
			});
		}
	}

	loginWithTwitter() {
		Meteor.loginWithTwitter({loginStyle: 'redirect'}, function(e){
			if(e)
				console.log(e);
		});	
	}

	loginWithGoogle() {
		Meteor.loginWithGoogle({loginStyle: 'redirect'}, function(e){
			if(e)
				console.log(e);
		});	
	}

	loginWithLinkedin() {
		Meteor.loginWithLinkedin({loginStyle: 'redirect'}, function(e){
			if(e)
				console.log(e);
		});	
	}

	logout() {
		Meteor.logout();
	}

	render() {
		return(
			<div>
				<ons-button onClick={this.loginWithFacebook.bind(this)}>Facebook</ons-button>
				<ons-button onClick={this.loginWithTwitter.bind(this)}>Twitter</ons-button>
				<ons-button onClick={this.loginWithGoogle.bind(this)}>Google</ons-button>
				<ons-button onClick={this.loginWithLinkedin.bind(this)}>Linkedin</ons-button>
				<ons-button onClick={this.logout.bind(this)}>Logout</ons-button>
			</div>
		);
	}
}

export default AccountsLogin;