import {
    GALLERY_INPROGRESS,
    GALLERY_NOT_SUCCESS,
    GALLERY_SUCCESS,
    GALLERY_DELETE_SUCCESS,
    GALLERY_ADD_SUCCESS,
    GALLERY_EDIT_SUCCESS,
    GALLERY_CONNECTION_ERROR,
    GALLERY_DEFAULT_CLEAR
} from '../constants/actionTypes';


import initialState from './initialState';

export default function manageGalleryReducer(state = initialState.manageGalleryReducer, action) {
    switch (action.type) {

        case GALLERY_DEFAULT_CLEAR:
            return Object.assign({}, state, {error_msg: null, success_msg: null});

        case GALLERY_INPROGRESS:
            return Object.assign({}, state, {Loading: true, error_msg: null, success_msg: null});

        case GALLERY_CONNECTION_ERROR:
            return Object.assign({}, state, {
                Loading: false,
                error_msg: action.data.error_msg,
                success_msg: null
            });

        case GALLERY_NOT_SUCCESS:
            return Object.assign({}, state, {
                error_msg: action.data.error_msg,
                Loading: false,
                success_msg: null,
            });

        case GALLERY_SUCCESS:
            return Object.assign({}, state, {
                galleryList: action.data,
                Loading: false,
                error_msg: null,
                success_msg: null,
            });

        case GALLERY_DELETE_SUCCESS:
            let removeGallery = state.galleryList.find(function (gallery) {
                return gallery.id === action.data.id;
            });
            let index = state.galleryList.indexOf(removeGallery);
            state.galleryList.splice(index, 1);

            return Object.assign({}, state, {
                galleryList: state.galleryList,
                Loading: false,
                error_msg: null,
                success_msg: action.data.result
            });

        case GALLERY_ADD_SUCCESS:

            let galleryList = state.galleryList;
            if (action.selectedServiceId === action.data.data.service_id) {
                let gallery = {
                    id: action.data.data.id,
                    image_url: action.data.data.image_url,
                    title: action.data.data.title,
                    description: action.data.data.description,
                    service_id: action.data.data.service_id,
                    sex: action.data.data.sex
                };
                galleryList = [gallery, ...state.galleryList];
            }

            return Object.assign({}, state, {
                galleryList: galleryList,
                Loading: false,
                error_msg: null,
                success_msg: action.data.result
            });

        case GALLERY_EDIT_SUCCESS:
            if (action.selectedServiceId === action.data.data.service_id) {
                state.galleryList.map((gallery, index) => {
                    if (gallery.id === action.data.data.id) {
                        gallery.title = action.data.data.title;
                        gallery.description = action.data.data.description;
                        gallery.sex = action.data.data.sex;
                        gallery.service_id = action.data.data.service_id;
                        if (action.data.data.image_url !== undefined) {
                            gallery.image_url = action.data.data.image_url;
                        }
                    }
                });
            } else {
                //remove gallery
                let removeGallery = state.galleryList.find(function (gallery) {
                    return gallery.id === action.data.data.id;
                });
                let index = state.galleryList.indexOf(removeGallery);
                state.galleryList.splice(index, 1);

            }

            return Object.assign({}, state, {
                galleryList: state.galleryList,
                Loading: false,
                error_msg: null,
                success_msg: action.data.result
            });

        default:
            return state;
    }
};
