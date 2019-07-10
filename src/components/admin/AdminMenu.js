import { blueA200, greenA200 } from 'material-ui/styles/colors';
import { Link } from 'react-router-dom';
// import Extention from 'material-ui/svg-icons/action/add-shopping-cart';
import History from 'material-ui/svg-icons/action/history';
import ListItem from 'material-ui/List/ListItem';
import People from 'material-ui/svg-icons/social/people';
import Person from 'material-ui/svg-icons/social/person';
import PieChart from 'material-ui/svg-icons/editor/pie-chart';
import React from 'react';

// import Store from 'material-ui/svg-icons/action/store';
// import Badge from 'material-ui/Badge';
// import NotificationsIcon from 'material-ui/svg-icons/social/notifications';

class ShopMenu extends React.Component {
    render() {
        return (
            <div>
                <ListItem
                    style={(this.props.selectMenu === 2) ? this.props.styleSelectMenu : this.props.styleMenu}
                    leftIcon={
                        <History color={blueA200} hoverColor={greenA200} />
                    }
                    //primaryText="สินค้าที่เคยสั่งซื้อ"
                    onClick={() => { this.props.handleClose(); this.props.onSelectMenu(2); }}
                    containerElement={<Link to="/orderHistoryList" />}
                >
                    <div style={this.props.styleTextMenu}>ประวัติการสั่งซื้อ</div>
                </ListItem>
                <ListItem
                    style={(this.props.selectMenu === 4) ? this.props.styleSelectMenu : this.props.styleMenu}
                    leftIcon={
                        <PieChart color={blueA200} hoverColor={greenA200} />
                    }
                    //primaryText="สินค้าที่เคยสั่งซื้อ"
                    onClick={() => { this.props.handleClose(); this.props.onSelectMenu(4); }}
                    containerElement={<Link to="/salesByProducts" />}
                >
                    <div style={this.props.styleTextMenu}>ยอดขายตามสินค้า</div>
                </ListItem>
                <ListItem
                    style={(this.props.selectMenu === 3) ? this.props.styleSelectMenu : this.props.styleMenu}
                    leftIcon={
                        <Person color={blueA200} hoverColor={greenA200} />
                    }
                    //primaryText="สินค้าที่เคยสั่งซื้อ"
                    onClick={() => { this.props.handleClose(); this.props.onSelectMenu(3); }}
                    containerElement={<Link to="/salesBySeller" />}
                >
                    <div style={this.props.styleTextMenu}>ยอดขายตามเซลล์</div>
                </ListItem>
                <ListItem
                    style={(this.props.selectMenu === 5) ? this.props.styleSelectMenu : this.props.styleMenu}
                    leftIcon={
                        <People color={blueA200} hoverColor={greenA200} />
                    }
                    //primaryText="สินค้าที่เคยสั่งซื้อ"
                    onClick={() => { this.props.handleClose(); this.props.onSelectMenu(5); }}
                    containerElement={<Link to="/salesByCustomer" />}
                >
                    <div style={this.props.styleTextMenu}>ยอดขายตามลูกค้า</div>
                </ListItem>
                {/*<ListItem
                    style={(this.props.selectMenu == 2) ? this.props.styleSelectMenu : this.props.styleMenu}
                    leftIcon={
                        <Store color={blueA200} hoverColor={greenA200} />
                    }
                    //primaryText="รับสินค้า"
                    onClick={() => { this.props.handleClose(); this.props.onSelectMenu(2); }}
                    containerElement={<Link to="/shop/receive" />}
                    rightIcon={
                        <Badge
                            badgeContent={10}
                            secondary={true}
                            badgeStyle={{ top: 0, right: 0, marginTop: '13px', marginLeft: '-15px' }}
                            style={{ marginTop: '-10px' }}
                        >
                            <NotificationsIcon />
                        </Badge>

                    }
                >
                    <div style={this.props.styleTextMenu}>รับสินค้า</div>
                </ListItem> 
                <ListItem
                    style={(this.props.selectMenu == 3) ? this.props.styleSelectMenu : this.props.styleMenu}
                    leftIcon={
                        <History color={blueA200} hoverColor={greenA200} />
                    }
                    //primaryText="สินค้าที่เคยสั่งซื้อ"
                    onClick={() => { this.props.handleClose(); this.props.onSelectMenu(3); }}
                    containerElement={<Link to="/orderHistory" />}
                >
                    <div style={this.props.styleTextMenu}>ประวัติการสั่งซื้อ</div>
                </ListItem>*/}
            </div >
        );
    }
}

ShopMenu.defaultProps = {
    selectMenu: 1
};

export default ShopMenu;