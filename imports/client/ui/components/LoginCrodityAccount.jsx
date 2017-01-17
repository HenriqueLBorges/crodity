import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';


const styles = {
    btn: {
        backgroundColor: '#ffca43'
    }
}


class LoginCrodityAccount extends Component {

  
     handleSubmit(event) {  
        event.preventDefault();
        
        let login = {
            user: this.refs.user.value,
            pass: this.refs.password.value
        }

        Meteor.loginWithPassword(login.user, login.pass,
            function (e) {
                if(e) console.log(e);
                else console.log('Login Successful');
            });

        // if (Meteor.loggingIn()) {
        //     console.log('Sucesso');
        // } else console.log('Falha');

       
       

    }



    render() {

        return (
            <div className="container">

                <form className="col s12" onSubmit={this.handleSubmit.bind(this)}>
                    <div className="row">

                        <div className="input-field col s12 m6 offset-m3">
                            <input ref="user" id="user" type="text" className="validate" />
                            <label htmlFor="user">User</label>
                        </div>

                    </div>
                    <div className="row">
                        <div className="input-field col s12 m6 offset-m3">
                            <input ref="password" id="password" type="password" className="validate" />
                            <label htmlFor="password">Password</label>
                        </div>

                    </div>
                    <p className="center-align">
                        <button style={styles.btn} className="center-align btn waves-effect waver-light black-text"
                            type="submit" name="action"> Login
            <i className="black-text fa fa-sign-in left" aria-hidden="true"></i>
                        </button>
                    </p>

                </form>

            </div>
        );
    }
}

export default LoginCrodityAccount; 