import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import Comment from './Comment.jsx';

const CommentList = ({comments}) => (

    <div className="feed">
        <div className="padded-full">
            {comments.map((comment) => (
              <div>{comment.fromImg}</div>
            ))}
        </div>
    </div>
);


export default CommentList;
