import {
    USER_INPROGRESS,
    USER_CHANGE_NOT_SUCCESS,
    USER_SUCCESS,
    USER_CONNECTION_ERROR,
    USER_BLOCK_SUCCESS,
    USER_BLOCK_NOT_SUCCESS,
    USER_DELETE_SUCCESS,
    USER_DELETE_NOT_SUCCESS,
    USER_DEFAULT_CLEAR
} from '../constants/actionTypes';


import initialState from './initialState';

export default function manageUserReducer(state = initialState.manageUserReducer, action) {
    switch (action.type) {

        case USER_INPROGRESS:
            return Object.assign({}, state, {Loading: true});

        case USER_DEFAULT_CLEAR:
            return Object.assign({}, state, {Loading: false, error_msg: null, success_msg: null});

        case USER_CONNECTION_ERROR:
            return Object.assign({}, state, {
                Loading: false,
                error_msg: action.data.error_msg
            });

        case USER_CHANGE_NOT_SUCCESS:
            return Object.assign({}, state, {
                error_msg: action.data.error_msg,
                Loading: false
            });

        case USER_SUCCESS:
            return Object.assign({}, state, {
                userList: action.data,
                Loading: false,
                error_msg: null
            });

        case USER_BLOCK_NOT_SUCCESS:
            return Object.assign({}, state, {
                Loading: false,
                error_msg: action.data.error_msg
            });

        case USER_DELETE_SUCCESS:

            const removeUser =  state.userList.find((data) => data.id === action.data.id);
            let index = state.userList.indexOf(removeUser);
            state.userList.splice(index, 1);

            return Object.assign({}, state, {
                userList: state.userList,
                Loading: false,
                error_msg: null,
                success_msg: action.data.result
            });

        case USER_DELETE_NOT_SUCCESS:
            return Object.assign({}, state, {
                Loading: false,
                error_msg: action.data.error_msg
            });

        case USER_BLOCK_SUCCESS:

            //update Block status
            state.userList.map((userList, index) => {
                if (userList.contact_no.toString() === action.data.data.contact_no.toString()) {
                    userList.block = action.data.data.block;
                }
            });
            return Object.assign({}, state, {
                userList: state.userList,
                Loading: false,
                error_msg: null
            });

        default:
            return state;
    }
};
