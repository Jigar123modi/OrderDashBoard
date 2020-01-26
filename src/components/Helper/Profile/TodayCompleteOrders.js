import React, {Component} from 'react';
import {connect} from "react-redux";
import * as websiteAction from "../../../actions/websiteAction";
import {bindActionCreators} from "redux";
import {Collapse} from 'antd';
import 'antd/dist/antd.css';

let moment = require('moment-timezone');
const {Panel} = Collapse;


class TodayCompleteOrders extends Component {

    componentDidMount() {
        this.props.actions.websiteAction.getCompletedOrder();
    }

    render() {
        return (
            <div>
                <p> User SaffronPoint {this.props.SaffronPoint} </p>
                <div>
                    <Collapse accordion>
                        {this.props.RecentCompleteOrder && this.props.RecentCompleteOrder.map((singleCompletedOrder, index) => (
                            <Panel
                                header={`Order Status ${singleCompletedOrder.column} Total ${singleCompletedOrder.total} BookingDate ${moment.tz(singleCompletedOrder.bookingDateTime, 'Asia/Kolkata').format("DD-MM-YYYY HH:mm a")}`}
                                key={index}>
                                <div>
                                    <p> {`Your arrival time ${ moment.tz(singleCompletedOrder.bookingStartTime, 'Asia/Kolkata').format("DD-MM-YYYY HH:mm a") }`} </p>
                                    <table
                                        className="table table-bordered">
                                        <thead>
                                        <tr>
                                            <td><strong>Item</strong>
                                            </td>
                                            <td className="text-center">
                                                <strong>Price</strong>
                                            </td>
                                            <td className="text-center">
                                                <strong>Team
                                                    Member</strong>
                                            </td>
                                            <td className="text-right">
                                                <strong>Offer Price</strong>
                                            </td>
                                        </tr>
                                        </thead>
                                        <tbody>

                                        {singleCompletedOrder && singleCompletedOrder.basket.map((singleProduct) => (
                                            <tr key={singleProduct.productItem.id}>
                                                <td style={{"textTransform": "capitalize"}}> {singleProduct.productItem.title} </td>
                                                <td className="text-center">₹ {singleProduct.productItem.offerPrice > 0 ? singleProduct.productItem.offerPrice : singleProduct.productItem.price}</td>
                                                <td className="text-center"
                                                    style={{"textTransform": "capitalize"}}>{singleProduct.productTeam.first_name + " " + singleProduct.productTeam.last_name}</td>
                                                <td className="text-right">₹ {singleProduct.productItem.price}</td>
                                            </tr>
                                        ))}

                                        <tr>
                                            <td className="thick-line"/>
                                            <td className="thick-line"/>
                                            <td className="thick-line"/>
                                            <td className="thick-line"/>
                                        </tr>
                                        <tr>
                                            <td className="thick-line"/>
                                            <td className="thick-line"/>
                                            <td className="no-line text-right">
                                                <strong>Total</strong>
                                            </td>
                                            <td className="thick-line text-right">₹ {singleCompletedOrder.total} </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </Panel>
                        ))}
                    </Collapse>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const {websiteReducer} = state;
    return {
        RecentCompleteOrder: websiteReducer.RecentCompleteOrder,
        SaffronPoint: websiteReducer.SaffronPoint
    };
};

const mapDispatchToProps = dispatch => ({
    actions: {
        websiteAction: bindActionCreators(websiteAction, dispatch)
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(TodayCompleteOrders);