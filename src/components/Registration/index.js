import React, {Component} from 'react';
import {ToastContainer, toast} from 'react-toastify';
import {browserHistory} from 'react-router';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import 'react-toastify/dist/ReactToastify.min.css';
import Loader from '../Helper/Loader';
import * as authAction from '../../actions/authAction';
import './registration.css';

class Registration extends Component {

    constructor(props) {
        super(props);
        this.state = {
            credentials: {
                first_name: '',
                mobile_number: '',
                password: '',
                confirm_password: '',
                role: ''
            }, isEmpty: false, invalidUser: false, toastId: ""
        }
    }

    notify = (message) => toast.error(message);


    removeToaster(toastId) {
        toast.dismiss(toastId);
        this.setState({toastId: ""})
    };

    handleChange = (event) => {
        this.setState({isEmpty: false, invalidUser: false});
        const field = event.target.name;
        const credentials = this.state.credentials;
        credentials[field] = event.target.value;
        return this.setState({credentials: credentials});
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.state.toastId && this.removeToaster(this.state.toastId);
        if (this.state.credentials.password.trim() !== "" && this.state.credentials.confirm_password.trim() !== "" && this.state.credentials.first_name.trim() !== "" && this.state.credentials.last_name.trim() !== "" && this.state.credentials.mobile_number.trim() !== "") {
            var check = true;
            if (!/^[a-zA-Z]+$/.test(this.state.credentials.first_name.trim())) {
                let toastId = this.notify("Invalid First Name; must be character");
                this.setState({toastId: toastId});
                check = false;
            }
            if (!/^[a-zA-Z]+$/.test(this.state.credentials.last_name.trim())) {
                let toastId = this.notify("Invalid Last Name; must be character");
                this.setState({toastId: toastId});
                check = false;
            }
            if (!/^\d{10}$/.test(this.state.credentials.mobile_number.trim())) {
                let toastId = this.notify("Invalid Phone Number; must be 10 digits");
                this.setState({toastId: toastId});
                check = false;
            }
            if (check) {
                if (this.state.credentials.password.trim() === this.state.credentials.confirm_password.trim()) {
                    this.props.actions.auth.registrationUser(this.state.credentials);
                } else {
                    let toastId = this.notify("Please check your confirm password");
                    this.setState({toastId: toastId});
                }
            }
        } else {
            let toastId = this.notify("All the fields are required");
            this.setState({toastId: toastId});
        }
    };

    componentWillReceiveProps(nextProps) {
        if (!nextProps.isRegistration && !nextProps.loading) {
            let toastId = this.notify(nextProps.error_msg);
            this.setState({toastId: toastId});
        } else if (nextProps.isRegistration) {
            browserHistory.push('/');
        }
    }


    render() {
        return (
            <div className="back_color">
                <ToastContainer
                    position="top-right"
                    type="default"
                    autoClose={6000}
                    hideProgressBar={false}
                    newestOnTop={true}
                    closeOnClick
                    pauseOnHover
                />
                <div className="modal-dialog d-flex m-0 mt-4 align-items-center w-75">
                    <div className="modal-content">
                        <a href="javascript:void(0);" className="logo"></a>
                        <div className="modal-body">
                            <div className="row login-form">
                                <div className="col-xs-12 text-center">
                                    <h2 style={{margin: '0px'}}>User Registration</h2>
                                </div>
                                <div className="panel-body container">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="d-flex justify-content-center">
                                            <form className="w-100">
                                                <div id="loginForm">
                                                    <div className="form-group">
                                                        <div className="input-group">
                                                        <span className="input-group-addon d-flex align-items-center pr-4">
                                                            <i className="fa fa-user icon_color"></i>
                                                        </span>
                                                            <input type="text" value={this.state.credentials.first_name}
                                                                   name="first_name" placeholder="First Name"
                                                                   className="form-control"
                                                                   onChange={this.handleChange}/>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <div className="input-group">
                                                        <span className="input-group-addon d-flex align-items-center pr-4">
                                                            <i className="fa fa-user icon_color"></i>
                                                        </span>
                                                            <input type="text" value={this.state.credentials.last_name}
                                                                   name="last_name" placeholder="Last Name"
                                                                   className="form-control"
                                                                   onChange={this.handleChange}/>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <div className="input-group">
                                                        <span className="input-group-addon d-flex align-items-center pr-4">
                                                            <i className="fa fa-user icon_color"></i>
                                                        </span>
                                                            <input type="number"
                                                                   value={this.state.credentials.mobile_number}
                                                                   name="mobile_number" placeholder="Mobile Number"
                                                                   className="form-control"
                                                                   onChange={this.handleChange}/>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <div className="input-group">
                                                        <span className="input-group-addon d-flex align-items-center pr-4">
                                                            <i className="fa fa-user icon_color"></i>
                                                        </span>
                                                            <input type="password"
                                                                   value={this.state.credentials.password}
                                                                   name="password"
                                                                   placeholder="Password"
                                                                   className="form-control"
                                                                   onChange={this.handleChange}/>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <div className="input-group">
                                                        <span className="input-group-addon d-flex align-items-center pr-4">
                                                            <i className="fa fa-lock icon_color"></i></span>
                                                            <input type="password"
                                                                   value={this.state.credentials.confirm_password}
                                                                   name="confirm_password"
                                                                   placeholder="Confirm Password"
                                                                   className="form-control"
                                                                   onChange={this.handleChange}/>
                                                        </div>
                                                        <div className="forgot-link text-center mt-3">
                                                            <Link to="/Login"
                                                                  style={{textDecoration: 'underline',color:'#000000',textDecoration:'none', fontFamily:'Josefin Sans'}}>Login</Link> &nbsp;
                                                            <Link to="/"
                                                                  style={{textDecoration: 'underline',color:'#000000',textDecoration:'none', fontFamily:'Josefin Sans'}}>Home</Link>
                                                        </div>
                                                        <div className="form-group text-center justify-content-center row mt-2">
                                                            <div className="col-xs-12 text-center">
                                                            </div>
                                                            <button type="submit" className="button_main"
                                                                    onClick={this.handleSubmit}>Sign Up
                                                            </button>
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
                {this.props.loading && <Loader/>}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const {authReducer} = state;
    return {
        loading: authReducer.loading,
        error_msg: authReducer.error_msg,
        success_msg: authReducer.success_msg,
        isRegistration: authReducer.isRegistration,
    }
};

const mapDispatchToProps = dispatch => ({
    actions: {
        auth: bindActionCreators(authAction, dispatch)
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
