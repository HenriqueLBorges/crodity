import React , {Component} from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

//components
import MainLayout from './layouts/MainLayout.jsx';
import HomeContainer from './containers/HomeContainer.jsx';
import FeedContainer from './containers/FeedContainer.jsx';
import Register from './components/Register.jsx'
import Comment from './components/Comment.jsx'
import AccountsLogin from './components/AccountsLogin.jsx'

const Routes = (
	<Router history={browserHistory}>
		<Route component={MainLayout}>
			<Route path='/' component={HomeContainer}>
				<IndexRoute component={FeedContainer} feedType='profile' />
			</Route>
		</Route>
		<Route path='login' component={AccountsLogin} />
		<Route path='register' component={Register} />
		<Route path='comment' component={Comment} />
	</Router>
);


class App extends Component {

	render() {
		return (<Router history={browserHistory} routes={Routes} />);
	}

}

export default App;
