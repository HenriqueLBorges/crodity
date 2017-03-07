import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import LoginCrodityAccount from './LoginCrodityAccount.jsx';
import { Link } from 'react-router';
import {ButtonsLoginLogin} from './AccountsButtonsLogin';

const styles = {

	hrStyle: {
		margin: '0 25%',
		border: '1px solid black',
	}
}

class AccountsLogin extends Component {

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
				<ButtonsLoginLogin/>
				<br />
				<hr style={styles.hrStyle} />
				<LoginCrodityAccount />
				<br />
				<p className="center-align">
					<Link to="/recover-password">
						<button className="white btn-flat black-text col s12 m6 offset-m3" type="submit" name="action">
							Forgot password?</button>
					</Link>
				</p>
				<p className="center-align">
					<Link to="/register">
						<button className="white btn-flat black-text col s12 m6 offset-m3" type="submit" name="action">
							CREATE NEW ACCOUNT</button>
					</Link>
				</p>

			</div>
		</div>

	);
}
}

export default AccountsLogin;
