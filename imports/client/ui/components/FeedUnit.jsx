import React, { Component } from 'react';
import { Helpers } from '../helpers/Helpers';
import CommentList from './CommentList.jsx';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

//temporary

//Constructing a const called card, it'll be used where FeedUnit.jsx is imported

class FeedUnit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: true,
      emojis: false,
      isOver: false,
    };
  }

  toComment(event) {
    event.preventDefault();
    let self = this;
    Meteor.call('commentFacebook', this.props.data.id, this.refs.comment.value, function (e, r) {
      if (e)
        console.log(e);
    });
    ReactDOM.findDOMNode(this.refs.comment).value = '';
  }

  reactToPost(reaction) {
    Meteor.call('likeCrodity', this.props.data.id, this.props.data.user.name, reaction, function (e, r) {
      if (e)
        console.log(e);
    });
  }

  showEmojis() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
      this.state.emojis = <div className="emojis" onMouseOver={this.showEmojis.bind(this)} onMouseLeave={this.hideEmojis.bind(this)}>
        <div onClick={this.reactToPost.bind(this, 'like')} className='emojione-unit' >{emojione.shortnameToUnicode(':thumbsup:')}</div>
        <div onClick={this.reactToPost.bind(this, 'love')} className='emojione-unit' > {emojione.shortnameToUnicode(':heart:')}</div>
        <div onClick={this.reactToPost.bind(this, 'laughing')} className='emojione-unit' > {emojione.shortnameToUnicode(':laughing:')}</div>
        <div onClick={this.reactToPost.bind(this, 'crying')} className='emojione-unit' >{emojione.shortnameToUnicode(':sob:')}</div>
        <div onClick={this.reactToPost.bind(this, 'surprised')} className='emojione-unit' >{emojione.shortnameToUnicode(':hushed:')}</div>
      </div>;
    } else {
      this.state.emojis = <div className="emojis" onMouseOver={this.showEmojis.bind(this)} onMouseLeave={this.hideEmojis.bind(this)}>
        <div onClick={this.reactToPost.bind(this, 'like')} >{Helpers.convertEmojiOneToReact(emojione.toImage(':thumbsup:'))}</div>
        <div onClick={this.reactToPost.bind(this, 'love')} >{Helpers.convertEmojiOneToReact(emojione.toImage(':heart:'))}</div>
        <div onClick={this.reactToPost.bind(this, 'laughing')} >{Helpers.convertEmojiOneToReact(emojione.toImage(':laughing:'))}</div>
        <div onClick={this.reactToPost.bind(this, 'crying')} >{Helpers.convertEmojiOneToReact(emojione.toImage(':sob:'))}</div>
        <div onClick={this.reactToPost.bind(this, 'surprised')} >{Helpers.convertEmojiOneToReact(emojione.toImage(':hushed:'))}</div>
      </div>
    }
    this.state.isOver = true;
    this.forceUpdate();
  }
  componentWillMount() {

  }
  componentDidMount() {
    event.preventDefault();
    $('.carousel').carousel();
  }


  textVerify() {
    let data = this.props.data;
    let self = this;
    let urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    let text = Helpers.get(data, 'media.description');
    let textDescription = {
      link: '',
      description: ''
    }

    var link;
    try {
      text.replace(urlRegex, function (u) {
        self.link = u;
        return self.link;
      })

      var mediaDescription = text.replace(urlRegex, function (u) {
        return '';
      })

      textDescription = {
        link: self.link,
        description: mediaDescription
      }
    }

    catch (e) {
      // console.log(e);
      textDescription = {
        link: '',
        description: ''
      }
    }

    return (textDescription);
  }

  mediaRender() {
    let data = this.props.data;
    let self = this;

    let media;


    if (!(typeof data === 'undefined'))
      //console.log(data);
    //console.log(Helpers.get(data, 'media.post_image'));

    if (Helpers.get(data, 'media.type') == 'text') {
      return (
        <div>
          <p> {this.textVerify().description ? this.textVerify().description : data.content} </p>
          {this.textVerify().link ? <a href={this.textVerify().link}> {this.textVerify().link} </a> : ""}
        </div>
      );
    }


    if (Helpers.get(data, 'media.type') == 'video') {
      return (
        <div>
          <p> {this.textVerify().description} </p>
          <a href={this.textVerify().link}> {this.textVerify().link} </a>
          <video loop preload="auto" className="video" src={Helpers.get(data, 'media.post_video')} controls> </video>
        </div>
      );
    }

    //console.log('HELPERS', Helpers.get(data, 'media.type'));

    if (Helpers.get(data, 'media.type') == 'photo') {
      return (
        <div>
          <p>{this.textVerify().description}</p>
          {this.textVerify().link ? <a href={this.textVerify().link}> {this.textVerify().link} </a> : ""}
          <img src={Helpers.get(data, 'media.post_image')} />
        </div>
      );
    }

    if (Helpers.get(data, 'media.type') == 'checkin') {
      return (
        <figure>
          <figcaption>{Helpers.get(data, 'location.name_location')}</figcaption>
          <figcaption>{Helpers.get(data, 'media.description')}</figcaption>
          <img src={Helpers.get(data, 'media.post_image')} />
        </figure>
      );
    }

    if (Helpers.get(data, 'media.type') == 'gif') {
      return <video loop preload="auto" className="video" src={Helpers.get(data, 'media.post_video')} autoPlay> </video>;
    }

    if (Helpers.get(data, 'media.type') == 'album') {
      let album = [];
      let post_image = [];
      post_image = Helpers.get(data, 'media.post_image');
      let i = 0;
      return (<div className="carousel" key={i++}>

        {post_image.map((img_src, i, album) => {
          return (
            <p className="carousel-item"  ><img src={img_src} /></p>
          );
        })}
      </div>);
    }

  }

  hideEmojis() {
    this.state.isOver = false;

    let self = this;
    //This syntax is used to pass arguments to the setTimeout function
    setTimeout(verifyIsOver.bind(null, self), 1000);

    function verifyIsOver(self) {
      if (self.state.isOver == false) {
        self.setState({ emojis: false });
      }
    }
    this.forceUpdate();
  }

  render() {
    //Setting and formatting the date
    let data = this.props.data;
    formattedDate = moment(data.created).calendar();

    // Meteor.call('showAlbumsFacebook', function(e,r){
		// 	console.log(r);
		// });

    if (!(typeof data === 'undefined')) {
      media = this.mediaRender();
      return (
        <div className="row row-card-total">
          <div className="col s12 m9 card-total">
            <div className="card feed-unit">

              <div className="card-content feed-unit-content">
                <div className="row tittle-card">

                  <div className="col s1 tittle-card-image "><img src={data.user.image} className="responsive-img feed-unit-user-img" width="50" /></div>
                  <div className="feedUnitTittle col s10 tittle-card">

                    <div>{data.title} {Helpers.get(data, 'location') ? <p><i className="fa fa-map-marker" aria-hidden="true">
                    </i>{Helpers.get(data, 'location.name')}</p> : ""}</div>
                    <p className="feed-unit-date">{formattedDate}</p>

                  </div>
                  <div className="feedUnitService col s1 tittle-card-image">{Helpers.socialIcon(data.service, 2)}</div>
                </div>
                <div className="card-image">
                  {media}
                  <p>{data.content}</p>
                  <div onMouseOver={this.showEmojis.bind(this)}>{this.state.emojis}</div>
                </div>
                <div className="card-action feed-unit-action">
                  <div ref='like' onClick={this.reactToPost.bind(this, 'like')} onMouseOver={this.showEmojis.bind(this)} onMouseLeave={this.hideEmojis.bind(this)} >
                    <i className="fa fa-thumbs-o-up" aria-hidden="true"></i> Like
                  </div>
                  <i className="fa fa-comments-o grey-text" aria-hidden="true"></i>
                  <a > Comment</a>
                  <i className="fa fa-share grey-text" aria-hidden="true"></i>
                  <a > Share</a>
                </div>
                <div className="row-reactions">
                  <i className="fa fa-heart reactionIcon" aria-hidden="true"></i><a>{" " + Helpers.get(data, 'likes') + " people"}</a>
                  <i className="fa fa-comments reactionIcon" aria-hidden="true"></i><a>{" " + Helpers.get(data, 'comments.length')}</a>
                </div>
                <div>{/*<CommentList comments={data.comments} />*/}</div>
                <form onSubmit={this.toComment.bind(this)} autoComplete="off">
                  <input type="text" ref="comment" placeholder="Comentar" id="comment" />
                </form>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}

export default FeedUnit;
