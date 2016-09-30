import React from 'react';
import FeedService from './FeedService.jsx';
import DateDisplay from './DateDisplay.jsx';

const FeedUnit = ({data}) => {
	return (
	<div className="feed-unit">
		<ons-row>
			<ons-col width="24%">
				<div className="avatar">
					<img className="responsive" src={(data.user.image?data.user.image:'https://cdn1.iconfinder.com/data/icons/user-pictures/100/boy-512.png')} alt=""/>
				</div>
			</ons-col>
			<ons-col>
			<div className="header-data">
					<p className="title">{data.title}</p>
					<p className="date"><span className="icon ss-clock"></span>
						<DateDisplay date={data.created} />
					</p>
					<FeedService service={data.service} />
				</div>
			</ons-col>
		</ons-row>
		<ons-row>
			<div className="feed-content">
				{data.content}
			</div>
		</ons-row>
		<ons-row>
			<ul className="inset statistics">
				<li><span className="icon ss-heart" style={{fontSize: '18px'}}></span><span className="text">45</span></li>
				<li><span className="icon ss-chat" style={{fontSize: '18px', top: '4px'}}></span><span className="text">7</span></li>
				<li><span className="icon ss-share"></span><span className="text">23</span></li>
			</ul>
		</ons-row>
	</div>
)};

export default FeedUnit;
