import axios from 'axios';
import ENVIRONMENT_VARIABLES from '../environment.config';
import {
    USER_INPROGRESS,
    USER_CHANGE_NOT_SUCCESS,
    USER_SUCCESS,
    USER_CONNECTION_ERROR,
    USER_BLOCK_SUCCESS,
    USER_BLOCK_NOT_SUCCESS,
    USER_DELETE_SUCCESS,
    USER_DELETE_NOT_SUCCESS,
    USER_DEFAULT_CLEAR,
} from '../constants/actionTypes';

export const UserList = (contactNo = null) => {
    try {
        return (dispatch) => {
            dispatch({type: USER_INPROGRESS});
            const token = "Bearer " + localStorage.getItem('accessToken');

            let api;

            if (contactNo === null) {
                api = {
                    method: 'GET',
                    headers: {'Authorization': token},
                    url: ENVIRONMENT_VARIABLES.API_URL + "/oauths"
                };
            } else {
                api = {
                    method: 'GET',
                    headers: {'Authorization': token},
                    url: ENVIRONMENT_VARIABLES.API_URL + "/oauths/" + contactNo
                };
            }

            axios(api).then((response) => {
                if (response.status === 200) {
                    dispatch({type: USER_SUCCESS, data: response.data});
                }
            }).catch((error) => {
                if (error && error.response && (error.response.status === 400 || error.response.status === 403 || error.response.status === 401)) {
                    dispatch({type: USER_CHANGE_NOT_SUCCESS, data: {error_msg: error.response.data.user_msg}});
                } else {
                    dispatch({type: USER_CONNECTION_ERROR, data: {error_msg: error.message.toString()}});
                }
            });
        }
    } catch (error) {
        alert(error.message.toString());
    }
};

export const changeUserBlockStatus = (UserData) => {
    try {
        return (dispatch) => {
            dispatch({type: USER_INPROGRESS});
            const token = "Bearer " + localStorage.getItem('accessToken');

            const api = {
                method: 'POST',
                headers: {'Authorization': token},
                data: UserData,
                url: ENVIRONMENT_VARIABLES.API_URL + "/oauths/changeUserBlockStatus"
            };

            axios(api).then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: USER_BLOCK_SUCCESS,
                        data: response.data
                    });
                }
            }).catch((error) => {
                if (error.response) {
                    dispatch({type: USER_BLOCK_NOT_SUCCESS, data: {error_msg: error.response.data.user_msg}});
                } else {
                    dispatch({type: USER_BLOCK_NOT_SUCCESS, data: {error_msg: error.message.toString()}});
                }
            });
        }
    } catch (error) {
        alert(error.message.toString());
    }
};

export const deleteUser = (userId) => {
    try{
        return (dispatch) => {
            dispatch({type: USER_INPROGRESS});
            const token = "Bearer " + localStorage.getItem('accessToken');
            const api = {
                method: 'DELETE',
                headers: {'Authorization': token},
                url: ENVIRONMENT_VARIABLES.API_URL + "/oauths/" + userId
            };

            axios(api).then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: USER_DELETE_SUCCESS,
                        data: response.data
                    });
                }
            }).catch((error) => {
                if (error.response) {
                    dispatch({type: USER_DELETE_NOT_SUCCESS, data: {error_msg: error.response.data.user_msg}});
                } else {
                    dispatch({type: USER_DELETE_NOT_SUCCESS, data: {error_msg: error.message.toString()}});
                }
            });
        }
    }catch (error){
        alert(error.message.toString());
    }
};

export const DefaultMessageClear = () => {
    try {
        return (dispatch) => {
            dispatch({type: USER_DEFAULT_CLEAR});
        }
    } catch (error) {
        alert(error.message.toString());
    }
};
