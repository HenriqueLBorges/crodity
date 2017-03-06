import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

//components
import HomeLayout from './layouts/HomeLayout.jsx';
import MainLayout from './layouts/MainLayout.jsx';
import FeedContainer from './containers/FeedContainer.jsx';
import ProfileContainer from './containers/ProfileContainer.jsx';
import ConfigurationContainer from './containers/ConfigurationContainer.jsx';

import Register from './components/Register.jsx';
import RegisterConfirmation from './components/RegisterConfirmation';
import AccountsLogin from './components/AccountsLogin.jsx';
import Profile from './components/Profile.jsx';
import AccountConfiguration from './components/AccountConfiguration.jsx';


class App extends Component {


  render() {
    /*
    - We need to return the result of the render, a variable or something like this
    - Using </> we can return the result of the variable (or const) used
    */
    if (this.props.loading) {
      return <div className="main-loading"><i className="fa fa-spinner fa-pulse fa-5x fa-fw"></i></div>
    } else {
      if (this.props.currentUser != null) {

        return (
          <Router history={browserHistory}>

            <Route path='/' component={HomeLayout} currentUser={this.props.loading ? false : this.props.currentUser}>
              <IndexRoute component={FeedContainer} feedType='home' />
              <Route path='RegisterConfirmation' component={RegisterConfirmation} currentUser={this.props.loading ? false : this.props.currentUser} />
            </Route>
             <Route path='/' component={MainLayout} currentUser={this.props.loading ? false : this.props.currentUser}>
            <Route path='/configuration' component={ConfigurationContainer} />
            </Route> 
            <Route path='/profile' component={ProfileContainer} />
          </Router>
        );
      }
      else {

        return (
          <Router history={browserHistory}>
            <Route path='/' component={AccountsLogin}></Route>
            <Route path='/register' component={Register} />
          </Router>
        );
      }

    }
  }
}

export default App;
