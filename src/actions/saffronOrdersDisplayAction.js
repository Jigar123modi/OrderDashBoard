import axios from 'axios';
import ENVIRONMENT_VARIABLES from '../environment.config';
import {GetLocalUderData} from '../index';

import {
    SOD_INPROGRESS,
    SOD_NOT_SUCCESS,
    SOD_SUCCESS,
    SOD_CONNECTION_ERROR,
    SOD_RECENT_MOVE_TO_PROGRESS,
    SOD_RUNNING_LATE_MOVE_TO_PROGRESS,
    SOD_RECENT_NEW_ORDER,
    SOD_MOVE_TO_RUNNING_LATE,
    SOD_MOVE_TO_PROCESSS_SUCCESS,
    SOD_RECENT_MOVE_TO_FINISH,
    SOD_FINISH_MOVE_TO_PAYMENT_FINISH
} from '../constants/actionTypes';

export const OrdersList = () => {
    try {
        return (dispatch) => {
            dispatch({type: SOD_INPROGRESS});
            const token = "Bearer " + localStorage.getItem('accessToken');
            const userProfile = GetLocalUderData().user;

            let URL = ENVIRONMENT_VARIABLES.API_URL + "/Bookings";
            //debugger;
            if (userProfile.role === "employee") {
                URL = ENVIRONMENT_VARIABLES.API_URL + "/Bookings/TeamMemberOrder/" + userProfile.id;
            }

            const api = {
                method: 'GET',
                headers: {'Authorization': token},
                url: URL
            };
            axios(api).then((response) => {
                if (response.status === 200) {
                    dispatch({type: SOD_SUCCESS, data: response.data});
                }
            }).catch((error) => {
                if (error && error.response && (error.response.status === 400 || error.response.status === 403 || error.response.status === 401)) {
                    dispatch({type: SOD_NOT_SUCCESS, data: {error_msg: error.response.data.user_msg}});
                } else {
                    dispatch({type: SOD_CONNECTION_ERROR, data: {error_msg: error.message.toString()}});
                }
            });
        }
    } catch (error) {
        alert(error.message.toString());
    }
};

export const MoveToProgress = (order) => {
    try {
        return (dispatch) => {
            if (order.orderType === "running late") {
                dispatch({
                    type: SOD_RUNNING_LATE_MOVE_TO_PROGRESS,
                    order
                });
            } else {
                dispatch({
                    type: SOD_RECENT_MOVE_TO_PROGRESS,
                    order
                });
            }
        }
    } catch (error) {
        alert(error.message.toString());
    }
};

export const MoveToFinish = (order) => {
    try {
        return (dispatch) => {
            dispatch({
                type: SOD_RECENT_MOVE_TO_FINISH,
                order
            });
        }
    } catch (error) {
        alert(error.message.toString());
    }
};

export const MoveToPaymentFinish = (order) => {
    try {
        return (dispatch) => {
            dispatch({
                type: SOD_FINISH_MOVE_TO_PAYMENT_FINISH,
                order
            });
        }
    } catch (error) {
        alert(error.message.toString());
    }
};

export const orderStatusUpdateRequest = (id, teamMemberId, orderType) => {
    try {
        return (dispatch) => {
            dispatch({type: SOD_INPROGRESS});
            const token = "Bearer " + localStorage.getItem('accessToken');

            let bodyFormData = {
                orderType
            };

            const api = {
                method: 'PUT',
                headers: {'Authorization': token},
                url: ENVIRONMENT_VARIABLES.API_URL + "/Bookings/" + id + "/teamMember/" + teamMemberId,
                data: bodyFormData,
            };
            axios(api).then((response) => {
                if (response.status === 200) {
                    dispatch({type: SOD_MOVE_TO_PROCESSS_SUCCESS, data: response.data});
                }
            }).catch((error) => {
                if (error && error.response && (error.response.status === 400 || error.response.status === 403 || error.response.status === 401)) {
                    dispatch({type: SOD_NOT_SUCCESS, data: {error_msg: error.response.data.user_msg}});
                } else {
                    dispatch({type: SOD_CONNECTION_ERROR, data: {error_msg: error.message.toString()}});
                }
            });
        }
    } catch (error) {
        alert(error.message.toString());
    }
};


export const orderStatusPaymentUpdateRequest = (id, orderType) => {
    try {
        return (dispatch) => {
            dispatch({type: SOD_INPROGRESS});
            const token = "Bearer " + localStorage.getItem('accessToken');

            let bodyFormData = {
                orderType
            };

            const api = {
                method: 'PUT',
                headers: {'Authorization': token},
                url: ENVIRONMENT_VARIABLES.API_URL + "/Bookings/" + id,
                data: bodyFormData,
            };
            axios(api).then((response) => {
                if (response.status === 200) {
                    dispatch({type: SOD_MOVE_TO_PROCESSS_SUCCESS, data: response.data});
                }
            }).catch((error) => {
                if (error && error.response && (error.response.status === 400 || error.response.status === 403 || error.response.status === 401)) {
                    dispatch({type: SOD_NOT_SUCCESS, data: {error_msg: error.response.data.user_msg}});
                } else {
                    dispatch({type: SOD_CONNECTION_ERROR, data: {error_msg: error.message.toString()}});
                }
            });
        }
    } catch (error) {
        alert(error.message.toString());
    }
};


export const MoveToRunningLate = (order) => {
    try {
        return (dispatch) => {
            dispatch({
                type: SOD_MOVE_TO_RUNNING_LATE,
                order
            });
        }
    } catch (error) {
        console.log(error);
    }
};


export const NewOrder = (order) => {
    try {
        return (dispatch) => {
            dispatch({
                type: SOD_RECENT_NEW_ORDER,
                order
            });
        }
    } catch (error) {
        alert(error.message.toString());
    }
};
