import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import promise from 'redux-promise';
import decode from 'jwt-decode';

// application configuration.
import Website from './Website';
import DashBoard from './DashBoard';

import rootReducer from './reducers';
import initialState from '../src/reducers/initialState';
import NotFound from '../src/components/NotFound';
import Home from './components/Website/Home';
import Login from '../src/components/Login';
import Registration from '../src/components/Registration';
import Gallery from './components/Website/Gallery';
import ProductList from './components/Website/ProductList';
import VideoGalleryMain from './components/Website/VideoGallery';
import VideoGallery from './components/Website/VideoGallery/index1';
import Parents from './components/Helper/Profile/Parents';
import Profile from './components/Helper/Profile';
import TodayCompleteOrders from './components/Helper/Profile/TodayCompleteOrders';
import BasketItemsList from './components/Website/BasketItems/index';


//Admin
import AdminHome from './components/Admin/Home';
import ManageUser from './components/Admin/ManageUser';
import ManageService from './components/Admin/ManageService';
import ManageTeam from './components/Admin/ManageTeam';
import ManageGallery from './components/Admin/ManageGallery';
import ManageVideo from './components/Admin/ManageVideo';
import ManageProduct from './components/Admin/ManageProduct';
import ManageTeamMemberProduct from './components/Admin/ManageTeamMemberProduct';
import ManageSliderImage from './components/Admin/ManageSliderImage';
import ManageTimeSlot from './components/Admin/ManageTimeSlot';

import Analytics from './components/Admin/Analytics';

const composeEnhancers = composeWithDevTools({});
//const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(promise, logger)));
const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(thunk, promise, logger)));


function requireAdminAuth(nextState, replace) {
    if (!isLoggedIn()) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userProfile");
        localStorage.removeItem("userAvatar");
        localStorage.clear();
        replace({
            pathname: '/',
            state: {nextPathname: nextState.location.pathname}
        })
    } else {
        if (!checkAdminUserRole(getAccessToken())) {
            replace({
                pathname: '/',
                state: {nextPathname: nextState.location.pathname}
            })
        }
    }
}

function requireAdminEmployeeAuth(nextState, replace) {
    if (!isLoggedIn()) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userProfile");
        localStorage.removeItem("userAvatar");
        localStorage.clear();
        replace({
            pathname: '/',
            state: {nextPathname: nextState.location.pathname}
        })
    } else {
        if (!checkAdminEmployeeRole(getAccessToken())) {
            replace({
                pathname: '/',
                state: {nextPathname: nextState.location.pathname}
            })
        }
    }
}

function requireAdminEmployeeUserAuth(nextState, replace) {
    if (!isLoggedIn()) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userProfile");
        localStorage.removeItem("userAvatar");
        localStorage.clear();
        replace({
            pathname: '/',
            state: {nextPathname: nextState.location.pathname}
        })
    } else {
        if (!checkAdminEmployeeUserRole(getAccessToken())) {
            replace({
                pathname: '/',
                state: {nextPathname: nextState.location.pathname}
            })
        }
    }
}


export function isLoggedIn() {
    const accessToken = getAccessToken();
    return !!accessToken && !isTokenExpired(accessToken);
}

export function getAccessToken() {
    return localStorage.getItem("accessToken");
}

function isTokenExpired(token) {
    const expirationDate = getTokenExpirationDate(token);
    if (expirationDate < new Date()) {
        clearAccessToken();
    }
    return expirationDate < new Date();
}

function checkAdminEmployeeRole(token) {
    if (token) {
        const userProfile = decode(token);
        const userRole = userProfile.user && userProfile.user.role;
        if (userRole.toLowerCase() === "admin" || userRole.toLowerCase() === "employee") {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

function checkAdminEmployeeUserRole(token) {
    if (token) {
        const userProfile = decode(token);
        const userRole = userProfile.user && userProfile.user.role;
        if (userRole) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}


function checkAdminUserRole(token) {
    if (token) {
        const userProfile = decode(token);
        const userRole = userProfile.user && userProfile.user.role;
        if (userRole.toLowerCase() === "admin") {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }

}



export function GetLocalUderData() {
    const accessToken = getAccessToken();
    if (accessToken) {
        return decode(accessToken);
    } else {
        console.log('GetLocalUderData', null);
        return null;
    }

}


function getTokenExpirationDate(encodedToken) {
    try {
        if (encodedToken) {
            const token = decode(encodedToken);
            if (!token.exp) {
                return null;
            }
            const date = new Date(0);
            date.setUTCSeconds(token.exp);
            return date;
        } else {
            return null;
        }
    } catch (error) {
        return null
    }
}

export function clearAccessToken() {
    localStorage.removeItem("accessToken");
    localStorage.clear();
}


function checkLoggedIn(nextState, replace) {
    const accessToken = getAccessToken();
    if (accessToken) {
        try {
            const decodedToken = decode(accessToken);
            if (decodedToken.user.role.toLowerCase() === "admin" || decodedToken.user.role.toLowerCase() === "employee") {
                replace({
                    pathname: '/Dashboard',
                    state: {nextPathname: nextState.location.pathname}
                });
            } else {
                replace({
                    pathname: '/',
                    state: {nextPathname: nextState.location.pathname}
                });
            }
        } catch (error) {
            console.log(error);
        }
    }
}


ReactDOM.render(<Provider store={store}>
    <MuiThemeProvider>
        <Router history={browserHistory}>
            <Route component={DashBoard} path="/Dashboard" exact={true}>
                <IndexRoute component={AdminHome} onEnter={requireAdminEmployeeAuth}/>
                <Route path="/Dashboard/ManageUser" component={ManageUser} onEnter={requireAdminAuth} exact={true}/>
                <Route path="/Dashboard/Profile" component={Profile} onEnter={requireAdminEmployeeAuth} exact={true}/>
                <Route path="/Dashboard/ManageService" component={ManageService} onEnter={requireAdminAuth} exact={true}/>
                <Route path="/Dashboard/ManageTeam" component={ManageTeam} onEnter={requireAdminAuth} exact={true}/>
                <Route path="/Dashboard/ManageGallery" component={ManageGallery} onEnter={requireAdminAuth} exact={true}/>
                <Route path="/Dashboard/ManageVideo" component={ManageVideo} onEnter={requireAdminAuth} exact={true}/>
                <Route path="/Dashboard/ManageSliderImage" component={ManageSliderImage} onEnter={requireAdminAuth}
                       exact={true}/>
                <Route path="/Dashboard/ManageProducts" component={ManageProduct} onEnter={requireAdminAuth} exact={true}/>
                <Route path="/Dashboard/ManageTeamMemberProduct" component={ManageTeamMemberProduct}
                       onEnter={requireAdminAuth} exact={true}/>
                <Route path="/Dashboard/ManageTimeSlot" component={ManageTimeSlot}
                       onEnter={requireAdminAuth} exact={true}/>
                <Route path="/Dashboard/Analytics" component={Analytics} onEnter={requireAdminAuth} exact={true}/>
                <Route path="*" component={NotFound} exact={true}/>
            </Route>
            <Route path="/Login" component={Login} onEnter={checkLoggedIn} exact={true}/>
            <Route path="/Registration" component={Registration} onEnter={checkLoggedIn} exact={true}/>
            <Route component={Website} path="/" exact={true}>
                <IndexRoute component={Home}/>
                <Route path="/Gallery" component={Gallery} exact={true}/>
                <Route path="/Profile" component={Parents} onEnter={requireAdminEmployeeUserAuth} exact={true}>
                    <Route path="/Profile/UserProfile" component={Profile}/>
                    <Route path="/Profile/TodayCompleteOrders" component={TodayCompleteOrders}/>
                </Route>
                <Route path="/ProductList" component={ProductList} exact={true}/>
                <Route path="/BasketItems" component={BasketItemsList} exact={true}/>
                <Route path="/VideoGallery" component={VideoGalleryMain} exact={true}>
                    <Route path="/VideoGallery/demo" component={VideoGallery}/>
                </Route>
            </Route>
            <Route path="*" component={NotFound} exact={true}/>
        </Router>
    </MuiThemeProvider>
</Provider>, document.getElementById('root'));
registerServiceWorker();
