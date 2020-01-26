import React, {Component} from 'react';
import * as websiteAction from "../../../actions/websiteAction";
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import {connect} from "react-redux";

class Parents extends Component {

    componentDidMount() {
        window.scrollTo(0, 0);
        this.props.actions.websiteAction.basketVisible(true);
    }

    render() {
        return (
            <div style={{marginTop: '90px', marginBottom: '20px'}}>
                <Link to="/Profile/UserProfile" className="link">User Profile</Link>
                <Link to="/Profile/TodayCompleteOrders" className="link">your order</Link>
                {this.props.children}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    actions: {
        websiteAction: bindActionCreators(websiteAction, dispatch)
    }
});

export default connect(null, mapDispatchToProps)(Parents);