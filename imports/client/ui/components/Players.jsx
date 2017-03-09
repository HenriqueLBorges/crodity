import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Helpers } from '../helpers/Helpers.jsx';
import ReactDOM from 'react-dom';

class Players extends Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false,
      div_result_videos: false
    };
  }

  //This method search videos on Youtube and displays it
  searchVideoYoutube(event){
    let self = this;

    event.preventDefault();
    // console.log('Entered here');
    console.log(this.refs.input_search.value);

    if(this.refs.input_search.value !== ''){

      Meteor.call('searchYoutube', this.refs.input_search.value, function (error, result) {
        console.log("Ref has value");
        self.setState({ show: true });

        if (error){
          console.log(error);
        }else{
          console.log(result[0].snippet);
          self.setState({
            div_result_videos: <div className='result-videos'>

            <div className="row">
              <div className="col s7"><div className="video-container">
                <iframe width="50" height="25" src={"//www.youtube.com/embed/"+result[0].id.videoId} frameBorder="0" allowFullScreen></iframe>
              </div>
            </div>
            <div className="col s5">{result[0].snippet.title}</div>
          </div>

          <div className="row">
            <div className="col s7"><div className="video-container">
              <iframe width="50" height="25" src={"//www.youtube.com/embed/"+result[1].id.videoId} frameBorder="0" allowFullScreen></iframe>
            </div>
          </div>
          <div className="col s5">{result[1].snippet.title}</div>
        </div>

        <div className="row">
          <div className="col s7"><div className="video-container">
            <iframe width="50" height="25" src={"//www.youtube.com/embed/"+result[2].id.videoId} frameBorder="0" allowFullScreen></iframe>
          </div>
        </div>
        <div className="col s5">{result[2].snippet.title}</div>
      </div>

      <div className="row">
        <div className="col s7"><div className="video-container">
          <iframe width="50" height="25" src={"//www.youtube.com/embed/"+result[3].id.videoId} frameBorder="0" allowFullScreen></iframe>
        </div>
      </div>
      <div className="col s5">{result[3].snippet.title}</div>
    </div>

    <div className="row">
      <div className="col s7"><div className="video-container">
        <iframe width="50" height="25" src={"//www.youtube.com/embed/"+result[4].id.videoId} frameBorder="0" allowFullScreen></iframe>
      </div>
    </div>
    <div className="col s5">{result[4].snippet.title}</div>
  </div>
</div>});
}
});
}else{
  this.setState({ show: false });
  this.setState({div_result_videos: false});
}
}

componentDidMount() {
  event.preventDefault();
  $(".dropdown-button").dropdown();
}

render() {
  return (
    <div className='videos-search'>

      <ul id="dropdown1" className="dropdown-content">
        <li><a href="#!">one</a></li>
        <li><a href="#!">two</a></li>
        <li className="divider"></li>
        <li><a href="#!">three</a></li>
      </ul>

      <nav className='nav-videos-search'>
        <div className="nav-wrapper amber div-nav-videos-search">
          <a href="#" className="brand-logo center a-nav-videos-search">Search musics/videos</a>
          <ul id="nav-mobile" className="left hide-on-med-and-down">
            <li><a href="sass.html">Me</a></li>
          </ul>
          <ul className="right hide-on-med-and-down">
            <li><a className="dropdown-button" href="#!" data-activates="dropdown1"><i className="material-icons right">arrow_drop_down</i></a></li>
          </ul>
        </div>
      </nav>

      <div className="row">
        <div className="input-field col s8">
          <form onSubmit={this.searchVideoYoutube.bind(this)}>
            <input ref="input_search" placeholder="Music/video" id="music_video" type="text" className="validate"/>
          </form>
        </div>
        <div className="input-field col s4">
          <a className="waves-effect waves-light btn" onClick={this.searchVideoYoutube.bind(this)}>Find!</a>
        </div>
      </div>

      {this.state.show ? this.state.div_result_videos : ""}
    </div>
  );
}
}
export default Players;
