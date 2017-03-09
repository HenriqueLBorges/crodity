import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Helpers } from '../helpers/Helpers.jsx';
import { get, set, update } from 'lodash'


class AccountConfiguration extends Component {


  constructor(props) {
    super(props);

    let permissions = props.currentUser.permissions;
    // let checkedService = [];

    // Object.keys(permissions).map((service,i) => {
    //   checkedService.push({
    //     name: service,
    //     view: permissions[i].view
    //   })
    // });

    this.state = {
      checkedService: permissions
    };
  }

  handleSubmitEmail() {
    event.preventDefault();
    let self = this;
    Meteor.call('addRegisteredEmail', this.refs.email.value, function (e, r) {
      console.log(r);
      self.props.router.push('/');
    });
  }

  componenDidMount() {

    Object.keys(this.props.currentUser.permissions).map((service, i) => {

    });
    this.setState({})
  }


  getServices() {
    Meteor.call('getPermissionsServices', (e, response) => {
      if (!e) this.services = response;
      else console.log(e);
    });

    return this.services;
  }


  handleChange(service) {
    event.preventDefault();

    this.state.service = service;

    console.log(this.state.service)

    let data = this.state.checkedService;
    set(data, service + '.view', !this.state.checkedService[service].view); 

    this.setState({ checkedService: data }, () => {
      console.log(this.state)
      Meteor.call('setPermissionsServices', service, this.state.checkedService, function (e, response) {
        if (!e) console.log('ok');
        else console.log(e);
      });
    });
  }



  servicesController() {

    let services = [];
    let service;
    services = this.getServices();
    let render = [];
    let social_name;

    if (typeof services !== 'undefined') {

      // for (let i = 0; i < services.length; i++) {
      //   if (typeof services[i] !== 'undefined') {
      //     //service[i] = services = [i];
      //     social_name = services[i].socialName;
      //     console.log(social_name);
      //     console.log(services[i][social_name].view);
      //
      //   }


      //this.state.checkedService[service] = services[i][social_name].view;

      Object.keys(services).map((service, i) => {

        render[i] = (
          <div className="switch" key={i}>
            <ul>
              <li> <label>{Helpers.socialIcon(service, 2)}</label>
                <label>
                  Off
              <input type="checkbox" checked={this.state.checkedService[service].view} onChange={() => this.handleChange(service)} />
                  <span className="lever"></span>
                  On
              </label></li>
            </ul>
          </div>);

      });

    }
    return render;
  }

  render() {
    return (
      <div className="row">
        <div className="col s12 m12">
          <div className="card-panel">
            <h4 className="header2">Configuration</h4>
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
                  <div className="col s12">
                    {this.servicesController()}
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