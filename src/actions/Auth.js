import axios from 'axios';

import {
    AUTH_USER_ROLE, AUTH_USER, UNAUTH_USER, AUTH_ERROR,
    FETCH_USER_DATA, SELECT_CUSTOMER, CLEAR_DEFAULT_CUSTOMER,
} from './types';
import { statusLoading, statusLoaded } from './Common';
//import { push} from 'react-router-redux'
//import { browserHistory } from 'react-router'
import { API_URL } from '../config'

// import { BrowserRouter,Switch, Route } from 'react-router-dom'
// import { browserHistory } from 'react-router'

// import createHistory from 'history/createHashHistory';
// const history = createHistory();
// import { push } from 'react-router-redux';

axios.defaults.baseURL = API_URL;

//const API_URL = 'http://localhost:90/testJWT/public/api';

export function signinUser({ username, password }, push) {
    return (dispatch) => {
        // Submit username and password to server
        // dispatch({ type: AUTH_USER });
        // browserHistory.push('/catalog');
        axios.post(`/auth/signin`, { username, password })
            .then(res => {
                // If request is good
                // - Update state to indicate user in authenticated
                dispatch({ type: AUTH_USER, payload: res.data.role_id });
                //dispatch(fetchUserData(push));
                // - Save the JWT token
                localStorage.setItem('token', res.data.token);
                if (res.data.role_id === "1") {
                    push('/salesByProducts');
                } else {
                    push('/catalog');
                }

            }).catch(function (err) {
                // If request is bad
                // - Show an error to the user
                //console.log(err.response.data);
                dispatch(authError(err.response.data));
            });
    }
};

export const checkAuth = (push) => {
    return (dispatch) => {
        axios.get(`/user`, {
            params: {
                token: localStorage.getItem('token')
            }
        }).then(res => {
            // If request is good
            // - Update state to indicate user in authenticated
            dispatch({ type: AUTH_USER, payload: res.data.role_id });
            // - Save the JWT token
            localStorage.setItem('token', res.data.token);
            // - Redirect to the route '/feature'
        }).catch(function (err) {
            // If request is bad
            alert(err.response.data);
            push('/signin');
        });
    }
}

export const fetchUserData = (push) => {
    return function (dispatch) {
        dispatch(statusLoading());
        axios.post(
            `/getUserData`,
            {},
            { headers: { 'Authorization': "Bearer " + localStorage.getItem('token') } }
        ).then(res => {
            localStorage.setItem('token', res.data.token);
            dispatch({ type: FETCH_USER_DATA, payload: res.data });
            dispatch(statusLoaded());
        }).catch(function (err) {
            // If request is bad
            alert(err.response.data);
            var status_code = err.response.status.toString().substring(0, 1);
            if (status_code === "4") push('/signin');
            else push('/catalog');
        });
    }
}

export function signoutUser() {
    localStorage.removeItem('token');
    return {
        type: UNAUTH_USER
    };
}

export function selectCustomer(cust) {
    return {
        type: SELECT_CUSTOMER,
        payload: cust,
    }
}

export function clearDefaultCustomer() {
    return {
        type: CLEAR_DEFAULT_CUSTOMER,
    }
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    };
};

export const setRole = (role) => {
    return {
        type: AUTH_USER_ROLE,
        payload: role
    }
}