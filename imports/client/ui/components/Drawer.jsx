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


    loginWithInstagram(){
     Meteor.loginWithInstagram(function (err) {
      
          if (err) {
            console.log('login failed', err);
          } else {
            console.log('login success', Meteor.user());
          }
      });
    }

    render() {
        
        //Principal method of return by the drawer

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
                <li><a href="#!"><i className="fa fa-cog fa2x" aria-hidden="true"></i> Painel de controle</a></li>
                <li><div className="divider"></div></li>
                <li><p className="center-align">
						<button className="btn-flat btTwitter waves-effect waver-light" type="submit" name="action"
							onClick={this.loginWithTwitter.bind(this)}>Connect With Twitter
            <i className="fa fa-twitter-square left" aria-hidden="true"></i>
						</button></p></li>
                <li><a href="#!" className="logout-drawer"><LogoutButton /></a></li>
            </ul>
        );
    }
}

export default Drawer;
