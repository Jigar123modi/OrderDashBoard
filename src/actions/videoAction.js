import axios from 'axios';
import ENVIRONMENT_VARIABLES from '../environment.config';
import {
    VIDEO_INPROGRESS,
    VIDEO_NOT_SUCCESS,
    VIDEO_SUCCESS,
    VIDEO_DELETE_SUCCESS,
    VIDEO_ADD_SUCCESS,
    VIDEO_EDIT_SUCCESS,
    VIDEO_CONNECTION_ERROR,
    VIDEO_DEFAULT_CLEAR,
} from '../constants/actionTypes';

export const VideoList = (serviceId) => {
    try {
        return (dispatch) => {
            dispatch({type: VIDEO_INPROGRESS});
            const token = "Bearer " + localStorage.getItem('accessToken');

            let api = {
                method: 'GET',
                headers: {'Authorization': token},
                url: ENVIRONMENT_VARIABLES.API_URL + "/Videos/all/" + serviceId
            };

            axios(api).then((response) => {
                if (response.status === 200) {
                    dispatch({type: VIDEO_SUCCESS, data: response.data});
                }
            }).catch((error) => {
                if (error && error.response && (error.response.status === 400 || error.response.status === 403 || error.response.status === 401)) {
                    dispatch({type: VIDEO_NOT_SUCCESS, data: {error_msg: error.response.data.user_msg}});
                } else {
                    dispatch({type: VIDEO_CONNECTION_ERROR, data: {error_msg: error.message.toString()}});
                }
            });
        }
    } catch (error) {
        alert(error.message.toString());
    }
};

export const VideoDelete = (VideoId) => {
    try {
        return (dispatch) => {
            dispatch({type: VIDEO_INPROGRESS});
            const token = "Bearer " + localStorage.getItem('accessToken');

            let api = {
                method: 'DELETE',
                headers: {'Authorization': token},
                url: ENVIRONMENT_VARIABLES.API_URL + "/Videos/" + VideoId
            };

            axios(api).then((response) => {
                if (response.status === 200) {
                    dispatch({type: VIDEO_DELETE_SUCCESS, data: response.data});
                }
            }).catch((error) => {
                if (error && error.response && (error.response.status === 400 || error.response.status === 403 || error.response.status === 401)) {
                    dispatch({type: VIDEO_NOT_SUCCESS, data: {error_msg: error.response.data.user_msg}});
                } else {
                    dispatch({type: VIDEO_CONNECTION_ERROR, data: {error_msg: error.message.toString()}});
                }
            });
        }
    } catch (error) {
        alert(error.message.toString());
    }
};

export const AddVideo = (Video) => {
    try {
        return (dispatch) => {
            dispatch({type: VIDEO_INPROGRESS});
            const token = "Bearer " + localStorage.getItem('accessToken');

            let request = {
                service_id: Video.service_id,
                video_url: Video.video_url,
                title: Video.title,
                description: Video.description,
                sex: Video.sex
            };

            let api = {
                method: 'POST',
                headers: {'Authorization': token},
                url: ENVIRONMENT_VARIABLES.API_URL + "/Videos",
                data: request,
            };

            axios(api).then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: VIDEO_ADD_SUCCESS,
                        data: response.data,
                        selectedServiceId: Video.selectedServiceId
                    });
                }
            }).catch((error) => {
                if (error && error.response && (error.response.status === 400 || error.response.status === 403 || error.response.status === 401)) {
                    dispatch({type: VIDEO_NOT_SUCCESS, data: {error_msg: error.response.data.user_msg}});
                } else {
                    dispatch({type: VIDEO_CONNECTION_ERROR, data: {error_msg: error.message.toString()}});
                }
            });
        }
    } catch (error) {
        alert(error.message.toString());
    }
};

export const EditVideo = (Video) => {
    try {
        return (dispatch) => {
            dispatch({type: VIDEO_INPROGRESS});
            const token = "Bearer " + localStorage.getItem('accessToken');

            let request = {
                id: Video.id,
                service_id: Video.service_id,
                video_url: Video.video_url,
                title: Video.title,
                description: Video.description,
                sex: Video.sex
            };

            let api = {
                method: 'PUT',
                headers: {'Authorization': token},
                url: ENVIRONMENT_VARIABLES.API_URL + "/Videos",
                data: request,
            };

            axios(api).then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: VIDEO_EDIT_SUCCESS,
                        data: response.data,
                        selectedServiceId: Video.selectedServiceId
                    });
                }
            }).catch((error) => {
                if (error && error.response && (error.response.status === 400 || error.response.status === 403 || error.response.status === 401)) {
                    dispatch({type: VIDEO_NOT_SUCCESS, data: {error_msg: error.response.data.user_msg}});
                } else {
                    dispatch({type: VIDEO_CONNECTION_ERROR, data: {error_msg: error.message.toString()}});
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
            dispatch({type: VIDEO_DEFAULT_CLEAR});
        }
    } catch (error) {
        alert(error.message.toString());
    }
};
