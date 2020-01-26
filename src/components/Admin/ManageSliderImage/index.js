import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import NotificationSystem from 'react-notification-system';
import * as sliderAction from '../../../actions/sliderAction';
import Loader from '../../Helper/Loader';
import AddDialog from './addDialog';
import {confirmAlert} from 'react-confirm-alert';
import '../Helper/DeleteAlertCss/react-confirm-alert.css';
import ImageLoader from 'react-load-image';

import './manage-slider.css';
import ENVIRONMENT_VARIABLES from "../../../environment.config";

class ManageSliderImage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sliderList: [],
            notificationSystem: null,
            isEditDialogOpen: false,
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
            this.props.actions.sliderAction.DefaultMessageClear();
        } else if (!nextProps.Loading && nextProps.success_msg) {
            this.addNotifications(nextProps.success_msg, "success");
            this.props.actions.sliderAction.DefaultMessageClear();
            this.setState({sliderList: nextProps.sliderList || []});
            this.setState({isDialogOpen: false});
            this.setState({isEditDialogOpen: false});
        } else {
            this.setState({sliderList: nextProps.sliderList || []});
        }
    }

    componentDidMount() {
        this.setState({notificationSystem: this.refs.notificationSystem});
    };

    componentWillMount() {
        this.props.actions.sliderAction.SliderList();
    }

    removeSpecificSlider = (sliderId) => {
        confirmAlert({
            key: sliderId,
            message: 'Are you sure you want to Delete?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        this.props.actions.sliderAction.SliderDelete(sliderId);
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


    render() {
        const {sliderList} = this.state;

        return (
            <div className="bg-burrito-image autofill-background">
                <NotificationSystem ref="notificationSystem"/>
                {this.state.isDialogOpen &&
                <AddDialog handleClose={this.newProductClose} isOpen={this.state.isDialogOpen}
                           notify={this.addNotifications}/>}

                <div className="container tab-bg-container">
                    <div className="d-flex justify-content-between">
                    <h2 className="text-white"> Manage Slider Images </h2>
                    <button type="button" className="btn btn-primary w-25 button_main2"
                            onClick={this.addNewTeam}>Add new slider
                    </button>
                    </div>
                    {sliderList.length > 0 && <div className="data-display col-sm-12">
                        <div className="overflow-scroll">
                            <table width="100%" className="table">
                                <tbody>
                                <tr>
                                    <th style={{cursor: 'context-menu'}}>Slider Images</th>
                                    <th style={{cursor: 'context-menu'}}>Action</th>
                                </tr>
                                {sliderList && sliderList.map((value, index) => (
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
                                        <td style={{textAlign: "center"}}>
                                            <button type="button" className="btn btn-danger" key={value.id}
                                                    onClick={event => {
                                                        this.removeSpecificSlider(value.id)
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
    const {manageSliderReducer} = state;
    return {
        Loading: manageSliderReducer.Loading,
        error_msg: manageSliderReducer.error_msg,
        success_msg: manageSliderReducer.success_msg,
        sliderList: manageSliderReducer.sliderList,
    };
};

const mapDispatchToProps = dispatch => ({
    actions: {
        sliderAction: bindActionCreators(sliderAction, dispatch)
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageSliderImage);


