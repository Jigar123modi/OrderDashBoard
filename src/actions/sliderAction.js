import axios from 'axios';
import ENVIRONMENT_VARIABLES from '../environment.config';
import {
    SLIDER_INPROGRESS,
    SLIDER_NOT_SUCCESS,
    SLIDER_SUCCESS,
    SLIDER_DELETE_SUCCESS,
    SLIDER_ADD_SUCCESS,
    SLIDER_CONNECTION_ERROR,
    SLIDER_DEFAULT_CLEAR,
} from '../constants/actionTypes';

export const SliderList = () => {
    try {
        return (dispatch) => {
            dispatch({type: SLIDER_INPROGRESS});
            const token = "Bearer " + localStorage.getItem('accessToken');

            let api = {
                method: 'GET',
                headers: {'Authorization': token},
                url: ENVIRONMENT_VARIABLES.API_URL + "/SliderImages"
            };

            axios(api).then((response) => {
                if (response.status === 200) {
                    dispatch({type: SLIDER_SUCCESS, data: response.data});
                }
            }).catch((error) => {
                if (error && error.response && (error.response.status === 400 || error.response.status === 403 || error.response.status === 401)) {
                    dispatch({type: SLIDER_NOT_SUCCESS, data: {error_msg: error.response.data.user_msg}});
                } else {
                    dispatch({type: SLIDER_CONNECTION_ERROR, data: {error_msg: error.message.toString()}});
                }
            });
        }
    } catch (error) {
        alert(error.message.toString());
    }
};

export const SliderDelete = (SliderId) => {
    try {
        return (dispatch) => {
            dispatch({type: SLIDER_INPROGRESS});
            const token = "Bearer " + localStorage.getItem('accessToken');

            let api = {
                method: 'DELETE',
                headers: {'Authorization': token},
                url: ENVIRONMENT_VARIABLES.API_URL + "/SliderImages/" + SliderId
            };

            axios(api).then((response) => {
                if (response.status === 200) {
                    dispatch({type: SLIDER_DELETE_SUCCESS, data: response.data});
                }
            }).catch((error) => {
                if (error && error.response && (error.response.status === 400 || error.response.status === 403 || error.response.status === 401)) {
                    dispatch({type: SLIDER_NOT_SUCCESS, data: {error_msg: error.response.data.user_msg}});
                } else {
                    dispatch({type: SLIDER_CONNECTION_ERROR, data: {error_msg: error.message.toString()}});
                }
            });
        }
    } catch (error) {
        alert(error.message.toString());
    }
};

export const AddSlider = (Slider) => {
    try {
        return (dispatch) => {
            dispatch({type: SLIDER_INPROGRESS});
            const token = "Bearer " + localStorage.getItem('accessToken');

            let bodyFormData = new FormData();
            bodyFormData.append('filetoupload', Slider.filetoupload);

            let api = {
                method: 'POST',
                headers: {'Authorization': token},
                url: ENVIRONMENT_VARIABLES.API_URL + "/SliderImages",
                data: bodyFormData,
                config: {headers: {'Content-Type': 'multipart/form-data'}}
            };

            axios(api).then((response) => {
                if (response.status === 200) {
                    dispatch({type: SLIDER_ADD_SUCCESS, data: response.data});
                }
            }).catch((error) => {
                if (error && error.response && (error.response.status === 400 || error.response.status === 403 || error.response.status === 401)) {
                    dispatch({type: SLIDER_NOT_SUCCESS, data: {error_msg: error.response.data.user_msg}});
                } else {
                    dispatch({type: SLIDER_CONNECTION_ERROR, data: {error_msg: error.message.toString()}});
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
            dispatch({type: SLIDER_DEFAULT_CLEAR});
        }
    } catch (error) {
        alert(error.message.toString());
    }
};
