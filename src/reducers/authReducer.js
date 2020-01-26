import {browserHistory} from 'react-router';
import decode from 'jwt-decode';
import {
    INVALID_USER,
    AUTHENTICATION_INPROGRESS,
    IS_AUTHENTICATED,
    UNAUTHORIZED_USER,
    CONNECTION_ERROR,
    PASSWORD_CHANGE_INPROGRESS,
    PASSWORD_CHANGE_NOT_SUCCESS,
    PASSWORD_CHANGE_SUCCESS,
    PASSWORD_CONNECTION_ERROR,
    REGISTRATION_SUCCESS,
    REGISTRATION_NOT_SUCCESS,
    REGISTRATION_INPROGRESS,
    USERPROFILE_DEFAULT_CLEAR,
} from '../constants/actionTypes';
import _ from 'lodash';

import initialState from './initialState';
import ENVIRONMENT_VARIABLES from "../environment.config";

export default function authReducer(state = initialState.authReducer, action) {
    switch (action.type) {

        case USERPROFILE_DEFAULT_CLEAR:
            return Object.assign({}, state, {error_msg: null, successMsg: null});

        case INVALID_USER:
            return Object.assign({}, state, {invalidUser: true, loading: false, error_msg: action.data.error_msg});

        case AUTHENTICATION_INPROGRESS:
            return Object.assign({}, state, {invalidUser: false, loading: true});

        case IS_AUTHENTICATED:
            let userProfile = decode(action.data.accessToken);
            let userAvatar = userProfile.user.image_url;

            localStorage.setItem("accessToken", action.data.accessToken);
            localStorage.setItem("userProfile", JSON.stringify(userProfile.user));
            localStorage.setItem("userAvatar", userAvatar);
            let isAuthenticated = _.cloneDeep({
                isAuthenticated: true,
                loading: false,
                accessToken: action.data.accessToken,
                userProfile: userProfile.user,
                userAvatar: userAvatar
            });
            return Object.assign({}, state, isAuthenticated);

        case UNAUTHORIZED_USER:
            localStorage.removeItem('accessToken');
            localStorage.removeItem('userProfile');
            localStorage.removeItem('userAvatar');
            localStorage.clear();
            browserHistory.push('/Login');
            return Object.assign({}, initialState, {loading: false});


        case CONNECTION_ERROR:
            return Object.assign({}, state, {invalidUser: true, loading: false, error_msg: action.data.error_msg});

        case PASSWORD_CHANGE_INPROGRESS:
            return Object.assign({}, state, {isPasswordChanged: false, changePasswordLoading: true});

        case PASSWORD_CHANGE_NOT_SUCCESS:
            return Object.assign({}, state, {
                isPasswordChanged: false,
                error_msg: action.data.user_msg,
                changePasswordLoading: false
            });

        case PASSWORD_CHANGE_SUCCESS:

            localStorage.removeItem('accessToken');
            localStorage.removeItem('userProfile');
            localStorage.removeItem('userAvatar');
            localStorage.clear();

            userProfile = decode(action.data.accessToken);
            userAvatar = userProfile.user.image_url;

            localStorage.setItem("accessToken", action.data.accessToken);
            localStorage.setItem("userProfile", JSON.stringify(userProfile.user));
            localStorage.setItem("userAvatar", userAvatar);

            return Object.assign({}, state, {
                isPasswordChanged: true,
                successMsg: action.data.result,
                changePasswordLoading: false,
                userProfile: userProfile.user,
                userAvatar: userAvatar,
            });

        case PASSWORD_CONNECTION_ERROR:
            return Object.assign({}, state, {
                isPasswordChanged: false,
                error_msg: action.data.error_msg,
                changePasswordLoading: false
            });

        case REGISTRATION_INPROGRESS:
            return Object.assign({}, state, {isRegistration: false, loading: true});

        case REGISTRATION_NOT_SUCCESS:
            return Object.assign({}, state, {
                isRegistration: false,
                error_msg: action.data.error_msg,
                loading: false
            });

        case REGISTRATION_SUCCESS:

            const BasketGeneratorProducts = localStorage.getItem('BasketGeneratorProducts');
            localStorage.removeItem('accessToken');
            localStorage.removeItem('userProfile');
            localStorage.removeItem('userAvatar');
            localStorage.clear();


            userProfile = decode(action.data.accessToken);

            if (userProfile.user.image_url !== "")
                userAvatar = userProfile.user.image_url;
            else {
                userAvatar = "images/UserAvatar/demo.png";
                userProfile.user.image_url = userAvatar;
            }

            localStorage.setItem("accessToken", action.data.accessToken);
            localStorage.setItem("userProfile", JSON.stringify(userProfile.user));
            localStorage.setItem("userAvatar", userAvatar);
            localStorage.setItem("BasketGeneratorProducts", BasketGeneratorProducts);

            return Object.assign({}, state, {
                isRegistration: true,
                accessToken: action.data.accessToken,
                userAvatar: userAvatar,
                userProfile: userProfile.user,
                success_msg: action.data.result,
                loading: false
            });

        default:
            return state;
    }
};
