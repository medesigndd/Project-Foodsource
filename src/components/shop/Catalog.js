import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import CatalogList from './CatalogList';
import OrderList from './OrderList';
import CustomerList from './CustomerList';

import { Tabs, Tab } from 'material-ui/Tabs';
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const styles = {
    container: {
        position: 'absolute',//relative,absolute
        top: '0px',
        width: '100%',
    },
    tabs: {
        position: 'fixed',
        width: '100%',
        zIndex: 900,
    },
    tab: {
        fontSize: '16px',
    },
};

class Catalog extends React.Component {
    state = {
        transitionEnd: true,
        numberOfPieces: "",
        countUnFavorite: null,
        countFavorite: null,
    }
    updateStyle(docked, width, height) {
        if (docked) {
            styles.container = { ...styles.container, top: '56px' };
            styles.tabs = { ...styles.tabs, 'paddingLeft': 0/*256*/, width: width - 255 };
        } else {
            styles.container = { ...styles.container, top: '56px' };
            styles.tabs = { ...styles.tabs, 'paddingLeft': 0, width: '100%' };
        }
    }
    updateShowNumberOfPieces(amount) {
        if (amount > 0) this.setState({ numberOfPieces: ` (${amount})` });
        else this.setState({ numberOfPieces: `` });
    }
    componentWillMount() {
        //this.props.showCartBalance();
        this.props.notShowCartBalance();
        this.updateStyle(this.props.docked, this.props.width, this.props.height);
        this.updateShowNumberOfPieces(this.props.allOrder.length);
        this.setState({
            value: this.props.showTab.value,
            on: this.props.showTab.on,
            transitionName: this.props.showTab.transitionName,
            countUnFavorite: null,
            countFavorite: null,
        });
    }
    componentWillReceiveProps(nextProps, nextState) {
        this.updateStyle(nextProps.docked, nextProps.width, nextProps.height);
        this.updateShowNumberOfPieces(nextProps.allOrder.length);
        let rsFavorite = nextProps.allSKU.filter((sku) => { return Number(sku.favorite) === 1 });
        let rsUnFavorite = nextProps.allSKU.filter((sku) => { return Number(sku.favorite) === 0 });

        this.setState({
            value: nextProps.showTab.value,
            on: nextProps.showTab.on,
            transitionName: nextProps.showTab.transitionName,
            countUnFavorite: rsUnFavorite.length,
            countFavorite: rsFavorite.length,
        });
    }
    shouldComponentUpdate = (nextProps, nextState) => {
        this.updateStyle(nextProps.docked, nextProps.width, nextProps.height);
        return true;
    }
    handleChange = (value) => {
        this.setState({
            value: value,
        });
    }
    toggle = (view) => {
        if (view === 'CatalogList' && this.state.on !== 1 /*&& this.state.on*/) {
            this.props.showMenuTabCatalog();
            this.setState({
                on: 1,
                transitionEnd: false,
                transitionName: 'tabTwo'
            });
        } else if (view === 'FavoriteList' && this.state.on !== 2 /*&& !this.state.on*/) {
            this.props.showMenuTabFavorite();
            if (this.state.on === 1) {
                this.setState({
                    on: 2,
                    transitionEnd: false,
                    transitionName: 'tabOne'
                });
            } else if (this.state.on === 3) {
                this.setState({
                    on: 2,
                    transitionEnd: false,
                    transitionName: 'tabTwo'
                });
            }
        } else if (view === 'OrderList' && this.state.on !== 3 /*&& !this.state.on*/) {
            this.props.showMenuTabOrder();
            this.setState({
                on: 3,
                transitionEnd: false,
                transitionName: 'tabOne'
            });
        }
    }
    handleTransitionEnd = () => {
        this.setState({ transitionEnd: true });
    }
    render_Tab1() {
        if (this.state.on === 1 && this.state.transitionEnd) {
            return (
                <CatalogList key="off" handleTransitionEnd={this.handleTransitionEnd} favorite={false} />
            )
        }
    }
    render_Tab2() {
        if (this.state.on === 2 && this.state.transitionEnd) {
            return (
                <CatalogList key="on" handleTransitionEnd={this.handleTransitionEnd} favorite={true} />
            )
        }
    }
    render_Tab3() {
        if (this.state.on === 3 && this.state.transitionEnd) {
            return (
                <OrderList key="on" handleTransitionEnd={this.handleTransitionEnd} />
            )
        }
    }
    render() {
        let display = null;
        let txtCountFavorite = "";
        let txtCountUnFavorite = "";
        if (this.state.countFavorite) {
            txtCountFavorite = ` (${this.state.countFavorite})`;
        }
        if (this.state.countUnFavorite) {
            txtCountUnFavorite = ` (${this.state.countUnFavorite})`;
        }
        if (this.props.defaultCustomer.cust_code) {
            display = <div style={styles.container} id={'catalog_1'}>
                <div style={styles.tabs} id={'catalog_2'}>
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        tabItemContainerStyle={{
                            //backgroundColor: '#FFF',
                        }}
                    >
                        <Tab
                            label={`สินค้า ${txtCountUnFavorite}`}
                            value="CatalogList"
                            onTouchTap={() => { this.toggle('CatalogList') }}
                            style={styles.tab}
                        />
                        <Tab label={`รายการโปรด ${txtCountFavorite}`} value="FavoriteList"
                            onTouchTap={() => { this.toggle('FavoriteList') }}
                            style={styles.tab}
                        />
                        <Tab label={`สั่งซื้อ${this.state.numberOfPieces}`} value="OrderList"
                            onTouchTap={() => { this.toggle('OrderList') }}
                            style={styles.tab}
                        />
                    </Tabs>
                    <ReactCSSTransitionGroup
                        transitionName={this.state.transitionName}
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={500}
                    >
                        {this.render_Tab1()}
                        {this.render_Tab2()}
                        {this.render_Tab3()}
                    </ReactCSSTransitionGroup>
                </div>
            </div >
        } else if (this.props.listCustomer.length > 0) {
            display = <CustomerList />
        }
        return display;
    }
}
function mapStateToProps(state) {
    return {
        role: state.auth.role,
        width: state.navLeftMenu.width,
        height: state.navLeftMenu.height,
        open: state.navLeftMenu.open,
        docked: state.navLeftMenu.docked,
        allOrder: state.shop.allOrder,
        showTab: state.shop.showTab,
        displayLoading: state.common.displayLoading,
        allSKU: state.shop.allSKU,

        defaultCustomer: state.auth.user_data.default_customer,
        listCustomer: state.auth.user_data.list_customer,
    }
}

Catalog.defaultProps = {
    value: 'CatalogList',
    on: 1,
    transitionName: 'tabOne',
};

export default connect(mapStateToProps, actions)(Catalog);
