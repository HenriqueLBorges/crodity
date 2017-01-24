import React, { Component } from 'react';

import { Meteor } from 'meteor/meteor';

import { Helpers } from '../helpers/Helpers.jsx';
import LogoutButton from './LogoutButton.jsx';

class Drawer extends Component {

    componentDidMount() {
        $(".button-collapse").sideNav();
    }

    render() {
        // console.log(Helpers.get(this.props,'currentUser.profile'));
        // console.log('teste');
        //Principal method of return by the drawer

        return (

            <ul id="slide-out" className="side-nav fixed">
                <li><div className="userView">
                    <div className="background">
                        <img src="http://img.wonderhowto.com/img/58/39/63564100393350/0/hack-like-pro-cryptography-basics-for-aspiring-hacker.1280x600.jpg" />
                    </div>
                    <a href="#!user"><img className="circle" src={Helpers.get(this.props, 'currentUser.profile.image')} /></a>
                    <a href="#!name"><span className="white-text name">{Helpers.get(this.props, 'currentUser.profile.name')}</span></a>
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
