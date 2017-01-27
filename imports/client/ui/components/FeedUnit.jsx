import React from 'react';
import { Helpers } from '../helpers/Helpers';
import CommentList from './CommentList.jsx';

export default class FeedUnit extends React.Component {

  constructor(props) {
    super(props);
    this.state = { open: true };
  }

  // handleToggle() {
  //   this.setState({ open: !this.state.open });
  // }

  // handleClose() {
  //   this.setState({ open: false });
  // }

  toComment(id) {
    Meteor.call('commentFacebook', id, this.refs.comment.value, function (e, r) {
      if (e)
        console.log(e);
    });
  }

  // let contentType = {
  //     comments: data.comments,
  //     commentsFrom: data.comments.
  // }

  render() {
    let data = this.props.data;
    //console.log(data.id);

    //Formatting the date
    formattedDate = moment(data.created).calendar();
    if (!(typeof data === 'undefined')) {
      return (
        <div className="row">
          <div className="col s12 m7">
            <div className="card">

              <div className="card-content">
                <div className="row">
                  <div className="col s2"><img src={data.user.image} className="responsive-img" width="50" /></div>
                  <div className="feedUnitTittle col s8">
                    <p>{data.title} <i className="fa fa-map-marker" aria-hidden="true"></i>{" - Localization - "}</p>
                    <p className="feedUnitDate">{formattedDate}</p>
                  </div>
                  <div className="feedUnitService col s2">{Helpers.socialIcon(data.service, 2)}</div>
                </div>
                <p>{data.content}</p>
              </div>

              <div className="card-image">
                <img src={Helpers.get(data, 'post_image')} />
                <div className="row">
                  <i className="fa fa-heart fa-lg reactionIcon" aria-hidden="true">{Helpers.get(data, 'likes.data.length')}</i>
                  <i className="fa fa-comments fa-lg reactionIcon" aria-hidden="true">{Helpers.get(data, 'comments.data.length')}</i>
                  <i className="fa fa-share-square-o fa-lg reactionIcon" aria-hidden="true">{Helpers.get(data, 'shares.data.length')}</i>
                </div>
              </div>

              <div className="card-action">
                <a href="#" onClick="">Likes</a>
                <div><CommentList comments={data.comments} /></div>
                <a href="#">Comment</a>
                <textarea ref="comment" placeholder="Responder" id="comment" className="materialize-textarea"></textarea>
                <button onClick={this.toComment.bind(this, data.id)}>Enviar</button>
                <a href="#">Share</a>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}