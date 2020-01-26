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


import initialState from './initialState';

export default function manageServiceReducer(state = initialState.manageTimeSlotReducer, action) {
    switch (action.type) {

        case TIMESLOT_DEFAULT_CLEAR:
            return Object.assign({}, state, {error_msg: null, success_msg: null});

        case TIMESLOT_INPROGRESS:
            return Object.assign({}, state, {Loading: true, error_msg: null, success_msg: null});

        case TIMESLOT_CONNECTION_ERROR:
            return Object.assign({}, state, {
                Loading: false,
                error_msg: action.data.error_msg,
                success_msg: null
            });

        case TIMESLOT_NOT_SUCCESS:
            return Object.assign({}, state, {
                error_msg: action.data.error_msg,
                Loading: false,
                success_msg: null,
            });

        case TIMESLOT_SUCCESS:
            return Object.assign({}, state, {
                TimeSlotList: action.data,
                Loading: false,
                error_msg: null,
                success_msg: null,
            });

        case TIMESLOT_DELETE_SUCCESS:

            let remove = state.TimeSlotList.find(function (item) {
                return item.id === action.data.timeSlot_id;
            });
            let index = state.TimeSlotList.indexOf(remove);
            state.TimeSlotList.splice(index, 1);

            return Object.assign({}, state, {
                TimeSlotList: state.TimeSlotList,
                Loading: false,
                error_msg: null,
                success_msg: action.data.result
            });

        case TIMESLOT_ADD_SUCCESS:
            let TimeSlotList = [...state.TimeSlotList, action.data.data];
            debugger;
            return Object.assign({}, state, {
                TimeSlotList: TimeSlotList,
                Loading: false,
                error_msg: null,
                success_msg: action.data.result
            });

        case TIMESLOT_EDIT_SUCCESS:
            state.TimeSlotList.map((item, index) => {
                if (item.id === action.data.data.id) {
                    item.start_time = action.data.data.start_time;
                    item.end_time = action.data.data.end_time;
                }
            });
            return Object.assign({}, state, {
                TimeSlotList: state.TimeSlotList,
                Loading: false,
                error_msg: null,
                success_msg: action.data.result
            });

        default:
            return state;
    }
};
