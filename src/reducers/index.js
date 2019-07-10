import {
  UNAUTH_USER,
} from '../actions/types';
import { combineReducers } from 'redux';
import navLeftMenuReducer from './NavLeftMenu';
import authReducer from './Auth';
import searchReducer from './Search';
import shopReducer from './Shop';
import commonReducer from './Common';
import analyticReducer from './Analytic';
import { reducer as formReducer } from 'redux-form';

const appReducer = combineReducers({
  auth: authReducer,
  navLeftMenu: navLeftMenuReducer,
  form: formReducer,     // <---- Mounted at 'form'
  search: searchReducer,
  shop: shopReducer,
  common: commonReducer,
  analytic: analyticReducer,
});

const rootReducer = (state, action) => {
  if (action.type === UNAUTH_USER) {
    state = undefined
  }
  return appReducer(state, action)
}

export default rootReducer;
