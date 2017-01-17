import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Accounts } from 'meteor/accounts-base';



const styles = {

    btn: {
        backgroundColor: '#ffca43'
    },

    img: {
        marginTop: 50,
    }
}

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };

    }

    handleSubmit(event) {
        event.preventDefault();

        let reg = /(((?=.*\d)(?=.*[a-zA-Z])(?=.*[@#$%])[a-zA-Z0-9@$$%]{6,10}))/;

        let options = {
            username: this.refs.username.value,
            email: this.refs.email.value,
            password: this.refs.password.value,
            passwordAgain: this.refs.passwordAgain.value,
            firstName: this.refs.firstName.value,
            lastName: this.refs.lastName.value
        }


        //Function for validation this password 



        let isValidPassword = function (pwd, pwd2) {
            if (pwd === pwd2 && pwd.length >= 6) {
                if (!reg.exec(pwd)) {
                    return alert("A senha deve conter ao minimo 1 letra, 1 numero e 1 caracter especial");
                }else return true;
            }

            if (pwd.length < 6) {
                return alert("Minimo 6 caracteres para senha ");
            }

            else {
                return alert("As senhas digitadas estão diferentes");

            }
        }

        if (isValidPassword(options.password, options.passwordAgain)) {
            Accounts.createUser({
                username: options.username,
                email: options.email,
                password: options.password,
                firstName: options.firstName,
                lastName: options.lastName

            }, function (e) {
                if (e) console.log(e);
            },
                console.log(options));
            ReactDOM.findDOMNode(this.refs.email).value = '';
            ReactDOM.findDOMNode(this.refs.username).value = '';
            ReactDOM.findDOMNode(this.refs.firstName).value = '';
            ReactDOM.findDOMNode(this.refs.lastName).value = '';
            ReactDOM.findDOMNode(this.refs.password).value = '';
            ReactDOM.findDOMNode(this.refs.passwordAgain).value = '';
        }

    }

    componentDidMount() {
        $(".button-collapse").sideNav();
    }


    render() {

        return (

            <div>
                <div className="row">
                    <div className="col s12 m4 offset-m4">
                        <div className="mobile-login" style={styles.img}>
                            <img className="responsive-img" src="/img/CrodityLogo.jpg" alt="Crodity Logo" />
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        <form className="col s12" onSubmit={this.handleSubmit.bind(this)}>
                            <div className="row">
                                <div className="input-field col s6">
                                    <input ref="firstName" placeholder="First Name" id="first_name" type="text" className="validate" />

                                </div>

                                <div className="input-field col s6">
                                    <input ref="lastName" placeholder="Last Name" id="last_name" type="text" className="validate" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s6">
                                    <input ref="password" placeholder="Password" id="password" type="password" className="validate" />
                                </div>
                                <div className="input-field col s6">
                                    <input ref="passwordAgain" placeholder="Confirm Password" id="password" type="password" className="validate" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input ref="email" id="email" type="email" className="validate" />
                                    <label htmlFor="email" data-error="wrong" data-success="right">Email</label>
                                </div>
                                <div className="input-field col s4">
                                    <input ref="username" placeholder="Username" id="username" type="text" className="validate" />
                                </div>
                            </div>
                            <button style={styles.btn} className="btn waves-effect waver-light black-text"
                                type="submit" name="action"> Submit
           <i className="material-icons right" aria-hidden="true">send</i>
                            </button>
                        </form>


                    </div>

                </div>
            </div>

        );
    }
}

export default Register;