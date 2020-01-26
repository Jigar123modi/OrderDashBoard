import {
    ANALYTICS_INPROGRESS,
    ANALYTICS_CONNECTION_ERROR,
    ANALYTICS_SUCCESS,
    ANALYTICS_NOT_SUCCESS,
    ANALYTICS_DEFAULT_CLEAR
} from '../constants/actionTypes';


import initialState from './initialState';

export default function manageAnalyticsReducer(state = initialState.manageAnalyticsReducer, action) {
    switch (action.type) {

        case ANALYTICS_DEFAULT_CLEAR:
            return Object.assign({}, state, {error_msg: null, success_msg: null});

        case ANALYTICS_INPROGRESS:
            return Object.assign({}, state, {Loading: true, error_msg: null, success_msg: null});

        case ANALYTICS_CONNECTION_ERROR:
            return Object.assign({}, state, {
                Loading: false,
                error_msg: action.data.error_msg,
                success_msg: null
            });

        case ANALYTICS_NOT_SUCCESS:
            return Object.assign({}, state, {
                error_msg: action.data.error_msg,
                Loading: false,
                success_msg: null,
            });

        case ANALYTICS_SUCCESS:
            return Object.assign({}, state, {
                topUsers: action.data[0].data,
                getTotalBillablePrice: action.data[1].data,
                getOrderStatusReport: action.data[2].data,
                getTeamWiseOrderStatusReport: action.data[3].data,
                Loading: false,
                error_msg: null,
                success_msg: null,
            });

        default:
            return state;
    }
};
