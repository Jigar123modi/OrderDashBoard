import axios from 'axios';
import ENVIRONMENT_VARIABLES from '../environment.config';
import {
    TEAM_INPROGRESS,
    TEAM_NOT_SUCCESS,
    TEAM_SUCCESS,
    TEAM_DELETE_SUCCESS,
    TEAM_ADD_SUCCESS,
    TEAM_EDIT_SUCCESS,
    TEAM_CONNECTION_ERROR,
    TEAM_DEFAULT_CLEAR,
} from '../constants/actionTypes';

export const TeamList = () => {
    try {
        return (dispatch) => {
            dispatch({type: TEAM_INPROGRESS});
            const token = "Bearer " + localStorage.getItem('accessToken');

            let api = {
                method: 'GET',
                headers: {'Authorization': token},
                url: ENVIRONMENT_VARIABLES.API_URL + "/Teams"
            };

            axios(api).then((response) => {
                if (response.status === 200) {
                    dispatch({type: TEAM_SUCCESS, data: response.data});
                }
            }).catch((error) => {
                if (error && error.response && (error.response.status === 400 || error.response.status === 403 || error.response.status === 401)) {
                    dispatch({type: TEAM_NOT_SUCCESS, data: {error_msg: error.response.data.user_msg}});
                } else {
                    dispatch({type: TEAM_CONNECTION_ERROR, data: {error_msg: error.message.toString()}});
                }
            });
        }
    } catch (error) {
        alert(error.message.toString());
    }
};

export const TeamDelete = (ServiceId) => {
    try {
        return (dispatch) => {
            dispatch({type: TEAM_INPROGRESS});
            const token = "Bearer " + localStorage.getItem('accessToken');

            let api = {
                method: 'DELETE',
                headers: {'Authorization': token},
                url: ENVIRONMENT_VARIABLES.API_URL + "/Teams/" + ServiceId
            };

            axios(api).then((response) => {
                if (response.status === 200) {
                    dispatch({type: TEAM_DELETE_SUCCESS, data: response.data});
                }
            }).catch((error) => {
                if (error && error.response && (error.response.status === 400 || error.response.status === 403 || error.response.status === 401)) {
                    dispatch({type: TEAM_NOT_SUCCESS, data: {error_msg: error.response.data.user_msg}});
                } else {
                    dispatch({type: TEAM_CONNECTION_ERROR, data: {error_msg: error.message.toString()}});
                }
            });
        }
    } catch (error) {
        alert(error.message.toString());
    }
};

export const AddTeam = (Team) => {
    try {
        return (dispatch) => {
            dispatch({type: TEAM_INPROGRESS});
            const token = "Bearer " + localStorage.getItem('accessToken');

            let bodyFormData = new FormData();
            bodyFormData.set('first_name', Team.first_name);
            bodyFormData.set('last_name', Team.last_name);
            bodyFormData.set('description', Team.description);
            bodyFormData.set('displayOrder', Team.displayOrder);
            bodyFormData.set('mobile_number', Team.mobile_number);
            bodyFormData.append('filetoupload', Team.filetoupload);

            let api = {
                method: 'POST',
                headers: {'Authorization': token},
                url: ENVIRONMENT_VARIABLES.API_URL + "/Teams",
                data: bodyFormData,
                config: {headers: {'Content-Type': 'multipart/form-data'}}
            };

            axios(api).then((response) => {
                if (response.status === 200) {
                    dispatch({type: TEAM_ADD_SUCCESS, data: response.data});
                }
            }).catch((error) => {
                if (error && error.response && (error.response.status === 400 || error.response.status === 403 || error.response.status === 401)) {
                    dispatch({type: TEAM_NOT_SUCCESS, data: {error_msg: error.response.data.user_msg}});
                } else {
                    dispatch({type: TEAM_CONNECTION_ERROR, data: {error_msg: error.message.toString()}});
                }
            });
        }
    } catch (error) {
        alert(error.message.toString());
    }
};

export const EditTeam = (Team) => {
    try {
        return (dispatch) => {
            dispatch({type: TEAM_INPROGRESS});
            const token = "Bearer " + localStorage.getItem('accessToken');

            let bodyFormData = new FormData();
            bodyFormData.set('id', Team.id);
            bodyFormData.set('first_name', Team.first_name);
            bodyFormData.set('last_name', Team.last_name);
            bodyFormData.set('description', Team.description);

            if (Team.filetoupload !== null || Team.filetoupload !== "")
                bodyFormData.append('filetoupload', Team.filetoupload);

            let api = {
                method: 'PUT',
                headers: {'Authorization': token},
                url: ENVIRONMENT_VARIABLES.API_URL + "/Teams",
                data: bodyFormData,
                config: {headers: {'Content-Type': 'multipart/form-data'}}
            };

            axios(api).then((response) => {
                if (response.status === 200) {
                    dispatch({type: TEAM_EDIT_SUCCESS, data: response.data});
                }
            }).catch((error) => {
                if (error && error.response && (error.response.status === 400 || error.response.status === 403 || error.response.status === 401)) {
                    dispatch({type: TEAM_NOT_SUCCESS, data: {error_msg: error.response.data.user_msg}});
                } else {
                    dispatch({type: TEAM_CONNECTION_ERROR, data: {error_msg: error.message.toString()}});
                }
            });
        }
    } catch (error) {
        alert(error.message.toString());
    }
};

export const DefaultMessageClear = () => {
    try {
        return (dispatch) => {
            dispatch({type: TEAM_DEFAULT_CLEAR});
        }
    } catch (error) {
        alert(error.message.toString());
    }
};

