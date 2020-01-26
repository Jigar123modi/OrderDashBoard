import {
    TEAM_INPROGRESS,
    TEAM_NOT_SUCCESS,
    TEAM_SUCCESS,
    TEAM_DELETE_SUCCESS,
    TEAM_ADD_SUCCESS,
    TEAM_EDIT_SUCCESS,
    TEAM_CONNECTION_ERROR,
    TEAM_DEFAULT_CLEAR,
} from '../constants/actionTypes';


import initialState from './initialState';

export default function manageTeamReducer(state = initialState.manageTeamReducer, action) {
    switch (action.type) {

        case TEAM_DEFAULT_CLEAR:
            return Object.assign({}, state, {error_msg: null, success_msg: null});

        case TEAM_INPROGRESS:
            return Object.assign({}, state, {Loading: true, error_msg: null, success_msg: null});

        case TEAM_CONNECTION_ERROR:
            return Object.assign({}, state, {
                Loading: false,
                error_msg: action.data.error_msg,
                success_msg: null
            });

        case TEAM_NOT_SUCCESS:
            return Object.assign({}, state, {
                error_msg: action.data.error_msg,
                Loading: false,
                success_msg: null
            });

        case TEAM_SUCCESS:
            return Object.assign({}, state, {
                teamList: action.data,
                Loading: false,
                error_msg: null,
                success_msg: null
            });

        case TEAM_DELETE_SUCCESS:

            let removeTeam = state.teamList.find(function (team) {
                return team.id === action.data.id;
            });
            let index = state.teamList.indexOf(removeTeam);
            state.teamList.splice(index, 1);

            return Object.assign({}, state, {
                teamList: state.teamList,
                Loading: false,
                error_msg: null,
                success_msg: action.data.result
            });

        case TEAM_ADD_SUCCESS:

            let team = {
                id: action.data.data.id,
                first_name : action.data.data.first_name,
                last_name : action.data.data.last_name,
                image_url: action.data.data.image_url,
                contact_no: action.data.data.contact_no,
                role: action.data.data.role,
                userId: action.data.data.userId,
                description: action.data.data.description,
                block: action.data.data.block
            };

            let teamList = [...state.teamList, team];

            return Object.assign({}, state, {
                teamList: teamList,
                Loading: false,
                error_msg: null,
                success_msg: action.data.result
            });

        case TEAM_EDIT_SUCCESS:
            let updateTeam = state.teamList.find((team) => team.id === action.data.data.id);
            if(updateTeam){
                updateTeam.first_name = action.data.data.first_name;
                updateTeam.last_name = action.data.data.last_name;
                updateTeam.description = action.data.data.description;
                if (action.data.data.image_url !== undefined) {
                    updateTeam.image_url = action.data.data.image_url;
                }
            }

            return Object.assign({}, state, {
                teamList: state.teamList,
                Loading: false,
                error_msg: null,
                success_msg: action.data.result
            });

        default:
            return state;
    }
};


