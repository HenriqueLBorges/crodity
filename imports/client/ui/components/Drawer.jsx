import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router';
import { Helpers } from '../helpers/Helpers.jsx';
import LogoutButton from './LogoutButton.jsx';

class Drawer extends Component {

  constructor(props) {
    super(props);

    // Set the social network feeds as new state arrays
    this.state = {
      size: $(window).width() // returns height of browser viewport
    };
  }

  componentDidMount() {
    $(".button-collapse").sideNav();
  }

  loginWithTwitter() {
    Meteor.call('viewServicesController', 'twitter'); 
    Meteor.loginWithTwitter({ loginStyle: 'redirect' }, function (e) {
       
    });
  }


  loginWithInstagram() {
    Meteor.call('viewServicesController', 'instagram'); 
    Meteor.loginWithInstagram(function (e) {

      if (e) {
        console.log('login failed', e);
      } else {
        console.log('login success', Meteor.user());
      }
    });
  }
  render() {
    if (this.state.size >= 600) {
      return (
        <ul id="slide-out" className="side-nav fixed">
          <li><div className="userView">
            <div className="background">
              <img className="responsive-img" src={Helpers.get(this.props, 'currentUser.profile.cover')} />
            </div>
            <Link to='/profile'>
              <div href="#"><img className="circle" src={Helpers.get(this.props, 'currentUser.profile.image')} /></div>
              <div href="#"><span className="white-text name">{Helpers.get(this.props, 'currentUser.profile.name')}</span></div>
            </Link>
          </div>
          </li>
          <li>
            <a href="#!"><i className="icon-drawer mdi-action-dashboard fa-2x" aria-hidden="true" ></i> Dashboard</a>
          </li>
          <li>
            <div className="divider"></div>
          </li>
          <li>
            <a href="#!" onClick={this.loginWithTwitter.bind(this)}>
              <i className="icon-drawer blue-text fa fa-twitter-square fa-2x" aria-hidden="true"></i> Connect with Twitter
                    </a>
          </li>
          <li>
            <a href="#!" onClick={this.loginWithInstagram.bind(this)}>
              <i className="icon-drawer fa fa-instagram fa-2x" aria-hidden="true"></i> Instagram
                    </a></li>
          <li>
            <div className="divider"></div>
          </li>
          <li><a href="#!" className="logout-drawer"><LogoutButton /></a></li>
        </ul>
      );
    } else {
      return (
        <div className="drawer-mobile">
          <ul id="slide-out" className="side-nav">
            <li><div className="userView user-view">
              <div className="background">
                <img className="responsive-img" src={Helpers.get(this.props, 'currentUser.profile.cover')} />
              </div>
              <Link to='/profile'>
              <a href="#"><img className="circle" src={Helpers.get(this.props, 'currentUser.profile.image')} /></a>
              <a href="#"><span className="white-text name">{Helpers.get(this.props, 'currentUser.profile.name')}</span></a>
            </Link>
            </div>
            </li>
            <li>
              <a href="#!"><i className="icon-drawer mdi-action-dashboard fa-2x" aria-hidden="true" ></i> Dashboard</a>
            </li>
            <li>
              <div className="divider"></div>
            </li>
            <li>
              <a href="#!" onClick={this.loginWithTwitter.bind(this)}>
                <i className="icon-drawer blue-text fa fa-twitter-square fa-2x" aria-hidden="true"></i> Connect with Twitter
                    </a>
            </li>
            <li>
              <a href="#!" onClick={this.loginWithInstagram.bind(this)}>
                <i className="icon-drawer fa fa-instagram fa-2x" aria-hidden="true"></i> Instagram
                    </a></li>
            <li>
              <div className="divider"></div>
            </li>
            <li><a href="#!" className="logout-drawer"><LogoutButton /></a></li>
          </ul>
          <a href="#" data-activates="slide-out" className="button-collapse bt-activate-drawer"><i className="material-icons drawer-menu-icon">menu</i></a>
        </div>
      );
    }
  }
}

export default Drawer;
