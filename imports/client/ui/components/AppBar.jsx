/*
- This is the AppBar principal on the top
- There are buttons, the logo and others things inside it
*/

import React from 'react';

//Creating a component react
class AppBar extends React.Component {
    render() {
        return <nav className="app-main">
            <div className="nav-wrapper">
                <a href="#" className="brand-logo left"><img className="responsive-img z-depth-2 logoweb" src="http://www.crodity.com/img/crodity-logo.jpg"/></a>
                <ul id="nav-mobile" className="right hide-on-med-and-down ">
                    <li><a href="sass.html" className="black-text" >Loja Virtual</a></li>
                    <li><a href="badges.html"  className="black-text">Parceiros</a></li>
                    <li><a href="collapsible.html"  className="black-text">Contato</a></li>
                </ul>
            </div>
        </nav>
    }
}

//exporting the component AppBar, it'll be used where the AppBar.jsx is imported
export default AppBar;
