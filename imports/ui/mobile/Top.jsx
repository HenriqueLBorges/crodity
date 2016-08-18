// Top component from the mobile/App.jsx

import React, { Component } from 'react';
import { Toolbar, ToolbarButton } from 'react-onsenui';

class Top extends Component {

	constructor(props) {
		super(props);

		this.style = {
			left: {
				lineHeight: '44px'
			},
			right: {
				lineHeight: '44px',
				textAlign: 'right',
			},
			icon: {
				fontSize: '22px'
			}
		}
	}

	handleClick() {
		this.props.show();
	}

	render() {
		return(
			<Toolbar>
				<ons-row>
					<ons-col style={this.style.left}>Y</ons-col>
					<ons-col style={this.style.right}>
							<span style={this.style.icon} className="ss-notifications"></span>
							<span style={this.style.icon} className="ss-mail"></span>
							<span style={this.style.icon} className="ss-search"></span>
							<ons-icon style={this.style.icon} onClick={this.handleClick.bind(this)} class="ion-navicon"></ons-icon>
					</ons-col>
				</ons-row>
			</Toolbar>
		);
	}


}
export default Top;