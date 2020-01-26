import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import NotificationSystem from 'react-notification-system';
import * as serviceAction from '../../../actions/serviceAction';
import * as videoAction from '../../../actions/videoAction';
import Loader from '../../Helper/Loader';
import {confirmAlert} from 'react-confirm-alert';
import '../Helper/DeleteAlertCss/react-confirm-alert.css';
import AddDialog from './addDialog';
import EditDialog from './editDialog';
import {Dropdown} from 'semantic-ui-react';
import './manage-video.css';

class ManageVideo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            videoList: [],
            serviceNotFound: false,
            notificationSystem: null,
            isDialogOpen: false,
            isEditDialogOpen: false,
            selectedServiceId: null,
            selectedVideoId: null,
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
        else if (!nextProps.Video_Loading && nextProps.Video_Error_msg) {
            this.addNotifications(nextProps.Video_Error_msg, "error");
            this.props.actions.videoAction.DefaultMessageClear();
        }
        else if (!nextProps.Video_Loading && nextProps.success_msg) {
            this.addNotifications(nextProps.success_msg, "success");
            this.props.actions.videoAction.DefaultMessageClear();
            this.setState({isDialogOpen: false});
            this.setState({isEditDialogOpen: false});
            this.setState({videoList: nextProps.videoList || []});
        } else {
            if (this.state.serviceNotFound && nextProps.serviceList.length > 0) {
                this.setState({serviceNotFound: false}, () => {
                    let first_service_id = nextProps.serviceList[0].id;
                    //Todo action call.
                    this.props.actions.videoAction.VideoList(first_service_id);
                });
            }
            this.setState({videoList: nextProps.videoList || []});
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
                //Todo action call.
                this.props.actions.videoAction.VideoList(first_service_id);
            });
        }
    }

    getSpecificService = (videoId) => {
        this.setState({isEditDialogOpen: true, selectedVideoId: videoId});
    };

    removeSpecificService = (VideoId) => {
        confirmAlert({
            key: VideoId,
            message: 'Are you sure you want to Delete?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        this.props.actions.videoAction.VideoDelete(VideoId);
                    }
                },
                {
                    label: 'No'
                }
            ]
        })
    };

    addNewVideo = () => {
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
            //Todo ChangeList
            this.props.actions.videoAction.VideoList(value);
        }
    };


    render() {
        const {videoList} = this.state;
        let options = [];
        this.props.serviceList.map((service, index) => {
            let option = {
                text: service.title,
                value: service.id
            };
            options.push(option);
        });
        let selected_video = videoList.find((gallery) => gallery.id === this.state.selectedVideoId);
        let defaultValue = options.length > 0 ? options[0].value : "";

        return (
            <div className="bg-burrito-image autofill-background">
                <NotificationSystem ref="notificationSystem"/>
                {this.state.isDialogOpen &&
                <AddDialog handleClose={this.newProductClose} isOpen={this.state.isDialogOpen} serviceList={options}
                           notify={this.addNotifications} selectedServiceId={this.state.selectedServiceId}/>}

                {this.state.isEditDialogOpen &&
                <EditDialog handleClose={this.editDialogClose} isOpen={this.state.isEditDialogOpen}
                            notify={this.addNotifications} video={selected_video} serviceList={options}
                            selectedServiceId={this.state.selectedServiceId}/>}

                <div className="container tab-bg-container">
                    <div className="d-flex justify-content-between">
                    <h2 className="text-white"> Manage Video </h2>
                        <button type="button" className="w-25 mr-4 button_main2"
                                onClick={this.addNewVideo}>Add New Video
                        </button>
                        <div className="w-25">
                        <Dropdown placeholder={"Select Service"} fluid selection defaultValue={defaultValue}
                                  options={options}
                                  onChange={this.handleChangeStore} classname="pr-2"/>
                        </div>
                    </div>
                    {options.length > 0 && <div>
                        {videoList.length > 0 && <div className="data-display col-sm-12">
                            <div className="overflow-scroll">
                                <table width="100%" className="table">
                                    <tbody>
                                    <tr>
                                        <th style={{cursor: 'context-menu'}}>Video URL</th>
                                        <th style={{cursor: 'context-menu'}}>Title</th>
                                        <th style={{cursor: 'context-menu'}}>Description</th>
                                        <th style={{cursor: 'context-menu'}}>Sex</th>
                                        <th style={{cursor: 'context-menu'}}>Action</th>
                                    </tr>
                                    {videoList && videoList.map((value, index) => (
                                        <tr key={index}>
                                            <td>{value.video_url}</td>
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
                {this.props.Loading || this.props.Video_Loading && <Loader/>}
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    const {manageServiceReducer, manageVideoReducer} = state;
    return {
        Loading: manageServiceReducer.Loading,
        error_msg: manageServiceReducer.error_msg,
        serviceList: manageServiceReducer.serviceList,
        Video_Loading: manageVideoReducer.Loading,
        Video_Error_msg: manageVideoReducer.error_msg,
        videoList: manageVideoReducer.videoList,
        success_msg: manageVideoReducer.success_msg,
    };
};

const mapDispatchToProps = dispatch => ({
    actions: {
        serviceAction: bindActionCreators(serviceAction, dispatch),
        videoAction: bindActionCreators(videoAction, dispatch),
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageVideo);
