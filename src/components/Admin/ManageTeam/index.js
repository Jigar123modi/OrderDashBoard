import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import NotificationSystem from 'react-notification-system';
import * as teamAction from '../../../actions/teamAction';
import Loader from '../../Helper/Loader';
import ProductDialog from '../Helper/AddCommonDialog';
import EditDialog from './editDialog';
import {confirmAlert} from 'react-confirm-alert';
import '../Helper/DeleteAlertCss/react-confirm-alert.css';
import '../Helper/AddCommonDialog/index';
import './manage-team.css';
import ENVIRONMENT_VARIABLES from "../../../environment.config";
import ImageLoader from 'react-load-image';

class ManageTeam extends Component {

    constructor(props) {
        super(props);
        this.state = {
            teamList: [],
            notificationSystem: null,
            isFirstAvailability: false,
            isEditDialogOpen: false,
            selectedTeamId: null,
            isDialogOpen: false
        };
    }

    addNotifications = (message, level) => {
        this.state.notificationSystem.addNotification({
            message: message,
            level: level,
            autoDismiss: 5
        });
    };

    componentWillReceiveProps(nextProps) {
        if (!nextProps.Loading && nextProps.error_msg) {
            this.addNotifications(nextProps.error_msg, "error");
            this.props.actions.teamAction.DefaultMessageClear();
        } else if (!nextProps.Loading && nextProps.success_msg) {
            this.addNotifications(nextProps.success_msg, "success");
            this.props.actions.teamAction.DefaultMessageClear();
            this.setState({teamList: nextProps.teamList || []});
            this.setState({isDialogOpen: false});
            this.setState({isEditDialogOpen: false});
        } else {
            this.setState({teamList: nextProps.teamList || []});
        }
    }

    componentDidMount() {
        this.setState({notificationSystem: this.refs.notificationSystem});
    };

    componentWillMount() {
        this.props.actions.teamAction.TeamList();
    }

    getSpecificTeam = (teamId) => {
        this.setState({isEditDialogOpen: true, selectedTeamId: teamId});
    };

    removeSpecificTeam = (teamId) => {
        confirmAlert({
            key: teamId,
            message: 'Are you sure you want to Delete?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        this.props.actions.teamAction.TeamDelete(teamId);
                    }
                },
                {
                    label: 'No'
                }
            ]
        })
    };

    addNewTeam = () => {
        this.setState({isDialogOpen: true});
    };

    newProductClose = () => {
        this.setState({isDialogOpen: false});
    };

    editDialogClose = () => {
        this.setState({isEditDialogOpen: false});
    };

    render() {
        const {teamList} = this.state;
        const team = teamList.find((team) => team.id === this.state.selectedTeamId);

        return (
            <div className="bg-burrito-image autofill-background">
                <NotificationSystem ref="notificationSystem"/>
                {this.state.isDialogOpen &&
                <ProductDialog handleClose={this.newProductClose} isOpen={this.state.isDialogOpen}
                               notify={this.addNotifications} status={"Team Member"}/>}

                {this.state.isEditDialogOpen &&
                <EditDialog handleClose={this.editDialogClose} isOpen={this.state.isEditDialogOpen}
                            notify={this.addNotifications} team={team}/>}

                <div className="container tab-bg-container">
                    <div className="d-flex justify-content-between">
                    <h2 className="text-white"> Manage Teams Member </h2>
                    <button type="button" className="btn btn-primary w-25 button_main2"
                            onClick={this.addNewTeam}>Add team member
                    </button>
                    </div>
                    {teamList.length > 0 && <div className="data-display col-sm-12">
                        <div className="table-responsive overflow-scroll">
                            <table width="100%" className="table">
                                <tbody>
                                <tr>
                                    <th style={{cursor: 'context-menu'}}>Member Profile</th>
                                    <th style={{cursor: 'context-menu'}}>Name</th>
                                    <th style={{cursor: 'context-menu'}}>Description</th>
                                    <th style={{cursor: 'context-menu'}}>Action</th>
                                </tr>
                                {teamList && teamList.map((value, index) => (
                                    <tr key={index}>
                                        <td>
                                            <ImageLoader
                                                src={ENVIRONMENT_VARIABLES.PHOTO_URL + value.image_url}>
                                                <img className="img-fluid" style={{height: '150px', width: '150px'}}
                                                     alt={value.first_name}/>
                                                <img src="/assets/Images/NoImages.png" style={{height: '150px', width: '150px'}}
                                                     alt={value.first_name} />
                                                <img src="/assets/Images/s_loader.gif" style={{height: '150px', width: '150px'}}
                                                     alt={value.first_name} />
                                            </ImageLoader>
                                        </td>
                                        <td>{value.first_name + " " + value.last_name}</td>
                                        <td>{value.description}</td>
                                        <td style={{textAlign: "center"}}>
                                            <button type="button" className="btn btn-primary" key={index}
                                                    onClick={event => {
                                                        this.getSpecificTeam(value.id)
                                                    }}>Edit
                                            </button>
                                            &nbsp;
                                            <button type="button" className="btn btn-danger" key={value.id}
                                                    onClick={event => {
                                                        this.removeSpecificTeam(value.id)
                                                    }}>Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    }
                </div>
                {this.props.Loading && <Loader/>}
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    const {manageTeamReducer} = state;
    return {
        Loading: manageTeamReducer.Loading,
        error_msg: manageTeamReducer.error_msg,
        success_msg: manageTeamReducer.success_msg,
        teamList: manageTeamReducer.teamList,
        reRender: true
    };
};

const mapDispatchToProps = dispatch => ({
    actions: {
        teamAction: bindActionCreators(teamAction, dispatch)
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageTeam);


