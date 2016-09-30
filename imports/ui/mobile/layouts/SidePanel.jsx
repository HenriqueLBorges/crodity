import React, { Component } from 'react';

class SidePanel extends Component {

  render() {
    return(
      <div className="side-panel side-panel-right" data-disable="left" data-page="home" data-expose-aside="left" id="side-panel-example">
          <header className="header-bar">
              <button className="btn pull-left icon icon-close show-for-phone-only" data-side-panel-close="true"></button>
              <div className="pull-right">
                  <h1 className="title">Side Panel</h1>
              </div>
          </header>
          <div className="content">
              <ul className="list">
                  <li><a className="padded-list">Profile</a></li>
                  <li><a className="padded-list">About</a></li>
                  <li><a className="padded-list">Settings</a></li>
                  <li><a className="padded-list">Login</a></li>
              </ul>
          </div>
      </div>
    );
  }
}

export default SidePanel;
