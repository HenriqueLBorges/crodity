import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Splitter, SplitterSide, SplitterContent, Page } from 'react-onsenui';

import AccountsUIWrapper from './AccountsUIWrapper.jsx';
import AccountsLogin from './AccountsLogin.jsx';
import Header from './Header.jsx';
import Top from './Top';

class App extends Component {

	constructor(props){
		super(props);

		this.state = {
			isOpen: false
		}
	}

	componentDidMount() {
		let self = this;

		console.log(this.props);
		if(this.props.currentUser != null) {
			console.log('getUserRegisteredEmails');
			Meteor.call('getUserRegisteredEmails', function(error,result) {
				if (result.length == 0) {
					self.props.router.push('/email-form');
				}
			});
		}
	}
	
	hide() {
		this.setState({isOpen: false});
	}

	show() {
		this.setState({isOpen: true});
	}
	

	renderToolbar() {
		return(
			<Top show={this.show.bind(this)} />
		);
	}

	render() {
		/* ********************* */
		/* Mobile Connected User */
		/* ********************* */
		if(this.props.currentUser != null) {
			return (
				<div className='mobile-app'>
					<Splitter>
						<SplitterSide
							style={{
								boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'
							}}
							side='right'
							width={200}
							collapse={true}
							isSwipeable={true}
							isOpen={this.state.isOpen}
							onClose={this.hide.bind(this)}
							onOpen={this.show.bind(this)}
						>
							<Page>
								<Header />
							</Page>
						</SplitterSide>
						<SplitterContent>
							<Page renderToolbar={this.renderToolbar.bind(this)}>
								<main>
									{this.props.children}
								</main>
							</Page>
						</SplitterContent>
					</Splitter>
				</div>
			);
		}

		/* ************ */
		/* Mobile Login */
		/* ************ */
		else {
			return (
				<div className="mobile-login">
					<img className="circle-logo" src="/img/CrodityCircle100x100.png" alt="Crodity Logo"/>
					<h3>Connect To Crodity</h3>
					<AccountsLogin text="connect" />
				</div>
			);
		}

	}
	

}

export default withRouter(App);