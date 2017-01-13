// Main Modules
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import React, { Component } from 'react';
import { withRouter } from 'react-router';

// Components
import AccountsLogin from './AccountsLogin.jsx';

class Home extends Component {

	render() {

		/* ********************* */
		/* Mobile Connected User */
		/* ********************* */
		if(this.props.currentUser != null) {
			return (
				<div className='home content'>
					{this.props.children}
				</div>
			);
		}

		/* ************ */
		/* Mobile Login */
		/* ************ */
		else {
			return (
				<div className="login">
					<img className="circle-logo" src="/img/CrodityCircle100x100.png" alt="Crodity Logo"/>
					<h3>Connect To Crodity</h3>
					<AccountsLogin text="connect" />
				</div>
			);
		}

	}


}

export default withRouter(Home);
