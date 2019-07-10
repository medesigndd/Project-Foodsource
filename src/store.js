import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { AUTH_USER } from './actions/types';
import reducers from './reducers';


// import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
// import createHistory from 'history/createBrowserHistory'
// const history = createHistory()
// const middleware = routerMiddleware(history)

const createStoreWithMiddleware = applyMiddleware(
    reduxThunk,
)(createStore);

export const Store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');
if (token) {
    Store.dispatch({ type: AUTH_USER });
}