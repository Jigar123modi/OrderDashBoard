import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import NotificationSystem from 'react-notification-system';
import * as serviceAction from '../../../actions/serviceAction';
import * as galleryAction from '../../../actions/galleryAction';
import Loader from '../../Helper/Loader';
import {confirmAlert} from 'react-confirm-alert';
import '../Helper/DeleteAlertCss/react-confirm-alert.css';
import AddDialog from './addDialog';
import EditDialog from './editDialog';
import {Dropdown} from 'semantic-ui-react';
import ImageLoader from 'react-load-image';

import './manage-gallery.css';
import ENVIRONMENT_VARIABLES from "../../../environment.config";

class ManageGallery extends Component {

    constructor(props) {
        super(props);
        this.state = {
            galleryList: [],
            serviceNotFound: false,
            notificationSystem: null,
            isDialogOpen: false,
            isEditDialogOpen: false,
            selectedServiceId: null,
            selectedGalleryId: null,
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
        }
        else if (!nextProps.Galley_Loading && nextProps.Gallery_Error_msg) {
            this.addNotifications(nextProps.Gallery_Error_msg, "error");
            this.props.actions.galleryAction.DefaultMessageClear();
        }
        else if (!nextProps.Galley_Loading && nextProps.success_msg) {
            this.addNotifications(nextProps.success_msg, "success");
            this.props.actions.galleryAction.DefaultMessageClear();
            this.setState({isDialogOpen: false});
            this.setState({isEditDialogOpen: false});
            this.setState({galleryList: nextProps.galleryList || []});
        } else {
            if (this.state.serviceNotFound && nextProps.serviceList.length > 0) {
                this.setState({serviceNotFound: false}, () => {
                    let first_service_id = nextProps.serviceList[0].id;
                    this.props.actions.galleryAction.GalleryList(first_service_id);
                });
            }
            this.setState({galleryList: nextProps.galleryList || []});
        }
    }

    componentDidMount() {
        this.setState({notificationSystem: this.refs.notificationSystem});
    };

    componentWillMount() {
        if (this.props.serviceList.length === 0) {
            this.setState({serviceNotFound: true}, () => {
                this.props.actions.serviceAction.ServiceList();
            });
        }
        else {
            this.setState({selectedServiceId: this.props.serviceList[0].id}, () => {
                let first_service_id = this.props.serviceList[0].id;
                this.props.actions.galleryAction.GalleryList(first_service_id);
            });
        }
    }

    getSpecificService = (galleryId) => {
        this.setState({isEditDialogOpen: true, selectedGalleryId: galleryId});
    };

    removeSpecificService = (GalleryId) => {
        confirmAlert({
            key: GalleryId,
            message: 'Are you sure you want to Delete?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        this.props.actions.galleryAction.GalleryDelete(GalleryId);
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

    handleChangeStore = (event, {value}) => {
        this.setState({selectedServiceId: value});
        if (value !== null) {
            this.props.actions.galleryAction.GalleryList(value);
        }
    };


    render() {
        const {galleryList} = this.state;
        let options = [];
        this.props.serviceList.map((service, index) => {
            let option = {
                text: service.title,
                value: service.id
            };
            options.push(option);
        });
        let selected_gallery = galleryList.find((gallery) => gallery.id === this.state.selectedGalleryId);
        let defaultValue = options.length > 0 ? options[0].value : "";

        return (
            <div className="bg-burrito-image autofill-background">
                <NotificationSystem ref="notificationSystem"/>
                {this.state.isDialogOpen &&
                <AddDialog handleClose={this.newProductClose} isOpen={this.state.isDialogOpen} serviceList={options}
                           notify={this.addNotifications} selectedServiceId={this.state.selectedServiceId}/>}

                {this.state.isEditDialogOpen &&
                <EditDialog handleClose={this.editDialogClose} isOpen={this.state.isEditDialogOpen}
                            notify={this.addNotifications} gallery={selected_gallery} serviceList={options}
                            selectedServiceId={this.state.selectedServiceId}/>}

                <div className="container tab-bg-container">
                    <div className="dropdown_position d-flex justify-content-between">
                    <h2 className="text-white"> Manage Gallery </h2>
                        <button type="button" className="btn btn-primary w-25 mr-4 button_main2"
                                onClick={this.addNewService}>Add New Gallery
                        </button>
                        <div className="w-25">
                        <Dropdown placeholder={"Select Service"} fluid selection defaultValue={defaultValue}
                                  options={options}
                                  onChange={this.handleChangeStore} classname="pr-2"/>
                        </div>
                    </div>
                    {options.length > 0 && <div>
                        {galleryList.length > 0 && <div className="data-display col-12">
                            <div className="overflow-scroll">
                                <table width="100%" className="table">
                                    <tbody>
                                    <tr>
                                        <th style={{cursor: 'context-menu'}}>Gallery Image</th>
                                        <th style={{cursor: 'context-menu'}}>Title</th>
                                        <th style={{cursor: 'context-menu'}}>Description</th>
                                        <th style={{cursor: 'context-menu'}}>Sex</th>
                                        <th style={{cursor: 'context-menu'}}>Action</th>
                                    </tr>
                                    {galleryList && galleryList.map((value, index) => (
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
                                            <td>{value.sex}</td>
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
                        </div>}
                    </div>}

            </div>
                {this.props.Loading || this.props.Galley_Loading && <Loader/>}
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    const {manageServiceReducer, manageGalleryReducer} = state;
    return {
        Loading: manageServiceReducer.Loading,
        error_msg: manageServiceReducer.error_msg,
        serviceList: manageServiceReducer.serviceList,
        Galley_Loading: manageGalleryReducer.Loading,
        Gallery_Error_msg: manageGalleryReducer.error_msg,
        galleryList: manageGalleryReducer.galleryList,
        success_msg: manageGalleryReducer.success_msg,
    };
};

const mapDispatchToProps = dispatch => ({
    actions: {
        serviceAction: bindActionCreators(serviceAction, dispatch),
        galleryAction: bindActionCreators(galleryAction, dispatch),
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageGallery);
