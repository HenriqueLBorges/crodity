import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Helpers } from '../helpers/Helpers.jsx';

class Profile extends Component {

    componentDidMount() {
        //     let user = 	Meteor.call('getFacebookProfile', function(e, result) {

        // 			if(e){
        // 				console.log(e);
        // 			}else 
        // 			console.log(result);
        // 			return result;
        // 		});

        //         console.log(this.user); 
        $(document).ready(function () {
            $('ul.tabs').tabs();
        });

    }

    render() {


        return (
            <div>

                <div className="card">
                    <div className="card-image userView waves-effect waves-block waves-light">
                        <img className="activator background responsive-img" src="img/testeImg.jpg" />
                    </div>
                    <div className="card-content">
                        <div className="row valign-wrapper">
                            <div className="col s2">
                                <img src="img/CrodityCircle100x100.png" alt="" className="circle responsive-img" />
                            </div>
                            <div className="col s10">
                                <span className="black-text"> Crodity Software S.A </span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s12">
                                <ul className="tabs">
                                    <li className="tab col s3"><a href="#test1">Test 1</a></li>
                                    <li className="tab col s3"><a className="active" href="#test2">Test 2</a></li>
                                    <li className="tab col s3 "><a href="#test3">Test 3</a></li>
                                    <li className="tab col s3"><a href="#test4">Test 4</a></li>
                                </ul>
                            </div>
                            <div id="test1" className="col s12">Test 1</div>
                            <div id="test2" className="col s12">Test 2</div>
                            <div id="test3" className="col s12">Test 3</div>
                            <div id="test4" className="col s12">Test 4</div>
                        </div>
                    </div>
                    <div className="card-reveal">
                        <span className="card-title grey-text text-darken-4">Card Title<i className="material-icons right">close</i></span>
                        <p>Here is some more information about this product that is only revealed once clicked on.</p>
                    </div>
                </div>

            </div>
        );
    }
}

export default Profile;