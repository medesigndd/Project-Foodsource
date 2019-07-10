import {
    AUTH_USER, UNAUTH_USER, AUTH_ERROR, AUTH_USER_ROLE,
    FETCH_USER_DATA, SELECT_CUSTOMER, CLEAR_DEFAULT_CUSTOMER,
} from '../actions/types';

import {
    initialStateAuth,
} from './store'

export default (state = initialStateAuth, action) => {
    switch (action.type) {
        case AUTH_USER:
            return { ...state, error: '', authenticated: true, role: action.payload };
        case UNAUTH_USER:
            return {
                ...state,
                authenticated: false,
                role: "",
            };
        case AUTH_ERROR:
            return { ...state, error: action.payload };
        case AUTH_USER_ROLE:
            return { ...state, role: action.payload };
        case FETCH_USER_DATA:
            return {
                ...state,
                user_data: {
                    full_name: action.payload.user_data.full_name,
                    default_customer: action.payload.user_data.default_customer,
                    list_customer: action.payload.user_data.list_customer
                },
            }
        case SELECT_CUSTOMER:
            return {
                ...state,
                user_data: {
                    default_customer: action.payload,
                    full_name: state.user_data.full_name,
                    list_customer: state.user_data.list_customer,
                }
            }
        case CLEAR_DEFAULT_CUSTOMER:
            return {
                ...state,
                user_data: {
                    default_customer: {},
                    full_name: state.user_data.full_name,
                    list_customer: state.user_data.list_customer,
                }
            }
        default:
            return state;
    }
}
