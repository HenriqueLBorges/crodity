import React,  { Component } from 'react';
import { Meteor } from 'meteor/meteor';
//import Comment from './Comment.jsx';

const Comment = ({comment}) => {
 let TesteComentario = comment.comments.data[0];
            console.log(TesteComentario); 
        
        
         let content;
        
        
        try {
            content = comment.comments.data[0].message;
            console.log(content);
        }
        catch (err) {
            console.log("undefined");
        }

        return(
            <div>{content}</div>
        );
    }




export default Comment;
