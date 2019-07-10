import React from 'react';
import { connect } from 'react-redux';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import ShoppingCart from 'material-ui/svg-icons/action/shopping-cart';
import { /*lightBlack,*/ grey300, } from 'material-ui/styles/colors';

import DrawerMenu from './DrawerMenu';

import * as actions from '../actions';

const styles = {
    title: {
        cursor: 'pointer',
        paddingLeft: '0px',
        width: '100%',
        textAlign: 'center',
    },
    icon: {
        display: 'none'
    },
    appBar: {
        boxShadow: 'rgba(0, 0, 0, 0) 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px',
        height: '57px',
        position: 'fixed',
        width: '100%',
    },
    titleStyle: {
        width: '100%',
    },
    showText: {
        textAlign: 'center',
        fontSize: 18,
    },
    showSum: {
        marginRight: 40,
        float: 'right',
        fontSize: "16px",
        color: "gold",
        marginBottom: -16,
    },
};

/**
 * This example uses an [IconButton](/#/components/icon-button) on the left, has a clickable `title`
 * through the `onClick` property, and a [FlatButton](/#/components/flat-button) on the right.
 */
class AppBarMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = { drawerStatus: false };
    }
    updateStyle(docked, width) {
        if (docked) {
            styles.title = { ...styles.title, 'paddingLeft': 0 };
            styles.icon = { ...styles.icon, display: 'none' };

            styles.titleStyle = { ...styles.titleStyle, textAlign: "center", width: width - 255, marginTop: 0, };
            styles.showText = { ...styles.showText, textAlign: "center" };
            styles.showSum = { ...styles.showSum, marginRight: 60 };
        } else {
            styles.title = { ...styles.title, 'paddingLeft': 0 };
            styles.icon = { ...styles.icon, display: '' };
            styles.titleStyle = { ...styles.titleStyle, textAlign: "left", width: '100%', marginTop: -5, };
            // if(this.props.ship_to_name !== ""){
            //     styles.titleStyle = { ...styles.titleStyle, marginTop: -5, };
            // }
            styles.showText = { ...styles.showText, textAlign: "left" };
            styles.showSum = { ...styles.showSum, marginRight: 0 };
        }
    }
    componentWillMount() {
        this.updateStyle(this.props.drawerDocked, this.props.width);
    }
    componentWillReceiveProps(nextProps) {
        this.updateStyle(nextProps.drawerDocked, nextProps.width);
    }
    handleToggle = () => {
        this.props.renderNavLeftMenu(false, !this.props.drawerOpen);
    }
    render() {
        let showAppBar = '';
        if (this.props.drawerDocked) {
            //showAppBar = 'none';
        }
        let balance = null;
        balance = this.props.allOrder.reduce((sum, sku) => {
            let extraFeeTotal = null;
            let item = this.props.getOrderExtraFee[sku.sku_code];
            for (let key in item) {
                if (item.hasOwnProperty(key)) {
                    if (item[key].total_amount) {
                        extraFeeTotal += item[key].total_amount;
                    }
                }
            }
            return sum + (sku.order_amount * sku.sku_price) + extraFeeTotal
        }, 0);
        let showBalance = null;
        if (this.props.showCart && balance > 0) {
            showBalance = <span style={styles.showSum}>
                <ShoppingCart color={"gold"} style={{ marginBottom: -5, marginRight: 5 }} />
                {balance > 0 && ` ${balance.toLocaleString()}`}
            </span>
        }
        var showCustName = null;
        var showShipToName = null;
        if (this.props.cust_name && !this.props.drawerDocked) {
            showCustName = <span style={{ fontSize: 14 }}>{this.props.cust_name}</span>
        } else {
            showCustName = 'Horeca';
        }
        if (this.props.ship_to_name && !this.props.drawerDocked) {
            showShipToName = <span style={{ fontSize: 12, position: 'absolute', bottom: -15, color: grey300, }}>&nbsp;&nbsp;&nbsp;{`${this.props.ship_to_name}`}</span>
        }

        let showTitle = <span style={styles.showText}>
            {showCustName}
        </span>;
        return (
            <div>
                <div style={{ display: showAppBar }}>
                    <AppBar
                        style={styles.appBar}
                        title={
                            <div>
                                <div style={styles.titleStyle}>
                                    {showTitle}
                                    {showBalance}
                                </div>
                                {showShipToName}
                            </div>
                        }
                        titleStyle={styles.titleStyle}
                        iconElementLeft={<IconButton style={styles.icon}><NavigationMenu onClick={() => this.handleToggle()} /></IconButton>}
                    />
                </div>
                <DrawerMenu
                    open={this.props.drawerOpen}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        drawerOpen: state.navLeftMenu.open,
        drawerDocked: state.navLeftMenu.docked,
        width: state.navLeftMenu.width,
        allOrder: state.shop.allOrder,
        getOrderExtraFee: state.shop.orderExtraFee,
        showCart: state.shop.showCartBalance,
        cust_name: state.auth.user_data.default_customer.cust_name,
        ship_to_name: state.auth.user_data.default_customer.ship_to_name,
    }
}

export default connect(mapStateToProps, actions)(AppBarMenu);
