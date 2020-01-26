import axios from 'axios';
import ENVIRONMENT_VARIABLES from '../environment.config';
import {
    ANALYTICS_INPROGRESS,
    ANALYTICS_CONNECTION_ERROR,
    ANALYTICS_SUCCESS,
    ANALYTICS_NOT_SUCCESS,
    ANALYTICS_DEFAULT_CLEAR
} from '../constants/actionTypes';


export const DefaultMessageClear = () => {
    try {
        return (dispatch) => {
            dispatch({type: ANALYTICS_DEFAULT_CLEAR});
        }
    } catch (error) {
        alert(error.message.toString());
    }
};

export const GetAnalyticsRecords = () => {
    try {

        return (dispatch) => {
            dispatch({type: ANALYTICS_INPROGRESS});
            const token = "Bearer " + localStorage.getItem('accessToken');

            let api1 = {
                method: 'GET',
                headers: {'Authorization': token},
                url: ENVIRONMENT_VARIABLES.API_URL + "/Reports/topUsers"
            };

            let api2 = {
                method: 'GET',
                headers: {'Authorization': token},
                url: ENVIRONMENT_VARIABLES.API_URL + "/Reports/getTotalBillablePrice"
            };

            let api3 = {
                method: 'GET',
                headers: {'Authorization': token},
                url: ENVIRONMENT_VARIABLES.API_URL + "/Reports/getOrderStatusReport"
            };

            let api4 = {
                method: 'GET',
                headers: {'Authorization': token},
                url: ENVIRONMENT_VARIABLES.API_URL + "/Reports/getTeamWiseOrderStatusReport"
            };


            axios.all([axios(api1), axios(api2), axios(api3), axios(api4)]).then((response) => {

                if (response[0].status === 200) {
                    dispatch({type: ANALYTICS_SUCCESS, data: response});
                }

            }).catch((error) => {
                if (error && error.response && (error.response.status === 400 || error.response.status === 403 || error.response.status === 401)) {
                    dispatch({type: ANALYTICS_NOT_SUCCESS, data: {error_msg: error.response.data.user_msg}});
                } else {
                    dispatch({type: ANALYTICS_CONNECTION_ERROR, data: {error_msg: error.message.toString()}});
                }
            });
        }
    } catch (error) {
        alert(error.message.toString());
    }
};
