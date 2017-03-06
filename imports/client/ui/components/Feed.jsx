import React from 'react';
import FeedUnit from './FeedUnit.jsx';
import NewPost from './NewPost.jsx';

const Feed = ({feed}) => {

	return (
		<div>
			
			<div className="feed">
				<div className="padded-full">
					{feed.map((feedUnitData, i) => (
						<FeedUnit data={feedUnitData} key={i} />
					))}
				</div>
			</div>
		</div>
	);
}

export default Feed;
