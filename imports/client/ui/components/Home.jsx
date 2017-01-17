// Main Modules
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import React, { Component } from 'react';
import { withRouter } from 'react-router';

// Components
import AccountsLogin from './AccountsLogin.jsx';


const styles = {
	img: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		marginTop: 50,
	},
	button: {

	},
};


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
				<div>
					<div className="row">
						<div className="col s12 m4 offset-m4">
							<div className="mobile-login" style={styles.img}>
								<img className="responsive-img" src="/img/CrodityLogo.jpg" alt="Crodity Logo" />
							</div>
						</div>
					</div>

					<div>
						<AccountsLogin text="connect" />
					</div>
				</div>
			);
		}

	}


}

export default withRouter(Home);
