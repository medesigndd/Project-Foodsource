import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Drawer from 'material-ui/Drawer';
import List from 'material-ui/List/List';

import Avatar from './Avatar';
import SignOUt from './auth/SignOut';
import ShopMenu from './shop/ShopMenu';
import AdminMenu from './admin/AdminMenu';

import * as actions from '../actions';

const styleMenu = { marginLeft: "5px solid #000" };
const styleSelectMenu = { borderLeft: "5px solid rgb(0, 188, 212)" ,backgroundColor: '#FAFAFA' };
const styleHr = {
    margin: 0,
    marginTop: "0px",
    marginBottom: "0px",
    marginLeft: 0,
    height: "1px",
    border: "none",
    backgroundColor: "#E0E0E0"
};
const styleTextMenu = { marginLeft: '-15px' };

class DrawerMenu extends React.Component {
    state = {
        width: 0,
        height: 0,
        docked: null,
        open: null,
        selectMenu: 1
    };
    updateLeftNave(docked, open) {
        this.props.renderNavLeftMenu(docked, open);
    }
    handleClose = () => {
        if (!this.props.docked) {
            this.props.renderNavLeftMenu(this.props.docked, false);
        }
    }
    onSelectMenu = (menuId) => {
        this.setState({ selectMenu: menuId });
    }
    componentWillMount() {
        this.updateDimensions();
    }
    componentDidMount = () => {
        window.addEventListener("resize", this.updateDimensions);
        if (this.state.width <= this.props.minWidth) {
            this.updateLeftNave(false, false);
        } else {
            this.updateLeftNave(true, true);
        }
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }
    shouldComponentUpdate = (nextProps, nextState) => {
        if ((nextState.width > this.props.minWidth && this.state.width <= this.props.minWidth)) {
            this.updateLeftNave(true, true);
        } else if ((nextState.width <= this.props.minWidth && this.state.width > this.props.minWidth)) {
            this.updateLeftNave(false, false);
        }
        return true;
    }
    updateDimensions = () => {
        var w = window,
            d = document,
            documentElement = d.documentElement,
            body = d.getElementsByTagName('body')[0],
            width = w.innerWidth || documentElement.clientWidth || body.clientWidth,
            height = w.innerHeight || documentElement.clientHeight || body.clientHeight;
        this.setState({ width: width, height: height });
        this.props.renderNavLeftMenuSize(width, height);
    }
    render() {
        let menu = null;
        if (this.props.role === "3" || this.props.role === "4") {
            menu = <ShopMenu
                handleClose={this.handleClose}
                styleMenu={styleMenu}
                styleSelectMenu={styleSelectMenu}
                styleTextMenu={styleTextMenu}
                selectMenu={this.state.selectMenu}
                onSelectMenu={this.onSelectMenu}
            />;
        } else if (this.props.role === "1") {
            menu = <AdminMenu
                handleClose={this.handleClose}
                styleMenu={styleMenu}
                styleSelectMenu={styleSelectMenu}
                styleTextMenu={styleTextMenu}
                selectMenu={this.state.selectMenu}
                onSelectMenu={this.onSelectMenu}
            />;
        }
        return (
            <Drawer
                docked={this.props.docked} // true จะไม่บังด้านหลัง
                open={this.props.open}
                onRequestChange={() => this.handleClose()}
                style={{ zIndex: 1000 }}
            >
                <List style={{ paddingTop: "0px" }}>
                    <Avatar handleClose={this.handleClose} />
                    {menu}
                    <hr style={styleHr} />
                    <SignOUt
                        handleClose={this.handleClose}
                        styleMenu={styleMenu}
                        styleTextMenu={styleTextMenu}
                    />
                </List>
            </Drawer >
        );
    }
}
DrawerMenu.defaultProps = {
    minWidth: 824
};
DrawerMenu.propTypes = {
    minWidth: PropTypes.number.isRequired
};
function mapStateToProps(state) {
    return {
        open: state.navLeftMenu.open,
        docked: state.navLeftMenu.docked,
        role: state.auth.role,
        height: state.navLeftMenu.height,
    }
}
export default connect(mapStateToProps, actions)(DrawerMenu);
