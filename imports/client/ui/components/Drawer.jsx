import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Helpers } from '../helpers/Helpers.jsx';
import LogoutButton from './LogoutButton.jsx';

class Drawer extends Component {


    componentDidMount() {
        $(".button-collapse").sideNav();

    }

    loginWithTwitter() {
        Meteor.loginWithTwitter({ loginStyle: 'redirect' }, function (e) {
        });
    }


    loginWithInstagram() {
        Meteor.loginWithInstagram(function (e) {

            if (e) {
                console.log('login failed', e);
            } else {
                console.log('login success', Meteor.user());
            }
        });
    }

    render() {
        console.log(this.props.currentUser);
        return (

            <ul id="slide-out" className="side-nav fixed">
                <li><div className="userView">
                    <div className="background">
                        <img className="responsive-img" src={Helpers.get(this.props, 'currentUser.profile.cover')} />
                    </div>
                    <a href="#!user"><img className="circle" src={Helpers.get(this.props, 'currentUser.profile.image')} /></a>
                    <a href="#!name"><span className="white-text name">{Helpers.get(this.props, 'currentUser.profile.name')}</span></a>
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
    }
}

export default Drawer;
