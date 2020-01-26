import axios from 'axios';
import ENVIRONMENT_VARIABLES from '../environment.config';
import {
    GALLERY_INPROGRESS,
    GALLERY_NOT_SUCCESS,
    GALLERY_SUCCESS,
    GALLERY_DELETE_SUCCESS,
    GALLERY_ADD_SUCCESS,
    GALLERY_EDIT_SUCCESS,
    GALLERY_CONNECTION_ERROR,
    GALLERY_DEFAULT_CLEAR,
} from '../constants/actionTypes';

export const GalleryList = (serviceId) => {
    try {
        return (dispatch) => {
            dispatch({type: GALLERY_INPROGRESS});
            const token = "Bearer " + localStorage.getItem('accessToken');

            let api = {
                method: 'GET',
                headers: {'Authorization': token},
                url: ENVIRONMENT_VARIABLES.API_URL + "/Gallerys/all/" + serviceId
            };

            axios(api).then((response) => {
                if (response.status === 200) {
                    dispatch({type: GALLERY_SUCCESS, data: response.data});
                }
            }).catch((error) => {
                if (error && error.response && (error.response.status === 400 || error.response.status === 403 || error.response.status === 401)) {
                    dispatch({type: GALLERY_NOT_SUCCESS, data: {error_msg: error.response.data.user_msg}});
                } else {
                    dispatch({type: GALLERY_CONNECTION_ERROR, data: {error_msg: error.message.toString()}});
                }
            });
        }
    } catch (error) {
        alert(error.message.toString());
    }
};

export const GalleryDelete = (ServiceId) => {
    try {
        return (dispatch) => {
            dispatch({type: GALLERY_INPROGRESS});
            const token = "Bearer " + localStorage.getItem('accessToken');

            let api = {
                method: 'DELETE',
                headers: {'Authorization': token},
                url: ENVIRONMENT_VARIABLES.API_URL + "/Gallerys/" + ServiceId
            };

            axios(api).then((response) => {
                if (response.status === 200) {
                    dispatch({type: GALLERY_DELETE_SUCCESS, data: response.data});
                }
            }).catch((error) => {
                if (error && error.response && (error.response.status === 400 || error.response.status === 403 || error.response.status === 401)) {
                    dispatch({type: GALLERY_NOT_SUCCESS, data: {error_msg: error.response.data.user_msg}});
                } else {
                    dispatch({type: GALLERY_CONNECTION_ERROR, data: {error_msg: error.message.toString()}});
                }
            });
        }
    } catch (error) {
        alert(error.message.toString());
    }
};

export const AddGallery = (Gallery) => {
    try {
        return (dispatch) => {
            dispatch({type: GALLERY_INPROGRESS});
            const token = "Bearer " + localStorage.getItem('accessToken');

            let bodyFormData = new FormData();
            bodyFormData.set('title', Gallery.title);
            bodyFormData.set('description', Gallery.description);
            bodyFormData.set('service_id', Gallery.service_id);
            bodyFormData.set('sex', Gallery.sex);
            bodyFormData.append('filetoupload', Gallery.filetoupload);

            let api = {
                method: 'POST',
                headers: {'Authorization': token},
                url: ENVIRONMENT_VARIABLES.API_URL + "/Gallerys",
                data: bodyFormData,
                config: {headers: {'Content-Type': 'multipart/form-data'}}
            };

            axios(api).then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: GALLERY_ADD_SUCCESS,
                        data: response.data,
                        selectedServiceId: Gallery.selectedServiceId
                    });
                }
            }).catch((error) => {
                if (error && error.response && (error.response.status === 400 || error.response.status === 403 || error.response.status === 401)) {
                    dispatch({type: GALLERY_NOT_SUCCESS, data: {error_msg: error.response.data.user_msg}});
                } else {
                    dispatch({type: GALLERY_CONNECTION_ERROR, data: {error_msg: error.message.toString()}});
                }
            });
        }
    } catch (error) {
        alert(error.message.toString());
    }
};

export const EditGallery = (Gallery) => {
    try {
        return (dispatch) => {
            dispatch({type: GALLERY_INPROGRESS});
            const token = "Bearer " + localStorage.getItem('accessToken');

            let bodyFormData = new FormData();
            bodyFormData.set('title', Gallery.title);
            bodyFormData.set('description', Gallery.description);
            bodyFormData.set('id', Gallery.id);
            bodyFormData.set('service_id', Gallery.service_id);
            bodyFormData.set('sex', Gallery.sex);
            if (Gallery.filetoupload !== "" || Gallery.filetoupload !== null)
                bodyFormData.append('filetoupload', Gallery.filetoupload);

            let api = {
                method: 'PUT',
                headers: {'Authorization': token},
                url: ENVIRONMENT_VARIABLES.API_URL + "/Gallerys",
                data: bodyFormData,
                config: {headers: {'Content-Type': 'multipart/form-data'}}
            };

            axios(api).then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: GALLERY_EDIT_SUCCESS,
                        data: response.data,
                        selectedServiceId: Gallery.selectedServiceId
                    });
                }
            }).catch((error) => {
                if (error && error.response && (error.response.status === 400 || error.response.status === 403 || error.response.status === 401)) {
                    dispatch({type: GALLERY_NOT_SUCCESS, data: {error_msg: error.response.data.user_msg}});
                } else {
                    dispatch({type: GALLERY_CONNECTION_ERROR, data: {error_msg: error.message.toString()}});
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
            dispatch({type: GALLERY_DEFAULT_CLEAR});
        }
    } catch (error) {
        alert(error.message.toString());
    }
};
