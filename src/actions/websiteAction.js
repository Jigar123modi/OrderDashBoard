import axios from 'axios';
import ENVIRONMENT_VARIABLES from '../environment.config';
import {
    WEBSITE_INPROGRESS,
    WEBSITE_CONNECTION_ERROR,
    WEBSITE_NOT_SUCCESS,
    ALL_GALLERY_SUCCESS,
    ALL_PRODUCTS_SUCCESS,
    ALL_TIMESLOTS_SUCCESS,
    ADDPRODUCTTOCART,
    REMOVEPRODUCTTOCART,
    BASKETVISIBLE,
    COMPLETED_ORDER_LIST,
    ORDER_PLACE,
    WEBSITE_HOME,
    LOGOUT_USER
} from '../constants/actionTypes';

export const getWebsiteHome = () => {
    try {
        return (dispatch) => {

            dispatch({type: WEBSITE_INPROGRESS});

            axios.all([
                axios.get(ENVIRONMENT_VARIABLES.API_URL + '/SliderImages'),
                axios.get(ENVIRONMENT_VARIABLES.API_URL + '/Services'),
                axios.get(ENVIRONMENT_VARIABLES.API_URL + '/Gallerys'),
                axios.get(ENVIRONMENT_VARIABLES.API_URL + '/Teams')
            ]).then(axios.spread((SliderList, ServicesList, GalleryList, TeamList) => {
                dispatch({
                    type: WEBSITE_HOME,
                    SliderList: SliderList.data,
                    ServicesList: ServicesList.data,
                    GalleryList: GalleryList.data,
                    TeamList: TeamList.data
                });
            })).catch((error) => {
                if (error && error.response && (error.response.status === 400 || error.response.status === 403 || error.response.status === 401)) {
                    dispatch({type: WEBSITE_NOT_SUCCESS, data: {error_msg: error.response.data.user_msg}});
                } else {
                    dispatch({type: WEBSITE_CONNECTION_ERROR, data: {error_msg: error.message.toString()}});
                }
            });
        }
    } catch (error) {
        alert(error.message.toString());
    }

};

export const getAllGallerys = (ServiceId) => {
    try {
        return (dispatch) => {
            dispatch({type: WEBSITE_INPROGRESS});
            const api = {
                method: 'GET',
                url: ENVIRONMENT_VARIABLES.API_URL + "/Gallerys/All/" + ServiceId
            };
            axios(api).then((response) => {
                if (response.status === 200) {
                    dispatch({type: ALL_GALLERY_SUCCESS, data: response.data});
                }
            }).catch((error) => {
                if (error && error.response && (error.response.status === 400 || error.response.status === 403 || error.response.status === 401)) {
                    dispatch({type: WEBSITE_NOT_SUCCESS, data: {error_msg: error.response.data.user_msg}});
                } else {
                    dispatch({type: WEBSITE_CONNECTION_ERROR, data: {error_msg: error.message.toString()}});
                }
            });
        }
    } catch (error) {
        alert(error.message.toString());
    }

};

export const getAllProducts = () => {
    try {
        return (dispatch) => {
            dispatch({type: WEBSITE_INPROGRESS});
            const api = {
                method: 'GET',
                url: ENVIRONMENT_VARIABLES.API_URL + "/Products"
            };
            axios(api).then((response) => {
                if (response.status === 200) {
                    dispatch({type: ALL_PRODUCTS_SUCCESS, data: response.data});
                }
            }).catch((error) => {
                if (error && error.response && (error.response.status === 400 || error.response.status === 403 || error.response.status === 401)) {
                    dispatch({type: WEBSITE_NOT_SUCCESS, data: {error_msg: error.response.data.user_msg}});
                } else {
                    dispatch({type: WEBSITE_CONNECTION_ERROR, data: {error_msg: error.message.toString()}});
                }
            });
        }
    } catch (error) {
        alert(error.message.toString());
    }

};

export const loggedOut = () => {
    try {
        return (dispatch) => {
            dispatch({type: WEBSITE_INPROGRESS});
            localStorage.removeItem('accessToken');
            localStorage.removeItem('userProfile');
            localStorage.removeItem('userAvatar');
            localStorage.removeItem('BasketGeneratorProducts');
            localStorage.clear();
            dispatch({type: LOGOUT_USER});
        }
    } catch (error) {
    }
};

export const AddNewProductToCart = (Product, TeamMember) => {
    return (dispatch) => {
        dispatch({type: WEBSITE_INPROGRESS});
        dispatch({
            type: ADDPRODUCTTOCART,
            data: {
                product: Product,
                teamMember: TeamMember
            }
        });
    }
};

export const RemoveProductToCart = (ProductId, TeamMemberId) => {
    return (dispatch) => {
        dispatch({type: WEBSITE_INPROGRESS});
        dispatch({
            type: REMOVEPRODUCTTOCART,
            data: {
                product: ProductId,
                teamMember: TeamMemberId
            }
        });
    }
};

export const getAllTimeSlots = () => {
    try {
        return (dispatch) => {
            dispatch({type: WEBSITE_INPROGRESS});
            const api = {
                method: 'GET',
                url: ENVIRONMENT_VARIABLES.API_URL + "/TimeSlots"
            };
            axios(api).then((response) => {
                if (response.status === 200) {
                    dispatch({type: ALL_TIMESLOTS_SUCCESS, data: response.data});
                }
            }).catch((error) => {
                if (error && error.response && (error.response.status === 400 || error.response.status === 403 || error.response.status === 401)) {
                    dispatch({type: WEBSITE_NOT_SUCCESS, data: {error_msg: error.response.data.user_msg}});
                } else {
                    dispatch({type: WEBSITE_CONNECTION_ERROR, data: {error_msg: error.message.toString()}});
                }
            });
        }
    } catch (error) {
        alert(error.message.toString());
    }
};

export const basketVisible = (value) => {
    try {
        return (dispatch) => {
            dispatch({type: BASKETVISIBLE, data: value});
        }
    } catch (error) {
        alert(error.message.toString());
    }
};

export const placeOrder = (TimeSlot) => {
    try {
        return (dispatch) => {
            dispatch({type: WEBSITE_INPROGRESS});
            const token = "Bearer " + localStorage.getItem('accessToken');
            const basketList = JSON.parse(localStorage.getItem('BasketGeneratorProducts')).BasketList;
            const startTime = TimeSlot.start_time.split(":");
            const endTime = TimeSlot.end_time.split(":");

            let data = {
                startTime: {
                    hours: startTime[0],
                    minutes: startTime[1]
                },
                endTime: {
                    hours: endTime[0],
                    minutes: endTime[1]
                },
                bookingProduct: []
            };

            basketList.map((singleProduct) => {
                data.bookingProduct.push({
                    product_id: singleProduct.product.id,
                    teamMember_id: singleProduct.teamMember.id
                });
            });

            const api = {
                method: 'POST',
                headers: {'Authorization': token},
                url: ENVIRONMENT_VARIABLES.API_URL + "/Bookings",
                data: data
            };

            axios(api).then((response) => {
                if (response.status === 200) {
                    dispatch({type: ORDER_PLACE, data: response.data});
                }
            }).catch((error) => {
                if (error && error.response && (error.response.status === 400 || error.response.status === 403 || error.response.status === 401)) {
                    dispatch({type: WEBSITE_NOT_SUCCESS, data: {error_msg: error.response.data.user_msg}});
                } else {
                    dispatch({type: WEBSITE_CONNECTION_ERROR, data: {error_msg: error.message.toString()}});
                }
            });
        }
    } catch (error) {
        alert(error.message.toString());
    }
};

export const getCompletedOrder = () => {
    try {
        return (dispatch) => {
            dispatch({type: WEBSITE_INPROGRESS});

            const token = "Bearer " + localStorage.getItem('accessToken');
            const api = {
                method: 'GET',
                headers: {'Authorization': token},
                url: ENVIRONMENT_VARIABLES.API_URL + "/oauths/getTodayOrderList"
            };
            axios(api).then((response) => {
                if (response.status === 200) {
                    dispatch({type: COMPLETED_ORDER_LIST, data: response.data});
                }
            }).catch((error) => {
                if (error && error.response && (error.response.status === 400 || error.response.status === 403 || error.response.status === 401)) {
                    dispatch({type: WEBSITE_NOT_SUCCESS, data: {error_msg: error.response.data.user_msg}});
                } else {
                    dispatch({type: WEBSITE_CONNECTION_ERROR, data: {error_msg: error.message.toString()}});
                }
            });
        }
    } catch (error) {
        alert(error.message.toString());
    }

};