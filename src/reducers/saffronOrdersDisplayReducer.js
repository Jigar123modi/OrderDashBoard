import {
    SOD_INPROGRESS,
    SOD_NOT_SUCCESS,
    SOD_SUCCESS,
    SOD_CONNECTION_ERROR,
    SOD_RUNNING_LATE_MOVE_TO_PROGRESS,
    SOD_RECENT_MOVE_TO_PROGRESS,
    SOD_RECENT_NEW_ORDER,
    SOD_MOVE_TO_RUNNING_LATE,
    SOD_MOVE_TO_PROCESSS_SUCCESS,
    SOD_RECENT_MOVE_TO_FINISH,
    SOD_FINISH_MOVE_TO_PAYMENT_FINISH
} from '../constants/actionTypes';


import initialState from './initialState';
import {GetLocalUderData} from "../index";

let moment = require('moment-timezone');

export default function saffronOrdersDisplayReducer(state = initialState.saffronOrdersDisplayReducer, action) {
    switch (action.type) {

        case SOD_INPROGRESS:
            return Object.assign({}, state, {Loading: true});

        case SOD_CONNECTION_ERROR:
            return Object.assign({}, state, {
                Loading: false,
                error_msg: action.data.error_msg
            });

        case SOD_NOT_SUCCESS:
            return Object.assign({}, state, {
                error_msg: action.data.error_msg,
                Loading: false
            });

        case SOD_SUCCESS:

            action.data.recentOrders.forEach((OrderSingle) => {
                let BookingDateTime = moment.tz(OrderSingle.bookingDateTime, 'Asia/Kolkata').format();
                let BookingStartTime = moment.tz(OrderSingle.bookingStartTime, 'Asia/Kolkata').format();
                let BookingEndTime = moment.tz(OrderSingle.bookingEndTime, 'Asia/Kolkata').format();
                OrderSingle.bookingDateTime = new Date(BookingDateTime);
                OrderSingle.bookingStartTime = new Date(BookingStartTime);
                OrderSingle.bookingEndTime = new Date(BookingEndTime);
            });

            action.data.runningOrder.forEach((OrderSingle) => {
                let BookingDateTime = moment.tz(OrderSingle.bookingDateTime, 'Asia/Kolkata').format();
                let BookingStartTime = moment.tz(OrderSingle.bookingStartTime, 'Asia/Kolkata').format();
                let BookingEndTime = moment.tz(OrderSingle.bookingEndTime, 'Asia/Kolkata').format();
                OrderSingle.bookingDateTime = new Date(BookingDateTime);
                OrderSingle.bookingStartTime = new Date(BookingStartTime);
                OrderSingle.bookingEndTime = new Date(BookingEndTime);
            });

            action.data.runningLate.forEach((OrderSingle) => {
                let BookingDateTime = moment.tz(OrderSingle.bookingDateTime, 'Asia/Kolkata').format();
                let BookingStartTime = moment.tz(OrderSingle.bookingStartTime, 'Asia/Kolkata').format();
                let BookingEndTime = moment.tz(OrderSingle.bookingEndTime, 'Asia/Kolkata').format();
                OrderSingle.bookingDateTime = new Date(BookingDateTime);
                OrderSingle.bookingStartTime = new Date(BookingStartTime);
                OrderSingle.bookingEndTime = new Date(BookingEndTime);
            });

            action.data.recentComplete.forEach((OrderSingle) => {
                let BookingDateTime = moment.tz(OrderSingle.bookingDateTime, 'Asia/Kolkata').format();
                let BookingStartTime = moment.tz(OrderSingle.bookingStartTime, 'Asia/Kolkata').format();
                let BookingEndTime = moment.tz(OrderSingle.bookingEndTime, 'Asia/Kolkata').format();
                OrderSingle.bookingDateTime = new Date(BookingDateTime);
                OrderSingle.bookingStartTime = new Date(BookingStartTime);
                OrderSingle.bookingEndTime = new Date(BookingEndTime);
            });

            return Object.assign({}, state, {
                runningOrder: action.data.runningOrder,
                runningLate: action.data.runningLate,
                recentOrders: action.data.recentOrders,
                recentComplete: action.data.recentComplete,
                Loading: false,
                error_msg: null
            });

        case SOD_RUNNING_LATE_MOVE_TO_PROGRESS:

            let removeOrder = state.runningLate.find(function (runningLateOrder) {
                return runningLateOrder.id === action.order.id;
            });
            //remove Running Late Order
            let index = state.runningLate.indexOf(removeOrder);

            let userId = GetLocalUderData().user.id;
            if(GetLocalUderData().user.role.toLowerCase() === "admin"){
                removeOrder.status = action.order.status;
                removeOrder.column = action.order.column;
                removeOrder.statusDateTime = action.order.statusDateTime;
            }else{
                let TeamWiseOrderStatusManage = removeOrder.teamWiseProductList.find((data) => data.id === userId);
                TeamWiseOrderStatusManage.orderStatus = action.order.status;
                TeamWiseOrderStatusManage.column = action.order.column;
                TeamWiseOrderStatusManage.statusDateTime = action.order.statusDateTime;
            }

            //Add into Running Order
            let runningOrders = [...state.runningOrder, removeOrder];

            state.runningLate.splice(index, 1);

            return Object.assign({}, state, {
                runningOrder: runningOrders,
                runningLate: state.runningLate
            });

        case SOD_RECENT_MOVE_TO_PROGRESS:

            removeOrder = state.recentOrders.find(function (recentOrder) {
                return recentOrder.id === action.order.id;
            });
            //remove Recent Order
            index = state.recentOrders.indexOf(removeOrder);

            userId = GetLocalUderData().user.id;
            if(GetLocalUderData().user.role.toLowerCase() === "admin"){
                removeOrder.status = action.order.status;
                removeOrder.column = action.order.column;
                removeOrder.statusDateTime = action.order.statusDateTime;
            }else{
                let TeamWiseOrderStatusManage = removeOrder.teamWiseProductList.find((data) => data.id === userId);
                TeamWiseOrderStatusManage.orderStatus = action.order.status;
                TeamWiseOrderStatusManage.column = action.order.column;
                TeamWiseOrderStatusManage.statusDateTime = action.order.statusDateTime;
            }

            //Add into Running Order
            runningOrders = [...state.runningOrder, removeOrder];

            state.recentOrders.splice(index, 1);

            return Object.assign({}, state, {
                runningOrder: runningOrders,
                recentOrders: state.recentOrders
            });

        case SOD_RECENT_NEW_ORDER:

            let BookingDateTime = moment.tz(action.order.bookingDateTime, 'Asia/Kolkata').format();
            let BookingStartTime = moment.tz(action.order.bookingStartTime, 'Asia/Kolkata').format();
            let BookingEndTime = moment.tz(action.order.bookingEndTime, 'Asia/Kolkata').format();
            action.order.bookingDateTime = new Date(BookingDateTime);
            action.order.bookingStartTime = new Date(BookingStartTime);
            action.order.bookingEndTime = new Date(BookingEndTime);

            let recentOrders = [...state.recentOrders, action.order];

            recentOrders.forEach((order, index) => {
                recentOrders.forEach((innerOrder, innerindex) => {
                    if (new Date(recentOrders[index].bookingStartTime).getTime() < new Date(recentOrders[innerindex].bookingStartTime).getTime()) {
                        const tmp = recentOrders[innerindex];
                        recentOrders[innerindex] = recentOrders[index];
                        recentOrders[index] = tmp;
                    }
                });
            });

            return Object.assign({}, state, {
                recentOrders: recentOrders
            });

        case SOD_MOVE_TO_RUNNING_LATE:

            removeOrder = state.recentOrders.find(function (recentOrder) {
                return recentOrder.id === action.order.id;
            });
            //remove Recent Order
            index = state.recentOrders.indexOf(removeOrder);

            userId = GetLocalUderData().user.id;
            if(GetLocalUderData().user.role.toLowerCase() === "admin"){
                removeOrder.status = action.order.status;
                removeOrder.column = action.order.column;
                removeOrder.statusDateTime = action.order.statusDateTime;
            }else{
                let TeamWiseOrderStatusManage = removeOrder.teamWiseProductList.find((data) => data.id === userId);
                TeamWiseOrderStatusManage.orderStatus = action.order.status;
                TeamWiseOrderStatusManage.column = action.order.column;
                TeamWiseOrderStatusManage.statusDateTime = action.order.statusDateTime;
            }

            let runningLateOrders = [...state.runningLate, removeOrder];

            state.recentOrders.splice(index, 1);

            return Object.assign({}, state, {
                runningLate: runningLateOrders,
                recentOrders: state.recentOrders
            });

        case SOD_MOVE_TO_PROCESSS_SUCCESS:
            return Object.assign({}, state, {
                Loading: false,
                error_msg: null
            });

        case SOD_RECENT_MOVE_TO_FINISH:

            removeOrder = state.runningOrder.find(function (recentOrder) {
                return recentOrder.id === action.order.id;
            });

            userId = GetLocalUderData().user.id;
            if(GetLocalUderData().user.role.toLowerCase() === "admin"){
                removeOrder.status = action.order.status;
                removeOrder.column = action.order.column;
                removeOrder.statusDateTime = action.order.statusDateTime;
            }else{
                let TeamWiseOrderStatusManage = removeOrder.teamWiseProductList.find((data) => data.id === userId);
                TeamWiseOrderStatusManage.orderStatus = action.order.status;
                TeamWiseOrderStatusManage.column = action.order.column;
                TeamWiseOrderStatusManage.statusDateTime = action.order.statusDateTime;
            }

            //Add into Running Order
            let recentComplete = [...state.recentComplete, removeOrder];

            //remove Recent Order
            index = state.runningOrder.indexOf(removeOrder);
            state.runningOrder.splice(index, 1);

            return Object.assign({}, state, {
                runningOrder: state.runningOrder,
                recentComplete: recentComplete
            });

        case SOD_FINISH_MOVE_TO_PAYMENT_FINISH:

            let modifiedOrder = state.recentComplete.find(function (recentCompleteOrder) {
                return recentCompleteOrder.id === action.order.id;
            });

            modifiedOrder.paymentComplete = action.order.paymentComplete;
            modifiedOrder.paymentMemberId = action.order.paymentMemberId;
            modifiedOrder.paymentMemberName = action.order.paymentMemberName;

            return Object.assign({}, state, {
                recentComplete: [...state.recentComplete]
            });

        default:
            return state;
    }
};
