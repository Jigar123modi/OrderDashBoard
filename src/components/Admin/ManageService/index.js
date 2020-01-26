import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import NotificationSystem from 'react-notification-system';
import * as serviceAction from '../../../actions/serviceAction';
import Loader from '../../Helper/Loader';
import {confirmAlert} from 'react-confirm-alert';
import '../Helper/DeleteAlertCss/react-confirm-alert.css';
import ProductDialog from '../Helper/AddCommonDialog';
import EditDialog from './editDialog';
import '../Helper/AddCommonDialog/index';
import ImageLoader from 'react-load-image';

import './manage-service.css';
import ENVIRONMENT_VARIABLES from "../../../environment.config";

class ManageService extends Component {

    constructor(props) {
        super(props);
        this.state = {
            serviceList: [],
            notificationSystem: null,
            isDialogOpen: false,
            isEditDialogOpen: false,
            selectedServiceId: null,
        }
        ;
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
            this.props.actions.serviceAction.DefaultMessageClear();
        } else if (!nextProps.Loading && nextProps.success_msg) {
            this.addNotifications(nextProps.success_msg, "success");
            this.props.actions.serviceAction.DefaultMessageClear();
            this.setState({serviceList: nextProps.serviceList || []});
            this.setState({isDialogOpen: false});
            this.setState({isEditDialogOpen: false});
        } else {
            this.setState({serviceList: nextProps.serviceList || []});
        }
    }

    componentDidMount() {
        this.setState({notificationSystem: this.refs.notificationSystem});
    };

    componentWillMount() {
        this.props.actions.serviceAction.ServiceList();
    }

    getSpecificService = (serviceId) => {
        this.setState({isEditDialogOpen: true, selectedServiceId: serviceId});
    };

    removeSpecificService = (serviceId) => {
        confirmAlert({
            key: serviceId,
            message: 'Are you sure you want to Delete?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        this.props.actions.serviceAction.ServiceDelete(serviceId);
                    }
                },
                {
                    label: 'No'
                }
            ]
        })
    };

    addNewService = () => {
        this.setState({isDialogOpen: true});
    };

    newProductClose = () => {
        this.setState({isDialogOpen: false});
    };

    editDialogClose = () => {
        this.setState({isEditDialogOpen: false});
    };


    render() {
        const {serviceList} = this.state;
        const selected_service = serviceList.find((service) => service.id === this.state.selectedServiceId);

        return (
            <div className="bg-burrito-image autofill-background">
                <NotificationSystem ref="notificationSystem"/>
                {this.state.isDialogOpen &&
                <ProductDialog handleClose={this.newProductClose} isOpen={this.state.isDialogOpen}
                               notify={this.addNotifications} status={"Service"}/>}
                {this.state.isEditDialogOpen &&
                <EditDialog handleClose={this.editDialogClose} isOpen={this.state.isEditDialogOpen}
                            notify={this.addNotifications} service={selected_service}/>}
                <div className="container tab-bg-container">
                    <div className="d-flex justify-content-between">
                    <h2 className="text-white"> Manage Service </h2>
                    <button type="button" className="btn btn-primary w-25 button_main2"
                            onClick={this.addNewService}>Add Service
                    </button>
                    </div>
                    {serviceList.length > 0 && <div className="data-display col-sm-12">
                        <div className="overflow-scroll">
                            <table width="100%" className="table">
                                <tbody>
                                <tr>
                                    <th style={{cursor: 'context-menu'}}>Service Image</th>
                                    <th style={{cursor: 'context-menu'}}>Title</th>
                                    <th style={{cursor: 'context-menu'}}>Description</th>
                                    <th style={{cursor: 'context-menu'}}>Action</th>
                                </tr>
                                {serviceList && serviceList.map((value, index) => (
                                    <tr key={index}>
                                        <td>
                                            <ImageLoader
                                                src={ENVIRONMENT_VARIABLES.PHOTO_URL + value.image_url}>
                                                <img className="img-fluid" style={{height: '150px', width: '150px'}}
                                                     alt={value.title}/>
                                                <img src="/assets/Images/NoImages.png" style={{height: '150px', width: '150px'}}
                                                     alt={value.title} />
                                                <img src="/assets/Images/s_loader.gif" style={{height: '150px', width: '150px'}}
                                                     alt={value.title} />
                                            </ImageLoader>
                                        </td>
                                        <td>{value.title}</td>
                                        <td>{value.description}</td>
                                        <td style={{textAlign: "center"}}>
                                            <button type="button" className="btn btn-primary" key={index}
                                                    onClick={event => {
                                                        this.getSpecificService(value.id)
                                                    }}>Edit
                                            </button>
                                            &nbsp;
                                            <button type="button" className="btn btn-danger" key={value.id}
                                                    onClick={event => {
                                                        this.removeSpecificService(value.id)
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
    const {manageServiceReducer} = state;
    return {
        Loading: manageServiceReducer.Loading,
        error_msg: manageServiceReducer.error_msg,
        serviceList: manageServiceReducer.serviceList,
        success_msg: manageServiceReducer.success_msg,
    };
};

const mapDispatchToProps = dispatch => ({
    actions: {
        serviceAction: bindActionCreators(serviceAction, dispatch)
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageService);
