import axios from 'axios';
import ENVIRONMENT_VARIABLES from '../environment.config';
import {
    INVALID_USER,
    AUTHENTICATION_INPROGRESS,
    IS_AUTHENTICATED,
    CONNECTION_ERROR,
    PASSWORD_CHANGE_INPROGRESS,
    PASSWORD_CHANGE_SUCCESS,
    PASSWORD_CHANGE_NOT_SUCCESS,
    PASSWORD_CONNECTION_ERROR,
    REGISTRATION_INPROGRESS,
    REGISTRATION_NOT_SUCCESS,
    REGISTRATION_SUCCESS,
    USERPROFILE_DEFAULT_CLEAR,
} from '../constants/actionTypes';

export const loginUser = (credentials) => {
    try {
        return (dispatch) => {
            const loginDetails = {
                "userId": credentials.mobile_number,
                "password": credentials.password
            };
            dispatch({type: AUTHENTICATION_INPROGRESS});
            axios.post(ENVIRONMENT_VARIABLES.API_URL + "/oauths/login", loginDetails).then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: IS_AUTHENTICATED,
                        data: {accessToken: response.data.accessToken}
                    });
                }
            }).catch((error) => {
                if (error.response) {
                    dispatch({type: INVALID_USER, data: {error_msg: error.response.data.user_msg}});
                } else {
                    dispatch({type: CONNECTION_ERROR, data: {error_msg: error.message.toString()}});
                }
            });
        }
    } catch (error) {
    }
};

export const registrationUser = (credentials) => {
    try {
        return (dispatch) => {
            const RegistrationDetails = {
                "first_name": credentials.first_name,
                "last_name": credentials.last_name,
                "mobile_number": credentials.mobile_number,
                "password": credentials.password,
                "confirm_password": credentials.confirm_password,
                "email": "",
                "role": "user"
            };
            dispatch({type: REGISTRATION_INPROGRESS});
            axios.post(ENVIRONMENT_VARIABLES.API_URL + "/oauths/register", RegistrationDetails).then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: REGISTRATION_SUCCESS,
                        data: response.data
                    });
                }
            }).catch((error) => {
                if (error.response) {
                    dispatch({type: REGISTRATION_NOT_SUCCESS, data: {error_msg: error.response.data.user_msg}});
                } else {
                    dispatch({type: REGISTRATION_NOT_SUCCESS, data: {error_msg: error.message.toString()}});
                }
            });
        }
    } catch (error) {
    }
};

export const changePassword = (changePasswordData) => {
    try {
        return (dispatch) => {

            dispatch({type: PASSWORD_CHANGE_INPROGRESS});

            const token = "Bearer " + localStorage.getItem('accessToken');
            let userProfile = JSON.parse(localStorage.getItem('userProfile'));

            let userDetails = {
                userId: userProfile.userId,
                first_name: userProfile.first_name,
                last_name: userProfile.last_name,
                mobile_number: userProfile.contact_no.toString(),
                emailAddress: userProfile.email_id,
                password: changePasswordData.newPassword,
                confirm_password: changePasswordData.newPassword,
                block: userProfile.block,
                image_url: userProfile.image_url,
                role: userProfile.role
            };

            const password = userProfile.password;

            if (password.toString() === changePasswordData.currentPassword.toString()) {
                const api = {
                    method: 'PUT',
                    headers: {'Authorization': token},
                    url: ENVIRONMENT_VARIABLES.API_URL + "/oauths",
                    data: userDetails,
                };
                axios(api).then((response) => {
                    if (response.status === 200) {
                        dispatch({type: PASSWORD_CHANGE_SUCCESS, data: response.data});
                    }
                }).catch((error) => {
                    if (error && error.response && error.response.status === 400) {
                        dispatch({type: PASSWORD_CHANGE_NOT_SUCCESS, data: error.response.data});
                    } else {
                        dispatch({type: PASSWORD_CONNECTION_ERROR, data: {error_msg: error.message.toString()}});
                    }
                });
            } else {
                dispatch({type: PASSWORD_CHANGE_NOT_SUCCESS, data: {user_msg: 'Current Password is Invalid'}});
            }
        }
    }
    catch (error) {
        alert("contact to your developer")
    }
};

export const updateUserProfile = (userProfile) => {
    try {
        return (dispatch) => {

            dispatch({type: PASSWORD_CHANGE_INPROGRESS});
            const token = "Bearer " + localStorage.getItem('accessToken');

            let api = {
                method: 'PUT',
                headers: {'Authorization': token},
                url: ENVIRONMENT_VARIABLES.API_URL + "/oauths",
                data: userProfile,
            };

            if (userProfile.filetoupload !== "" && userProfile.filetoupload !== null && userProfile.filetoupload !== undefined) {
                let bodyFormData = new FormData();
                bodyFormData.append('filetoupload', userProfile.filetoupload);

                let apiUserAvatar = {
                    method: 'POST',
                    headers: {'Authorization': token},
                    url: ENVIRONMENT_VARIABLES.API_URL + "/oauths/userAvatar",
                    data: bodyFormData,
                    config: {headers: {'Content-Type': 'multipart/form-data'}}
                };

                axios(apiUserAvatar).then((response) => {
                    if (response.status === 200) {
                        userProfile.image_url = response.data.data;
                        api = {
                            method: 'PUT',
                            headers: {'Authorization': token},
                            url: ENVIRONMENT_VARIABLES.API_URL + "/oauths",
                            data: userProfile,
                        };
                        axios(api).then((response) => {
                            if (response.status === 200) {
                                dispatch({type: PASSWORD_CHANGE_SUCCESS, data: response.data});
                            }
                        }).catch((error) => {
                            if (error && error.response && error.response.status === 400) {
                                dispatch({type: PASSWORD_CHANGE_NOT_SUCCESS, data: error.response.data});
                            } else {
                                dispatch({
                                    type: PASSWORD_CONNECTION_ERROR,
                                    data: {error_msg: error.message.toString()}
                                });
                            }
                        });
                    }
                }).catch((error) => {
                    if (error && error.response && error.response.status === 400) {
                        dispatch({type: PASSWORD_CHANGE_NOT_SUCCESS, data: error.response.data});
                    } else {
                        dispatch({type: PASSWORD_CONNECTION_ERROR, data: {error_msg: error.message.toString()}});
                    }
                });
            } else {
                axios(api).then((response) => {
                    if (response.status === 200) {
                        dispatch({type: PASSWORD_CHANGE_SUCCESS, data: response.data});
                    }
                }).catch((error) => {
                    if (error && error.response && error.response.status === 400) {
                        dispatch({type: PASSWORD_CHANGE_NOT_SUCCESS, data: error.response.data});
                    } else {
                        dispatch({
                            type: PASSWORD_CONNECTION_ERROR,
                            data: {error_msg: error.message.toString()}
                        });
                    }
                });
            }
        }
    } catch (error) {
        alert("contact to your developer");
    }
};

export const DefaultMessageClear = () => {
    try {
        return (dispatch) => {
            dispatch({type: USERPROFILE_DEFAULT_CLEAR});
        }
    } catch (error) {
        alert(error.message.toString());
    }
};
