import React from 'react';
import Feed from '../mobile/Feed.jsx';

const FeedComposer = ({facebookFeed,twitterFeed}) => {
	
	let feed = []
		.concat(facebookFeed)
		.concat(twitterFeed)
		.sort(function(a,b) {return (a.created < b.created) ? 1 : ((b.created < a.created) ? -1 : 0);} );
	console.log('feed');
	console.log(feed);


	return(
		<Feed feed={feed} />
	)
};

export default FeedComposer;