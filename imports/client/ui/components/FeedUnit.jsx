import React, { Component } from 'react';
import { Helpers } from '../helpers/Helpers';
import CommentList from './CommentList.jsx';

//Constructing a const called card, it'll be used where FeedUnit.jsx is imported

class FeedUnit extends Component {

  componentDidMount() {

    $(document).ready(function () {
      $('.modal-trigger').leanModal();
    });


  }


  render() {

    let data = this.props.data;

    //Formatting the date
    let formattedDate = moment(data.created).calendar();


    if (!(typeof data === 'undefined')) {
      console.log(data.comments);
      console.log(data.user.cover);
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
                <a href="#">Likes</a>

                <button data-target="modal1" className="btn modal-trigger">Modal</button>
                <div id="modal1" className="modal modal-fixed-footer">
                  <div className="modal-content">
                    <h4>Modal Header</h4>
                    <p>A bunch of text</p>
                  </div>
                  <div className="modal-footer">
                    <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat ">Agree</a>
                  </div>
                </div>

                <div><CommentList comments={data.comments} /></div>
                <a href="#">Comment</a>
                <a href="#">Share</a>
              </div>
            </div>
          </div>


        </div>
      );
    }
  }
}

export default FeedUnit;
