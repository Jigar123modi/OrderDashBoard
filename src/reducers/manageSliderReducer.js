import {
    SLIDER_INPROGRESS,
    SLIDER_NOT_SUCCESS,
    SLIDER_SUCCESS,
    SLIDER_DELETE_SUCCESS,
    SLIDER_ADD_SUCCESS,
    SLIDER_CONNECTION_ERROR,
    SLIDER_DEFAULT_CLEAR,
} from '../constants/actionTypes';


import initialState from './initialState';

export default function manageSliderReducer(state = initialState.manageSliderReducer, action) {
    switch (action.type) {

        case SLIDER_DEFAULT_CLEAR:
            return Object.assign({}, state, {error_msg: null, success_msg: null});

        case SLIDER_INPROGRESS:
            return Object.assign({}, state, {Loading: true, error_msg: null, success_msg: null});

        case SLIDER_CONNECTION_ERROR:
            return Object.assign({}, state, {
                Loading: false,
                error_msg: action.data.error_msg,
                success_msg: null
            });

        case SLIDER_NOT_SUCCESS:
            return Object.assign({}, state, {
                error_msg: action.data.error_msg,
                Loading: false,
                success_msg: null,
            });

        case SLIDER_SUCCESS:
            return Object.assign({}, state, {
                sliderList: action.data,
                Loading: false,
                error_msg: null,
                success_msg: null,
            });

        case SLIDER_DELETE_SUCCESS:

            let removeSlider = state.sliderList.find(function (slider) {
                return slider.id === action.data.id;
            });
            let index = state.sliderList.indexOf(removeSlider);
            state.sliderList.splice(index, 1);

            return Object.assign({}, state, {
                sliderList: state.sliderList,
                Loading: false,
                error_msg: null,
                success_msg: action.data.result
            });

        case SLIDER_ADD_SUCCESS:
            let slider = {
                id: action.data.data.id,
                image_url: action.data.data.image_url
            };
            let sliderList = [...state.sliderList, slider];
            return Object.assign({}, state, {
                sliderList: sliderList,
                Loading: false,
                error_msg: null,
                success_msg: action.data.result
            });


        default:
            return state;
    }
};
