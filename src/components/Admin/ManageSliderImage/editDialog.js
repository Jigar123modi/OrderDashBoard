import React, {Component} from 'react';
import {Dialog} from 'material-ui';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as galleryAction from '../../../actions/galleryAction';
import ENVIRONMENT_VARIABLES from "../../../environment.config";
import {Dropdown} from 'semantic-ui-react';
import {RadioGroup, RadioButton} from 'react-radio-buttons';

const style = {
    titleStyle: {
        paddingLeft: 15,
        paddingRight: '15px',
        borderBottom: '1px solid #F5F5F5'
    },
    actionsContainerStyle: {
        textAlign: 'right',
        padding: '5 5'
    },
    leftCloseButton: {
        borderRadius: '50%',
        boxShadow: '0px 2px 9px -2px #000',
        float: 'right',
        backgroundColor: '#fff',
        width: 43,
        height: 43,
        fontSize: 25,
        fontFamily: 'FontAwesome',
        color: '#c53140',
        marginTop: '-6px',
        padding: "9px 12px"
    }
};

class EditDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: props.isOpen,
            image_url: ENVIRONMENT_VARIABLES.PHOTO_URL + this.props.gallery.image_url,
            commonData: {
                filetoupload: "",
                title: this.props.gallery.title,
                id: this.props.gallery.id,
                description: this.props.gallery.description,
                service_id: this.props.gallery.service_id,
                sex: this.props.gallery.sex,
                selectedServiceId: this.props.selectedServiceId
            }
        };
    }

    handleSelectedFile = (event) => {
        const commonData = this.state.commonData;
        commonData['filetoupload'] = event.target.files[0];
        this.setState({commonData: commonData, image_url: URL.createObjectURL(event.target.files[0])});
    };

    handleChange = (event) => {
        const field = event.target.name;
        const commonData = this.state.commonData;
        commonData[field] = event.target.value;
        return this.setState({commonData: commonData});
    };

    handleSave = () => {
        if (this.state.commonData.description !== "" && this.state.commonData.title !== "" && this.state.commonData.service_id !== null && this.state.commonData.sex !== null) {
            this.props.actions.galleryAction.EditGallery(this.state.commonData);
        } else {
            this.props.notify("All the fields are required", 'error');
        }
    };

    onChange = (value) => {
        const commonData = this.state.commonData;
        commonData['sex'] = value;
        this.setState({commonData: commonData});
    };

    handleChangeService = (event, {value}) => {
        if (value !== null) {
            const commonData = this.state.commonData;
            commonData['service_id'] = value;
            this.setState({commonData: commonData});
        }
    };


    render() {
        return (
            <div>
                <Dialog
                    titleStyle={style.titleStyle}
                    contentStyle={style.contentStyle}
                    modal={true}
                    bodyStyle={{padding: 0}}
                    open={this.state.isOpen}
                    onRequestClose={this.props.handleClose}
                    paperClassName="change-password"
                    contentClassName="change-password-content"
                    className="password-dialog"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="row login-form">
                                    <div className="col-xs-12 text-center">
                                        <h2 className="title">Edit Service</h2>
                                        <br/>
                                    </div>
                                    <div className="panel-body">
                                        <div className="row">
                                            <div className="col-md-offset-1 col-md-10">
                                                {this.state.image_url !== undefined ? (
                                                    <img
                                                        src={this.state.image_url}
                                                        width="150px"
                                                        height="150px"/>) : (
                                                    <img
                                                        src={ENVIRONMENT_VARIABLES.PHOTO_URL + "images/UserAvatar/demo.png"}
                                                        width="150px"
                                                        height="150px"/>)}
                                                <input type="file" accept="image/*" onChange={this.handleSelectedFile}/>
                                                <form className="w-100">
                                                    <div id="loginForm">
                                                        <div className="form-group">
                                                            <div className="input-group">
                                                                <Dropdown placeholder="Select Service" fluid selection
                                                                          defaultValue={this.state.commonData.service_id}
                                                                          options={this.props.serviceList}
                                                                          onChange={this.handleChangeService}/>
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <div className="input-group">
                                                                <span className="input-group-addon">
                                                                    <i className="fa fa-lock icon_color"/>
                                                                </span>
                                                                <input type="text" name="title"
                                                                       placeholder="Service Title"
                                                                       className="form-control"
                                                                       style={{borderBottom:'0'}}
                                                                       onChange={this.handleChange}
                                                                       value={this.state.commonData.title}/>
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <div className="input-group">
                                                                <RadioGroup onChange={this.onChange} horizontal>
                                                                    <RadioButton value="male">
                                                                        Male
                                                                    </RadioButton>
                                                                    <RadioButton value="female">
                                                                        Female
                                                                    </RadioButton>
                                                                </RadioGroup>
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <div className="input-group">
                                                                <span className="input-group-addon">
                                                                    <i className="fa fa-key icon_color"/>
                                                                </span>
                                                                <input type="text" name="description"
                                                                       placeholder="Service Description"
                                                                       style={{borderBottom:'0'}}
                                                                       className="form-control"
                                                                       onChange={this.handleChange}
                                                                       value={this.state.commonData.description}/>
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <div className="form-group text-center row">
                                                                <div className="col-xs-12 text-center">
                                                                    <button type="button" className="button_main"
                                                                            style={{margin: '12px 10px 0 0'}}
                                                                            onClick={this.handleSave}>Save
                                                                    </button>
                                                                    <button type="button" className="button_main"
                                                                            style={{margin: '12px 10px 0 0'}}
                                                                            onClick={this.props.handleClose}>Close
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    actions: {
        galleryAction: bindActionCreators(galleryAction, dispatch)
    }
});


export default connect(null, mapDispatchToProps)(EditDialog);
