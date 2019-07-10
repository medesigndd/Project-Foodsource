import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Store } from './store';
import Router from './router';


ReactDOM.render(
    <Provider store={Store}>
        <MuiThemeProvider>
            {Router}
        </MuiThemeProvider>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
