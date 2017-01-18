import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import LoginCrodityAccount from './LoginCrodityAccount.jsx';
import { Link } from 'react-router';

const styles = {
	buttonFb: {
		margin: 12,
		backgroundColor: '#3b5998'
	},

	buttonTt: {
		margin: 12,
		backgroundColor: '#1DA1F2'
	},

	hrStyle: {
		margin: '0 25%',
		border: '1px solid black',
	}


}

class AccountsLogin extends Component {

	loginWithFacebook() {

		if (Meteor.isCordova) {
			facebookConnectPlugin.login(['email'],
				function () {
					console.log('success');
				},
				function () {
					console.log('error');
				}
			);
		}
		else {
			Meteor.loginWithFacebook({ loginStyle: 'redirect' }, function (e) {
				if (e)
					console.log(e);
			});
		}
	}

	loginWithTwitter() {
		Meteor.loginWithTwitter({ loginStyle: 'redirect' }, function (e) {
		});
	}

	loginWithGoogle() {
		Meteor.loginWithGoogle({ loginStyle: 'redirect' }, function (e) {
			if (e)
				console.log(e);
		});
	}

	loginWithLinkedin() {
		Meteor.loginWithLinkedin({ loginStyle: 'redirect' }, function (e) {
			if (e)
				console.log(e);
		});
	}

	buttonText() {
		if (this.props.text == 'login')
			return ' Login With ';
		if (this.props.text == 'connect')
			return ' Connect With ';
		else
			return '';
	}

	render() {


		return (

			<div>
				<br />
				<div className="row">
					<div className="col s12 m4 offset-m4">
						<div className="mobile-login">
							<img className="responsive-img" src="/img/CrodityLogo.jpg" alt="Crodity Logo" />
						</div>
					</div>
				</div>
				<div className="container ">
					<p className="center-align">
						<button style={styles.buttonFb} className="btn waves-effect waver-light" type="submit" name="action"
							onClick={this.loginWithFacebook.bind(this)}>Login With Facebook
          	<i className="fa fa-facebook-square left"></i>
						</button>
					</p>
					<p className="center-align">
						<button style={styles.buttonTt} className="btn waves-effect waver-light" type="submit" name="action"
							onClick={this.loginWithTwitter.bind(this)}>Login With Twitter
            <i className="fa fa-twitter-square left" aria-hidden="true"></i>
						</button>
					</p>
					<br />
					<hr style={styles.hrStyle} />

					<LoginCrodityAccount />

					<br />
					<p className="center-align">
						<Link to="/register">
							<button className="white btn-flat black-text col s12 m6 offset-m3" type="submit" name="action">
								CRIAR NOVA CONTA</button>
						</Link>
					</p>

				</div>
			</div>

		);
	}
}

export default AccountsLogin;
