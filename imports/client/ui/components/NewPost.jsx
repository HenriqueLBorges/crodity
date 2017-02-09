import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Helpers } from '../helpers/Helpers.jsx';

class NewPost extends Component {

  toPost(event) {
    event.preventDefault();
    Meteor.call('post', this.refs.postText.value, function (e, r) {
      console.log(r);
      console.log(e);
    });
  }

  render() {
    console.log(Helpers.get(this.props, 'currentUser'));
    return (
      <div id="UpdateStatus" className="NewPost tab-content col s12 card">

        <div className="row">
          <div className="col s1 col-avatar-NewPost">
            <img src={Helpers.get(this.props, 'currentUser.profile.image')} alt="" className="circle responsive-img valign profile-image-post" />
          </div>
          <div className="input-field col s10">
            <textarea id="textarea" ref='postText' className="materialize-textarea"></textarea>
            <label htmlFor="textarea" className="">What's on your mind?</label>
          </div>
        </div>

        <div className="row">
          <div className="col s12 m6 share-icons">
            <a href="#"><i className="fa fa-camera-retro icon-share black-text white" aria-hidden="true"></i></a>
            <a href="#"><i className="fa fa-file-video-o icon-share black-text white" aria-hidden="true"></i></a>
            <a href="#"><i className="fa fa-map-marker icon-share black-text white" aria-hidden="true"></i></a>
          </div>
          <div className="col s12 m6 right-align">
            <a className="btn bt-select-social-newtwork activator" href="#" data-activates="profliePost"><i className="mdi-action-language"></i> Select Social Network</a><ul id="profliePost" className="dropdown-content" >
            </ul>
          </div>
        </div>
        <div className="card-reveal">
          <span className="card-title grey-text text-darken-4">Select the social networks to publish:<i className="material-icons right">close</i></span>
          <form action="#">
            <p>
              <input type="checkbox" id="test5" />
              <label htmlFor="test5">Facebook</label>
            </p>
            <p>
              <input type="checkbox" id="test5" />
              <label htmlFor="test5">Twitter</label>
            </p>
            <p>
              <input type="checkbox" id="test5" />
              <label htmlFor="test5">Instagram</label>
            </p>
          </form>
        </div>
      </div>
    );
  }

}
export default NewPost;