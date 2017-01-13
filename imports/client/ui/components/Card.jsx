import React from 'react';

//Constructing a const called card, it'll be used where Card.jsx is imported
const Card = ({data}) => {
    //Formatting the date
    formattedDate = moment(data.created).calendar();

    /*
    - Checking if the data until now is not undefined
    - If so then it starts to contruct the Card with the data
    */


    const get = function (obj, key) {
        return key.split(".").reduce(function (o, x) {
            return (typeof o == "undefined" || o === null) ? o : o[x];
        }, obj);
    }

    if (!(typeof data === 'undefined')) {

        return (
            <div className="row">
                <div className="col s12 m7">
                    <div className="card">

                        <div className="card-content">
                            <div className="row">
                                <div className="col s2"><img src={data.user.image} className="responsive-img" width="50" /></div>
                                <div className="feedUnitTittle col s8">{data.title}</div>
                                <div className="feedUnitService col s2">{data.service}</div>
                            </div>
                            <p className="feedUnitDate">{formattedDate}</p>
                            <p>{data.content}</p>
                        </div>

                        <div className="card-image">
                            <img src={get(this.props,'data.attachments.postUnitImage')} />
                            <span className="card-title"></span>
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

export default Card;
