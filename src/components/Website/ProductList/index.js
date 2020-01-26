import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import NotificationSystem from 'react-notification-system';
import * as websiteAction from "../../../actions/websiteAction";
import ENVIRONMENT_VARIABLES from "../../../environment.config";
import './ProductList.css';
import TeamListModel from './TeamListModel';
import ImageLoader from 'react-load-image';

class ProductList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isDialogOpen: false,
            selectedProduct: null,
            selectedProductTeamMember: null
        };
    }

    addNotifications = (message, level) => {
        this.state.notificationSystem.addNotification({
            message: message,
            level: level,
            autoDismiss: 5
        });
    };

    componentWillMount() {
        if (this.props.serviceList.length <= 0)
            this.props.actions.websiteAction.getWebsiteHome();

        if (this.props.AllProductsList.length <= 0)
            this.props.actions.websiteAction.getAllProducts();
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.setState({notificationSystem: this.refs.notificationSystem});
        this.props.actions.websiteAction.basketVisible(true);
    };

    DialogClose = () => {
        this.setState({isDialogOpen: false});
    };

    DialogOpen = (productId, service_id) => {
        const Service = this.props.AllProductsList.AllProducts.find((data) => data.service_id === service_id);
        const Product = Service.products.find((data) => data.id === productId);
        this.setState({isDialogOpen: true, selectedProduct: Product, selectedProductTeamMember: null});
    };

    SelectTeamMember = (TeamMemberId) => {
        this.setState({selectedProductTeamMember: TeamMemberId});
    };

    VisibleButton = () => {
        const {selectedProductTeamMember} = this.state;
        if (selectedProductTeamMember !== null)
            return true;
        else
            return false;
    };

    AddCart = () => {
        const {selectedProduct, selectedProductTeamMember} = this.state;
        this.props.actions.websiteAction.AddNewProductToCart(selectedProduct, selectedProductTeamMember);
        this.setState({isDialogOpen: false, selectedProduct: null, selectedProductTeamMember: null});
    };

    render() {
        const {isDialogOpen} = this.state;
        const TeamList = [];
        this.state.selectedProduct && this.state.selectedProduct.teamMember.map((id) => {
            TeamList.push(this.props.teamList.find((data) => data.id === id));
        });
        return (
            <div style={{marginTop: '90px', backgroundColor: '#f5f2ea'}}>
                <NotificationSystem ref="notificationSystem"/>

                {isDialogOpen &&
                <TeamListModel handleClose={this.DialogClose} isOpen={this.state.isDialogOpen}
                               VisibleButton={this.VisibleButton}
                               TeamList={TeamList}
                               SelectTeamMember={this.SelectTeamMember} AddCart={this.AddCart}/>}

                <div className="d-flex align-items-center pl-md-3 service_menu">
                    {this.props.serviceList.map((singleService, i) => (
                        <a href={"#" + singleService.title} key={i}>{singleService.title}</a>
                    ))}
                </div>

                {this.props.AllProductsList.AllProducts && this.props.AllProductsList.AllProducts.map((singleService) => (
                    <div id={singleService.title} className="service_1" key={singleService.service_id}>
                        <div className="container">

                            <div className="title_space">
                                <span className="service_main_title">{singleService.title}</span>
                            </div>

                            <div className="row">
                                {singleService.products.map((singleProduct, i) => (
                                    <div className="col-md-4"
                                         key={i}
                                         onClick={() => this.DialogOpen(singleProduct.id, singleProduct.service_id)}>
                                        <div className="service_box">
                                            {singleProduct.offerPrice > 0 &&
                                            <div id="pointer"><span className="shape_text">Offer Price.</span></div>}
                                            <div>
                                                <ImageLoader
                                                    src={ENVIRONMENT_VARIABLES.PHOTO_URL + singleProduct.image_url}>
                                                    <img className="img-fluid" style={{height: '50px', width: '50px'}}
                                                         alt={singleProduct.title}/>
                                                    <img src="/assets/Images/NoImages.png" style={{height: '50px', width: '50px'}}
                                                         alt={singleProduct.title} />
                                                    <img src="/assets/Images/s_loader.gif" style={{height: '50px', width: '50px'}}
                                                         alt={singleProduct.title} />
                                                </ImageLoader>
                                                <span
                                                    className="service_title ml-md-3">{singleProduct.title} ({singleProduct.sex})</span>
                                            </div>
                                            <div className="price">
                                                {singleProduct.offerPrice > 0 &&
                                                <strike className="price1">{singleProduct.offerPrice}</strike>}
                                                <span className="price2">{singleProduct.price}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );

    }
}

const mapStateToProps = (state) => {
    const {websiteReducer} = state;
    return {
        AllProductsList: websiteReducer.AllProductsList,
        serviceList: websiteReducer.serviceList,
        teamList: websiteReducer.teamList
    };
};

const mapDispatchToProps = dispatch => ({
    actions: {
        websiteAction: bindActionCreators(websiteAction, dispatch)
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);