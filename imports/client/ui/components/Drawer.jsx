import React, { Component } from 'react';

import { Meteor } from 'meteor/meteor';

import { Helpers } from '../helpers/Helpers.jsx';

import LogoutButton from './LogoutButton.jsx';

class Drawer extends Component {

    componentDidMount() {

        $(".button-collapse").sideNav();

    }

    render() {

        //Here I get the image from the user logged to used after that

        let id = Helpers.get(this.props, 'currentUser.services.facebook.id');

        let userAvatar = 'http://graph.facebook.com/' + id + '/picture?type=square&height=80&width=80';

        let userBackground = 'http://graph.facebook.com/' + id + '/name?type=square&height=80&width=80';

        //Principal method of return by the drawer

        return (

            <ul id="slide-out" className="side-nav fixed">

                <li><div className="userView">

                    <div className="background">

                        <img src="http://img.wonderhowto.com/img/58/39/63564100393350/0/hack-like-pro-cryptography-basics-for-aspiring-hacker.1280x600.jpg" />

                    </div>

                    <a href="#!user"><img className="circle" src={userAvatar} /></a>

                    <a href="#!name"><span className="white-text name">{Helpers.get(this.props, 'currentUser.services.facebook.name')}</span></a>

                </div>

                </li>

                <li><a href="#!"><i className="fa fa-cog fa2x" aria-hidden="true"></i> Painel de controle</a></li>

                <li><div className="divider"></div></li>

                <li><a href="#!" className="logout-drawer"><LogoutButton /></a></li>

            </ul>

        );

    }

}

export default Drawer;