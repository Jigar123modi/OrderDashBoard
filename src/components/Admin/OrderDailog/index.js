import React, {Component} from 'react';
import {Dialog} from 'material-ui';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as saffronOrderDisplayAction from '../../../actions/saffronOrdersDisplayAction';
import {GetLocalUderData} from '../../../index';

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

class OrderDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: props.isOpen,
            column: props.column,
            order: props.order,
            role : GetLocalUderData().user.role,
            teamMemberId: GetLocalUderData().user.id,
            itemsList: GetLocalUderData().user.role.toLowerCase() !== "admin" ? props.order.teamWiseProductList.find((data) => data.id === GetLocalUderData().user.id) : []
        };
    }

    handleMoveToProgress = () => {
        this.props.actions.saffronOrderDisplayAction.orderStatusUpdateRequest(this.state.order.id, this.state.teamMemberId, this.state.column);
        this.props.handleClose();
    };

    handleDone = () => {
        this.props.actions.saffronOrderDisplayAction.orderStatusUpdateRequest(this.state.order.id, this.state.teamMemberId, 'finish');
        this.props.handleClose();
    };

    handleFinishPayment =  () => {
        this.props.actions.saffronOrderDisplayAction.orderStatusPaymentUpdateRequest(this.state.order.id, 'payment finish');
        this.props.handleClose();
    };

    render() {
        const {order} = this.state;
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
                                    <div className="panel-body container">
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="form-group text-center">
                                                    <div className="col-xs-12 text-center">
                                                        <div className="container">
                                                            <div className="row">
                                                                <div className="col-12">
                                                                    <div className="panel panel-default">
                                                                        <div className="panel-heading">
                                                                            <h3 className="panel-title text-dark mb-3">
                                                                                <strong>{order.customerName} ({order.customer_id}) </strong></h3>
                                                                        </div>
                                                                        <div className="panel-body">
                                                                            <div className="table-responsive">
                                                                                {this.state.role.toLowerCase() === "admin" ?
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
                                                                                                <strong>Totals</strong>
                                                                                            </td>
                                                                                        </tr>
                                                                                        </thead>
                                                                                        <tbody>

                                                                                        {this.state.order.basket.map((singleProduct) => (
                                                                                            <tr key={singleProduct.productItem.id}>
                                                                                                <td> {singleProduct.productItem.title} </td>
                                                                                                <td className="text-center">₹ {singleProduct.productItem.price}</td>
                                                                                                <td className="text-center">{singleProduct.productTeam.first_name + " " + singleProduct.productTeam.last_name}</td>
                                                                                                <td className="text-right">₹ {singleProduct.productItem.price}</td>
                                                                                            </tr>

                                                                                        ))}

                                                                                        <tr>
                                                                                            <td className="thick-line"></td>
                                                                                            <td className="thick-line"></td>
                                                                                            <td className="thick-line"></td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td className="thick-line"></td>
                                                                                            <td className="thick-line"></td>
                                                                                            <td className="thick-line text-center">
                                                                                                <strong>Subtotal</strong>
                                                                                            </td>
                                                                                            <td className="thick-line text-right">₹ {this.state.order.total} </td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td className="no-line"></td>
                                                                                            <td className="no-line"></td>
                                                                                            <td className="no-line text-center">
                                                                                                <strong>Discount</strong>
                                                                                            </td>
                                                                                            <td className="no-line text-right">₹
                                                                                                0
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td className="no-line"></td>
                                                                                            <td className="no-line"></td>
                                                                                            <td className="no-line text-center">
                                                                                                <strong>Total</strong>
                                                                                            </td>
                                                                                            <td className="no-line text-right">₹ {this.state.order.total}</td>
                                                                                        </tr>
                                                                                        </tbody>
                                                                                    </table> :
                                                                                    <table
                                                                                        className="table table-condensed">
                                                                                        <thead>
                                                                                        <tr>
                                                                                            <td><strong>Item</strong>
                                                                                            </td>
                                                                                            <td className="text-center">
                                                                                                <strong>Price</strong>
                                                                                            </td>
                                                                                            <td className="text-right">
                                                                                                <strong>Totals</strong>
                                                                                            </td>
                                                                                        </tr>
                                                                                        </thead>
                                                                                        <tbody>
                                                                                        {this.state.itemsList.productList.map((singleProduct) => (
                                                                                            <tr key={singleProduct.id}>
                                                                                                <td> {singleProduct.title} </td>
                                                                                                <td className="text-center">₹ {singleProduct.price}</td>
                                                                                                <td className="text-right">₹ {singleProduct.price}</td>
                                                                                            </tr>
                                                                                        ))}
                                                                                        <tr>
                                                                                            <td className="thick-line"></td>
                                                                                            <td className="thick-line"></td>
                                                                                            <td className="thick-line"></td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td className="thick-line"></td>
                                                                                            <td className="thick-line text-center">
                                                                                                <strong>Subtotal</strong>
                                                                                            </td>
                                                                                            <td className="thick-line text-right">₹ {this.state.order.total} </td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td className="no-line"></td>
                                                                                            <td className="no-line text-center">
                                                                                                <strong>Discount</strong>
                                                                                            </td>
                                                                                            <td className="no-line text-right">₹
                                                                                                0
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td className="no-line"></td>
                                                                                            <td className="no-line text-center">
                                                                                                <strong>Total</strong>
                                                                                            </td>
                                                                                            <td className="no-line text-right">₹ {this.state.order.total}</td>
                                                                                        </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    {this.state.role.toLowerCase() !== "admin" && (this.state.column && (this.state.column === "running late" || this.state.column === "recent orders") ?
                                                        < button type="button" style={{padding:'10px',marginRight:'10px',borderRadius:'5px',border:'0px',backgroundColor:'#bf925d',color:'#000000'}}
                                                                 onClick={this.handleMoveToProgress}>Move to
                                                            Progress
                                                        </button> :
                                                        !(this.state.column === "finish") && < button type="button" className="btn btn-save"
                                                                                                      style={{margin: '12px 10px 0 0'}}
                                                                                                      onClick={this.handleDone}>Finish
                                                        </button>)}
                                                    <button type="button" style={{padding:'10px',borderRadius:'5px',border:'0px',backgroundColor:'#bf925d',color:'#000000'}}
                                                            onClick={this.props.handleClose}>Close
                                                    </button>
                                                    {(this.state.role.toLowerCase() === "admin" && (this.state.column && this.state.column === "finish" && !(order.paymentComplete))) &&
                                                    < button type="button" className="btn btn-save"
                                                             style={{margin: '12px 10px 0 0'}}
                                                             onClick={this.handleFinishPayment}>Finish Payment
                                                    </button>
                                                    }
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
        saffronOrderDisplayAction: bindActionCreators(saffronOrderDisplayAction, dispatch)
    }
});

export default connect(null, mapDispatchToProps)(OrderDialog);