import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';

export default class App extends Component {

	EmailField() {
		return (
			<div className="row">
				<div className="input-field col s4">
					<i className="fa fa-envelope fa2x prefix" aria-hidden="true"></i>
					<input ref="email" id="email" type="email" className="validate" />
					<label htmlFor="email" data-error="wrong" data-success="right">Email</label>
				</div>
			</div>
		);
	}

	PhoneField() {
		return (
			<div className="row">
				<div className="input-field col s4">
					<i className="fa fa-phone-square fa2x prefix" aria-hidden="true"></i>
					<input ref="phone" id="icon_telephone" type="tel" className="validate" />
					<label htmlFor="icon_telephone" >Telephone</label>
				</div>
			</div>
		);
	}

	handleSubmitEmail() {
		Meteor.call('addRegisteredEmail', this.refs.email.value, function (e, r) {
			console.log(r);
		});
	}

	handleSubmitPhone() {
		Meteor.call('addRegisteredPhone', this.refs.phone.value, function (e, r) {
			console.log(r);
		});
	}

	handleSubmitEmailAndPhone(){
		Meteor.call('addRegisteredEmail', this.refs.email.value, function (e, r) {
			console.log(r);
		});
		Meteor.call('addRegisteredPhone', this.refs.phone.value, function (e, r) {
			console.log(r);
		});
	}


	render() {
		// console.log(this.props.route.currentUser);
		// 			console.log(!this.props.route.currentUser.registered_phones.length);

		if ((!this.props.route.currentUser.registered_emails.length) && (!this.props.route.currentUser.registered_phones.length)) {
			return (
				<form onSubmit={this.handleSubmitEmailAndPhone.bind(this)}>
					<div className="email-field-component">
						<p>Por favor, realize a confirmação de dados para continuar:</p>
						{this.EmailField()}
						{this.PhoneField()}
						<button className="btn waves-effect waves-crodityColor black-text" type="submit" name="action">Submit
					<i className="material-icons right">send</i>
						</button>
					</div>
				</form>
			);
		} else if (!this.props.route.currentUser.registered_phones.length) {
			return (
				<form onSubmit={this.handleSubmitPhone.bind(this)} >
					<div className="email-field-component">
						<p>Por favor, confirme seu telefone para continuar:</p>
						{this.PhoneField()}
						<button className="btn waves-effect waves-crodityColor black-text" type="submit" name="action">Submit
					<i className="material-icons right">send</i>
						</button>
					</div>
				</form>
			);
		} else if (!this.props.route.currentUser.registered_emails.length) {
			return (
				<form onSubmit={this.handleSubmitEmail.bind(this)}>
					<div className="email-field-component">
						<p>Por favor, confirme seu e-mail para continuar:</p>
						{this.EmailField()}
						<button className="btn waves-effect waves-crodityColor black-text" type="submit" name="action">Submit
					<i className="material-icons right">send</i>
						</button>
					</div>
				</form>
			);
		}
	}
}
