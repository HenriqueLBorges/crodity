import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Helpers } from '../helpers/Helpers.jsx';
import ReactDOM from 'react-dom';

class Players extends Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }

  searchVideoYoutube(event){
    event.preventDefault();
    // console.log('Entered here');
    console.log(this.refs.input_search.value);
     if(this.refs.input_search.value == 'a'){
       console.log("Ref has value");
      this.setState({ show: true });
    }else{
      this.setState({ show: false });
    }

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
            <input ref="input_search" onChange={this.searchVideoYoutube.bind(this)} placeholder="Placeholder" id="music_video" type="text" className="validate"/>
              <label htmlFor="music_video">Music/video</label>
            </div>
          </div>
          // <a className="waves-effect waves-light btn" onClick={this.searchVideoYoutube.bind(this)}>Pesquisar</a>
          {this.state.show ? <div>Resultado da pesquisa</div> : ""}
        </div>
      );
    }
  }
  export default Players;
