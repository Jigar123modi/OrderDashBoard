import {
    PRODUCT_INPROGRESS,
    PRODUCT_NOT_SUCCESS,
    PRODUCT_SUCCESS,
    TEAM_MEMBER_PRODUCT_SUCCESS,
    PRODUCT_EDIT_SUCCESS,
    PRODUCT_ADD_SUCCESS,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_CONNECTION_ERROR,
    PRODUCT_DEFAULT_CLEAR,
} from '../constants/actionTypes';


import initialState from './initialState';

export default function manageTeamProductReducer(state = initialState.manageTeamProductReducer, action) {
    switch (action.type) {

        case PRODUCT_DEFAULT_CLEAR:
            return Object.assign({}, state, {error_msg: null, success_msg: null});

        case PRODUCT_INPROGRESS:
            return Object.assign({}, state, {Loading: true, error_msg: null, success_msg: null});

        case PRODUCT_CONNECTION_ERROR:
            return Object.assign({}, state, {
                Loading: false,
                error_msg: action.data.error_msg,
                success_msg: null
            });

        case PRODUCT_NOT_SUCCESS:
            return Object.assign({}, state, {
                error_msg: action.data.error_msg,
                Loading: false,
                success_msg: null,
            });

        case PRODUCT_SUCCESS:
            return Object.assign({}, state, {
                allProductList: action.data,
                teamProductList: [],
                Loading: false,
                error_msg: null,
                success_msg: 'Successfully fetched',
            });

        case TEAM_MEMBER_PRODUCT_SUCCESS:
            return Object.assign({}, state, {
                teamProductList: action.data,
                Loading: false,
                error_msg: null,
                success_msg: 'Successfully fetched',
            });

        case PRODUCT_DELETE_SUCCESS:
            let removeProduct = state.allProductList.find(function (product) {
                return product.id === action.data.id;
            });
            let index = state.allProductList.indexOf(removeProduct);
            state.allProductList.splice(index, 1);

            return Object.assign({}, state, {
                allProductList: state.allProductList,
                Loading: false,
                error_msg: null,
                success_msg: action.data.result
            });

        case PRODUCT_ADD_SUCCESS:

            let product = {
                id: action.data.data.id,
                image_url: action.data.data.image_url,
                title: action.data.data.title,
                description: action.data.data.description,
                date: action.data.data.date,
                price: action.data.data.price,
                offerPrice: action.data.data.offerPrice,
                service_id: action.data.data.service_id,
                sex: action.data.data.sex,
                service_title: action.data.data.service_title,
            };
            let productList = [...state.allProductList, product];

            return Object.assign({}, state, {
                allProductList: productList,
                Loading: false,
                error_msg: null,
                success_msg: action.data.result
            });

        case PRODUCT_EDIT_SUCCESS:
            state.allProductList.map((product, index) => {
                if (product.id === action.data.data.id) {
                    product.title = action.data.data.title;
                    product.description = action.data.data.description;
                    product.sex = action.data.data.sex;
                    product.service_id = action.data.data.service_id;
                    product.price = action.data.data.price;
                    product.offerPrice = action.data.data.offerPrice;
                    if (action.data.data.image_url !== undefined) {
                        product.image_url = action.data.data.image_url;
                    }
                }
            });

            return Object.assign({}, state, {
                allProductList: state.allProductList,
                Loading: false,
                error_msg: null,
                success_msg: action.data.result
            });

        default:
            return state;
    }
};
