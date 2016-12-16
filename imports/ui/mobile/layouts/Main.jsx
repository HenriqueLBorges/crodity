import React from 'react';
import SidePanel from './SidePanel.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const Main = ({children}) => (

	<MuiThemeProvider>
		<div className="main">
				<SidePanel />
				<home data-page="true">
					<header className="header-bar">
			        <button className="btn icon icon-arrow-back pull-left"></button>
			        <button className="btn icon icon-menu pull-right show-for-phone-only" data-side-panel-id="side-panel-example"></button>
			        <div className="center">
			            <h1 className="title">App</h1>
			        </div>
			    </header>
				{children}
			</home>
		</div>
	</MuiThemeProvider>
);

export default Main;
