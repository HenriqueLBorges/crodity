import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Helpers } from '../helpers/Helpers.jsx';
import ReactDOM from 'react-dom';

class NewPost extends Component {

  constructor(props) {
    super(props);
    this.state = {
      facebookCheckBox: false,
      twitterCheckBox: false,
      instagramCheckBox: false,
    };
  }


  toPost(event) {
    event.preventDefault();

    this.state.facebookCheckBox ? Meteor.call('postFacebook', this.refs.postText.value, function (e, r) {
      console.log(r);
      if (e){
      console.log(e);
      }
    }) : false;

    this.state.twitterCheckBox ? Meteor.call('postTwitter', this.refs.postText.value, function (e, r) {
      console.log(r);
      console.log(e);
    }) : false;

    this.state.instagramCheckBox ? 'posted on Instagram' : false;

    ReactDOM.findDOMNode(this.refs.postText).value = '';
  }

  handleCheckBoxFacebook(event) {
    console.log(event);
    this.state.facebookCheckBox = this.state.facebookCheckBox ? false : true;
    this.forceUpdate();
  }

  handleCheckBoxTwitter(event){
    this.state.twitterCheckBox = this.state.twitterCheckBox ? false: true;
    this.forceUpdate();
  }

  handleCheckBoxInstagram(event){
    this.state.instagramCheckBox = this.state.instagramCheckBox ? false: true;
    this.forceUpdate();
  }

  render() {
    //console.log(Helpers.get(this.props, 'currentUser'));
    return (
      <div id="UpdateStatus" className="new-post tab-content col s12 card">

        <div className="row row-new-post">
          <div className="col s1 col-avatar-new-post">
            <img src={Helpers.get(this.props, 'currentUser.profile.image')} alt="" className="circle responsive-img valign profile-image-post" />
          </div>
          <div className="input-field col s10">
            <textarea id="textarea" ref='postText' className="materialize-textarea"></textarea>
            <label htmlFor="textarea" className="">What's on your mind?</label>
          </div>
        </div>

        <div className="row row-new-post">
          <div className="col s12 m3 share-icons">
            <a href="#"><i className="fa fa-camera-retro icon-share black-text white" aria-hidden="true"></i></a>
            <a href="#"><i className="fa fa-file-video-o icon-share black-text white" aria-hidden="true"></i></a>
          </div>
          <div className="col s12 m6 right-align">
            <a className="btn bt-select-social-newtwork activator" href="#" data-activates="profliePost"><i className="mdi-action-language"></i> Select Social Networks</a><ul id="profliePost" className="dropdown-content" >
            </ul>
          </div>
          <div className="col s12 m3 right-align bt-send-new-post">
            <button onClick={this.toPost.bind(this)} href="#" className="btn waves-effect waves-light bt-select-social-newtwork" type="submit">Publish
                  <i className="material-icons right">send</i>
            </button>
          </div>
        </div>
        <div className="card-reveal new-post-reveal">
          <span className="card-title grey-text text-darken-4 new-post-select-social-networks">Select the social networks to publish:<i className="material-icons right">close</i></span>
          <form action="#">
            <p>
              <input type="checkbox" id="1" ref='cbFb' checked={this.state.facebookCheckBox} onChange={this.handleCheckBoxFacebook.bind(this)} />
              <label htmlFor="1">Facebook</label>
            </p>
            <p>
              <input type="checkbox" id="2" ref='cbTw' checked={this.state.twitterCheckBox} onChange={this.handleCheckBoxTwitter.bind(this)}/>
              <label htmlFor="2">Twitter</label>
            </p>
            <p>
              <input type="checkbox" id="3" ref='cbIs' checked={this.state.instagramCheckBox} onChange={this.handleCheckBoxInstagram.bind(this)}/>
              <label htmlFor="3">Instagram</label>
            </p>
          </form>
        </div>
      </div>
    );
  }

}
export default NewPost;