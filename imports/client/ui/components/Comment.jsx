import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Helpers } from '../helpers/Helpers';
import ReactDOM from 'react-dom';

class Comment extends Component {

  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  componentDidMount() {
    $('#comment').trigger('autoresize');
    $('.collapsible').collapsible({
      accordion: false, // A setting that changes the collapsible behavior to expandable instead of the default accordion style
      onOpen: function (el) { alert('Open'); }, // Callback for Collapsible open
      onClose: function (el) { alert('Closed'); } // Callback for Collapsible close
    }
    );
  }

  handleToggle() {
    this.setState({ open: !this.state.open });
  }

  handleClose() {
    this.setState({ open: false });

  }
  render() {

    return (
      <ul className="collection">
        <li className="collection-item avatar">
          <img src={this.props.comment.fromImg} alt="" className="circle" />
          <span className="title"> {this.props.comment.from} </span>
          <p> {this.props.comment.message} <br />
            <span style={{ cursor: 'pointer' }} className="blue-text"> Curtir <i className="fa fa-thumbs-up grey-text left"></i></span>   &#8226;
                <span style={{ cursor: 'pointer' }} className="blue-text" onClick={this.handleToggle.bind(this)}>  Responder </span>
            {this.state.open ? <textarea ref="comment" placeholder="Responder" id="comment" className="materialize-textarea"></textarea> : ''}
          </p>
        </li>
      </ul>


      
    );
  }
}


export default Comment; 