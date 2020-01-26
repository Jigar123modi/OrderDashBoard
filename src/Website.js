import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {browserHistory, Link} from 'react-router';
import {isLoggedIn} from './index';
import $ from "jquery";
import NotificationSystem from 'react-notification-system';
import * as websiteAction from './actions/websiteAction';
import Loader from '././components/Helper/Loader';
import SuccessLoader from '././components/Helper/SuccessLoader';
import '././components/Website/Home/websiteCss/website.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/Website/Footer';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notificationSystem: null,
            visible: false,
            theposition: 0,
            orderPlace: false,
        }
    }

    addNotifications = (message, level) => {
        this.state.notificationSystem.addNotification({
            message: message,
            level: level,
            autoDismiss: 5
        });
    };

    componentWillReceiveProps(nextProps) {
        if (!nextProps.Loading && nextProps.error_msg) {
            this.addNotifications(nextProps.error_msg, "error");
        }
        if(nextProps.success_msg){
            this.props.actions.websiteAction.basketVisible(false);
            this.setState({orderPlace:true},() => {
                setTimeout(() => {
                    this.setState({orderPlace:false});
                },1000);
            });
            browserHistory.push('/ProductList');
        }
    }

    componentDidMount() {
        this.setState({notificationSystem: this.refs.notificationSystem});
    };

    componentWillMount() {
        // eslint-disable-next-line
        let ua = navigator.userAgent.toLowerCase();
        let isSafari = false;
        try {
            // eslint-disable-next-line
            isSafari = /constructor/i.test(window.HTMLElement) || (function (p) {return p.toString() === "[object SafariRemoteNotification]";})(!window['safari'] || safari.pushNotification);
        }
        catch (err) {
        }
        isSafari = (isSafari || ((ua.indexOf('safari') !== -1) && (!(ua.indexOf('chrome') !== -1) && (ua.indexOf('version/') !== -1))));
        if (isSafari) {
            $('body').addClass("iosSafari");
        }
        this.props.actions.websiteAction.getWebsiteHome();
    }

    handleLogoutMobile = () => {
        this.setState({visible: !this.state.visible});
        this.props.actions.websiteAction.loggedOut();
    };

    handleLogout = () => {
        this.props.actions.websiteAction.loggedOut();
    };

    toggle = () => {
        this.setState({visible: !this.state.visible});
    };

    BasketClick = () => {
        browserHistory.push('/BasketItems');
    };

    render() {
        const BasketProductCount = this.props.BasketGeneratorProducts && this.props.BasketGeneratorProducts.length;
        return (
            <div>
                <NotificationSystem ref="notificationSystem"/>
                <header>
                    <nav className="navbar navbar-expand-md navbar-dark navbar1 fixed-top scrolled pt-md-4 m-0 rounded-0" id="navbar">
                        <div className="col-2 d-flex flex-column text-center d-md-none d-block align-items-md-center first_logo logo1">
                            <i className="fa fa-camera"></i><span>Saffron</span>
                        </div>
                        <div className="container main_menu d-flex justify-content-end">
                            <button className="navbar-toggler text-right" data-toggle="collapse"
                                    data-target="#collapsibleNavbar">
                                <span className="navbar-toggler-icon" onClick={this.toggle} ></span>
                            </button>
                            <div className={`collapse ${this.state.visible ? 'navbar-collapse' : ''} menu`}
                                 id="collapsibleNavbar">
                                <div className="col-md-5 menu1 text-right">
                                    <Link to="/" className="mr-md-5" onClick={this.toggle}>HOME</Link>
                                    <Link to="/Gallery" className="mr-md-5" onClick={this.toggle}>GALLERY</Link>
                                    <Link to="/ProductList" onClick={this.toggle}>SERVICES</Link>
                                </div>
                                <div className="col-md-2 d-md-flex d-none flex-column align-items-md-center logo1">
                                    <Link to="/"><span>Saffron</span></Link>
                                </div>
                                <div className="col-md-5 menu2">
                                    <Link to="/VideoGallery" onClick={this.toggle}>VIDEOS</Link>
                                    {!isLoggedIn() && <Link className="ml-md-5" to="/login" onClick={this.toggle}>SIGN IN</Link>}
                                    {isLoggedIn() &&  <Link className="ml-md-5" onClick={this.handleLogoutMobile} to="/">SIGN OUT</Link>}
                                    {!isLoggedIn() && <Link to="/Registration" className="ml-md-5" onClick={this.toggle}>SIGN UP</Link>}
                                    {isLoggedIn() && <Link to="/Profile/UserProfile" className="ml-md-5" onClick={this.toggle}>SETTING</Link>}
                                    <a href="#" className="ml-md-5">CONTACT</a>
                                </div>
                            </div>
                            <div className="collapse navbar-collapse menu">
                                <div className="col-md-5 menu1 text-right d-md-block d-none pt-lg-3">
                                    <Link to="/" className="mr-lg-5 mr-md-3">HOME</Link>
                                    <Link to="/Gallery" className="mr-lg-5 mr-md-3">GALLERY</Link>
                                    <Link to="/ProductList">SERVICES</Link>
                                </div>
                                <div className="col-md-2 d-md-flex d-none flex-column align-items-md-center logo1">
                                    <Link to="/"><span>Saffron</span></Link>
                                </div>
                                <div className="col-md-5 menu2 d-md-block d-none pt-lg-3">
                                    <Link to="/VideoGallery">VIDEOS</Link>
                                    {!isLoggedIn() && <Link className="ml-md-3 ml-lg-5" to="/login">SIGN IN</Link>}
                                    {isLoggedIn() &&  <Link className="ml-md-3 ml-lg-5" onClick={this.handleLogout} to="/">SIGN OUT</Link>}
                                    {!isLoggedIn() && <Link to="/Registration" className="ml-md-3 ml-lg-5">SIGN UP</Link>}
                                    {isLoggedIn() && <Link to="/Profile/UserProfile" className="ml-md-3 ml-lg-5">SETTING</Link>}
                                    <a href="#" className="ml-lg-5 ml-md-3">CONTACT</a>
                                </div>
                            </div>
                        </div>
                    </nav>
                </header>
                {this.props.children}
                {(this.props.BasketVisible === true && BasketProductCount > 0) && <div id="ex3" onClick={this.BasketClick}>
                    <span className="p1 fa-stack fa-5x has-badge" data-count={BasketProductCount}>
                    <i className="p2 fa fa-circle fa-stack-2x"></i>
                    <i className="p3 fa fa-shopping-cart fa-stack-1x fa-inverse" data-count="5"></i>
                    </span>
                </div>}
                <Footer/>
                {this.props.Loading && <Loader/>}
                {this.state.orderPlace && <SuccessLoader/>}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const {websiteReducer, authReducer} = state;
    return {
        Loading: websiteReducer.Loading,
        error_msg: websiteReducer.error_msg,
        success_msg:websiteReducer.success_msg,
        userAvatar: authReducer.userAvatar,
        BasketGeneratorProducts: websiteReducer.BasketGeneratorProducts,
        BasketVisible: websiteReducer.BasketVisible
    };
};

const mapDispatchToProps = dispatch => ({
    actions: {
        websiteAction: bindActionCreators(websiteAction, dispatch)
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
