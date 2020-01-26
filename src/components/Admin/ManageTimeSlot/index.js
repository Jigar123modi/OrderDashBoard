import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import NotificationSystem from 'react-notification-system';
import Loader from '../../Helper/Loader';
import {confirmAlert} from 'react-confirm-alert';
import * as timeSlotsAction from '../../../actions/timeSlotsAction';
import '../Helper/DeleteAlertCss/react-confirm-alert.css';
import AddDialog from './addDialog';
import './manage-time.css';

class ManageTimeSlot extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notificationSystem: null,
            isDialogOpen: false,
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
            this.props.actions.timeSlotsAction.DefaultMessageClear();
        } else if (!nextProps.Loading && nextProps.success_msg) {
            this.addNotifications(nextProps.success_msg, "success");
            this.props.actions.timeSlotsAction.DefaultMessageClear();
            this.setState({isDialogOpen: false});
        }
    }

    componentDidMount() {
        this.setState({notificationSystem: this.refs.notificationSystem});
    };

    componentWillMount() {
        //First Time check all the services are available.
        this.props.actions.timeSlotsAction.TimeSlotList();
    }


    addNewService = () => {
        this.setState({isDialogOpen: true});
    };

    newProductClose = () => {
        this.setState({isDialogOpen: false});
    };

    removeTimeSlot = (timeSlotId) => {
        confirmAlert({
            key: timeSlotId,
            message: 'Are you sure you want to Delete?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        this.props.actions.timeSlotsAction.TimeSlotDelete(timeSlotId);
                    }
                },
                {
                    label: 'No'
                }
            ]
        })
    };


    render() {
        return (
            <div className="bg-burrito-image autofill-background">
                <NotificationSystem ref="notificationSystem"/>
                {this.state.isDialogOpen &&
                <AddDialog handleClose={this.newProductClose} isOpen={this.state.isDialogOpen}
                           notify={this.addNotifications}/>}

                <div className="container tab-bg-container">
                    <div className="d-flex justify-content-between">
                    <h2 className="text-white"> Manage TimeSlots </h2>
                    <button type="button" className="btn btn-primary w-25 button_main2"
                            onClick={this.addNewService}>Add new TimeSlot
                    </button>
                    </div>
                    {this.props.TimeSlotList.length > 0 && <div className="data-display col-sm-12">
                        <div className="table-responsive overflow-scroll">
                            <table width="100%" className="table">
                                <tbody>
                                <tr>
                                    <th style={{cursor: 'context-menu'}}>Start Time</th>
                                    <th style={{cursor: 'context-menu'}}>End Time</th>
                                    <th style={{cursor: 'context-menu'}}>Action</th>
                                </tr>
                                {this.props.TimeSlotList.map((value, index) => (
                                    <tr key={value.id}>
                                        <td>{value.start_time}</td>
                                        <td>{value.end_time}</td>
                                        <td style={{textAlign: "center"}}>
                                            <button type="button" className="btn btn-danger" key={value.id}
                                                    onClick={event => {
                                                        this.removeTimeSlot(value.id)
                                                    }}>Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>}
                </div>
                {this.props.Loading && <Loader/>}
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    const {manageTimeSlotReducer} = state;
    return {
        Loading: manageTimeSlotReducer.Loading,
        error_msg: manageTimeSlotReducer.error_msg,
        TimeSlotList: manageTimeSlotReducer.TimeSlotList,
        success_msg: manageTimeSlotReducer.success_msg,
    };
};

const mapDispatchToProps = dispatch => ({
    actions: {
        timeSlotsAction: bindActionCreators(timeSlotsAction, dispatch)
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageTimeSlot);
