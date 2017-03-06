import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Helpers } from '../helpers/Helpers.jsx';
import FeedContainer from '../containers/FeedContainer.jsx';
import NewPost from './NewPost.jsx';
import AppBar from './AppBar.jsx';

class Profile extends Component {

  componentDidMount() {
    $('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrainWidth: true, // Does not change width of dropdown to that of the activator
      hover: true, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: true, // Displays dropdown below the button
      alignment: 'left', // Displays dropdown with edge aligned to the left of button
      stopPropagation: false // Stops event propagation
    }
    );

    $('ul.tabs').tabs({
      swipeable: true,

    });
  }




  render() {
    formattedDate = moment(Helpers.get(this.props, 'currentUser.profile.birthday')).calendar();

    return (

      <div>

        <div id="main">
          {/* START WRAPPER */}
          <div className="wrapper">

            {/* START CONTENT */}
            <AppBar />
            <section id="content">
              {/*start container*/}
              
              <div className="container">
                <div id="profile-page" className="section">
                  {/*  headerPage */}

                  <div id="headerPage" className="card headerPage">
                    <div className="card-image waves-effect waves-block waves-light">
                      <img className="activator " src={Helpers.get(this.props, 'currentUser.profile.cover')} alt="user background" />
                    </div>
                    <figure className="card-profile-image">
                      <img src={Helpers.get(this.props, 'currentUser.profile.image')} alt="profile image" className="responsive-img circle z-depth-2 imgProfile activator" />
                    </figure>
                    <div className="card-content">
                      <div className="row">
                        <div className="col  m3 s12 offset-m2 center-align">
                          <h4 className="card-title grey-text text-darken-4">{Helpers.get(this.props, 'currentUser.profile.name')}</h4>
                        </div>
                        <div className="col m3 s6 center-align">
                          <h4 className="card-title grey-text text-darken-4">10k</h4>
                          <p className="medium-small grey-text">Followers</p>
                        </div>
                        <div className="col m3 s6 center-align">
                          <a className=" btnFollowProfile waves-effect waves-light btn-flat">Follow</a>
                        </div>
                        <div className="col m3 s12 center-align">
                          <a className="btn-floating activator waves-effect waves-light darken-2 right">
                            <i className="mdi-action-perm-identity" />
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="card-reveal">
                      <p>
                        <span className="card-title grey-text text-darken-4">Roger Waters <i className="mdi-navigation-close right" /></span>
                        <span><i className="mdi-action-perm-identity cyan-text text-darken-2" /> Project Manager</span>
                      </p>
                      <p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p>
                      <p><i className="mdi-action-perm-phone-msg cyan-text text-darken-2" /> +1 (612) 222 8989</p>
                      <p><i className="mdi-communication-email cyan-text text-darken-2" /> mail@domain.com</p>
                      <p><i className="mdi-social-cake cyan-text text-darken-2" /> 18th June 1990</p>
                      <p><i className="mdi-device-airplanemode-on cyan-text text-darken-2" /> BAR - AUS</p>
                    </div>
                  </div>
                  {/*/  headerPage */}
                  {/* profile-page-content */}
                  <div id="profile-page-content" className="row">
                    {/* profile-page-sidebar*/}
                    <div id="profile-page-sidebar" className="col s12 m4">
                      {/* Profile About  */}
                      <div className="card light-blue">
                        <div className="card-content white-text">
                          <span className="card-title">About Me!</span>
                          <p>{Helpers.get(this.props, 'currentUser.services.instagram.bio')}</p>
                        </div>
                      </div>
                      {/* Profile About  */}
                      {/* Profile About Details  */}
                      <ul id="profile-page-about-details" className="collection z-depth-1">
                        <li className="collection-item">
                          <div className="row">
                            <div className="col s5 grey-text darken-1"><i className="mdi-action-wallet-travel" /> Project</div>
                            <div className="col s7 grey-text text-darken-4 right-align">ABC Name</div>
                          </div>
                        </li>
                        <li className="collection-item">
                          <div className="row">
                            <div className="col s5 grey-text darken-1"><i className="mdi-social-poll" /> Skills</div>
                            <div className="col s7 grey-text text-darken-4 right-align">HTML, CSS</div>
                          </div>
                        </li>
                        <li className="collection-item">
                          <div className="row">
                            <div className="col s5 grey-text darken-1"><i className="mdi-social-domain" /> Lives in</div>
                            <div className="col s7 grey-text text-darken-4 right-align">NY, USA</div>
                          </div>
                        </li>
                        <li className="collection-item">
                          <div className="row">
                            <div className="col s5 grey-text darken-1"><i className="mdi-social-cake" /> Birth date</div>
                            <div className="col s7 grey-text text-darken-4 right-align">{formattedDate}</div>
                          </div>
                        </li>
                      </ul>
                      {/*/ Profile About Details  */}
                      {/* Profile About  */}
                      <div className="card amber darken-2">
                        <div className="card-content white-text center-align">
                          <p className="card-title"><i className="mdi-social-group-add" /> 3685</p>
                          <p>Followers</p>
                        </div>
                      </div>
                    </div>
                    {/* profile-page-sidebar*/}
                    {/* profile-page-wall */}
                    <div id="profile-page-wall" className="col s12 m8">
                      {/* profile-page-wall-share */}
                      <div id="profile-page-wall-share" className="row">
                        <NewPost currentUser={this.props.currentUser} />
                      </div>
                      {/*/ profile-page-wall-share */}
                      {/* profile-page-wall-posts */}
                      <div><FeedContainer feedType='profile' /></div>
                    </div>
                    {/*/ profile-page-wall */}
                  </div>
                </div>
              </div>
            </section></div>
          {/*end container*/}
        </div>
      </div>

    );
  }
}

export default Profile;