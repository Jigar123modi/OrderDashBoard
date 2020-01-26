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


import initialState from './initialState';

export default function manageVideoReducer(state = initialState.manageVideoReducer, action) {
    switch (action.type) {

        case VIDEO_DEFAULT_CLEAR:
            return Object.assign({}, state, {error_msg: null, success_msg: null});

        case VIDEO_INPROGRESS:
            return Object.assign({}, state, {Loading: true, error_msg: null, success_msg: null});

        case VIDEO_CONNECTION_ERROR:
            return Object.assign({}, state, {
                Loading: false,
                error_msg: action.data.error_msg,
                success_msg: null
            });

        case VIDEO_NOT_SUCCESS:
            return Object.assign({}, state, {
                error_msg: action.data.error_msg,
                Loading: false,
                success_msg: null,
            });

        case VIDEO_SUCCESS:
            return Object.assign({}, state, {
                videoList: action.data,
                Loading: false,
                error_msg: null,
                success_msg: null,
            });

        case VIDEO_DELETE_SUCCESS:
            let removeVideo = state.videoList.find(function (video) {
                return video.id === action.data.id;
            });
            let index = state.videoList.indexOf(removeVideo);
            state.videoList.splice(index, 1);

            return Object.assign({}, state, {
                videoList: state.videoList,
                Loading: false,
                error_msg: null,
                success_msg: action.data.result
            });

        case VIDEO_ADD_SUCCESS:

            let videoList = state.videoList;
            if (action.selectedServiceId === action.data.data.service_id) {
                let video = {
                    id: action.data.data.id,
                    video_url: action.data.data.video_url,
                    title: action.data.data.title,
                    description: action.data.data.description,
                    service_id: action.data.data.service_id,
                    sex: action.data.data.sex
                };
                videoList = [video, ...state.videoList];
            }

            return Object.assign({}, state, {
                videoList: videoList,
                Loading: false,
                error_msg: null,
                success_msg: action.data.result
            });

        case VIDEO_EDIT_SUCCESS:
            if (action.selectedServiceId === action.data.data.service_id) {
                state.videoList.map((video, index) => {
                    if (video.id === action.data.data.id) {
                        video.title = action.data.data.title;
                        video.description = action.data.data.description;
                        video.sex = action.data.data.sex;
                        video.service_id = action.data.data.service_id;
                        video.video_url = action.data.data.video_url;
                    }
                });
            } else {
                //remove video
                let removeVideo = state.videoList.find(function (video) {
                    return video.id === action.data.data.id;
                });
                let index = state.videoList.indexOf(removeVideo);
                state.videoList.splice(index, 1);

            }

            return Object.assign({}, state, {
                videoList: state.videoList,
                Loading: false,
                error_msg: null,
                success_msg: action.data.result
            });


        default:
            return state;
    }
};
