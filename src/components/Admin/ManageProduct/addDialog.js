import React, {Component} from 'react';
import {Dialog} from 'material-ui';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as teamProductManageAction from '../../../actions/teamProductManageAction';
import {Dropdown} from 'semantic-ui-react';

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
            selectedServiceId: null,
            selectedSex: null,
            commonData: {
                filetoupload: "",
                title: "",
                description: "",
                service_id: null,
                sex: 'male',
                price: null,
                offerPrice: null,
            }
        };
    }

    handleselectedFile = (event) => {
        const commonData = this.state.commonData;
        if (event.target.files[0] !== "" && event.target.files[0] !== null && event.target.files[0] !== undefined) {
            commonData['filetoupload'] = event.target.files[0];
            this.setState({commonData: commonData, image_url: URL.createObjectURL(event.target.files[0])});
        }
    };

    handleChange = (event) => {
        const field = event.target.name;
        const commonData = this.state.commonData;
        commonData[field] = event.target.value;
        return this.setState({commonData: commonData});
    };

    handleSave = () => {
        if (this.state.commonData.filetoupload !== "" && this.state.commonData.filetoupload !== null && this.state.commonData.description !== "" && this.state.commonData.title !== "" && this.state.commonData.service_id !== null && this.state.commonData.sex !== null && this.state.commonData.price !== null && this.state.commonData.offerPrice !== null) {
            var reg = /^\d+$/;

            if (this.state.commonData.price.match(reg) && this.state.commonData.offerPrice.match(reg)) {
                this.props.actions.teamProductManageAction.AddProduct(this.state.commonData);
            } else {
                this.props.notify("Invalid Price or offerPrice", 'error');
            }
        } else {
            this.props.notify("All the fields are required", 'error');
        }
    };

    handleChangeService = (event, {value}) => {
        if (value !== null) {
            const commonData = this.state.commonData;
            commonData['service_id'] = value;
            this.setState({commonData: commonData});
        }
    };

    onChange = (event) => {
        const commonData = this.state.commonData;
        commonData['sex'] = event.target.value;
        this.setState({commonData: commonData});
    };

    render() {

        const {sex} = this.state.commonData;

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
                                        <h2 className="title">Add New Product</h2>
                                    </div>
                                    <div className="panel-body container">
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="d-flex justify-content-center">
                                                <form className="w-100">
                                                    <div id="loginForm">
                                                        <div className="form-group">
                                                            <div className="input-group">
                                                                <Dropdown placeholder="Select Service" fluid selection
                                                                          options={this.props.serviceList}
                                                                          onChange={this.handleChangeService}/>
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <div className="input-group">
                                                                <span className="input-group-addon">
                                                                    <i className="fa fa-pencil icon_color"/>
                                                                </span>
                                                                <input type="text" name="title"
                                                                       placeholder="Product Title"
                                                                       style={{borderBottom:'0'}}
                                                                       className="form-control"
                                                                       onChange={this.handleChange}
                                                                       value={this.state.commonData.title}/>
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <div className="input-group">
                                                                <span className="input-group-addon">
                                                                    <i className="fa fa-pencil icon_color"/>
                                                                </span>
                                                                <input type="text" name="description"
                                                                       placeholder="Description"
                                                                       style={{borderBottom:'0'}}
                                                                       className="form-control"
                                                                       onChange={this.handleChange}
                                                                       value={this.state.commonData.description}/>
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <div className="input-group">
                                                                <span className="input-group-addon pr-4">
                                                                    <i className="fa fa-pencil icon_color"/>
                                                                </span>
                                                                <input type="number" name="price"
                                                                       placeholder="Price"
                                                                       className="form-control"
                                                                       onChange={this.handleChange}
                                                                       value={this.state.commonData.price}/>
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <div className="input-group">
                                                                <span className="input-group-addon">
                                                                    <i className="fa fa-pencil icon_color"/>
                                                                </span>
                                                                <input type="number" name="offerPrice"
                                                                       placeholder="Offer Price"
                                                                       style={{borderBottom:'0'}}
                                                                       className="form-control"
                                                                       onChange={this.handleChange}
                                                                       value={this.state.commonData.offerPrice}/>
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <div className="input-group d-flex justify-content-center">
                                                                <div>
                                                                <input type="radio" name="gender" value="male"
                                                                       onClick={this.onChange}
                                                                       checked={sex === 'male'}/> <b style={{'cursor': 'default'}}> Male </b> &nbsp;
                                                                </div>
                                                                <div>
                                                                <input type="radio" name="gender" value="female"
                                                                       onClick={this.onChange}
                                                                       checked={sex === 'female'}/> <b style={{'cursor': 'default'}}> Female </b>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {this.state.image_url !== undefined && this.state.image_url !== null && (
                                                            <img
                                                                src={this.state.image_url}
                                                                width="90px"
                                                                height="90px"/>)}
                                                        <input type="file" accept="image/*" onChange={this.handleselectedFile}/>

                                                        <div className="form-group">
                                                            <div className="form-group text-center row">
                                                                <div className="col-xs-12 text-center">
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
                    </div>
                </Dialog>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    actions: {
        teamProductManageAction: bindActionCreators(teamProductManageAction, dispatch),
    }
});


export default connect(null, mapDispatchToProps)(AddDialog);
