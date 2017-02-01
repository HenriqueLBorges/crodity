import React, { Component } from 'react';
import { Helpers } from '../helpers/Helpers';
import CommentList from './CommentList.jsx';

//Constructing a const called card, it'll be used where FeedUnit.jsx is imported

class FeedUnit extends Component {


  constructor(props) {
    super(props);
    this.state = { open: true };
    this.toComment = this.toComment.bind(this);
  }

  componentDidMount() {

    $(document).ready(function () {
      $('.modal-trigger').leanModal();
    });


  }

  toComment(event, id) {
    console.log( this);
    event.preventDefault();
    Meteor.call('commentFacebook', id, this.refs.comment.value, function (e, r) {
      if (e)
        console.log(e);
    });
  }

  toLike(id) {
    Meteor.call('likeCrodity', id, "felipe", "like", function (e, r) {
      if (e)
        console.log(e);
    });
  }

  render() {

    //Setting and formatting the date
    let data = this.props.data;
    formattedDate = moment(data.created).calendar();

    if (!(typeof data === 'undefined')) {
      return (
        <div className="row">
          <div className="col s12 m7">
            <div className="card">

              <div className="card-content">
                <div className="row">

                  <div className="col s1"><img src={data.user.image} className="responsive-img" width="50" /></div>
                  <div className="feedUnitTittle col s10">
                    <div>{data.title} {Helpers.get(data, 'location') ? <p><i className="fa fa-map-marker" aria-hidden="true"> </i>{Helpers.get(data, 'location.name')}</p> : ""}</div>
                    <p className="feedUnitDate">{formattedDate}</p>
                  </div>
                  <div className="feedUnitService col s1">{Helpers.socialIcon(data.service, 2)}</div>
                </div>
                <p>{data.content}</p>
                <div className="card-image">
                  <img src={Helpers.get(data, 'post_image')} />
                  <div className="row">
                    <i className="fa fa-heart reactionIcon" aria-hidden="true"></i>{" " + Helpers.get(data, 'likes') + " people"}
                    <i className="fa fa-comments reactionIcon" aria-hidden="true"></i>{" " + Helpers.get(data, 'comments.length')}
                    <i className="fa fa-share-square-o reactionIcon" aria-hidden="true"></i>{Helpers.get(data, 'shares.data.length')}
                  </div>
                </div>
                <div className="card-action">
                  <i className="fa fa-thumbs-o-up grey-text" aria-hidden="true"></i>
                  <a onClick={this.toLike.bind(this, data.id)}> Like</a>
                  <i className="fa fa-comments-o grey-text" aria-hidden="true"></i>
                  <a > Comment</a>
                  <i className="fa fa-share grey-text" aria-hidden="true"></i>
                  <a > Share</a>
                  <div><CommentList comments={data.comments} /></div>
                  <form onSubmit={this.toComment(event, data.id)}>
                    <input type="text" ref="comment" placeholder="Comentar" id="comment" className="materialize-textarea" />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}

export default FeedUnit;