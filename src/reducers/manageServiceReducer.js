import {
    SERVICE_INPROGRESS,
    SERVICE_NOT_SUCCESS,
    SERVICE_SUCCESS,
    SERVICE_DELETE_SUCCESS,
    SERVICE_EDIT_SUCCESS,
    SERVICE_CONNECTION_ERROR, SERVICE_ADD_SUCCESS,
    SERVICE_DEFAULT_CLEAR,
} from '../constants/actionTypes';


import initialState from './initialState';

export default function manageServiceReducer(state = initialState.manageServiceReducer, action) {
    switch (action.type) {

        case SERVICE_DEFAULT_CLEAR:
            return Object.assign({}, state, {error_msg: null, success_msg: null});

        case SERVICE_INPROGRESS:
            return Object.assign({}, state, {Loading: true, error_msg: null, success_msg: null});

        case SERVICE_CONNECTION_ERROR:
            return Object.assign({}, state, {
                Loading: false,
                error_msg: action.data.error_msg,
                success_msg: null
            });

        case SERVICE_NOT_SUCCESS:
            return Object.assign({}, state, {
                error_msg: action.data.error_msg,
                Loading: false,
                success_msg: null,
            });

        case SERVICE_SUCCESS:
            return Object.assign({}, state, {
                serviceList: action.data,
                Loading: false,
                error_msg: null,
                success_msg: null,
            });

        case SERVICE_DELETE_SUCCESS:

            let removeService = state.serviceList.find(function (services) {
                return services.id === action.data.id;
            });
            let index = state.serviceList.indexOf(removeService);
            state.serviceList.splice(index, 1);

            return Object.assign({}, state, {
                serviceList: state.serviceList,
                Loading: false,
                error_msg: null,
                success_msg: action.data.result
            });

        case SERVICE_ADD_SUCCESS:
            let service = {
                id: action.data.data.id,
                image_url: action.data.data.image_url,
                title: action.data.data.title,
                description: action.data.data.description,
                displayOrder: action.data.data.displayOrder,
            };
            let serviceList = [...state.serviceList, service];
            return Object.assign({}, state, {
                serviceList: serviceList,
                Loading: false,
                error_msg: null,
                success_msg: action.data.result
            });

        case SERVICE_EDIT_SUCCESS:
            state.serviceList.map((service, index) => {
                if (service.id === action.data.data.id) {
                    service.title = action.data.data.title;
                    service.description = action.data.data.description;
                    if (action.data.data.image_url !== undefined) {
                        service.image_url = action.data.data.image_url;
                    }
                }
            });
            return Object.assign({}, state, {
                serviceList: state.serviceList,
                Loading: false,
                error_msg: null,
                success_msg: action.data.result
            });

        default:
            return state;
    }
};
