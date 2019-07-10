import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Scrollbars } from 'react-custom-scrollbars';

import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import AppBar from 'material-ui/AppBar';
// import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
//import { Link } from 'react-router-dom';

import { grey400, darkBlack, lightBlack } from 'material-ui/styles/colors';

const styles = {
    container: {
        position: 'relative',//relative,absolute
        top: '56px',
        width: '100%',
        background: 'transparent url(./images/bg.png) repeat 0 0',
    },
    tabs: {
        position: 'fixed',
        width: '100%',
        zIndex: 900,
    },
    Scrollbars: {
        height: 0,
    },
    divList: {
        position: 'relative',//relative,absolute
        width: '100%',
        textAlign: 'center',
        zIndex: 700,
        background: 'transparent url(./images/bg.png) repeat 0 0',
    },
    root: {
        position: 'relative',//relative,absolute
        width: '100%',
        textAlign: 'center',
        zIndex: 600,
    },
    divContent: {
        float: 'left',
        width: '90%',
        marginTop: -20,
        marginLeft: 0,
    },
    listItemHeader: {
        textAlign: 'left', width: '100%',
        marginLeft: 10, marginTop: 10,
        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        fontWeight: 400,
    },
    listItemDetail: {
        color: lightBlack,
        textAlign: 'left', width: '100%',
        marginLeft: 10, marginTop: 3,
        fontSize: '12px',
        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
    },
};

class OrderHistoryItem extends React.Component {
    updateStyle(docked, width, height) {
        styles.Scrollbars = { ...styles.Scrollbars, height: height - 100 };
        if (docked) {
            styles.tabs = { ...styles.tabs, 'paddingLeft': 0, width: width - 255 };
            styles.divContent = { ...styles.divContent, marginLeft: 25, };
            styles.listItemHeader = { ...styles.listItemHeader, fontSize: 16, };
            styles.listItemDetail = { ...styles.listItemDetail, fontSize: 14, };
        } else {
            styles.tabs = { ...styles.tabs, 'paddingLeft': 0, width: '100%' };
            styles.divContent = { ...styles.divContent, marginLeft: 10, };
            styles.listItemHeader = { ...styles.listItemHeader, fontSize: 12, };
            styles.listItemDetail = { ...styles.listItemDetail, fontSize: 12, };
        }
    }
    colorStatus(order_status) {
        let color = "";
        switch (order_status) {
            case "Order":
                color = "#FF9800";
                break;
            case "Pick":
                color = "#FFC107";
                break;
            case "Pack":
                color = "#00bcd4";
                break;
            case "Invoice":
                color = "#304FFE";
                break;
            case "Delivered":
                color = "#4CAF50";
                break;
            case "Canceled":
                color = "#F44336";
                break;
            default:
                break;
        };
        return color;
    }
    componentWillMount() {
        //this.props.statusLoading();
        this.props.fetchSKU(this.props.defaultCustomer.cust_code);
        this.updateStyle(this.props.docked, this.props.width, this.props.height);
    }
    componentWillReceiveProps(nextProps, nextState) {
        this.updateStyle(nextProps.docked, nextProps.width, nextProps.height);
    }
    render() {
        //console.log(this.props.order_detail);
        let showBalance = <div></div>
        if (this.props.order_status === "Invoice" || this.props.order_status === "Delivered") {
            showBalance = <div style={{ float: 'left', marginTop: -52, }}>
                Total amount : <span style={{ color: darkBlack, fontWeight: 700, }}>{Number(this.props.total_amount).toLocaleString()} บาท</span>
            </div>
        }
        return (
            <div style={styles.container}>
                <div style={styles.tabs}>
                    <AppBar
                        title={this.props.cust_name}
                        titleStyle={{
                            fontSize: 16, marginTop: -10,
                        }}
                        style={{ height: "48px" }}
                        iconStyleLeft={{ display: 'none' }}
                        iconStyleRight={{ marginTop: -5, }}
                    // iconElementRight={
                    //     <FlatButton label="Back"
                    //         style={{ color: 'white' }}
                    //         onClick={(e) => { this.props.handleCloseOrderDetail() }} />
                    // }
                    />
                    <div style={{ background: 'transparent url(./images/bg.png) repeat 0 0', }}>
                        <div>
                            <Scrollbars style={styles.Scrollbars} >
                                <div style={styles.divList}>
                                    <div style={styles.root}>
                                        <List
                                            style={{ textAlign: 'center', }}
                                        >
                                            <Subheader
                                                style={{
                                                    textAlign: 'left', fontSize: 14,
                                                    width: '100%', height: 100,
                                                    paddingTop: 7,
                                                }}
                                            >
                                                <RaisedButton
                                                    id={`RaisedButton`}
                                                    label="Back"
                                                    primary={true}
                                                    onClick={(e) => { this.props.handleCloseOrderDetail() }}
                                                    style={{
                                                        position: 'absolute', top: 22,
                                                        right: 10, float: 'right',
                                                        padding: 0, backgroundColor: 'transparent ',
                                                        height: 48, paddingTop: -20,
                                                    }}
                                                    buttonStyle={{ paddingTop: -20, }}
                                                />
                                                <div style={{ float: 'left' }}>
                                                    Order status : <span style={{ color: this.colorStatus(this.props.order_status), fontWeight: 700, }}>{this.props.order_status}</span>
                                                </div><br />
                                                <div style={{ float: 'left', marginTop: -25, }}>
                                                    Order No : <span style={{ color: darkBlack, fontWeight: 700, }}>{this.props.order_code}</span>
                                                </div><br />
                                                {showBalance}
                                            </Subheader>
                                            {/* <Subheader style={{ textAlign: 'right', fontSize: 20, marginLeft: 20, width: '50%' }}>Balance : 12,394 Bath</Subheader> */}
                                            <Divider style={{ width: '100%', backgroundColor: grey400, height: 3, }} />
                                            {this.props.order_detail.map((item, index) => {
                                                let show_detail = <div></div>
                                                //let height = 105;
                                                switch (this.props.order_status) {
                                                    case "Order":
                                                    case "Pick":
                                                    case "Pack":
                                                    case "Canceled":
                                                        //height = 90;
                                                        show_detail =
                                                            <div style={styles.listItemDetail}>
                                                                &nbsp;&nbsp;&nbsp;<span style={{ color: lightBlack }}>Piece :</span> <span style={{ color: darkBlack }}>{item.piece}</span><br />
                                                            </div>;
                                                        break;
                                                    case "Invoice":
                                                    case "Delivered":
                                                        //height = 105;
                                                        show_detail =
                                                            <div style={styles.listItemDetail}>
                                                                &nbsp;&nbsp;&nbsp;<span style={{ color: lightBlack }}>Qty :</span> <span style={{ color: darkBlack }}>{item.weight} {item.unit}</span><br />
                                                                &nbsp;&nbsp;&nbsp;<span style={{ color: lightBlack }}>Balance :</span> <span style={{ color: darkBlack }}>{Number(item.total_amount).toLocaleString()} บาท</span><br />
                                                            </div>;
                                                        break;
                                                    default:
                                                        break;
                                                };
                                                return (
                                                    <div key={index}>
                                                        <ListItem
                                                            leftAvatar={
                                                                <div>
                                                                    <Avatar src={item.img} size={60} style={styles.avatar} />
                                                                </div>
                                                            }
                                                            style={{ height: 75 }}
                                                        >
                                                            <div style={styles.divContent}>
                                                                <div style={styles.listItemHeader}>{item.sku_name}</div>
                                                                {show_detail}
                                                            </div>
                                                        </ListItem>
                                                        <Divider style={{ width: '100%' }} />
                                                    </div>
                                                );
                                            })}
                                        </List>
                                    </div>
                                </div>
                            </Scrollbars>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

//หากมีการเรียกใช้ Props จาก Redux ให้ mapStateToProps ด้วย
function mapStateToProps(state) {
    return {
        docked: state.navLeftMenu.docked,
        width: state.navLeftMenu.width,
        height: state.navLeftMenu.height,
        searchText: state.search.text,
        allSKU: state.shop.allSKU,
        defaultCustomer: state.auth.user_data.default_customer,
    }
}

export default connect(mapStateToProps, actions)(OrderHistoryItem);