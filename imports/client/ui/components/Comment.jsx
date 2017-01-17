import React, { Component } from 'react';
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
    //onClick={this.handleClose.bind(this)}
  }



  render() {
    return (
      <ul className="collection">
        <li className="collection-item avatar">
          <img src="img/CrodityCircle50x50.png" alt="" className="circle" />
          <span className="title"> Profile Name </span>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent tincidunt consectetur finibus. Nulla ultricies sapien vitae orci lacinia, porttitor dictum ligula blandit. Etiam nec augue auctor, auctor sem ornare, tempus eros. Nulla scelerisque tellus nisi,
           ut accumsan nunc vulputate ut. Vivamus ac nulla ac sem auctor aliquam gravida rutrum odio. <br />

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