import React, {Component} from 'react';
import moment from 'moment';
import OrderDialog from '../OrderDailog';
import ENVIRONMENT_VARIABLES from '../../../environment.config';
import {GetLocalUderData} from "../../../index";

export default class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDialogOpen: false,
            Time: 0,
            role: "",
            teamWiseOrderStatus: "",
            column: "",
            status: "",
            statusDateTime: ""
        };
    }

    tConvert = (time) => {
        // Check correct time format and split into components
        time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

        if (time.length > 1) { // If time format correct
            time = time.slice(1);  // Remove full string match value
            time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
            time[0] = +time[0] % 12 || 12; // Adjust hours
        }
        return time.join(''); // return adjusted time or original string
    };

    handleChangeTicket = () => {
        this.props.handleChangeTicket(this.props.currentElement);
    };

    componentDidMount() {
        if (this.props.order.column !== "running" && this.props.order.column !== "running late") {
            let audio = this.refs.audio;
            audio && audio.play();
        }

        let teamWiseOrder = [];
        let {column, status, statusDateTime} = this.props.order;
        const role = GetLocalUderData().user.role;
        if (role.toLowerCase() !== "admin" && this.props.order && this.props.order.teamWiseProductList) {
            teamWiseOrder = this.props.order.teamWiseProductList.find((data) => data.id === GetLocalUderData().user.id);
            column = teamWiseOrder.column;
            status = teamWiseOrder.orderStatus;
            statusDateTime = teamWiseOrder.statusDateTime;
        }

        this.setState({
            role: GetLocalUderData().user.role,
            teamWiseOrderStatus: teamWiseOrder,
            column: column,
            status: status,
            statusDateTime: statusDateTime
        });

        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    orderDialogOpen = () => {
        this.props.handleChangeTicket(this.props.currentElement);
        this.setState({isDialogOpen: true});
    };

    orderDialogClose = () => {
        this.setState({isDialogOpen: false});
    };


    tick() {
        let {column, statusDateTime} = this.state;
        let currentTime = new Date();
        let timeDiff = 0;
        const OrderTime = new Date(statusDateTime);
        if (column === "running" || column === "running late") {
            timeDiff = Math.abs(Math.round(((currentTime.getTime() - OrderTime.getTime()) / 1000) / 60));
        } else {
            timeDiff = Math.abs(Math.round(((OrderTime.getTime() - currentTime.getTime()) / 1000) / 60));
        }

        this.setState({
            Time: timeDiff || 0
        });

    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    };


    render() {
        const {column, status} = this.state;
        const time = this.state.Time;
        const orderTime = (moment(this.props.order.bookingStartTime).utcOffset('IST').format("DD-MM-YYYY HH:mm")).toString().split(" ");
        const orderTime12Hrs = this.tConvert(orderTime.toString().split(",")[1]);
        //const orderNo = this.props.order.id;
        const customerName = this.props.order.customerName;

        let Color = "#F3D250";
        if (column === "running") {
            Color = "#61892F";
        } else if (column === "running late") {
            Color = "#f76C6C";
        }
        //TODO change product images.
        const productImg = ENVIRONMENT_VARIABLES.PRODUCT_IMAGE;
        let classes = ['small-box'];

        if (column === "running") {
            classes = ['small-box', 'w3-animate-right'];
        } else if (column === "running late") {
            classes = ['small-box', 'w3-animate-left'];
        } else if (column === "recent orders") {
            classes = ['small-box', 'w3-animate-top'];
        }
        return (
            <li onClick={this.handleChangeTicket} style={{cursor: 'pointer'}}>
                {this.state.isDialogOpen &&
                <OrderDialog handleClose={this.orderDialogClose} isOpen={this.state.isDialogOpen} column={column}
                             order={this.props.order}/>}
                <div className={classes.join(' ')}>
                    {column !== "running" && column !== "running late" &&
                    <audio ref="audio">
                        <source src="/assets/store_door.mp3" type="audio/mpeg"/>
                    </audio>}
                    <div className="waiting-details" style={{backgroundColor: Color}}>
                        <div className="drive-status">{status}</div>
                        <div className="pickup-time" style={{fontSize: 30}}>{time}</div>
                        <div className="min text-uppercase">min</div>
                    </div>
                    {
                        column === "running" ?
                            <div className="status in-progress" style={{backgroundColor: Color}}>in
                                progress... #{customerName}
                            </div> : <div className="status pickup">{customerName}
                            </div>
                    }
                    <div className="box-right">
                        <div className="number" style={{fontSize: 15}}>{orderTime12Hrs}</div>
                        <div className="icon icon-btn-save">
                            <button type="submit" onClick={this.orderDialogOpen} className="btn button_main" style={{
                                minWidth: "none",
                                minHeight: "none",
                                padding: "4px 0px",
                                height: "40px",
                                width: "88px",
                                backgroundSize: "none"
                            }}>Show
                            </button>
                            {/*<p className="color">*/}
                            {/*{customerName}*/}
                            {/*</p>*/}
                        </div>
                        {/*<div className="image">*/}
                            {/*{productImg &&*/}
                            {/*<img src={productImg} className="img-responsive" style={{border: "none", height: "50px"}}*/}
                                 {/*alt=""/>}*/}
                        {/*</div>*/}
                    </div>
                </div>
            </li>
        );
    }
}
