import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import { Helpers } from '../helpers/Helpers.jsx';

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
                <li>
                  <div className="userView">
                    <div className="background">
                        <img src="https://1.bp.blogspot.com/_-YK2jIJdaEI/SE8a7VGXpqI/AAAAAAAAA1o/72SjMwBtL98/s400/estromatolitos%5B2%5D.jpg" />
                    </div>
                    <a href="#!user"><img className="circle" src={userAvatar} /></a>
                    <a href="#!name"><span className="white-text name">{Helpers.get(this.props, 'currentUser.services.facebook.name')}</span></a>
                    <a href="#!email"><span className="white-text email">{Helpers.get(this.props, 'currentUser.services.facebook.email')}</span></a>
                  </div>
                </li>
            </ul>
        );
    }
}

export default Drawer;
