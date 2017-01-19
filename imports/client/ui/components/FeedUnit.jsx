import React from 'react';
import { Helpers } from '../helpers/Helpers';
import {emojify} from 'react-emojione';

//Constructing a const called card, it'll be used where Card.jsx is imported
const FeedUnit = ({data}) => {
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
                            <a href="#">Like</a>
                            <a href="#">Comment</a>
                            <a href="#">Share</a>
                        </div>
                    </div>
                </div>


            </div>
        )
    }
};

export default FeedUnit;
