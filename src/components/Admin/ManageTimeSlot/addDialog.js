import React, {Component} from 'react';
import {Dialog} from 'material-ui';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as timeSlotsAction from '../../../actions/timeSlotsAction';
import TimePicker from 'react-time-picker';

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
            start_time: '00:00',
            end_time: '00:00',
        };
    }

    onChangeStartTime = time => this.setState({start_time: time });

    onChangeEndTime = time => this.setState({end_time: time});

    handleSave = () => {
        if (this.state.start_time !== null && this.state.end_time !== null) {
            console.log(this.state.start_time);
            console.log(this.state.end_time);
            this.props.actions.timeSlotsAction.TimeSlotAdd({
                start_time: this.state.start_time,
                end_time: this.state.end_time
            });
        }
        else {
            this.props.notify("Please input valid time format", 'error');
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
                                        <h2 className="title">Add New TimeSlot</h2>
                                    </div>
                                    <div className="panel-body w-100">
                                        <div className="row">
                                            <div className="col-md-offset-1 col-md-10">
                                                <form className="w-100">
                                                    <div id="loginForm">
                                                        <div className="form-group">
                                                            <div className="input-group d-flex justify-content-between">
                                                                <TimePicker
                                                                    onChange={this.onChangeStartTime}
                                                                    value={this.state.start_time}
                                                                />
                                                                <TimePicker
                                                                    onChange={this.onChangeEndTime}
                                                                    value={this.state.end_time}
                                                                />
                                                            </div>
                                                        </div>
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
                </Dialog>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    actions: {
        timeSlotsAction: bindActionCreators(timeSlotsAction, dispatch),
    }
});

export default connect(null, mapDispatchToProps)(AddDialog);
