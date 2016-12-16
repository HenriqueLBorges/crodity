import React, { Component } from 'react';
import LogoutButton from '../LogoutButton.jsx';
import AccountsLogin from '../AccountsLogin.jsx';

class SidePanel extends Component {

  render() {
    return(
      <div className="side-panel side-panel-right" data-disable="left" data-page="home" data-expose-aside="right" id="side-panel-example">
          <header className="header-bar">
              <button className="btn pull-left icon icon-close show-for-phone-only" data-side-panel-close="true"></button>
              <div className="pull-right">
                  <h1 className="title">Side Panel</h1>
              </div>
          </header>
          <div className="content">
              <ul className="list">
                  <li><AccountsLogin /></li>
                  <li><LogoutButton /></li>
              </ul>
          </div>
      </div>
    );
  }
}

export default SidePanel;
