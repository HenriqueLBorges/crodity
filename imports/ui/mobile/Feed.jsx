import React from 'react';
import FeedUnit from './FeedUnit.jsx'

const Feed = ({feed}) => {
	
	return (

		<div className="feed">
			{feed.map((feedUnitData,i) => (
				<FeedUnit data={feedUnitData} key={i} />
			))}
			
		</div>
	);
}

export default Feed;