import React from 'react';
// import Loading from '../Loading';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import * as actions from '../../actions';
import OrderExtraFee from './OrderExtraFee';
import OrderDescription from './OrderDescription';

import MobileTearSheet from './MobileTearSheet';
import Avatar from 'material-ui/Avatar';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import Add from 'material-ui/svg-icons/content/add-circle';
import Remove from 'material-ui/svg-icons/content/remove-circle';
import NoteAdd from 'material-ui/svg-icons/action/note-add';
import RaisedButton from 'material-ui/RaisedButton';
import { lightBlack } from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';


const styles = {
    Scrollbars: {
        height: 0,
        overflowX: 'hidden',
    },
    divContent: {
        position: 'relative',//relative,absolute
        width: '100%',
        textAlign: 'center',
        zIndex: 700,
        overflowX: 'hidden',
    },
    Icon: {
        cursor: 'pointer',
    },
    avatar: {
        marginLeft: 20,
    },
    divSKU: {
        float: 'left',
        width: '100%',
        marginTop: -20,
        marginLeft: 25,
    },
    divAmount: {
        width: '100%',
        marginRight: 10,
        position: 'absolute',
        top: '23px',
        right: '10px',
    },
    divBalance: {
        color: lightBlack,
        fontSize: '14px',
        right: 32 + 10,
        bottom: 8,
        position: 'absolute',
        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
    },
    divOrderDesc: {
        //background: 'transparent url(./images/bg.png) repeat 0 0',
    }
};

class OrderList extends React.Component {
    state = {
        serviceCharge: false,
        extraFeeOpen: false,
        descriptionOpen: false,
        selectedSKU: {}
    }
    openExtraFee = (sku) => {
        this.setState({ extraFeeOpen: true, descriptionOpen: false, selectedSKU: sku });
        // styles.Scrollbars = { ...styles.Scrollbars, height: this.props.height - 110 };
    };
    closeExtraFee = () => {
        this.setState({ extraFeeOpen: false });
        this.updateStyle(this.props.docked, this.props.width, this.props.height);
    };
    openDescription = () => {
        this.setState({ descriptionOpen: true, extraFeeOpen: false, });
        //styles.Scrollbars = { ...styles.Scrollbars, height: this.props.height - 110 };
    };
    closeDescription = () => {
        this.props.updateCustomerPOIMG('');
        this.setState({ descriptionOpen: false });
        this.updateStyle(this.props.docked, this.props.width, this.props.height);
    };
    updateStyle(docked, width, height) {
        styles.divOrderDesc = { ...styles.divOrderDesc, height: height - 103 };
        if (docked) {
            styles.Scrollbars = { ...styles.Scrollbars, height: height - 147 };
            styles.avatar = { ...styles.avatar, marginLeft: 20, };

            styles.divSKU = { ...styles.divSKU, marginLeft: 25, };
            styles.divAmount = { ...styles.divAmount, right: 10, };
            styles.divBalance = { ...styles.divBalance, right: 42 };
        } else {
            styles.Scrollbars = { ...styles.Scrollbars, height: height - 145 };
            styles.avatar = { ...styles.avatar, marginLeft: -15, };

            styles.divSKU = { ...styles.divSKU, marginLeft: -10, };
            styles.divAmount = { ...styles.divAmount, right: -10, };
            styles.divBalance = { ...styles.divBalance, right: 12 };
        }
    }
    componentWillMount() {
        this.props.updateCustomerPOIMG('');
        this.props.updateSearchText("");
        this.props.confirmSuccess(false, '');
        this.updateStyle(this.props.docked, this.props.width, this.props.height);
    }
    componentWillReceiveProps(nextProps, nextState) {
        this.updateStyle(nextProps.docked, nextProps.width, nextProps.height);
    }
    componentDidMount() {
        // setTimeout(() => { this.setState({ loading: false }); }, 500);
        // alert(this.refs.divBalance.offsetWidth);
    }
    componentWillUnmount() {
        this.props.handleTransitionEnd();
    }
    updateOrder(e, sku) {
        // const re = /[0-9:]+/g;
        // if (!re.test(e.key) && (e.keyCode !== 8 && e.keyCode !== 46)) {
        //     e.preventDefault();
        // } else {
        //     alert(e.target.value);
        //     this.props.updateOrder(sku, "REPLACE", e.target.value);
        // }
        /*if (Number(e.target.value) > Number(sku.qty_available)) {
            alert("Available in stock " + sku.qty_available.toLocaleString() + " " + sku.sku_unit);
            this.props.updateOrder(sku, "REPLACE", sku.qty_available);
        } else {
            this.props.updateOrder(sku, "REPLACE", e.target.value);
        }*/
        this.props.updateOrder(sku, "REPLACE", e.target.value);
    }
    addOrder = (sku) => {
        // if ((Number(sku.order_amount) + 1) > Number(sku.qty_available)) {
        //     alert("Available in stock " + sku.qty_available.toLocaleString() + " " + sku.sku_unit);
        // } else {
        //     this.props.updateOrder(sku, "UPDATE", 1);
        // }
        this.props.updateOrder(sku, "UPDATE", 1);
    }
    removeOrder = (sku) => {
        this.props.updateOrder(sku, "UPDATE", -1);
    }
    handleFocus = (e) => {
        e.target.select();
    }
    render() {
        let display = null;
        if (this.state.extraFeeOpen === true) {
            display = <div>
                <div style={{ ...styles.divOrderDesc, }}>
                    <div style={{ ...styles.divContent, textAlign: 'left', }}>
                        <OrderExtraFee closeExtraFee={this.closeExtraFee} sku={this.state.selectedSKU} />
                    </div>
                </div>
            </div>
        } else if (this.state.descriptionOpen === true) {
            display = <div>
                <div style={{ ...styles.divOrderDesc, }}>
                    <div style={{ ...styles.divContent, textAlign: 'left', }}>
                        <OrderDescription closeDescription={this.closeDescription} />
                    </div>
                </div>
            </div>
        } else {
            if (this.props.allOrder.length === 0) {
                display = <span>
                    <div className="dialog-mask dialog-mask--material"></div>
                    <div className="dialog dialog--material">
                        <div className="dialog dialog-container--material">
                            <p style={{
                                marginLeft: '24px', marginRight: '24px',
                                textAlign: 'center', verticalAlign: 'middle',
                                paddingTop: 20, color: '#F06292'
                            }}
                            >
                                ไม่มีรายการสั่งซื้อ
                            </p>
                        </div>
                    </div>
                </span>
            } else {
                display = <div style={{ background: 'transparent url(./images/bg.png) repeat 0 0', }}>
                    <div>
                        <Scrollbars style={styles.Scrollbars} >
                            <div style={styles.divContent}>
                                <MobileTearSheet>
                                    <List
                                        style={{ textAlign: 'center', }}
                                    >
                                        {this.props.allOrder.map((item, index) => {
                                            let listService = '';
                                            let showService = null;
                                            let extraFeeTotalAmount = 0;
                                            let extraFee = this.props.getOrderExtraFee[item.sku_code];
                                            for (let key in extraFee) {
                                                if (extraFee.hasOwnProperty(key)) {
                                                    if (extraFee[key].name) {
                                                        extraFeeTotalAmount += Number(extraFee[key].total_amount);
                                                        listService += `${extraFee[key].name} / `;
                                                    }
                                                }
                                            }
                                            if (listService) {
                                                listService = `${listService.substring(0, listService.length - 3)} (${Number(extraFeeTotalAmount).toLocaleString()} บาท)`;
                                                showService = <div style={{
                                                    color: lightBlack,
                                                    fontSize: '9px',
                                                    textAlign: 'left', width: '100%',
                                                    marginLeft: 10, marginTop: 6,
                                                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                                                }}
                                                >
                                                    {listService}
                                                </div>
                                            }
                                            return (
                                                <div key={index}>
                                                    <ListItem
                                                        leftAvatar={
                                                            <div>
                                                                <Avatar src={item.img} size={60} style={styles.avatar} />
                                                                <IconButton
                                                                    style={{
                                                                        position: 'absolute',
                                                                        padding: 0,
                                                                        bottom: 0,
                                                                        width: 22,
                                                                        height: 27,
                                                                        background: 'transparent url(./images/bg.png) repeat 0 0',
                                                                        right: 0,
                                                                        textAlign: 'center',
                                                                    }}
                                                                >
                                                                    <NoteAdd
                                                                        onClick={() => this.openExtraFee(item)}
                                                                        color={'#4DD0E1'}
                                                                        hoverColor="gold"
                                                                        style={{
                                                                            cursor: 'pointer',
                                                                            fontSize: 5,
                                                                            textAlign: 'center',
                                                                        }}
                                                                        size={10}
                                                                    />
                                                                </IconButton>
                                                            </div>
                                                        }
                                                        style={{ height: 45 }}
                                                        disabled={true}
                                                    >
                                                        <div style={styles.divSKU}>
                                                            <div style={{
                                                                textAlign: 'left', width: '100%',
                                                                marginLeft: 10, marginTop: 10, fontSize: 12,
                                                                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                                                            }}
                                                            >
                                                                {item.sku_name}
                                                            </div>
                                                            <div style={{
                                                                color: lightBlack, fontSize: 10,
                                                                textAlign: 'left', width: '100%',
                                                                marginLeft: 10, marginTop: 7,
                                                                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                                                            }}
                                                            >
                                                                {Number(item.sku_price).toLocaleString()} บาท / {item.sku_unit}
                                                            </div>
                                                            {showService}
                                                        </div>
                                                        <div style={styles.divAmount}>
                                                            <div style={{ marginTop: -10 }} >
                                                                <IconButton
                                                                    style={{ float: 'right', marginRight: 0, marginTop: 5 }}
                                                                    onClick={(e) => { this.addOrder(item) }}
                                                                >
                                                                    <Add
                                                                        style={styles.Icon}
                                                                        color="green"
                                                                        onClick={this.handleOpen}
                                                                        viewBox="0 0 24 24"
                                                                    />
                                                                </IconButton>
                                                                <TextField
                                                                    value={item.order_amount.toLocaleString()}
                                                                    //floatingLabelText={"Qty (" + item.sku_unit + ")"}
                                                                    floatingLabelText={`ชิ้น`}
                                                                    floatingLabelStyle={{ fontSize: 12, width: 100, marginLeft: -20, }}
                                                                    style={{ width: 40, float: 'right', marginTop: -20, marginRight: -5 }}
                                                                    inputStyle={{
                                                                        textAlign: 'center'
                                                                    }}
                                                                    type={"tel"}
                                                                    onChange={(e) => this.updateOrder(e, item)}
                                                                    onFocus={(e) => this.handleFocus(e)}
                                                                />
                                                                <IconButton
                                                                    style={{ float: 'right', marginRight: -5, marginTop: 5 }}
                                                                    onClick={(e) => { this.removeOrder(item) }}
                                                                >
                                                                    <Remove
                                                                        style={styles.Icon}
                                                                        color="red"
                                                                        onClick={this.handleOpen}
                                                                    />
                                                                </IconButton>
                                                            </div>
                                                            {/* <div ref="divBalance" style={styles.divBalance}>
                                                                        {(item.order_amount * item.sku_price).toLocaleString()} บาท
                                                                    </div> */}
                                                        </div>
                                                    </ListItem>
                                                    <Divider style={{ width: '100%' }} />
                                                </div>
                                            );
                                        })}
                                    </List>
                                </MobileTearSheet>
                            </div>
                        </Scrollbars>
                    </div>
                    {this.props.allOrder.length > 0 && <div
                        style={{
                            positiion: 'fixed',
                            bottom: -200, zIndex: 900,
                            paddingTop: 3,
                            textAlign: 'center',
                        }}
                    >
                        <RaisedButton
                            label="สั่งซื้อ"
                            style={{ width: '99%' }}
                            primary={true}
                            labelStyle={{ fontSize: '17px', color: 'white' }}
                            onClick={() => this.openDescription()}
                        />
                    </div>}
                </div >
            }
        }
        return display;
    }
}

function mapStateToProps(state) {
    return {
        docked: state.navLeftMenu.docked,
        width: state.navLeftMenu.width,
        height: state.navLeftMenu.height,

        allOrder: state.shop.allOrder,
        getOrderExtraFee: state.shop.orderExtraFee,
        defaultCustomer: state.auth.user_data.default_customer,
        displayLoading: state.common.displayLoading,
    }
}
export default connect(mapStateToProps, actions)(OrderList);
