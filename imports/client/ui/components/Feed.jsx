import React from 'react';
import FeedUnit from './FeedUnit.jsx';
import Card from './Card.jsx';

const Feed = ({feed}) => {

	return (

		<div className="feed">
			<div className="padded-full">
			{feed.map((feedUnitData,i) => (
				<Card data={feedUnitData} key={i} />
			))}
			</div>
		</div>
	);
}

export default Feed;
