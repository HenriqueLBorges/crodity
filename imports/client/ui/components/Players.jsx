import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Helpers } from '../helpers/Helpers.jsx';
import ReactDOM from 'react-dom';

class Players extends Component {

  searchVideoYoutube(event){
    event.preventDefault();
    console.log('Entered here');
    Meteor.call('searchYoutube', 'test', function (e, r) {
      if (e){
        console.log(e);
      }else{
        console.log(r);
      }

    });
  }

  render() {

    return (
      <div>
        <i className="fa fa-music fa-2x" aria-hidden="true"></i>
        Search musics/videos
        <div className="row">
          <div className="input-field col s10">
            <input placeholder="Placeholder" id="first_name" type="text" className="validate"/>
              <label htmlFor="first_name">First Name</label>
            </div>
          </div>
          <a className="waves-effect waves-light btn" onClick={this.searchVideoYoutube.bind(this)}>Pesquisar</a>
        </div>
      );

    }
  }
  export default Players;
