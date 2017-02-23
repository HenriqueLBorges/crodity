import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Helpers } from '../helpers/Helpers.jsx';
import ReactDOM from 'react-dom';

class RecoverPassword extends Component {

  handleSubmitEmail(event) {
    event.preventDefault();
    console.log('E-mail sent to your personal account with the passowrd');
    //     let self = this;
    // this.props.router.push('/');
    // Meteor.call('addRegisteredEmail', this.refs.email.value, function (e, r) {
    //   console.log(r);
    //       self.props.router.push('/');
    // });
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col s12 m4 offset-m4">
              <img className="responsive-img" src="/img/CrodityLogo.jpg" alt="Crodity Logo" />
          </div>
        </div>
        <div className="container">
        <form onSubmit={this.handleSubmitEmail.bind(this)} autoComplete="off">
					<div className="recover-password">
              <div className='center-align'>Please, insert your e-mail to recover your password:
                <div className="row">
          				<div className="input-field col s4 offset-m4">
          					<i className="fa fa-envelope fa2x prefix" aria-hidden="true"></i>
          					<input ref="email" id="email" type="email" className="validate" />
          					<label htmlFor="email" data-error="wrong" data-success="right">Email</label>
          				</div>
          			</div>
                <button className="btn waves-effect waves-crodityColor black-text" type="submit" name="action">Send
    					<i className="material-icons right">send</i>
    						</button>
              </div>
          </div>
        </form>
      </div>
      </div>
    );
  }
}
export default RecoverPassword;
