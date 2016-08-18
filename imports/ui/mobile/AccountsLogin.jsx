import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Button } from 'react-onsenui';

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

	buttonText() {
		if(this.props.text == 'login')
			return 'Login With';
		if(this.props.text == 'connect')
			return 'Connect With';
		else
			return '';
	}

	render() {
		return(
			<div className="connect-buttons">
				<Button className="facebook" onClick={this.loginWithFacebook.bind(this)}>
					<span className="fa fa-facebook"></span>
					{this.buttonText()} Facebook
				</Button>
				<Button className="twitter" onClick={this.loginWithTwitter.bind(this)}>
					<span className="fa fa-twitter"></span>
					{this.buttonText()} Twitter
				</Button>
			</div>
		);
	}
}

export default AccountsLogin;