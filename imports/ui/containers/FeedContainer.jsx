import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import Twit from 'twit';
import FeedComposer from './FeedComposer.jsx';


class FeedContainer extends Component {

	constructor(props) {
		super(props);
		this.state = {
			facebookFeed: new Array(),
			twitterFeed: new Array()
		};
	}

	getFacebookFeed() {
		let self = this;

		if(Meteor.user()) {
			Meteor.call('getFacebookFeed', function(error, result) {
				if(error);
					console.log(error);
				if(typeof result != 'undefined')
					self.setState({facebookFeed: result});
				console.log('facebook feed');
				console.log(result);
				return true;
			});
		}

	}

	getTwitterFeed() {
		let self = this;

		if(Meteor.user()) {
			Meteor.call('getTwitterFeed', function(error, result) {
				if(error);
					console.log(error);
				
				if(typeof result != 'undefined')
					self.setState({twitterFeed: result});
				console.log('twitter feed');
				console.log(result);
				return true;
			});
		}
	}

	getFeed() {
		console.log("getFeed");
		this.getFacebookFeed();
		this.getTwitterFeed();

		let self = this;
		let timeout = (Meteor.user()?60000:500);
		setTimeout(self.getFeed.bind(self),timeout);
		
	}

	componentDidMount() {
		// Configures long polling to make live updates possible
		(this.getFeed.bind(this))();
	}

	componentWillUnmount() {
		clearTimeout();
	}

	render() {
		if(this.state.facebookFeed.length > 0 || this.state.twitterFeed.length > 0) {
			return(
				<FeedComposer facebookFeed={this.state.facebookFeed} twitterFeed={this.state.twitterFeed} />
			);
		}
		else {
			return(
				<div>Loading...</div>
			);
		}
	}

}

export default FeedContainer;