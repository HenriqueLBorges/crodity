import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import MainLayout from './layouts/MainLayout.jsx';
import AppContainer from './containers/AppContainer.jsx';
import FeedContainer from './containers/FeedContainer.jsx';
import RegisterConfirmation from './components/RegisterConfirmation';
import AccountsLogin from './components/AccountsLogin.jsx';

export default class App extends Component {

    /*
    - export default makes the class that imports this class received this value
    - extends Component is necessary to construct a component inside of it
    - render() is the principal method of return 
    */
// 	const Routes = (
// 	<Route component={MainLayout}>
// 		<Route path='/' component={HomeContainer}>
// 			<Route path='RegisterConfirmation' component={RegisterConfirmation} />
// 			<IndexRoute component={FeedContainer} feedType='profile' />
// 		</Route>
// 	</Route>
// );

// class App extends Component {

// 	render() {
// 		return (<Router history={browserHistory} routes={Routes} />);
// 	}

// }

// export default App;


    render() {

        /*
        - We need to return the result of the render, a variable or something like this
        - Using </> we can return the result of the variable (or const) used
        */
        if (this.props.loading) {
            return <div className="mainLoading"><i className="fa fa-spinner fa-pulse fa-5x fa-fw"></i></div>
        } else {
            if (this.props.currentUser != null) {

                return (
                    <Router history={browserHistory}>
                        <Route path='/' component={MainLayout} currentUser={this.props.loading ? false : this.props.currentUser}>
                            <IndexRoute component={FeedContainer} feedType='profile' />
                            <Route path='RegisterConfirmation' component={RegisterConfirmation} />
                        </Route>
                    </Router>
                );
            }
            else {

                return (
                    <Router history={browserHistory}>
                        <Route path='/' component={AccountsLogin}>
                            <Route path='RegisterConfirmation' component={RegisterConfirmation} />
                        </Route>
                    </Router>
                    // <div className="mobile-login">
                    //     <img className="circle-logo" src="/img/CrodityCircle100x100.png" alt="Crodity Logo" />
                    //     <h3>Connect To Crodity</h3>
                    //     <AccountsLogin text="connect" />
                    // </div>
                );
            }

        }
    }

}