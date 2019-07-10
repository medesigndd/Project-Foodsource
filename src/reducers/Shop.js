import {
    CHANGE_FAVORITE_ORDER, ADD_TO_ORDER, SELECT_ORDER, CLEAR_ORDER,
    FETCH_SKU, SHOW_ORDER_BALANCE, NOT_SHOW_ORDER_BALANCE,
    SHOW_ITEM_DETAIL, SHOW_ORDER_MENU_TAB, UPDATE_ORDER,
    FETCH_SKU_EXTRA_FEE, ORDER_EXTRA_FEE, CLEAR_ORDER_EXTRAFEE,
    CONFIRM_ORDER_SUCCESS, ORDER_DELIVERY_DATE, ORDER_DESCRIPTION, ORDER_CUSTOMER_PO_NUMBER,
    ORDER_CUSTOMER_PO_IMG, FETCH_ORDERS_HISTORY,
} from '../actions/types';
//import { shopData as initialState } from './store/Shop';

import {
    initialStateShop,
} from './store'

export default (state = initialStateShop, action) => {
    let index = null;
    let orderUpdate = null;
    switch (action.type) {
        case FETCH_SKU:
            return { ...state, allSKU: action.payload };
        case CHANGE_FAVORITE_ORDER:
            orderUpdate = state.allSKU.find((rs) => { return rs.id === action.payload });
            orderUpdate.favorite = Number(!Number(orderUpdate.favorite));
            let indexDelete = state.allSKU.findIndex((rs) => { return rs.id === action.payload });
            let allSKU = [
                ...state.allSKU.slice(0, indexDelete),
                ...state.allSKU.slice(indexDelete + 1),
                orderUpdate
            ];
            allSKU = allSKU.sort(function (a, b) {
                return a.id - b.id;
            });
            return { ...state, allSKU };
        case ADD_TO_ORDER:
            let sku = action.payload;
            sku.order_amount = 1;
            sku.order_total_amount = 1 * Number(sku.sku_price);
            index = state.allOrder.findIndex((rs) => { return rs.id === sku.id });
            if (index === -1) {
                return {
                    ...state,
                    allOrder: [...state.allOrder, sku]
                }
            } else {
                return {
                    ...state,
                    allOrder: [
                        ...state.allOrder.slice(0, index),
                        ...state.allOrder.slice(index + 1)
                    ]
                }
            }
        case UPDATE_ORDER:
            index = state.allOrder.findIndex((rs) => { return rs.id === action.payload.sku.id });
            orderUpdate = state.allOrder.find((rs) => { return rs.id === action.payload.sku.id });
            if (action.payload.type === "UPDATE") {
                orderUpdate.order_amount = Number(orderUpdate.order_amount) + Number(action.payload.qty);
                orderUpdate.order_total_amount = Number(orderUpdate.order_amount) * Number(action.payload.sku.sku_price);
            } else if (action.payload.type === "REPLACE") {
                if (action.payload.qty === "") {
                    action.payload.qty = 1
                }
                orderUpdate.order_amount = Number(action.payload.qty);
                orderUpdate.order_total_amount = Number(action.payload.qty) * Number(action.payload.sku.sku_price);
            }
            let reGenOrder = [];
            for (let i = 0; i <= state.allOrder.length - 1; i++) {
                if (i === index && orderUpdate.order_amount > 0) reGenOrder.push(orderUpdate);
                else if (i !== index) reGenOrder.push(state.allOrder[i]);
            }
            return { ...state, allOrder: reGenOrder };
        case FETCH_SKU_EXTRA_FEE:
            return { ...state, extraFee: action.payload }
        case SELECT_ORDER:
            return { ...state, orderObj: action.payload };
        case CLEAR_ORDER:
            return { ...state, allOrder: [] }
        case CLEAR_ORDER_EXTRAFEE:
            return { ...state, orderExtraFee: {} }
        case SHOW_ORDER_BALANCE:
            return { ...state, showCartBalance: true };
        case NOT_SHOW_ORDER_BALANCE:
            return { ...state, showCartBalance: false };
        case SHOW_ITEM_DETAIL:
            return { ...state, showItemDetail: action.payload }
        case SHOW_ORDER_MENU_TAB:
            return { ...state, showTab: action.payload }
        case CONFIRM_ORDER_SUCCESS:
            return { ...state, confirmOrderSuccess: action.payload.status, orderNumberSuccess: action.payload.order_number }
        case ORDER_EXTRA_FEE: {
            let copy = Object.assign({}, state.orderExtraFee); // assuming you use Object.assign() polyfill!
            copy = {
                ...copy,
                [action.payload.sku_code]: {
                    ...copy[action.payload.sku_code],
                    description: action.payload.description,
                }
            };
            if (action.payload.description === "") {
                delete copy[action.payload.sku_code]['description'];
                if (Object.keys(copy[action.payload.sku_code]).length === 0) {
                    delete copy[action.payload.sku_code]
                }
            }
            if (action.payload.type === 'description') {
                return {
                    ...state,
                    orderExtraFee: copy
                }
            }
            if (action.payload.type === 'addExtraFee') {
                return {
                    ...state,
                    orderExtraFee: {
                        ...state.orderExtraFee,
                        [action.payload.sku_code]: {
                            ...state.orderExtraFee[action.payload.sku_code],
                            [action.payload.extraFee_code]: {
                                checked: true,
                                name: action.payload.extraFee_name,
                                qty: action.payload.qty,
                                price: action.payload.price,
                                total_amount: Number(Number(action.payload.qty) * Number(action.payload.price)),
                            }
                        }
                    }
                }
            }
            if (action.payload.type === 'removeExtraFee') {
                let copy = Object.assign({}, state.orderExtraFee); // assuming you use Object.assign() polyfill!
                delete copy[action.payload.sku_code][action.payload.extraFee_code] // shallowly mutating a shallow copy is fine
                if (Object.keys(copy[action.payload.sku_code]).length === 0) {
                    delete copy[action.payload.sku_code]
                }
                return { ...state, orderExtraFee: copy };
            }
            break;
        }
        case ORDER_DELIVERY_DATE:
            return { ...state, orderDeliveryDate: action.payload }
        case ORDER_DESCRIPTION:
            return { ...state, orderDescription: action.payload }
        case ORDER_CUSTOMER_PO_NUMBER:
            return { ...state, orderCustomerPONumber: action.payload }
        case ORDER_CUSTOMER_PO_IMG:
            return { ...state, orderCustomerPOIMG: action.payload }
        case FETCH_ORDERS_HISTORY:
            return { ...state, ordersHistory: action.payload }
        default:
            return state;
    }
}
