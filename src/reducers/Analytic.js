import { SALES_BY_PRODUCTS, SALES_BY_SELLER, SALES_BY_CUSTOMER, } from '../actions/types';
import {
    initialStateAnalytic,
} from './store'

export default (state = initialStateAnalytic, action) => {
    switch (action.type) {
        case SALES_BY_PRODUCTS:
            return { ...state, salesByProducts: action.payload };
        case SALES_BY_SELLER:
            return { ...state, salesBySeller: action.payload };
        case SALES_BY_CUSTOMER:
            return { ...state, salesByCustomer: action.payload };
        default:
            return state;
    }
}