import React from 'react';
import FeedUnit from './FeedUnit.jsx';

const Feed = ({feed}) => {

	return (

		<div className="feed">
			<div className="padded-full">
			{feed.map((feedUnitData,i) => (
				<FeedUnit data={feedUnitData} key={i} />
			))}
			</div>
		</div>
	);
}

export default Feed;
