import axios from 'axios';
import { SALES_BY_PRODUCTS, SALES_BY_SELLER, SALES_BY_CUSTOMER, } from './types';
import { statusLoading, statusLoaded } from './Common';
import { API_URL } from '../config'
import { signoutUser } from './Auth';

axios.defaults.baseURL = API_URL;

export const fetchSalesByProducts = (startDate, endDate) => {
    return function (dispatch) {
        dispatch(statusLoading());
        //console.log(startDate, endDate);
        axios.post(`/salesByProducts`,
            { startDate, endDate },
            { headers: { 'Authorization': "Bearer " + localStorage.getItem('token') } }
        ).then(res => {
            localStorage.setItem('token', res.data.token);
            dispatch({ type: SALES_BY_PRODUCTS, payload: res.data.SalesByProducts });
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

export const fetchSalesBySeller = (startDate, endDate) => {
    return function (dispatch) {
        dispatch(statusLoading());
        //console.log(startDate, endDate);
        axios.post(`/salesBySeller`,
            { startDate, endDate },
            { headers: { 'Authorization': "Bearer " + localStorage.getItem('token') } }
        ).then(res => {
            localStorage.setItem('token', res.data.token);
            dispatch({ type: SALES_BY_SELLER, payload: res.data.SalesBySeller });
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

export const fetchSalesByCustomer = (startDate, endDate) => {
    return function (dispatch) {
        dispatch(statusLoading());
        //console.log(startDate, endDate);
        axios.post(`/salesByCustomer`,
            { startDate, endDate },
            { headers: { 'Authorization': "Bearer " + localStorage.getItem('token') } }
        ).then(res => {
            localStorage.setItem('token', res.data.token);
            dispatch({ type: SALES_BY_CUSTOMER, payload: res.data.SalesByCustomer });
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
