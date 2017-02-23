import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';


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
      classNameInput: "",
      classNamePass: "",
      classNamePassA: ""
    }


  }

  // handleChange(name) {
  //     console.log(
  //    // console.log(Accounts.findUserByUsername('teste'));

  // }


  handleSubmit(event) {

    event.preventDefault();

    // validation email account
    let regexEmail = /(((?=.*[a-zA-Z])(?=.*[._@#$%])[a-zA-Z0-9@$$%._-]{5,}))/;

    // Regex validation password
    let reg = /(((?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9@$$%#&*()]{6,15}))/;

    let options = {
      username: this.refs.username.value,
      email: this.refs.email.value,
      emailAgain: this.refs.emailAgain.value,
      password: this.refs.password.value,
      passwordAgain: this.refs.passwordAgain.value,
      firstName: this.refs.firstName.value,
      lastName: this.refs.lastName.value
    }


    //Function for validation password
    let isValidPassword = function (pwd, pwd2) {
      if (pwd === pwd2 && pwd.length >= 6) {
        if (!reg.exec(pwd)) {
          return alert("A senha deve conter ao minimo 1 letra e 1 numero");

        } else return true;
      }

      if (pwd.length < 6) {
        return alert("Minimo 6 caracteres para senha ");
      }

      else {
        return alert("As senhas digitadas estão diferentes");

      }
    }

    isValidEmailAccountForm = function (email, email2) {
      if (regexEmail.exec(email)) {
        return
      }


      //if(email === email2 && email.length >=5)

    }




    if (isValidPassword(options.password, options.passwordAgain)) {
      Accounts.createUser({
        username: options.username,
        email: options.email,
        password: options.password,
        firstName: options.firstName,
        lastName: options.lastName

      }, function (e) {
        if (e) {
          console.log(e.message);
          if (e.message === "Email already exists. [403]") {
            alert("Esta conta de email ja esta vinculada a putro usuario");
          }
          if (e.message === "Username already exists. [403]") {
            console.log(e);
          }
        }
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

    $(document).ready(function () {
      $('.tooltipped').tooltip({ delay: 50 });
    });
  }


// function for find User
  findUser() {
    let user = this.refs.username.value;
    let self = this;
    console.log(user);

    Meteor.call('doesUserExist', user, function (error, result) {
      if (error) {
        console.log(error);
      }
      if (result === true) {
        console.log(result);
        self.setState({ classNameInput: "invalid" }, function () {
          return true;
        });

      }
      if (result === false) {
        console.log(result);
        self.setState({ classNameInput: "valid" }, function () {
          return false;
        });

      }
    });
  }



//function for validation input form password
  passwordCompare() {

    let pwd = this.refs.password.value;
    let pwd2 = this.refs.passwordAgain.value;
    let self = this;
       console.log(pwd, pwd2);

    if (pwd.length >= 6 && pwd === pwd2) {
      console.log(pwd.length + 'TO NO IF ');
      self.setState({
        classNamePass: "valid",
        classNamePassA: "valid"
      }, function () {
        return true;
      });
    }

    if (pwd2 != pwd) {
      self.setState({
        classNamePass: "valid",
        classNamePassA: "invalid"
      }, function () {
        return false;
      });
    }

    if (pwd == "") {
      self.setState({
        classNamePass: "",
        classNamePassA: "invalid"
      }, function () {
        return false;
      });
    }
  }

//
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
            <form className="col s12" onSubmit={this.handleSubmit.bind(this)} autocomplete="off">
              <div className="row">
                <div className="input-field col s6">
                  <input ref="firstName" placeholder="First Name" id="first_name" type="text" className="validate" />
                </div>

                <div className="input-field col s6">
                  <input ref="lastName" placeholder="Last Name" id="last_name" type="text" className="validate" />
                </div>
              </div>
              <div className="row">
                <div className="input-field col s6 tooltipped" data-position="bottom" data-delay="50"
                  data-tooltip="A senha deve conter ao minimo seis caracterer com uma letra e um número.">
                  <input ref="password" placeholder="Password"
                    onChange={this.passwordCompare.bind(this)} id="password" type="password"
                    className={this.state.classNamePass} />
                </div>
                <div className="input-field col s6 tooltipped" data-position="bottom" data-delay="50"
                  data-tooltip="Confirme a senha digitada.">
                  <input ref="passwordAgain" placeholder="Confirm Password"
                    onChange={this.passwordCompare.bind(this)} id="password" type="password"
                    className={this.state.classNamePassA} />

                </div>
              </div>
              <div className="row">
                <div className="input-field col s6 tooltipped" data-position="bottom" data-delay="50"
                  data-tooltip="Digite um email válido.">
                  <input ref="email" id="email" type="email" className="validate" />
                  <label htmlFor="email" data-error="wrong" data-success="right">Email</label>

                </div>
                <div className="input-field col s6 tooltipped" data-position="bottom" data-delay="50"
                  data-tooltip="Confirme seu email.">
                  <input ref="emailAgain" id="email" type="email" className="validate" />
                  <label htmlFor="email" data-error="wrong" data-success="right">Email</label>
                </div>
                <div className="input-field col s4">
                  <input ref="username" placeholder="Username" onChange={this.findUser.bind(this)} id="username" type="text"
                    className={this.state.classNameInput} />
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
