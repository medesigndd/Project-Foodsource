import React from 'react';
import { BrowserRouter,Switch, Route } from 'react-router-dom';
// Auth
import CheckAuth from './components/auth/CheckAuth';
import SignIn from './components/auth/SignIn';
import SignOut from './components/auth/SignOut';
// App
import App from './components/App';
import Catalog from './components/shop/Catalog';
import ItemDetail from './components/shop/ItemDetail';
import OrderHistoryList from './components/OrderHistoryList';
// import OrderHistoryItem from './components/OrderHistoryItem';
import SalesByProducts from './components/report/SalesByProducts';
import SalesBySeller from './components/report/SalesBySeller';
import SalesByCustomer from './components/report/SalesByCustomer';

export default (
    // <div>
    //     <Route path='/signin' component={SignIn} exact />
    //     <Route path='/signout' component={SignOut} exact />
    //     <Route path='/' component={CheckAuth(App)} exact>
    //         <IndexRoute component={CheckAuth(Catalog)} />
    //         <Route path='/catalog' component={CheckAuth(Catalog)} exact />
    //         <Route path='/orderHistory' component={CheckAuth(OrderHistory)} exact />
    //         <Route path='/itemDetail' component={CheckAuth(ItemDetail)} exact />
    //     </Route>
    // </div>

    <BrowserRouter >
        <div>

            <Switch>
                <Route path='/signin' component={SignIn} exact />
                <Route path='/signout' component={SignOut} exact />
                {/* <Route path='/' component={CheckAuth(App)}  /> */}
                {/* <Route path='/' component={CheckAuth(Catalog)} exact /> */}
                <App>
                    <Route path='/catalog' component={CheckAuth(Catalog)} />
                    <Route path='/itemDetail' component={CheckAuth(ItemDetail)} />
                    <Route path='/orderHistoryList' component={CheckAuth(OrderHistoryList)} />
                    {/* <Route path='/orderHistoryItem' component={CheckAuth(OrderHistoryItem)} /> */}
                    <Route path='/salesByProducts' component={CheckAuth(SalesByProducts)} />
                    <Route path='/salesBySeller' component={CheckAuth(SalesBySeller)} />
                    <Route path='/salesByCustomer' component={CheckAuth(SalesByCustomer)} />
                </App>
                {/*<Route path='/orderHistory' component={CheckAuth(OrderHistory)} />*/}

            </Switch>
        </div>
    </BrowserRouter>
);