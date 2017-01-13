import React from 'react';

const FeedService = ({service}) => {

	let iconClass = '';

	switch(service) {
		case 'facebook':
			iconClass = 'fa fa-facebook-official';
			break;
		case 'twitter':
			iconClass = 'fa fa-twitter-square';
			break;
	}

	return(
		<span>
			<p className="service" style={{textTransform: 'capitalize'}}> 
				<span className={"icon "+iconClass}></span>Via {service}
			</p>
		</span>
	);
}

export default FeedService;