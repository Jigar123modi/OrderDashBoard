import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as websiteAction from "../../../actions/websiteAction";
import TimeSlotDialog from './TimeSlotDialog';
import {browserHistory} from 'react-router';
import './BasketItemsList.css';
import {confirmAlert} from 'react-confirm-alert';
import '../../Admin/Helper/DeleteAlertCss/react-confirm-alert.css';
import {isLoggedIn} from '../../../index';
import {Link} from 'react-router';
import Loader from '../../Helper/Loader';
import Lottie from 'react-lottie';
import * as animationData from './empty-cart';

class BasketItemsList extends Component {

    constructor(props) {
        super(props);
        this.state = {isDialogOpen: false, Loading: true}
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        setTimeout(() => {
            this.setState({Loading: false});
        }, 1000);
        if (this.props.BasketGeneratorProducts.length > 0) {
            this.props.actions.websiteAction.basketVisible(false);
        } else {
            browserHistory.push('/ProductList');
        }
    };

    componentWillReceiveProps(nextProps) {
        this.setState({isDialogOpen: nextProps.TimeSlotVisible});
    }

    getTimeSlots = () => {
        this.props.actions.websiteAction.getAllTimeSlots();
    };

    closeDialog = () => {
        this.setState({isDialogOpen: false});
    };

    placeOrder = (timeSlot) => {
        this.props.actions.websiteAction.placeOrder(timeSlot);
    };

    deleteProductFromCart = (product_id, teamMember_id) => {

        confirmAlert({
            key: product_id,
            message: 'Are you sure you want to Delete?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        this.props.actions.websiteAction.RemoveProductToCart(product_id, teamMember_id);
                    }
                },
                {
                    label: 'No'
                }
            ]
        });
    };

    checkLogin = () => {
        if (isLoggedIn())
            return false;
        else
            return true;
    };


    render() {
        const {Loading} = this.state;
        let visible = false;
        let totalPrice = 0;
        let offerPrice = 0;
        this.props.BasketGeneratorProducts.map((singleProduct) => {
            totalPrice += singleProduct.product.price;
            offerPrice += singleProduct.product.offerPrice;
            visible = true;
        });
        let discount = offerPrice - totalPrice;
        if (discount < 0) {
            discount = -(discount);
        }

        const defaultOptions = {
            loop: true,
            autoplay: true,
            animationData: animationData,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
            }
        };

        return (
            <div style={{marginTop: '100px', backgroundColor: '#f5f2ea'}}>

                {this.state.isDialogOpen &&
                <TimeSlotDialog handleClose={this.closeDialog} isOpen={this.state.isDialogOpen}
                                placeOrder={this.placeOrder} TimeSlots={this.props.TimeSlots}/>}

                {visible ? (
                    <div>
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
                                    <strong>Total</strong>
                                </td>
                                <td className="text-right">
                                    <strong>Remove</strong>
                                </td>
                            </tr>
                            </thead>
                            <tbody>

                            {this.props.BasketGeneratorProducts.map((singleProduct) => (
                                <tr key={singleProduct.product.id}>
                                    <td style={{"textTransform": "capitalize"}}> {singleProduct.product.title} </td>
                                    <td className="text-center">₹ {singleProduct.product.offerPrice}</td>
                                    <td className="text-center"
                                        style={{"textTransform": "capitalize"}}>{singleProduct.teamMember.first_name + " " + singleProduct.teamMember.last_name}</td>
                                    <td className="text-right">₹ {singleProduct.product.price}</td>
                                    <td className="text-right">
                                        <button
                                            onClick={() => this.deleteProductFromCart(singleProduct.product.id, singleProduct.teamMember.id)}> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            <tr>
                                <td className="thick-line"/>
                                <td className="thick-line"/>
                                <td className="thick-line"/>
                                <td className="thick-line"/>
                                <td className="thick-line"/>
                            </tr>
                            <tr>
                                <td className="thick-line"/>
                                <td className="thick-line"/>
                                <td className="thick-line"/>
                                <td className="no-line text-right">
                                    <strong>SubTotal</strong>
                                </td>
                                <td className="thick-line text-right">₹ {totalPrice} </td>
                            </tr>
                            <tr>
                                <td className="thick-line"/>
                                <td className="thick-line"/>
                                <td className="thick-line"/>
                                <td className="no-line text-right">
                                    <strong>Discount</strong>
                                </td>
                                <td className="no-line text-right">₹
                                    {discount}
                                </td>
                            </tr>
                            <tr>
                                <td className="thick-line"/>
                                <td className="thick-line"/>
                                <td className="thick-line"/>
                                <td className="no-line text-right">
                                    <strong>Total</strong>
                                </td>
                                <td className="no-line text-right">₹ {totalPrice}</td>
                            </tr>
                            </tbody>
                        </table>

                        {this.checkLogin() ? <Link to="/login"><span> Sign in or create account
Already use Saffron? Sign in with your account. </span></Link> :
                            <button onClick={this.getTimeSlots}> Place order</button>
                        }
                    </div>

                ) : <div>
                    <Lottie options={defaultOptions} height={400} width={400}/>
                    <Link to="/ProductList"><span> your cart is empty </span></Link>
                </div>
                }

                {Loading && <Loader/>}

            </div>

        );
    }
}

const mapStateToProps = (state) => {
    const {websiteReducer} = state;
    return {
        BasketGeneratorProducts: websiteReducer.BasketGeneratorProducts,
        TimeSlots: websiteReducer.TimeSlots,
        TimeSlotVisible: websiteReducer.TimeSlotVisible
    };
};

const mapDispatchToProps = dispatch => ({
    actions: {
        websiteAction: bindActionCreators(websiteAction, dispatch)
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(BasketItemsList);