import axios from 'axios';
import ENVIRONMENT_VARIABLES from '../environment.config';
import {
    PRODUCT_INPROGRESS,
    PRODUCT_NOT_SUCCESS,
    PRODUCT_SUCCESS,
    TEAM_MEMBER_PRODUCT_SUCCESS,
    PRODUCT_EDIT_SUCCESS,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_ADD_SUCCESS,
    PRODUCT_CONNECTION_ERROR,
    PRODUCT_DEFAULT_CLEAR,
} from '../constants/actionTypes';

export const ProductList = () => {
    try {
        return (dispatch) => {
            dispatch({type: PRODUCT_INPROGRESS});
            const token = "Bearer " + localStorage.getItem('accessToken');

            let api = {
                method: 'GET',
                headers: {'Authorization': token},
                url: ENVIRONMENT_VARIABLES.API_URL + "/Products/allProduct"
            };

            axios(api).then((response) => {
                if (response.status === 200) {
                    dispatch({type: PRODUCT_SUCCESS, data: response.data});
                }
            }).catch((error) => {
                if (error && error.response && (error.response.status === 400 || error.response.status === 403 || error.response.status === 401)) {
                    dispatch({type: PRODUCT_NOT_SUCCESS, data: {error_msg: error.response.data.user_msg}});
                } else {
                    dispatch({type: PRODUCT_CONNECTION_ERROR, data: {error_msg: error.message.toString()}});
                }
            });
        }
    } catch (error) {
        alert(error.message.toString());
    }
};

export const TeamMemberProductList = (teamMemberId) => {
    try {
        return (dispatch) => {
            dispatch({type: PRODUCT_INPROGRESS});
            const token = "Bearer " + localStorage.getItem('accessToken');

            let api = {
                method: 'GET',
                headers: {'Authorization': token},
                url: ENVIRONMENT_VARIABLES.API_URL + "/TeamMemberProducts/" + teamMemberId
            };

            axios(api).then((response) => {
                if (response.status === 200) {
                    dispatch({type: TEAM_MEMBER_PRODUCT_SUCCESS, data: response.data});
                }
            }).catch((error) => {
                if (error && error.response && (error.response.status === 400 || error.response.status === 403 || error.response.status === 401)) {
                    dispatch({type: PRODUCT_NOT_SUCCESS, data: {error_msg: error.response.data.user_msg}});
                } else {
                    dispatch({type: PRODUCT_CONNECTION_ERROR, data: {error_msg: error.message.toString()}});
                }
            });
        }
    } catch (error) {
        alert(error.message.toString());
    }
};

export const DeleteProduct = (ProductId) => {
    try {
        return (dispatch) => {
            dispatch({type: PRODUCT_INPROGRESS});
            const token = "Bearer " + localStorage.getItem('accessToken');

            let api = {
                method: 'DELETE',
                headers: {'Authorization': token},
                url: ENVIRONMENT_VARIABLES.API_URL + "/Products/" + ProductId
            };

            axios(api).then((response) => {
                if (response.status === 200) {
                    dispatch({type: PRODUCT_DELETE_SUCCESS, data: response.data});
                }
            }).catch((error) => {
                if (error && error.response && (error.response.status === 400 || error.response.status === 403 || error.response.status === 401)) {
                    dispatch({type: PRODUCT_NOT_SUCCESS, data: {error_msg: error.response.data.user_msg}});
                } else {
                    dispatch({type: PRODUCT_CONNECTION_ERROR, data: {error_msg: error.message.toString()}});
                }
            });
        }
    } catch (error) {
        alert(error.message.toString());
    }
};

export const AddProduct = (Product) => {
    try {
        return (dispatch) => {
            dispatch({type: PRODUCT_INPROGRESS});
            const token = "Bearer " + localStorage.getItem('accessToken');

            let bodyFormData = new FormData();
            bodyFormData.set('service_id', Product.service_id);
            bodyFormData.set('title', Product.title);
            bodyFormData.set('description', Product.description);
            bodyFormData.set('price', Product.price);
            bodyFormData.set('offerPrice', Product.offerPrice);
            bodyFormData.set('sex', Product.sex);
            bodyFormData.append('filetoupload', Product.filetoupload);

            let api = {
                method: 'POST',
                headers: {'Authorization': token},
                url: ENVIRONMENT_VARIABLES.API_URL + "/Products",
                data: bodyFormData,
                config: {headers: {'Content-Type': 'multipart/form-data'}}
            };

            axios(api).then((response) => {
                if (response.status === 200) {
                    dispatch({type: PRODUCT_ADD_SUCCESS, data: response.data});
                }
            }).catch((error) => {
                if (error && error.response && (error.response.status === 400 || error.response.status === 403 || error.response.status === 401)) {
                    dispatch({type: PRODUCT_NOT_SUCCESS, data: {error_msg: error.response.data.user_msg}});
                } else {
                    dispatch({type: PRODUCT_CONNECTION_ERROR, data: {error_msg: error.message.toString()}});
                }
            });
        }
    } catch (error) {
        alert(error.message.toString());
    }
};

export const EditProduct = (Product) => {
    try {
        return (dispatch) => {
            dispatch({type: PRODUCT_INPROGRESS});
            const token = "Bearer " + localStorage.getItem('accessToken');

            let bodyFormData = new FormData();
            bodyFormData.set('title', Product.title);
            bodyFormData.set('description', Product.description);
            bodyFormData.set('id', Product.id);
            bodyFormData.set('service_id', Product.service_id);
            bodyFormData.set('sex', Product.sex);
            bodyFormData.set('price', Product.price);
            bodyFormData.set('offerPrice', Product.offerPrice);

            if (Product.filetoupload !== "" || Product.filetoupload !== null)
                bodyFormData.append('filetoupload', Product.filetoupload);

            let api = {
                method: 'PUT',
                headers: {'Authorization': token},
                url: ENVIRONMENT_VARIABLES.API_URL + "/Products",
                data: bodyFormData,
                config: {headers: {'Content-Type': 'multipart/form-data'}}
            };

            axios(api).then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: PRODUCT_EDIT_SUCCESS,
                        data: response.data,
                        selectedServiceId: Product.selectedServiceId
                    });
                }
            }).catch((error) => {
                if (error && error.response && (error.response.status === 400 || error.response.status === 403 || error.response.status === 401)) {
                    dispatch({type: PRODUCT_NOT_SUCCESS, data: {error_msg: error.response.data.user_msg}});
                } else {
                    dispatch({type: PRODUCT_CONNECTION_ERROR, data: {error_msg: error.message.toString()}});
                }
            });
        }
    } catch (error) {
        alert(error.message.toString());
    }
};

export const TeamMemberProductAddRemove = (Product, action) => {
    try {
        return (dispatch) => {
            let token = "Bearer " + localStorage.getItem('accessToken');
            let api = {
                method: 'POST',
                headers: {'Authorization': token},
                data: Product,
                url: ENVIRONMENT_VARIABLES.API_URL + "/TeamMemberProducts/" + action
            };
            return axios(api);
        };
    } catch (error) {
        alert(error.message.toString());
    }
};

export const DefaultMessageClear = () => {
    try {
        return (dispatch) => {
            dispatch({type: PRODUCT_DEFAULT_CLEAR});
        }
    } catch (error) {
        alert(error.message.toString());
    }
};


