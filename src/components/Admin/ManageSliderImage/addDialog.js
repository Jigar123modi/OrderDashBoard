import React, {Component} from 'react';
import {Dialog} from 'material-ui';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as sliderAction from '../../../actions/sliderAction';

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

class AddDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: props.isOpen,
            image_url: null,
            commonData: {
                filetoupload: "",
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
        if (this.state.commonData.filetoupload !== "" && this.state.commonData.filetoupload !== null) {
            this.props.actions.sliderAction.AddSlider(this.state.commonData);
        } else {
            this.props.notify("Image file is required", 'error');
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
                                        <h2 className="title">Add New Slider</h2>
                                        <br/>
                                    </div>
                                    <div className="panel-body w-100">
                                        <div className="row">
                                            <div className="col-md-offset-1 col-md-10">
                                                {this.state.image_url !== undefined && this.state.image_url !== null && (
                                                    <img
                                                        src={this.state.image_url}
                                                        width="350px"
                                                        height="150px"/>)}
                                                <input type="file" accept="image/*" onChange={this.handleSelectedFile}/>
                                                <form className="w-100">
                                                    <div id="loginForm">
                                                        <div className="form-group">
                                                            <div className="form-group text-center row">
                                                                <div className="col-xs-12 text-center d-flex justify-content-center">
                                                                    <button type="button" className="button_main"
                                                                            style={{margin: '12px 10px 0 0',width:'35%'}}
                                                                            onClick={this.handleSave}>Save
                                                                    </button>
                                                                    <button type="button" className="button_main"
                                                                            style={{margin: '12px 10px 0 0',width:'35%'}}
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
        sliderAction: bindActionCreators(sliderAction, dispatch),
    }
});


export default connect(null, mapDispatchToProps)(AddDialog);
