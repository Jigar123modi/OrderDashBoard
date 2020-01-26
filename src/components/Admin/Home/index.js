import React, {Component} from 'react';
import Loader from '../../Helper/Loader';
import NotificationSystem from 'react-notification-system';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import './layout.css';
import Running from '../Running';
import Recent from '../Recent';
import RunningLate from '../RunningLate';
import RecentComplete from '../RecentComplete';

import * as saffronOrdersDisplayAction from '../../../actions/saffronOrdersDisplayAction';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isResetOpen: false,
            notificationSystem: null
        }
    }

    addNotifications = (message, level) => {
        this.state.notificationSystem.addNotification({
            message: message,
            level: level,
            autoDismiss: 5
        });
    };

    componentWillReceiveProps(nextProps) {
        if (!nextProps.Loading && nextProps.error_msg)
            this.addNotifications(nextProps.error_msg, "error");
    }


    componentDidMount() {
        this.setState({notificationSystem: this.refs.notificationSystem});
    };

    render() {
        const {runningOrder, runningLate, recentOrders, recentComplete} = this.props;
        return (
            <div className="drive-by myClass">
                <NotificationSystem ref="notificationSystem"/>
                <section className={this.state.isResetOpen ? "drive-widget recent-runner" : "drive-widget"}>
                    <div className="drive-details">
                        <Running orders={runningOrder}/>
                        <Recent orders={recentOrders}/>
                        <RunningLate orders={runningLate}/>
                    </div>
                    <RecentComplete orders={recentComplete}/>
                </section>
                {this.props.Loading && <Loader/>}
            </div>
        );
    }
}


const mapDispatchToProps = dispatch => ({
    actions: {
        saffronOrdersDisplayAction: bindActionCreators(saffronOrdersDisplayAction, dispatch)
    }
});

const mapStateToProps = (state) => {
    const {saffronOrdersDisplayReducer} = state;
    return {
        Loading: saffronOrdersDisplayReducer.Loading,
        error_msg: saffronOrdersDisplayReducer.error_msg,
        runningOrder: saffronOrdersDisplayReducer.runningOrder,
        runningLate: saffronOrdersDisplayReducer.runningLate,
        recentOrders: saffronOrdersDisplayReducer.recentOrders,
        recentComplete: saffronOrdersDisplayReducer.recentComplete
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Home);

