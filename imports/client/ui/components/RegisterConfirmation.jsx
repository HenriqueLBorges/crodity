import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';

export default class App extends Component {

	EmailField(){
	return(
			<div className="row">			
				<div className="input-field col s4">
					<i className="fa fa-envelope fa2x prefix" aria-hidden="true"></i>
          		<input id="email" type="email" className="validate"/>
          		<label htmlFor="email" data-error="wrong" data-success="right">Email</label>
        		</div>
		    </div>
	);
	}

	PhoneField(){
	return(
		<div className="row">			
			<div className="input-field col s4">
				<i className="fa fa-phone-square fa2x prefix" aria-hidden="true"></i>
          	<input id="icon_telephone" type="tel" className="validate"/>
          	<label htmlFor="icon_telephone" >Telephone</label>
        	</div>
		</div>
	);
	}

	handleSubmitEmail() {

		Meteor.call('addRegisteredEmail', this.refs.email.value, function(e,r){
			console.log(r);
		});

	}

	handleSubmitPhone(){

		Meteor.call('addRegisteredEmail', this.refs.email.value, function(e,r){
			console.log(r);
		});
	}


	render() {
		console.log(this.props.route.currentUser);
		//if(this.props.route.currentUser){

		//}
		return(
			<form>
				<div className="email-field-component">
					<p>Por favor, realize a confirmação de dados para continuar:</p>
					{this.EmailField()}
					{this.PhoneField()}
					<button onClick={this.handleSubmitEmail.bind(this)} className="btn waves-effect waves-crodityColor black-text" type="submit" name="action">Submit
					<i className="material-icons right">send</i>
					</button>
				</div>
			</form>
		);
	}
}
