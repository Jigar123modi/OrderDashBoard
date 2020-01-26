import axios from 'axios';
import ENVIRONMENT_VARIABLES from '../environment.config';
import {
    TIMESLOT_INPROGRESS,
    TIMESLOT_NOT_SUCCESS,
    TIMESLOT_SUCCESS,
    TIMESLOT_DELETE_SUCCESS,
    TIMESLOT_ADD_SUCCESS,
    TIMESLOT_EDIT_SUCCESS,
    TIMESLOT_CONNECTION_ERROR,
    TIMESLOT_DEFAULT_CLEAR,
} from '../constants/actionTypes';

export const TimeSlotList = () => {
    try {
        return (dispatch) => {
            dispatch({type: TIMESLOT_INPROGRESS});
            const token = "Bearer " + localStorage.getItem('accessToken');

            let api = {
                method: 'GET',
                headers: {'Authorization': token},
                url: ENVIRONMENT_VARIABLES.API_URL + "/TimeSlots/GetAllTimeSlots"
            };

            axios(api).then((response) => {
                if (response.status === 200) {
                    dispatch({type: TIMESLOT_SUCCESS, data: response.data});
                }
            }).catch((error) => {
                if (error && error.response && (error.response.status === 400 || error.response.status === 403 || error.response.status === 401)) {
                    dispatch({type: TIMESLOT_NOT_SUCCESS, data: {error_msg: error.response.data.user_msg}});
                } else {
                    dispatch({type: TIMESLOT_CONNECTION_ERROR, data: {error_msg: error.message.toString()}});
                }
            });
        }
    } catch (error) {
        alert(error.message.toString());
    }
};

export const TimeSlotDelete = (Id) => {
    try {
        return (dispatch) => {
            dispatch({type: TIMESLOT_INPROGRESS});
            const token = "Bearer " + localStorage.getItem('accessToken');

            let api = {
                method: 'DELETE',
                headers: {'Authorization': token},
                url: ENVIRONMENT_VARIABLES.API_URL + "/TimeSlots/" + Id
            };

            axios(api).then((response) => {
                if (response.status === 200) {
                    dispatch({type: TIMESLOT_DELETE_SUCCESS, data: response.data});
                }
            }).catch((error) => {
                if (error && error.response && (error.response.status === 400 || error.response.status === 403 || error.response.status === 401)) {
                    dispatch({type: TIMESLOT_NOT_SUCCESS, data: {error_msg: error.response.data.user_msg}});
                } else {
                    dispatch({type: TIMESLOT_CONNECTION_ERROR, data: {error_msg: error.message.toString()}});
                }
            });
        }
    } catch (error) {
        alert(error.message.toString());
    }
};

export const TimeSlotAdd = (Service) => {
    try {
        return (dispatch) => {
            dispatch({type: TIMESLOT_INPROGRESS});
            const token = "Bearer " + localStorage.getItem('accessToken');
            debugger;

            let api = {
                method: 'POST',
                headers: {'Authorization': token},
                url: ENVIRONMENT_VARIABLES.API_URL + "/TimeSlots",
                data: {
                    start_time: Service.start_time,
                    end_time: Service.end_time
                },
            };

            axios(api).then((response) => {
                if (response.status === 200) {
                    dispatch({type: TIMESLOT_ADD_SUCCESS, data: response.data});
                }
            }).catch((error) => {
                if (error && error.response && (error.response.status === 400 || error.response.status === 403 || error.response.status === 401)) {
                    dispatch({type: TIMESLOT_NOT_SUCCESS, data: {error_msg: error.response.data.user_msg}});
                } else {
                    dispatch({type: TIMESLOT_CONNECTION_ERROR, data: {error_msg: error.message.toString()}});
                }
            });
        }
    } catch (error) {
        alert(error.message.toString());
    }
};

export const TimeSlotEdit = (Service) => {
    try {
        return (dispatch) => {
            dispatch({type: TIMESLOT_INPROGRESS});
            const token = "Bearer " + localStorage.getItem('accessToken');

            let api = {
                method: 'PUT',
                headers: {'Authorization': token},
                url: ENVIRONMENT_VARIABLES.API_URL + "/TimeSlots",
                data: {
                    id: Service.id,
                    start_time: Service.start_time,
                    end_time: Service.end_time
                },
            };

            axios(api).then((response) => {
                if (response.status === 200) {
                    dispatch({type: TIMESLOT_EDIT_SUCCESS, data: response.data});
                }
            }).catch((error) => {
                if (error && error.response && (error.response.status === 400 || error.response.status === 403 || error.response.status === 401)) {
                    dispatch({type: TIMESLOT_NOT_SUCCESS, data: {error_msg: error.response.data.user_msg}});
                } else {
                    dispatch({type: TIMESLOT_CONNECTION_ERROR, data: {error_msg: error.message.toString()}});
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
            dispatch({type: TIMESLOT_DEFAULT_CLEAR});
        }
    } catch (error) {
        alert(error.message.toString());
    }
};
