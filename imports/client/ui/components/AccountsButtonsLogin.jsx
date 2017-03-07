import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';

const styles = {
  buttonFb: {
    margin: 12,
    backgroundColor: '#3b5998'
  },

  buttonTt: {
    margin: 12,
    backgroundColor: '#1DA1F2'
  },

  hrStyle: {
    margin: '0 25%',
    border: '1px solid black',
  }
}

//This class cares about accounts logins
class LoginWith{

  //This method makes login with Facebook
  static Facebook() {
    if (Meteor.isCordova) {
      facebookConnectPlugin.login(['email'],
      function () {
        console.log('success');
      },
      function () {
        console.log('error');
      }
    );
  }
  else {
    Meteor.loginWithFacebook({ loginStyle: 'redirect' }, function (e) {

      if (e)
      console.log('Error at loginWithFacebook',e);

    });
  }
}

//This method makes login with Twitter
static Twitter() {
  Meteor.loginWithTwitter({ loginStyle: 'redirect' }, function (e) {
  });
}

//This method makes login with google
static Google() {
  Meteor.loginWithGoogle({
    loginStyle: 'redirect',
    requestPermissions: ['https://www.googleapis.com/auth/youtube'],
  },
  function (e) {
    if (e)
    console.log(e);
  }
);
}

//This method makes login with linkedin
static Linkedin() {
  Meteor.loginWithLinkedin({ loginStyle: 'redirect' }, function (e) {
    if (e)
    console.log(e);
  });
}

static Instagram() {
  Meteor.loginWithInstagram(function (e) {

    if (e) {
      console.log('login failed', e);
    } else {
      console.log('login success', Meteor.user());
    }
  });
}
}

// function loginWithFacebook() {
//   if (Meteor.isCordova) {
//     facebookConnectPlugin.login(['email'],
//     function () {
//       console.log('success');
//     },
//     function () {
//       console.log('error');
//     }
//   );
// }
// else {
//   Meteor.loginWithFacebook({ loginStyle: 'redirect' }, function (e) {
//
//     if (e)
//     console.log('Error at loginWithFacebook',e);
//
//   });
//
// }
// }

// function loginWithTwitter() {
//   Meteor.loginWithTwitter({ loginStyle: 'redirect' }, function (e) {
//   });
// }

// function loginWithGoogle() {
//   Meteor.loginWithGoogle({
//     loginStyle: 'redirect',
//     requestPermissions: ['https://www.googleapis.com/auth/youtube'],
//   },
//   function (e) {
//     if (e)
//     console.log(e);
//   }
// );
// }

// function loginWithLinkedin() {
//   Meteor.loginWithLinkedin({ loginStyle: 'redirect' }, function (e) {
//     if (e)
//     console.log(e);
//   });
// }

export class ButtonsLoginLogin extends Component {

  render() {
    return (
      <div>
        <p className="center-align">
          <button style={styles.buttonFb} className="btn waves-effect waver-light" type="submit" name="action"
            onClick={LoginWith.Facebook}>Login With Facebook
            <i className="fa fa-facebook-square left"></i>
          </button>
        </p>
        <p className="center-align">
          <button style={styles.buttonTt} className="btn waves-effect waver-light" type="submit" name="action"
            onClick={LoginWith.Twitter}>Login With Twitter
            <i className="fa fa-twitter-square left" aria-hidden="true"></i>
          </button>
        </p>
      </div>
    );
  }
}

export class ButtonsLoginDrawer extends Component {

  render() {
    return (
      <div>
        <li>
          <a href="#!" onClick={LoginWith.Twitter}>
            <i className="icon-drawer blue-text fa fa-twitter-square fa-2x" aria-hidden="true"></i> Connect with Twitter
            </a>
          </li>
        <li>
          <a href="#!" onClick={LoginWith.Instagram}>
            <i className="icon-drawer fa fa-instagram fa-2x" aria-hidden="true"></i> Instagram
            </a>
          </li>
          <li>
            <a href="#!" onClick={LoginWith.Google}>
              <i className="icon-drawer red-text fa fa-google fa-2x" aria-hidden="true"></i> Connect with Google
              </a>
            </li>
          </div>
        );
      }
    }
