import React, {Component} from 'react';
import OrderDialog from '../OrderDailog';
import './recent.css';

export default class RecentComplete extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isDialogOpen: false,
            selectOrder: null
        };
    }

    orderDialogOpen = (order) => {
        this.setState({selectOrder: order, isDialogOpen: true});
    };

    orderDialogClose = () => {
        this.setState({isDialogOpen: false});
    };

    render() {
        return (

            <div className="sidebar">
                {this.state.isDialogOpen &&
                <OrderDialog handleClose={this.orderDialogClose} isOpen={this.state.isDialogOpen} column={"finish"}
                             order={this.state.selectOrder}/>}
                <ul className="recent-details">
                    {
                        this.props.orders && this.props.orders.map((data) => (
                            <li style={{cursor: 'pointer'}}
                                className={data.paymentComplete ? "on" : "off"}
                                key={data.id}
                                onClick={event => {
                                    this.orderDialogOpen(data)
                                }}>
                                {data.customerName}
                            </li>
                        ))
                    }
                </ul>
            </div>

        );
    }
}


