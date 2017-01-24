import React, { Component } from 'react';
import AppBar from '../components/AppBar.jsx';
import DrawerContainer from '../containers/DrawerContainer.jsx';
import { withRouter } from 'react-router';

class MainLayout extends Component {

  componentDidMount() {
    let self = this;

    //console.log(Meteor.call('teste', function (error, result) {
      //console.log(result);
    //}));

      if (this.props.route.currentUser != null) {
        Meteor.call('getUserRegisteredEmails', function (error, result) {
          console.log(result);
          if (result.length == 0) {
            self.props.router.push('/RegisterConfirmation');
          }
        });
      }

    // Meteor.call('getUserRegisteredPhones', function (error2, result2) {
    //   if (result.length == 0 && result2.lenght == 0) {
    //     self.router.push('/RegisterConfirmation');
    //   } else if (result.lenght > 0 && result2.lenght == 0) {
    //     self.router.push('/RegisterConfirmation');
    //   }

    // });

    //self.props.router.push('/RegisterConfirmation');
  }

  render() {
    return (
      <div className="main-logged">
        <AppBar />
        <DrawerContainer />
        <div className="content">{this.props.children}</div>
      </div>

    );
  }
}

export default withRouter(MainLayout);