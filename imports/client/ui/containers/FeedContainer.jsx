// Main Modules
import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import Twit from 'twit';

// Components
import Feed from '../components/Feed.jsx';
import CommentList from '../components/CommentList.jsx';
import Profile from '../components/Profile.jsx'
import { Helpers } from '../helpers/Helpers.jsx'

/*
  FeedSorter
  Sorts the feeds from the various social networks in chronological order
*/

const FeedSorter = ({facebookFeed, twitterFeed, instagramFeed}) => {

	let feed = []
		.concat(facebookFeed)
		.concat(twitterFeed)
		.concat(instagramFeed)
		.sort(function (a, b) { return (a.created < b.created) ? 1 : ((b.created < a.created) ? -1 : 0); });
	return (
		<Feed feed={feed} />
	);

}

class FeedContainer extends Component {

	// =============
	// constructor()
	// =============
	constructor(props) {
		super(props);

		// Set the social network feeds as new state arrays
		this.state = {
			facebookFeed: new Array(),
			twitterFeed: new Array(),
			instagramFeed: new Array(),
		};
	}

	// ==========================================
	// getFeed()
	// Get the Feed of a specific social network,
	// defined by the service parameter
	// ==========================================
	getFeed(service) {
		let self = this;

		if (Meteor.user()) {

			// Capitalize the service string (Ex: 'facebook' becomes 'Facebook')
			serviceCapitalized = service.charAt(0).toUpperCase() + service.slice(1);
			let u = Meteor.user();
			let methodName;

			if (typeof Helpers.get(this.props, 'route.feedType') === 'undefined') {
				methodName = (this.props.feedType == 'home' ? 'get' + serviceCapitalized + 'HomeFeed' : 'get' + serviceCapitalized + 'Feed'); 
			}
			else {
				// Setting the method name that we are going to call from the server, using Meteor.call()
				methodName = (this.props.route.feedType == 'home' ? 'get' + serviceCapitalized + 'HomeFeed' : 'get' + serviceCapitalized + 'Feed');
			}

			console.log(methodName)
			
			// if (typeof Helpers.get(this.props, 'route.feedType') === 'undefined') {
			// 	methodName = (this.props.feedType == 'profile' ? 'get' + serviceCapitalized + 'ProfileFeed' : 'get' + serviceCapitalized + 'Feed'); 
			// }
			// else {
			// 	// Setting the method name that we are going to call from the server, using Meteor.call()
			// 	methodName = (this.props.route.feedType == 'profile' ? 'get' + serviceCapitalized + 'ProfileFeed' : 'get' + serviceCapitalized + 'Feed');
			// }

			// Async calling the method whose name was set above
			Meteor.call(methodName, function (error, result) {
				if (error);
				// console.log(error);

				if (typeof result != 'undefined') {
					let stateObject = {};
					stateObject[service + 'Feed'] = result;
					self.setState(stateObject);
				}
				// console.log(service+' feed');
				// console.log(result);
				return true;
			});
		}
	}

	// ===========================================
	// getAllFeeds()
	// Calls the APIs for the social networks that
	// are implemented by Crodity system
	// ===========================================
	getAllFeeds() {
		this.getFeed('facebook');
		this.getFeed('twitter');
		this.getFeed('instagram');

		let self = this;
		let timeout = (Meteor.user() ? 90000 : 500);
		setTimeout(self.getAllFeeds.bind(self), timeout);
	}

	// ===================
	// componentDidMount()
	// ===================
	componentDidMount() {
		// Configures long polling to make live updates possible
		(this.getAllFeeds.bind(this))();
	}

	// ======================
	// componentWillUnmount()
	// ======================
	componentWillUnmount() {
		// Clears the timoeout that was set inside the getAllFeeds() method
		clearTimeout();
	}

	// ========
	// render()
	// ========
	render() {
		if (this.state.facebookFeed.length > 0 || this.state.twitterFeed.length > 0 || this.state.instagramFeed.length > 0) {
			return (
				<FeedSorter facebookFeed={this.state.facebookFeed}
					twitterFeed={this.state.twitterFeed}
					instagramFeed={this.state.instagramFeed} />
			);
		}
		else {
			return (
				<div>Loading...</div>
			);
		}
	}

}

export default FeedContainer;
