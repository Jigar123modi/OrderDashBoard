import React, {Component} from 'react';
import {Dialog} from 'material-ui';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as serviceAction from '../../../../actions/serviceAction';
import * as teamAction from '../../../../actions/teamAction';


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
    },
};

class ProductDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: props.isOpen,
            image_url: null,
            title2: this.props.status.toLowerCase() === "service" ? "Service Description" : "Team Member Detail",
            commonData: {
                filetoupload: "",
                title: "",
                description: "",
                first_name: "",
                last_name: "",
                mobile_number: "",
                displayOrder: 1
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


        if (this.props.status.toLowerCase() === "service") {
            if (this.state.commonData.filetoupload !== "" && this.state.commonData.filetoupload !== null && this.state.commonData.description !== "" && this.state.commonData.title !== "")
                this.props.actions.serviceAction.AddService(this.state.commonData);
            else
                this.props.notify("All the fields are required", 'error');

        } else {
            if (this.state.commonData.filetoupload !== "" && this.state.commonData.filetoupload !== null && this.state.commonData.description !== "" && this.state.commonData.first_name !== "" && this.state.commonData.last_name !== "" && this.state.commonData.mobile_number !== "")
                if (/^\d{10}$/.test(this.state.commonData.mobile_number))
                    this.props.actions.teamAction.AddTeam(this.state.commonData);
                else
                    this.props.notify("Invalid Mobile Number", 'error');
            else
                this.props.notify("All the fields are required", 'error');
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
                                        <h2 style={{color:'#bf925b'}} className="mb-3">Add New {this.props.status}</h2>
                                    </div>
                                    <div className="panel-body container">
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="d-flex justify-content-center">
                                                <form className="w-100">
                                                    <div id="loginForm">
                                                        <div className="form-group">
                                                            <div className="input-group mb-3">
                                                                <span className="input-group-addon">
                                                                    <i className="fa fa-pencil" style={{color:'#bf925b'}}/>
                                                                </span>
                                                                {this.props.status.toLowerCase() === "service" ?
                                                                    <input type="text" name="title"
                                                                           placeholder="Service Name"
                                                                           className="form-control"
                                                                           onChange={this.handleChange}
                                                                           value={this.state.commonData.title}
                                                                           style={{borderBottom:'0px'}}/>
                                                                    :
                                                                    <input type="text" name="first_name"
                                                                           placeholder="TeamMember First Name"
                                                                           className="form-control"
                                                                           onChange={this.handleChange}
                                                                           value={this.state.commonData.first_name}
                                                                           style={{borderBottom:'0px'}}/>
                                                                }
                                                            </div>
                                                        </div>

                                                        {this.props.status.toLowerCase() !== "service" &&
                                                        < div className="form-group">
                                                            <div className="input-group mb-3">
                                                            <span className="input-group-addon">
                                                            <i className="fa fa-pencil" style={{color:'#bf925b'}}/>
                                                            </span>
                                                                <input type="text" name="last_name"
                                                                       placeholder="TeamMember Last Name"
                                                                       className="form-control"
                                                                       onChange={this.handleChange}
                                                                       value={this.state.commonData.last_name}
                                                                       style={{borderBottom:'0px'}}/>

                                                            </div>
                                                        </div>
                                                        }

                                                        {this.props.status.toLowerCase() !== "service" &&
                                                        < div className="form-group">
                                                            <div className="input-group mb-3">
                                                            <span className="input-group-addon">
                                                            <i className="fa fa-pencil" style={{color:'#bf925b'}}/>
                                                            </span>
                                                                <input type="number" name="mobile_number"
                                                                       placeholder="TeamMember Mobile Number"
                                                                       className="form-control"
                                                                       onChange={this.handleChange}
                                                                       value={this.state.commonData.mobile_number}
                                                                       style={{borderBottom:'0px'}}/>
                                                            </div>
                                                        </div>
                                                        }


                                                        <div className="form-group">
                                                            <div className="input-group mb-3">
                                                                <span className="input-group-addon">
                                                                    <i className="fa fa-pencil" style={{color:'#bf925b'}}/>
                                                                </span>
                                                                <input type="text" name="description"
                                                                       placeholder={this.state.title2}
                                                                       className="form-control"
                                                                       onChange={this.handleChange}
                                                                       value={this.state.commonData.description}
                                                                       style={{borderBottom:'0px'}}/>
                                                            </div>
                                                        </div>

                                                        {this.state.image_url !== undefined && this.state.image_url !== null && (
                                                            <img
                                                                src={this.state.image_url}
                                                                width="150px"
                                                                height="150px"/>)}
                                                        <input type="file" accept="image/*" onChange={this.handleSelectedFile}/>

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
        serviceAction: bindActionCreators(serviceAction, dispatch),
        teamAction: bindActionCreators(teamAction, dispatch)
    }
});


export default connect(null, mapDispatchToProps)(ProductDialog);
