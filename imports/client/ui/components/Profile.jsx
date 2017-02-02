import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Helpers } from '../helpers/Helpers.jsx';

class Profile extends Component {

    componentDidMount() {
        $('ul.tabs').tabs({
            swipeable: true,

        });

    }

    render() {


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
                      <img className="activator" src="img/testeImg.jpg" alt="user background" />                    
                    </div>
                    <figure className="card-profile-image">
                      <img src=" img/CrodityCircle100x100.png" alt="profile image" className="circle z-depth-2 responsive-img activator" />
                    </figure>
                    <div className="card-content">
                      <div className="row">                    
                        <div className="col s3 offset-s2">                        
                          <h4 className="card-title grey-text text-darken-4">Crodity Software S.A</h4>
                          <p className="medium-small grey-text"> Software development</p>                        
                        </div>
                        <div className="col s2 center-align">
                          <h4 className="card-title grey-text text-darken-4">10k</h4>
                          <p className="medium-small grey-text">Followers</p>                        
                        </div>
                        <div className="col s2 center-align">
                          <h4 className="card-title grey-text text-darken-4">6</h4>
                          <p className="medium-small grey-text">Completed Projects</p>                        
                        </div>                    
                        <div className="col s2 center-align">
                          <h4 className="card-title grey-text text-darken-4">$ 1,253,000</h4>
                          <p className="medium-small grey-text">Busness Profit</p>                        
                        </div>                    
                        <div className="col s1 right-align">
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
                          <p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p>
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
                            <div className="col s7 grey-text text-darken-4 right-align">18th June, 1991</div>
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
                      {/* Profile About  */}
                      {/* Profile feed  */}
                      <ul id="profile-page-about-feed" className="collection z-depth-1">
                        <li className="collection-item avatar">
                          <img src=" img/CrodityCircle100x100.png" alt className="circle" />
                          <span className="title">Project Title</span>
                          <p>Task assigned to new changes.
                            <br /> <span className="ultra-small">Second Line</span>
                          </p>
                          <a href="#!" className="secondary-content"><i className="mdi-action-grade" /></a>
                        </li>
                        <li className="collection-item avatar">
                          <i className="mdi-file-folder circle" />
                          <span className="title">New Project</span>
                          <p>First Line of Project Work 
                            <br /> <span className="ultra-small">Second Line</span>
                          </p>
                          <a href="#!" className="secondary-content"><i className="mdi-social-domain" /></a>
                        </li>
                        <li className="collection-item avatar">
                          <i className="mdi-action-assessment circle green" />
                          <span className="title">New Payment</span>
                          <p>Last UK Project Payment
                            <br /> <span className="ultra-small">$ 3,684.00</span>
                          </p>
                          <a href="#!" className="secondary-content"><i className="mdi-editor-attach-money" /></a>
                        </li>
                        <li className="collection-item avatar">
                          <i className="mdi-av-play-arrow circle red" />
                          <span className="title">Latest News</span>
                          <p>company management news
                            <br /> <span className="ultra-small">Second Line</span>
                          </p>
                          <a href="#!" className="secondary-content"><i className="mdi-action-track-changes" /></a>
                        </li>
                      </ul>
                      {/* Profile feed  */}
                      {/* task-card */}
                     
                      {/* Map Card */}
                      <div className="map-card">
                        <div className="card">
                          <div className="card-image waves-effect waves-block waves-light">
                            <div id="map-canvas" data-lat="40.747688" data-lng="-74.004142" />
                          </div>
                          <div className="card-content">                    
                            <a className="btn-floating activator btn-move-up waves-effect waves-light darken-2 right">
                              <i className="mdi-maps-pin-drop" />
                            </a>
                            <h4 className="card-title grey-text text-darken-4"><a href="#" className="grey-text text-darken-4">Company Name LLC</a>
                            </h4>
                            <p className="blog-post-content">Some more information about this company.</p>
                          </div>
                          <div className="card-reveal">
                            <span className="card-title grey-text text-darken-4">Company Name LLC <i className="mdi-navigation-close right" /></span>                   
                            <p>Here is some more information about this company. As a creative studio we believe no client is too big nor too small to work with us to obtain good advantage.By combining the creativity of artists with the precision of engineers we develop custom solutions that achieve results.Some more information about this company.</p>
                            <p><i className="mdi-action-perm-identity cyan-text text-darken-2" /> Manager Name</p>
                            <p><i className="mdi-communication-business cyan-text text-darken-2" /> 125, ABC Street, New Yourk, USA</p>
                            <p><i className="mdi-action-perm-phone-msg cyan-text text-darken-2" /> +1 (612) 222 8989</p>
                            <p><i className="mdi-communication-email cyan-text text-darken-2" /> support@geekslabs.com</p>                    
                          </div>
                        </div>
                      </div>
                      {/* Map Card */}
                    </div>
                    {/* profile-page-sidebar*/}
                    {/* profile-page-wall */}
                    <div id="profile-page-wall" className="col s12 m8">
                      {/* profile-page-wall-share */}
                      <div id="profile-page-wall-share" className="row">
                        <div className="col s12">
                          <ul className="tabs tab-profile z-depth-1 light-blue">
                            <li className="tab col s3"><a className="white-text waves-effect waves-light active" href="#UpdateStatus"><i className="mdi-editor-border-color" /> Update Status</a>
                            </li>
                            <li className="tab col s3"><a className="white-text waves-effect waves-light" href="#AddPhotos"><i className="mdi-image-camera-alt" /> Add Photos</a>
                            </li>
                            <li className="tab col s3"><a className="white-text waves-effect waves-light" href="#CreateAlbum"><i className="mdi-image-photo-album" /> Create Album</a>
                            </li>                      
                          </ul>
                          {/* UpdateStatus*/}
                          <div id="UpdateStatus" className="tab-content col s12  grey lighten-4">
                            <div className="row">
                              <div className="col s2">
                                <img src=" img/CrodityCircle100x100.png" alt className="circle responsive-img valign profile-image-post" />
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
                              <div className="col s12 m6 right-align">
                                {/* Dropdown Trigger */}
                                <a className="dropdown-button btn" href="#" data-activates="profliePost"><i className="mdi-action-language" /> Public</a>
                                {/* Dropdown Structure */}
                                <ul id="profliePost" className="dropdown-content">
                                  <li><a href="#!"><i className="mdi-action-language" /> Public</a></li>
                                  <li><a href="#!"><i className="mdi-action-face-unlock" /> Friends</a></li>                              
                                  <li><a href="#!"><i className="mdi-action-lock-outline" /> Only Me</a></li>
                                </ul>
                                <a className="waves-effect waves-light btn"><i className="mdi-maps-rate-review left" />Post</a>
                              </div>
                            </div>
                          </div>
                          {/* AddPhotos */}
                          <div id="AddPhotos" className="tab-content col s12  grey lighten-4">
                            <div className="row">
                              <div className="col s2">
                                <img src=" img/CrodityCircle100x100.png" alt className="circle responsive-img valign profile-image-post" />
                              </div>
                              <div className="input-field col s10">
                                <textarea id="textarea"  className="materialize-textarea" defaultValue={""} />
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
                                <a className="dropdown-button btn" href="#" data-activates="profliePost2"><i className="mdi-action-language" /> Public</a>
                                {/* Dropdown Structure */}
                                <ul id="profliePost2" className="dropdown-content">
                                  <li><a href="#!"><i className="mdi-action-language" /> Public</a></li>
                                  <li><a href="#!"><i className="mdi-action-face-unlock" /> Friends</a></li>                              
                                  <li><a href="#!"><i className="mdi-action-lock-outline" /> Only Me</a></li>
                                </ul>
                                <a className="waves-effect waves-light btn"><i className="mdi-maps-rate-review left" />Post</a>
                              </div>
                            </div>
                          </div>
                          {/* CreateAlbum */}
                          <div id="CreateAlbum" className="tab-content col s12  grey lighten-4">
                            <div className="row">
                              <div className="col s2">
                                <img src=" img/CrodityCircle100x100.png" alt className="circle responsive-img valign profile-image-post" />
                              </div>
                              <div className="input-field col s10">
                                <textarea id="textarea"  className="materialize-textarea" defaultValue={""} />
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
                     
                    </div>
                    {/*/ profile-page-wall */}
                  </div>
                </div>
              </div>
            </section></div>
          {/*end container*/}
          {/* END CONTENT */}
          {/* //////////////////////////////////////////////////////////////////////////// */}
          {/* START RIGHT SIDEBAR NAV*/}
          <aside id="right-sidebar-nav">
            <ul id="chat-out" className="side-nav rightside-navigation">
              <li className="li-hover">
                <a href="#" data-activates="chat-out" className="chat-close-collapse right"><i className="mdi-navigation-close" /></a>
                <div id="right-search" className="row">
                  <form className="col s12">
                    <div className="input-field">
                      <i className="mdi-action-search prefix" />
                      <input id="icon_prefix" type="text" className="validate" />
                      <label htmlFor="icon_prefix">Search</label>
                    </div>
                  </form>
                </div>
              </li>
              <li className="li-hover">
                <ul className="chat-collapsible" data-collapsible="expandable">
                  <li>
                    <div className="collapsible-header teal white-text active"><i className="mdi-social-whatshot" />Recent Activity</div>
                    <div className="collapsible-body recent-activity">
                      <div className="recent-activity-list chat-out-list row">
                        <div className="col s3 recent-activity-list-icon"><i className="mdi-action-add-shopping-cart" />
                        </div>
                        <div className="col s9 recent-activity-list-text">
                          <a href="#">just now</a>
                          <p>Jim Doe Purchased new equipments for zonal office.</p>
                        </div>
                      </div>
                      <div className="recent-activity-list chat-out-list row">
                        <div className="col s3 recent-activity-list-icon"><i className="mdi-device-airplanemode-on" />
                        </div>
                      </div>
                      <div className="recent-activity-list chat-out-list row">
                        <div className="col s3 recent-activity-list-icon"><i className="mdi-action-settings-voice" />
                        </div>
                        <div className="col s9 recent-activity-list-text">
                          <a href="#">5 Days Ago</a>
                          <p>Natalya Parker Send you a voice mail for next conference.</p>
                        </div>
                      </div>
                      <div className="recent-activity-list chat-out-list row">
                        <div className="col s3 recent-activity-list-icon"><i className="mdi-action-store" />
                        </div>
                        <div className="col s9 recent-activity-list-text">
                          <a href="#">Last Week</a>
                          <p>Jessy Jay open a new store at S.G Road.</p>
                        </div>
                      </div>
                      <div className="recent-activity-list chat-out-list row">
                        <div className="col s3 recent-activity-list-icon"><i className="mdi-action-settings-voice" />
                        </div>
                        <div className="col s9 recent-activity-list-text">
                          <a href="#">5 Days Ago</a>
                          <p>Natalya Parker Send you a voice mail for next conference.</p>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="collapsible-header light-blue white-text active"><i className="mdi-editor-attach-money" />Sales Repoart</div>
                    <div className="collapsible-body sales-repoart">
                      <div className="sales-repoart-list  chat-out-list row">
                        <div className="col s8">Target Salse</div>
                        <div className="col s4"><span id="sales-line-1" />
                        </div>
                      </div>
                      <div className="sales-repoart-list chat-out-list row">
                        <div className="col s8">Payment Due</div>
                        <div className="col s4"><span id="sales-bar-1" />
                        </div>
                      </div>
                      <div className="sales-repoart-list chat-out-list row">
                        <div className="col s8">Total Delivery</div>
                        <div className="col s4"><span id="sales-line-2" />
                        </div>
                      </div>
                      <div className="sales-repoart-list chat-out-list row">
                        <div className="col s8">Total Progress</div>
                        <div className="col s4"><span id="sales-bar-2" />
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="collapsible-header red white-text"><i className="mdi-action-stars" />Favorite Associates</div>
                    <div className="collapsible-body favorite-associates">
                      <div className="favorite-associate-list chat-out-list row">
                        <div className="col s4"><img src=" img/CrodityCircle100x100.png" alt className="circle responsive-img online-user valign profile-image" />
                        </div>
                        <div className="col s8">
                          <p>Eileen Sideways</p>
                          <p className="place">Los Angeles, CA</p>
                        </div>
                      </div>
                      <div className="favorite-associate-list chat-out-list row">
                        <div className="col s4"><img src=" img/CrodityCircle100x100.png" alt className="circle responsive-img online-user valign profile-image" />
                        </div>
                        <div className="col s8">
                          <p>Zaham Sindil</p>
                          <p className="place">San Francisco, CA</p>
                        </div>
                      </div>
                      <div className="favorite-associate-list chat-out-list row">
                        <div className="col s4"><img src=" img/CrodityCircle100x100.png" alt className="circle responsive-img offline-user valign profile-image" />
                        </div>
                        <div className="col s8">
                          <p>Renov Leongal</p>
                          <p className="place">Cebu City, Philippines</p>
                        </div>
                      </div>
                      <div className="favorite-associate-list chat-out-list row">
                        <div className="col s4"><img src=" img/CrodityCircle100x100.png" alt className="circle responsive-img online-user valign profile-image" />
                        </div>
                        <div className="col s8">
                          <p>Weno Carasbong</p>
                          <p>Tokyo, Japan</p>
                        </div>
                      </div>
                      <div className="favorite-associate-list chat-out-list row">
                        <div className="col s4"><img src=" img/CrodityCircle100x100.png" alt className="circle responsive-img offline-user valign profile-image" />
                        </div>
                        <div className="col s8">
                          <p>Nusja Nawancali</p>
                          <p className="place">Bangkok, Thailand</p>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </aside>
        </div>
      </div>
        
        );
    }
}

export default Profile;