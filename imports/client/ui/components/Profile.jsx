import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Helpers } from '../helpers/Helpers.jsx';
import FeedContainer from '../containers/FeedContainer.jsx';

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
                        <div className="col s12">
                          <ul className="tabs tab-profile z-depth-1 light-blue">
                            <li className="tab col m3 s2"><a className="white-text waves-effect waves-light active" href="#UpdateStatus"><i className="mdi-editor-border-color" /> Update Status</a>
                            </li>
                            <li className="tab col m3 s2"><a className="white-text waves-effect waves-light" href="#AddPhotos"><i className="mdi-image-camera-alt" /> Add Photos</a>
                            </li>
                            <li className="tab col m3 s2"><a className="white-text waves-effect waves-light" href="#CreateAlbum"><i className="mdi-image-photo-album" /> Create Album</a>
                            </li>
                          </ul>
                          {/* UpdateStatus*/}
                          <div id="UpdateStatus" className="tab-content col s12  grey lighten-4">
                            <div className="row">
                              <div className="col s2">
                                <img src={Helpers.get(this.props, 'currentUser.profile.image')} alt className="circle responsive-img valign profile-image-post" />
                              </div>
                              <div className="input-field col s10">
                                <textarea id="textarea" className="materialize-textarea" />
                                <label htmlFor="textarea" className>What's on your mind?</label>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col s12 m6 share-icons">
                                <a href="#"><i className="mdi-image-camera-alt" /></a>
                                <a href="#"><i className="mdi-action-account-circle" /></a>
                                <a href="#"><i className="mdi-hardware-keyboard-alt" /></a>
                                <a href="#"><i className="mdi-communication-location-on" /></a>
                              </div>





                              <div className="row">
                                <div className="col s12 m12">
                                  {/* Dropdown Trigger */}

                                  <div className="col s4">
                                    <a className="dropdown-button btn" href="#" data-activates="postStatus"><i className="mdi-action-language left" /> Public</a>
                                    {/* Dropdown Structure */}
                                    <ul id="postStatus" className="dropdown-content">
                                      <li><a href="#!"><i className="mdi-action-language" /> Public</a></li>
                                      <li><a href="#!"><i className="mdi-action-face-unlock" /> Friends</a></li>
                                      <li><a href="#!"><i className="mdi-action-lock-outline" /> Only Me</a></li>
                                    </ul>
                                  </div>
                                  <div className="col s4">
                                    <span className="dropdown-button btn" href="#" data-activates="socialDropDownStatus"><i className="mdi-action-language" /> Social</span>
                                    {/* Dropdown Structure */}
                                  </div>
                                  <div className="col s4">
                                    <ul id="socialDropDownStatus" className="dropdown-content col s12 m6">
                                      <li><a href="#!"><i className="fa fa-facebook" aria-hidden="true"> </i> Facebook</a></li>
                                      <li><a href="#!"><i className="fa fa-twitter" aria-hidden="true" > </i> Twitter</a></li>
                                      <li><a href="#!"><i className="fa fa-instagram" aria-hidden="true"> </i> Instagram</a></li>
                                    </ul>
                                    <a className="waves-effect waves-light btn "><i className="mdi-maps-rate-review left" />Post</a>
                                  </div>
                                </div>

                              </div>



                            </div>
                            {/* Dropdown Trigger */}

                          </div>


                          {/* AddPhotos */}
                          <div id="AddPhotos" className="tab-content col s12  grey lighten-4">
                            <div className="row">
                              <div className="col s2">
                                <img src={Helpers.get(this.props, 'currentUser.profile.image')} alt className="circle responsive-img valign profile-image-post" />
                              </div>
                              <div className="input-field col s10">
                                <textarea id="textarea" className="materialize-textarea" defaultValue={""} />
                                <label htmlFor="textarea" className>Share your favorites photos!</label>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col s12 m6 share-icons">
                                <a href="#"><i className="mdi-image-camera-alt" /></a>
                                <a href="#"><i className="mdi-action-account-circle" /></a>
                                <a href="#"><i className="mdi-hardware-keyboard-alt" /></a>
                                <a href="#"><i className="mdi-communication-location-on" /></a>
                              </div>





                              <div className="col s12 m6 right-align">
                                {/* Dropdown Trigger */}
                                <a className="dropdown-button btn" href="#" data-activates="postPhotos"><i className="mdi-action-language" /> Public</a>
                                {/* Dropdown Structure */}
                                <ul id="postPhotos" className="dropdown-content">
                                  <li><a href="#!"><i className="mdi-action-language" /> Public</a></li>
                                  <li><a href="#!"><i className="mdi-action-face-unlock" /> Friends</a></li>
                                  <li><a href="#!"><i className="mdi-action-lock-outline" /> Only Me</a></li>
                                </ul>

                                {/* Dropdown Trigger */}
                                <a className="dropdown-button btn" href="#" data-activates="socialDropDownPhotos"><i className="mdi-action-language" /> Social</a>
                                {/* Dropdown Structure */}
                                <ul id="socialDropDownPhotos" className="dropdown-content">
                                  <li><a href="#!"><i className="fa fa-facebook" aria-hidden="true"> </i> Facebook</a></li>
                                  <li><a href="#!"><i className="fa fa-twitter" aria-hidden="true" > </i> Twitter</a></li>
                                  <li><a href="#!"><i className="fa fa-instagram" aria-hidden="true"> </i> Instagram</a></li>
                                </ul>
                                <a className="waves-effect waves-light btn"><i className="mdi-maps-rate-review left" />Post</a>
                              </div>
                            </div>
                          </div>



                          {/* CreateAlbum */}
                          <div id="CreateAlbum" className="tab-content col s12  grey lighten-4">
                            <div className="row">
                              <div className="col s2">
                                <img src={Helpers.get(this.props, 'currentUser.profile.image')} alt className="circle responsive-img valign profile-image-post" />
                              </div>
                              <div className="input-field col s10">
                                <textarea id="textarea" className="materialize-textarea" defaultValue={""} />
                                <label htmlFor="textarea" className>Create awesome album.</label>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col s12 m6 share-icons">
                                <a href="#"><i className="mdi-image-camera-alt" /></a>
                                <a href="#"><i className="mdi-action-account-circle" /></a>
                                <a href="#"><i className="mdi-hardware-keyboard-alt" /></a>
                                <a href="#"><i className="mdi-communication-location-on" /></a>
                              </div>





                              <div className="col s12 m6 right-align">
                                {/* Dropdown Trigger */}
                                <a className="dropdown-button btn" href="#" data-activates="profliePost3"><i className="mdi-action-language" /> Public</a>
                                {/* Dropdown Structure */}
                                <ul id="profliePost3" className="dropdown-content">
                                  <li><a href="#!"><i className="mdi-action-language" /> Public</a></li>
                                  <li><a href="#!"><i className="mdi-action-face-unlock" /> Friends</a></li>
                                  <li><a href="#!"><i className="mdi-action-lock-outline" /> Only Me</a></li>
                                </ul>
                                <a className="waves-effect waves-light btn"><i className="mdi-maps-rate-review left" />Post</a>
                              </div>
                            </div>
                          </div>
                        </div>
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