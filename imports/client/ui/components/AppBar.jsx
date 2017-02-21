/*
- This is the AppBar principal on the top
- There are buttons, the logo and others things inside it
*/

import React from 'react';


//Creating a component react
class AppBar extends React.Component {

    componentDidMount() {
        // $('input.autocomplete').autocomplete({
        //     data: {
        //         "Apple": null,
        //         "Microsoft": null,
        //         "Google": 'http://placehold.it/250x250'
        //     },
        //     limit: 20, // The max amount of results that can be shown at once. Default: Infinity.
        // });

    }

    render() {
        return <nav className="app-main">
            <div className="nav-wrapper">
                <a href="#" className="brand-logo left logo-crodity"><img className="responsive-img  logoweb" src="img/CrodityCircle300x300.png" /></a>
                
                <ul id="nav-mobile" className="right hide-on-med-and-down ">
                    <li><a href="sass.html" className="white-text" >Loja Virtual</a></li>
                    <li><a href="badges.html" className="white-text">Parceiros</a></li>
                    <li><a href="collapsible.html" className="white-text">Contato</a></li>
                </ul>
            </div>
        </nav>
    }
}

//exporting the component AppBar, it'll be used where the AppBar.jsx is imported
export default AppBar;
