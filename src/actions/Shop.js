import {
    CHANGE_FAVORITE_ORDER, ADD_TO_ORDER, SELECT_ORDER, CLEAR_ORDER,
    FETCH_SKU, SHOW_ORDER_BALANCE, NOT_SHOW_ORDER_BALANCE,
    SHOW_ITEM_DETAIL, SHOW_ORDER_MENU_TAB, UPDATE_ORDER,
    FETCH_SKU_EXTRA_FEE, ORDER_EXTRA_FEE, CLEAR_ORDER_EXTRAFEE,
    CONFIRM_ORDER_SUCCESS, ORDER_DELIVERY_DATE, ORDER_DESCRIPTION, ORDER_CUSTOMER_PO_NUMBER,
    ORDER_CUSTOMER_PO_IMG, FETCH_ORDERS_HISTORY,
} from './types';
import { API_URL } from '../config'
import axios from 'axios';
import { signoutUser } from './Auth';
import { statusLoading, statusLoaded } from './Common';

axios.defaults.baseURL = API_URL;
//axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('token');
//axios.defaults.headers.common['Content-Type'] = "application/json";
//axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';

//const headers = { 'Authorization': "Bearer " + localStorage.getItem('token') };

export const fetchSKU = (customer_code) => {
    //แบบ redux- thunk
    return function (dispatch) {
        // ส่งแบบ get จะต้องแนบ Token ตามด้านล่าง
        // axios.get(`${API_URL}/getSKU_0`, {
        //     // params: {
        //     //     token: localStorage.getItem('token')
        //     // }
        // });
        dispatch(statusLoading());
        axios.post(`/getSKU`,
            { customer_code },
            { headers: { 'Authorization': "Bearer " + localStorage.getItem('token') } }
        ).then(res => {
            localStorage.setItem('token', res.data.token);
            dispatch({ type: FETCH_SKU, payload: res.data.allSKU });
            dispatch(statusLoaded());
        }).catch(function (err) {
            // If request is bad
            alert(err.response.data);
            dispatch(statusLoaded());
            var status_code = err.response.status.toString().substring(0, 1);
            if (status_code === "4") dispatch(signoutUser());
        });
    }
}

export const fetchExtraFee = (sku_group_code) => {
    return function (dispatch) {
        dispatch(statusLoading());
        axios.post(`/getExtraFee`,
            { sku_group_code },
            { headers: { 'Authorization': "Bearer " + localStorage.getItem('token') } }
        ).then(res => {
            localStorage.setItem('token', res.data.token);
            dispatch({ type: FETCH_SKU_EXTRA_FEE, payload: res.data.extraFee });
            dispatch(statusLoaded());
        }).catch(function (err) {
            // If request is bad
            alert(err.response.data);
            dispatch(statusLoaded());
            var status_code = err.response.status.toString().substring(0, 1);
            if (status_code === "4") dispatch(signoutUser());
        });
    }
}

export const fetchOrdersHistory = () => {
    return function (dispatch) {
        dispatch(statusLoading());
        axios.post(`/getOrdersHistory`,
            {},
            { headers: { 'Authorization': "Bearer " + localStorage.getItem('token') } }
        ).then(res => {
            localStorage.setItem('token', res.data.token);
            dispatch({ type: FETCH_ORDERS_HISTORY, payload: res.data.ordersHistory });
            dispatch(statusLoaded());
        }).catch(function (err) {
            // If request is bad
            alert(err.response.data);
            dispatch(statusLoaded());
            var status_code = err.response.status.toString().substring(0, 1);
            if (status_code === "4") dispatch(signoutUser());
        });
    };
}

export const updateOrderExtraFee = (type, sku_code, description, extraFee_code, extraFee_name, qty, price) => {
    return {
        type: ORDER_EXTRA_FEE,
        payload: {
            type,
            sku_code,
            description,
            extraFee_code,
            extraFee_name,
            qty,
            price,
        }
    }
}

export const confirmOrder = (custCode, orderDesc, orderDeliveryDate, customerPONumber, customerPOIMG, order, extraFee) => {
    let data = new FormData();
    data.append('customer_code', custCode);
    data.append('orderDesc', orderDesc);
    data.append('orderDeliveryDate', orderDeliveryDate);
    data.append('customerPONumber', customerPONumber);
    //data.append('customerPOIMG', customerPOIMG);
    data.append('order', order);
    data.append('extraFee', extraFee);

    return function (dispatch) {
        dispatch(statusLoading());
        dispatch(confirmSuccess(false, ''));
        axios.post(`/confirmOrder`,
            { customer_code: custCode, orderDesc, orderDeliveryDate, customerPONumber, customerPOIMG, order, extraFee },
            //data,
            { headers: { 'Authorization': "Bearer " + localStorage.getItem('token') } }
        ).then(res => {
            localStorage.setItem('token', res.data.token);
            dispatch(clearOrder());
            dispatch(clearOrderExtraFee());
            dispatch(showMenuTabCatalog());
            dispatch(confirmSuccess(true, res.data.order_number));
            dispatch(updateOrderDeliveryDate(""));
            dispatch(updateOrderDescription(""));
            dispatch(updateCustomerPONumber(""));
            dispatch(updateCustomerPOIMG(""));
            dispatch(statusLoaded());
        }).catch(function (err) {
            // If request is bad
            if (err.response) {
                alert(err.response.data);
                console.log(err.response.data);
            }
            dispatch(statusLoaded());
            var status_code = err.response.status.toString().substring(0, 1);
            if (status_code === "4") dispatch(signoutUser());
        });
    }
}

export const changeFavorite = (id, sku_code, customer_code, favorite) => {
    return function (dispatch) {
        dispatch({
            type: CHANGE_FAVORITE_ORDER,
            payload: id
        });
        axios.post(`/changeFavorite`,
            { sku_code, customer_code, favorite: Number(!Number(favorite)) },
            { headers: { 'Authorization': "Bearer " + localStorage.getItem('token') } }
        ).then(res => {
            localStorage.setItem('token', res.data.token);
        }).catch(function (err) {
            dispatch({
                type: CHANGE_FAVORITE_ORDER,
                payload: id
            });
            alert(err.response.data);
            var status_code = err.response.status.toString().substring(0, 1);
            if (status_code === "4") dispatch(signoutUser());
        });
    }
};

export const showMenuTabCatalog = () => {
    return {
        type: SHOW_ORDER_MENU_TAB,
        payload: {
            on: 1,
            value: 'CatalogList',
            transitionName: 'tabOne',
        },
    }
}

export const showMenuTabFavorite = () => {
    return {
        type: SHOW_ORDER_MENU_TAB,
        payload: {
            on: 2,
            value: 'FavoriteList',
            transitionName: 'tabOne',
        },
    }
}
export const showMenuTabOrder = () => {
    return {
        type: SHOW_ORDER_MENU_TAB,
        payload: {
            on: 3,
            value: 'OrderList',
            transitionName: 'tabOne',
        },
    }
}

export const showItemDetail = (sku) => {
    return {
        type: SHOW_ITEM_DETAIL,
        payload: sku,
    };
};

export const addToOrder = (sku) => {
    return {
        type: ADD_TO_ORDER,
        payload: sku
    };
};

export const updateOrder = (sku, type, qty) => {
    return {
        type: UPDATE_ORDER,
        payload: {
            sku, type, qty
        }
    }
}

export const selectOrder = (order) => {
    return {
        type: SELECT_ORDER,
        payload: order
    };
};

export const showCartBalance = () => {
    return {
        type: SHOW_ORDER_BALANCE,
    };
};

export const notShowCartBalance = () => {
    return {
        type: NOT_SHOW_ORDER_BALANCE,
    };
};

export const clearOrder = () => {
    return {
        type: CLEAR_ORDER,
    };
};

export const clearOrderExtraFee = () => {
    return {
        type: CLEAR_ORDER_EXTRAFEE,
    };
};

export const confirmSuccess = (status, order_number) => {
    return {
        type: CONFIRM_ORDER_SUCCESS,
        payload: { status, order_number }
    };
};

export const updateOrderDeliveryDate = (data) => {
    return {
        type: ORDER_DELIVERY_DATE,
        payload: data
    };
};
export const updateOrderDescription = (data) => {
    return {
        type: ORDER_DESCRIPTION,
        payload: data
    };
};
export const updateCustomerPONumber = (data) => {
    return {
        type: ORDER_CUSTOMER_PO_NUMBER,
        payload: data
    };
};
export const updateCustomerPOIMG = (data) => {
    return {
        type: ORDER_CUSTOMER_PO_IMG,
        payload: data
    };
};
