import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Helpers } from '../helpers/Helpers.jsx';



class AccountConfiguration extends Component {

  handleSubmitEmail() {
    event.preventDefault();
    let self = this;
    Meteor.call('addRegisteredEmail', this.refs.email.value, function (e, r) {
      console.log(r);
      self.props.router.push('/');
    });
  }


  servicesLogged() {
/*
    if (this.props.currentUser.services.facebook) {

      return (<div>
         <lable>{Helpers.socialIcon('facebook', 2)}</lable>
        <div className="switch">
          <label> Off <input type="checkbox" checked />
            <span className="lever"></span> On </label>
        </div>
      </div>); 
    }*/


    if (this.props.currentUser.services.instagram) {

      return( <div>
        <div className="switch">
          <lable>{Helpers.socialIcon('instagram', 2)}</lable>
          <label> Off <input type="checkbox" checked />
            <span className="lever"></span> On </label>
        </div>
      </div>); 

    }

    if (this.props.currentUser.services.twitter) {

      return (<div>
        <div className="switch">
          <label> {Helpers.socialIcon('twitter', 2)}</label> 
          <label> Off <input type="checkbox" checked />
            <span className="lever"></span> On </label>
        </div>
      </div>);

    }
  }

  render() {
    console.log(this.props.currentUser.services);
    return (
      <div className="row">
        <div className="col s12 m12">
          <div className="card-panel">
            <h4 className="header2">Configuration </h4>
            <div className="row">
              <form className="col s12">
                <div className="row">
                  <div className="input-field col s12">
                    <i className="mdi-action-account-circle prefix" />
                    <input id="name3" type="text" />
                    <label htmlFor="first_name">{Helpers.get(this.props, 'currentUser.profile.name')}</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <i className="mdi-communication-email prefix" />
                    <input id="email3" type="email" />
                    <label htmlFor="email">{this.props.currentUser.registered_emails[0].address}</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <i className="mdi-action-lock-outline prefix" />
                    <input id="password3" type="password" />
                    <label htmlFor="password">Password</label>
                  </div>
                </div>

                <div className="row">
                  <div className="input-field col s12">
                    {this.servicesLogged()}
                  </div>
                </div>

                <div className="row">
                  <div className="input-field col s12">
                    <button className="btn cyan waves-effect waves-light right" type="submit" name="action">Submit
                        <i className="mdi-content-send right" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AccountConfiguration; 