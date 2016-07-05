import React from 'react';
import Feed from '../mobile/Feed.jsx';

const FeedComposer = ({facebookFeed,twitterFeed}) => {

	for(let i=0;i<facebookFeed.length;i++){
		facebookFeed[i].created = new Date(facebookFeed[i].created_time);
		facebookFeed[i].service = 'facebook';
	}
	for(let i=0;i<twitterFeed.length;i++){
		twitterFeed[i].created = new Date(twitterFeed[i].created_at);
		twitterFeed[i].service = 'twitter';
	}



	let feed = []
		.concat(facebookFeed)
		.concat(twitterFeed)
		.sort(function(a,b) {return (a.created > b.created) ? 1 : ((b.created > a.created) ? -1 : 0);} );
	console.log('feed');
	console.log(feed);


	return(
		<Feed feed={feed} />
	)
};

export default FeedComposer;