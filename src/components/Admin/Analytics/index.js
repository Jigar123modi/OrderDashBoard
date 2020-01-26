import React, {Component} from 'react';
import './analytics.css';
import TopUsersListReport from './TopUsersListReport';
import GetTotalOrderStatusWise from './GetTotalOrderStatusWise';
import GetTeamWiseOrderStatusReport from './GetTeamWiseOrderStatusReport';
import GetTotalBillablePrice from './GetTotalBillablePrice';
import NotificationSystem from 'react-notification-system';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as analyticsAction from '../../../actions/analyticsAction';

class Analytics extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notificationSystem: null,
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
            this.props.actions.analyticsAction.DefaultMessageClear();
        } else if (!nextProps.Loading && nextProps.success_msg) {
            this.addNotifications(nextProps.success_msg, "success");
            this.props.actions.analyticsAction.DefaultMessageClear();
        }
    }

    componentDidMount() {
        this.setState({notificationSystem: this.refs.notificationSystem});
    };

    componentWillMount() {
        this.props.actions.analyticsAction.GetAnalyticsRecords();
    };

    render() {
        return (
            <div>
                <div className="dashboard-main">
                    <NotificationSystem ref="notificationSystem"/>
                    <TopUsersListReport loading={this.props.Loading} topUsers={this.props.topUsers}/>
                    <GetTotalOrderStatusWise loading={this.props.Loading}
                                             getOrderStatusReport={this.props.getOrderStatusReport}/>

                    <GetTeamWiseOrderStatusReport loading={this.props.Loading}
                                                  getTeamWiseOrderStatusReport={this.props.getTeamWiseOrderStatusReport}/>

                    <GetTotalBillablePrice loading={this.props.Loading}
                                           getTotalBillablePrice={this.props.getTotalBillablePrice}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const {manageAnalyticsReducer} = state;
    return {
        Loading: manageAnalyticsReducer.Loading,
        error_msg: manageAnalyticsReducer.error_msg,
        topUsers: manageAnalyticsReducer.topUsers,
        getTotalBillablePrice: manageAnalyticsReducer.getTotalBillablePrice,
        getOrderStatusReport: manageAnalyticsReducer.getOrderStatusReport,
        getTeamWiseOrderStatusReport: manageAnalyticsReducer.getTeamWiseOrderStatusReport,
        success_msg: manageAnalyticsReducer.success_msg,
    };
};

const mapDispatchToProps = dispatch => ({
    actions: {
        analyticsAction: bindActionCreators(analyticsAction, dispatch),
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Analytics);
