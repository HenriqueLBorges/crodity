import React , {Component} from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import MainLayout from './layouts/MainLayout.jsx';
import HomeContainer from './containers/HomeContainer.jsx';
import FeedContainer from './containers/FeedContainer.jsx';

const Routes = (
		<Route component={MainLayout}>
			<Route path='/' component={HomeContainer}>
				<IndexRoute component={FeedContainer} feedType='profile' />
			</Route>
		</Route>
);

class App extends Component {

	render() {
		return (<Router history={browserHistory} routes={Routes} />);
	}

}

export default App;
