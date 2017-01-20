import React, { Component } from 'react';
import AppBar from '../components/AppBar.jsx';
import DrawerContainer from '../containers/DrawerContainer.jsx';

export default class MainLayout extends Component {

  componentDidMount(){

  }

render(){
 return (
   <div className="main-logged">
     <AppBar />
     <DrawerContainer />
     <div className="content">{this.props.children}</div>
   </div>

   );
 }
}
