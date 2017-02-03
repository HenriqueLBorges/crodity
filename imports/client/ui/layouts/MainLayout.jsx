import React, { Component } from 'react';
import AppBar from '../components/AppBar.jsx';
import DrawerContainer from '../containers/DrawerContainer.jsx';
import { withRouter } from 'react-router';

class MainLayout extends Component {

  componentDidMount() {
    let self = this;

    if (this.props.route.currentUser != null) {
      Meteor.call('getUserRegisteredEmails', function (error, result) {
        //console.log(result);
        Meteor.call('getUserRegisteredPhones', function (error2, result2) {
          // console.log(result2);
          // console.log("teste");
          //  console.log("result "+result.length);
          //  console.log("result2" + result2.length);
          //If the user has no email or cellphone registered then the page 
          //RegisterConfirmation is show
          if (result.length == 0 || result2.length == 0) {
            self.props.router.push('/RegisterConfirmation');
          }
        });
      });
    }
  }

  render() {
    return (
      <div>
        <AppBar />
        <DrawerContainer />
        <div className="content content-logged">{this.props.children}</div>
      </div>

    );
  }
}

export default withRouter(MainLayout);