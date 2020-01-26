import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import NotificationSystem from 'react-notification-system';
import * as serviceAction from '../../../actions/serviceAction';
import * as teamProductManageAction from '../../../actions/teamProductManageAction';
import Loader from '../../Helper/Loader';
import {confirmAlert} from 'react-confirm-alert';
import '../Helper/DeleteAlertCss/react-confirm-alert.css';
import AddDialog from './addDialog';
import EditDialog from './editDialog';
import {Dropdown} from 'semantic-ui-react';
import ImageLoader from 'react-load-image';

import Switch from 'react-flexible-switch';

import './manage-product.css';
import ENVIRONMENT_VARIABLES from "../../../environment.config";

class ManageProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allProductList: [],
            serviceNotFound: false,
            notificationSystem: null,
            isDialogOpen: false,
            isEditDialogOpen: false,
            selectedServiceId: null,
            selectedProductId: null,
            isOfferProduct: false,
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
        } else if (!nextProps.product_Loading && nextProps.product_error_msg) {
            this.addNotifications(nextProps.product_error_msg, "error");
            this.props.actions.teamProductManageAction.DefaultMessageClear();
        } else if (!nextProps.product_Loading && nextProps.success_msg && nextProps.success_msg.toString().toLowerCase() !== 'successfully fetched') {
            this.addNotifications(nextProps.success_msg, "success");
            this.props.actions.teamProductManageAction.DefaultMessageClear();
            this.setState({isDialogOpen: false});
            this.setState({isEditDialogOpen: false});
            this.setState({allProductList: nextProps.allProductList || []});
        } else {
            if (this.state.serviceNotFound && nextProps.serviceList.length > 0) {
                this.setState({serviceNotFound: false, selectedServiceId: nextProps.serviceList[0].id});
            }
            this.setState({allProductList: nextProps.allProductList || []});
        }
    }

    componentDidMount() {
        this.setState({notificationSystem: this.refs.notificationSystem});
    };

    componentWillMount() {
        //First Time check all the services are available.
        if (this.props.serviceList.length === 0) {
            this.setState({serviceNotFound: true}, () => {
                this.props.actions.serviceAction.ServiceList();
            });
        }
        else {
            this.setState({selectedServiceId: this.props.serviceList[0].id});
        }

        //First Time check all the product are available.
        if (this.props.allProductList.length === 0) {
            this.props.actions.teamProductManageAction.ProductList();
        } else {
            this.setState({allProductList: this.props.allProductList || []});
        }

    }


    getSpecificService = (prductId) => {
        this.setState({isEditDialogOpen: true, selectedProductId: prductId});
    };

    removeSpecificProduct = (ProductId) => {
        confirmAlert({
            key: ProductId,
            message: 'Are you sure you want to Delete?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        this.props.actions.teamProductManageAction.DeleteProduct(ProductId);
                    }
                },
                {
                    label: 'No'
                }
            ]
        })
    };

    addNewService = () => {
        this.setState({isDialogOpen: true});
    };

    newProductClose = () => {
        this.setState({isDialogOpen: false});
    };

    editDialogClose = () => {
        this.setState({isEditDialogOpen: false});
    };

    handleChangeStore = (event, {value}) => {
        this.setState({selectedServiceId: value});
    };

    onchangeBlock(isOfferProductValue) {
        this.setState({isOfferProduct: isOfferProductValue});
    };

    render() {

        const {allProductList, selectedProductId, selectedServiceId, isOfferProduct} = this.state;
        let displayProduct = [];
        let options = [];
        this.props.serviceList.map((service, index) => {
            let option = {
                text: service.title,
                value: service.id
            };
            options.push(option);
        });
        let selected_product = allProductList.find((product) => product.id === selectedProductId);
        let defaultValue = options.length > 0 ? options[0].value : "";

        if (defaultValue !== null && defaultValue !== "") {
            allProductList.map((product, index) => {
                if (product.service_id === selectedServiceId) {
                    if (isOfferProduct && product.offerPrice > 0)
                        displayProduct.push(product);
                    else if (!isOfferProduct)
                        displayProduct.push(product);
                }
            });
        } else
            displayProduct = allProductList;


        return (
            <div className="bg-burrito-image autofill-background">
                <NotificationSystem ref="notificationSystem"/>
                {this.state.isDialogOpen &&
                <AddDialog handleClose={this.newProductClose} isOpen={this.state.isDialogOpen} serviceList={options}
                           notify={this.addNotifications}/>}

                {this.state.isEditDialogOpen &&
                <EditDialog handleClose={this.editDialogClose} isOpen={this.state.isEditDialogOpen}
                            notify={this.addNotifications} product={selected_product} serviceList={options}
                            selectedServiceId={this.state.selectedServiceId}/>}

                <div className="container tab-bg-container">
                    <div className="d-flex justify-content-between">
                    <h2 className="text-white"> Manage Products </h2>
                        <div style={{width:104}}>
                    <Switch classname="" value={isOfferProduct}
                                circleStyles={{onColor: 'green', offColor: 'red', diameter: 25}}
                                switchStyles={{width:95}}
                                onChange={(e) => {
                                    this.onchangeBlock(!isOfferProduct);
                                }}/>
                        </div>
                        <button type="button" className="btn btn-primary w-25 button_main2 mr-4"
                                onClick={this.addNewService}>Add new Product
                        </button>
                        <div className="w-25">
                        <Dropdown placeholder={"Select Service"} fluid selection defaultValue={defaultValue}
                                  options={options}
                                  onChange={this.handleChangeStore} classname="pr-2"/>
                        </div>
                    </div>
                    {options.length > 0 && <div>
                        {displayProduct.length > 0 && <div className="data-display col-sm-12">
                            <div className="table-responsive overflow-scroll">
                                <table width="100%" className="table">
                                    <tbody>
                                    <tr>
                                        <th style={{cursor: 'context-menu'}}>Product Image</th>
                                        <th style={{cursor: 'context-menu'}}>Title</th>
                                        <th style={{cursor: 'context-menu'}}>Description</th>
                                        <th style={{cursor: 'context-menu'}}>Price</th>
                                        <th style={{cursor: 'context-menu'}}>Offer Price</th>
                                        <th style={{cursor: 'context-menu'}}>Sex</th>
                                        <th style={{cursor: 'context-menu'}}>Action</th>
                                    </tr>
                                    {displayProduct && displayProduct.map((value, index) => (
                                        <tr key={index}>
                                            <td>
                                                <ImageLoader
                                                    src={ENVIRONMENT_VARIABLES.PHOTO_URL + value.image_url}>
                                                    <img className="img-fluid" style={{height: '150px', width: '150px'}}
                                                         alt={value.title}/>
                                                    <img src="/assets/Images/NoImages.png" style={{height: '150px', width: '150px'}}
                                                         alt={value.title} />
                                                    <img src="/assets/Images/s_loader.gif" style={{height: '150px', width: '150px'}}
                                                         alt={value.title} />
                                                </ImageLoader>
                                            </td>
                                            <td>{value.title}</td>
                                            <td>{value.description}</td>
                                            <td>{value.price}</td>
                                            <td>{value.offerPrice}</td>
                                            <td>{value.sex}</td>
                                            <td style={{textAlign: "center"}}>
                                                <button type="button" className="btn btn-primary" key={index}
                                                        onClick={event => {
                                                            this.getSpecificService(value.id)
                                                        }}>Edit
                                                </button>
                                                &nbsp;
                                                <button type="button" className="btn btn-danger" key={value.id}
                                                        onClick={event => {
                                                            this.removeSpecificProduct(value.id)
                                                        }}>Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>}
                    </div>}
                </div>
                {(this.props.product_Loading || this.props.Loading) && <Loader/>}
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    const {manageServiceReducer, manageTeamProductReducer} = state;
    return {
        Loading: manageServiceReducer.Loading,
        error_msg: manageServiceReducer.error_msg,
        serviceList: manageServiceReducer.serviceList,
        product_Loading: manageTeamProductReducer.Loading,
        product_error_msg: manageTeamProductReducer.error_msg,
        success_msg: manageTeamProductReducer.success_msg,
        teamProductList: manageTeamProductReducer.teamProductList,
        allProductList: manageTeamProductReducer.allProductList
    };
};

const mapDispatchToProps = dispatch => ({
    actions: {
        serviceAction: bindActionCreators(serviceAction, dispatch),
        teamProductManageAction: bindActionCreators(teamProductManageAction, dispatch),
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageProduct);
