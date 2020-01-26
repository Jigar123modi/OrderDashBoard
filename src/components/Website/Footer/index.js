import React, {Component} from 'react';
import {Link} from 'react-router';

class Footer extends Component {

    render() {
        return (
            <div>
                <footer className="page-footer footer_section">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="side1 my-md-5 my-3">
                                    <span>About Saffron</span>
                                    <p className="pt-3">Far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics</p>
                                    <div className="d-flex">
                                        <i className="fa fa-twitter mr-md-2"></i>
                                        <i className="fa fa-facebook mr-md-2"></i>
                                        <i className="fa fa-linkedin mr-md-2"></i>
                                        <i className="fa fa-dribbble mr-md-2"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="side2 my-md-5 my-3">
                                    <span>Information</span>
                                    <div className="d-flex flex-column pt-3">
                                        <div><i className="fa fa-check"></i><a href="#"> Home</a></div>
                                        <div><i className="fa fa-check"></i><a href="#"> Gallery</a></div>
                                        <div><i className="fa fa-check"></i><a href="#"> Service</a></div>
                                        <div><i className="fa fa-check"></i><a href="#"> Videos</a></div>
                                        <div><i className="fa fa-check"></i><a href="#"> Contact</a></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="side3 my-md-5 my-3">
                                    <span className="side3_title">Contact Info</span>
                                    <div className="pt-3">
                                        <span className="side3_content1">291 South 21th Street,</span>
                                    </div>
                                    <span className="side3_content1">Suite 721 New York NY 10016</span>
                                    <div className="mt-md-3">
                                        <div className="pt-sm-0 pt-2">
                                            <i className="fa fa-phone pr-2"></i> <a href="tel:+1235235598">+1235 2355 98</a></div>
                                        <div className="pt-2">
                                            <i className="fa fa-envelope-open-o pr-2"></i> <a href="mailto:info@yoursite.com">info@yoursite.com</a>
                                        </div>
                                        <div className="pt-2">
                                            <i className="fa fa-globe pr-2"></i> <a href="#">yourwebsite.com</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="second_footer pt-md-4 pb-md-3 pt-3 pb-2">
                        <div className="container">
                            <p className="text-center">Copyright ©2019 All rights reserved | This template is made with <i className="fa fa-heart-o"></i> by Colorlib
                                Demo Images: Unsplash, Pexels</p>
                        </div>
                    </div>
                </footer>
            </div>
        )
    }

}

export default Footer;
