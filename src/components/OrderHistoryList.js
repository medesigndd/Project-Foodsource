import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Scrollbars } from 'react-custom-scrollbars';
import SearchBar from './SearchBar';

import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import { darkBlack, lightBlack } from 'material-ui/styles/colors';
//import { Link } from 'react-router-dom';
import Loading from './Loading';

import OrderHistoryItem from './OrderHistoryItem';

const styles = {
    container: {
        position: 'relative',//relative,absolute
        top: '56px',
        width: '100%',
        //background: 'transparent url(./images/bg.png) repeat 0 0',
    },
    Scrollbars: {
        height: 0,
    },
    divList: {
        position: 'relative',//relative,absolute
        width: '100%',
        textAlign: 'center',
        zIndex: 700,
        //background: 'transparent url(./images/bg.png) repeat 0 0',
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
        fontWeight: 700,
    },
    listItemDetail: {
        color: lightBlack,
        textAlign: 'left', width: '100%',
        marginLeft: 10, marginTop: 3,
        fontSize: '12px',
        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
    },
};

// const Colors = Object.freeze({
//     Order: "#FF9800",
//     Pick: "#FFC107",
//     Pack: "#00bcd4",
//     Invoice: "#304FFE",
//     Delivered: "#4CAF50",
//     Canceled: "#F44336",
// });

class OrderHistoryList extends React.Component {

    state = {
        showOrderHistory: [],
        screenDisplay: "order",
        cust_name: "",
        order_code: "",
        order_status: "",
        total_amount: 0,
        order_detail: [],
    }

    handleOpenOrderDetail = (cust_name, order_code, order_status, total_amount, order_detail) => {
        this.setState({
            screenDisplay: "order_detail",
            cust_name,
            order_code,
            order_status,
            total_amount,
            order_detail,
        });
    }
    handleCloseOrderDetail = () => {
        this.setState({
            screenDisplay: "order",
            cust_name: "",
            order_code: "",
            order_status: "",
            total_amount: 0,
            order_detail: [],
        });
    }

    updateStyle(docked, width, height) {
        styles.Scrollbars = { ...styles.Scrollbars, height: height - 130 };
        if (docked) {
            styles.divContent = { ...styles.divContent, marginLeft: 25, };
            styles.listItemHeader = { ...styles.listItemHeader, fontSize: 16, };
            styles.listItemDetail = { ...styles.listItemDetail, fontSize: 14, };
        } else {
            styles.divContent = { ...styles.divContent, marginLeft: 0, };
            styles.listItemHeader = { ...styles.listItemHeader, fontSize: 14, };
            styles.listItemDetail = { ...styles.listItemDetail, fontSize: 12, };
        }
    }
    componentWillMount() {
        this.props.fetchOrdersHistory();
        this.updateStyle(this.props.docked, this.props.width, this.props.height);
        this.props.updateSearchText("");
    }
    componentWillReceiveProps(nextProps, nextState) {
        this.updateStyle(nextProps.docked, nextProps.width, nextProps.height);
        this.findOrderHistory(nextProps.searchText);
    }
    findOrderHistory(searchText) {
        let rs = this.props.ordersHistory.filter((item) => {
            return item.order_code.indexOf(searchText) > -1
                || item.cust_name.indexOf(searchText) > -1
                || item.buyer_name.indexOf(searchText) > -1
                ;
        });
        this.setState({ showOrderHistory: rs, });
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
    render() {
        if (this.state.screenDisplay === "order_detail") {
            const {
                cust_name,
                order_code,
                order_status,
                total_amount,
                order_detail
            } = this.state;
            return <OrderHistoryItem
                handleCloseOrderDetail={this.handleCloseOrderDetail}
                cust_name={cust_name}
                order_code={order_code}
                order_status={order_status}
                total_amount={total_amount}
                order_detail={order_detail}
            />;
        } else {
            if (this.props.displayLoading) {
                return (
                    <div style={styles.container}>
                        <div >
                            <div>
                                <Scrollbars style={styles.Scrollbars} >
                                    <div style={styles.divList}>
                                        <div style={styles.root}>
                                            <Loading />
                                        </div>
                                    </div>
                                </Scrollbars>
                            </div>
                        </div>
                    </div>
                );
            } else {
                return (
                    <div style={styles.container}>
                        <div style={{ background: 'transparent url(./images/bg.png) repeat 0 0', }}>
                            <SearchBar searchShowFavorite={false} />
                            <div>
                                <Scrollbars style={styles.Scrollbars} >
                                    <div style={styles.divList}>
                                        <div style={styles.root}>
                                            <List>
                                                {this.state.showOrderHistory.map((item, index) => {
                                                    let show_detail = <div></div>
                                                    let height = 105;
                                                    switch (item.order_status) {
                                                        case "Order":
                                                        case "Pick":
                                                        case "Pack":
                                                            height = 90;
                                                            show_detail = <div>
                                                                &nbsp;&nbsp;&nbsp;<span style={{ color: lightBlack }}>Delivery Date :</span> <span style={{ color: darkBlack }}>{item.delivery_date}</span>
                                                            </div>;
                                                            break;
                                                        case "Invoice":
                                                        case "Delivered":
                                                            height = 105;
                                                            show_detail = <div>
                                                                &nbsp;&nbsp;&nbsp;<span style={{ color: lightBlack }}>Delivery Date :</span> <span style={{ color: darkBlack }}>{item.delivery_date}</span><br />
                                                                &nbsp;&nbsp;&nbsp;<span style={{ color: lightBlack }}>Total amount :</span> <span style={{ color: darkBlack }}>{Number(item.total_amount).toLocaleString()} บาท</span>
                                                            </div>;
                                                            break;
                                                        case "Canceled":
                                                            height = 90;
                                                            show_detail = <div>
                                                                &nbsp;&nbsp;&nbsp;<span style={{ color: lightBlack }}>Cancel Date :</span> <span style={{ color: darkBlack }}>{item.cancel_date}</span>
                                                            </div>;
                                                            break;
                                                        default:
                                                            break;
                                                    };
                                                    return (
                                                        <div key={index}>
                                                            <ListItem
                                                                leftAvatar={
                                                                    <Avatar
                                                                        color={"white"}
                                                                        size={55}
                                                                        backgroundColor={this.colorStatus(item.order_status)}
                                                                    >
                                                                        <div style={{ fontSize: 11 }}>{item.order_status}</div>
                                                                    </Avatar>
                                                                }
                                                                //rightIconButton={rightIconMenu}
                                                                style={{ height: height }}
                                                                //containerElement={<Link to="/orderHistoryItem" />}
                                                                onClick={(e) => { this.handleOpenOrderDetail(item.cust_name, item.order_code, item.order_status, item.total_amount, item.order_detail) }}
                                                            >
                                                                <div style={styles.divContent}>
                                                                    <div style={styles.listItemHeader}>{item.order_code}</div>
                                                                    <div style={styles.listItemDetail}>
                                                                        &nbsp;&nbsp;&nbsp;<span style={{ color: lightBlack }}>Customer :</span> <span style={{ color: darkBlack }}>{item.cust_name}</span><br />
                                                                        &nbsp;&nbsp;&nbsp;<span style={{ color: lightBlack }}>Order Date :</span> <span style={{ color: darkBlack }}>{item.order_date}</span><br />
                                                                        {show_detail}
                                                                    </div>
                                                                </div>
                                                            </ListItem>
                                                            <Divider inset={true} />
                                                        </div>
                                                    );
                                                })}
                                                {/* <ListItem
                                                leftAvatar={
                                                    <Avatar
                                                        color={"white"}
                                                        size={45}
                                                        backgroundColor={"#FF9800"}
                                                    ><div style={{ fontSize: 11 }}>Order</div></Avatar>
                                                }
                                                //rightIconButton={rightIconMenu}
                                                style={{ height: 105 }}
                                                containerElement={<Link to="/orderHistoryItem" />}
                                            >
                                                <div style={styles.divContent}>
                                                    <div style={styles.listItemHeader}>Order-00010</div>
                                                    <div style={styles.listItemDetail}>
                                                        &nbsp;&nbsp;&nbsp;<span style={{ color: lightBlack }}>Customer :</span> <span style={{ color: darkBlack }}>บริษัทชิโนรสจำกัด</span><br />
                                                        &nbsp;&nbsp;&nbsp;<span style={{ color: lightBlack }}>Balance :</span> <span style={{ color: darkBlack }}>12,290 Bath</span><br />
                                                        &nbsp;&nbsp;&nbsp;<span style={{ color: lightBlack }}>Order Date :</span> <span style={{ color: darkBlack }}>20/01/2017</span><br />
                                                        &nbsp;&nbsp;&nbsp;<span style={{ color: lightBlack }}>Delivery Date :</span> <span style={{ color: darkBlack }}>20/01/2017</span>
                                                    </div>
                                                </div>
                                            </ListItem>
                                            <Divider inset={true} />
                                            <ListItem
                                                leftAvatar={
                                                    <Avatar
                                                        color={"white"}
                                                        size={45}
                                                        backgroundColor={"#FF9800"}
                                                    ><div style={{ fontSize: 11 }}>Order</div></Avatar>
                                                }
                                                //rightIconButton={rightIconMenu}
                                                style={{ height: 105 }}
                                                containerElement={<Link to="/orderHistoryItem" />}
                                            >
                                                <div style={styles.divContent}>
                                                    <div style={styles.listItemHeader}>Order-00011</div>
                                                    <div style={styles.listItemDetail}>
                                                        &nbsp;&nbsp;&nbsp;<span style={{ color: lightBlack }}>Customer :</span> <span style={{ color: darkBlack }}>บริษัทชิโนรสจำกัด</span><br />
                                                        &nbsp;&nbsp;&nbsp;<span style={{ color: lightBlack }}>Balance :</span> <span style={{ color: darkBlack }}>12,290 Bath</span><br />
                                                        &nbsp;&nbsp;&nbsp;<span style={{ color: lightBlack }}>Order Date :</span> <span style={{ color: darkBlack }}>20/01/2017</span><br />
                                                        &nbsp;&nbsp;&nbsp;<span style={{ color: lightBlack }}>Delivery Date :</span> <span style={{ color: darkBlack }}>20/01/2017</span>
                                                    </div>
                                                </div>
                                            </ListItem>
                                            <Divider inset={true} />
                                            <ListItem
                                                leftAvatar={
                                                    <Avatar
                                                        color={"white"}
                                                        size={45}
                                                        backgroundColor={"#FF9800"}
                                                    ><div style={{ fontSize: 11 }}>Order</div></Avatar>
                                                }
                                                //rightIconButton={rightIconMenu}
                                                style={{ height: 105 }}
                                                containerElement={<Link to="/orderHistoryItem" />}
                                            >
                                                <div style={styles.divContent}>
                                                    <div style={styles.listItemHeader}>Order-00012</div>
                                                    <div style={styles.listItemDetail}>
                                                        &nbsp;&nbsp;&nbsp;<span style={{ color: lightBlack }}>Customer :</span> <span style={{ color: darkBlack }}>บริษัทชิโนรสจำกัด</span><br />
                                                        &nbsp;&nbsp;&nbsp;<span style={{ color: lightBlack }}>Balance :</span> <span style={{ color: darkBlack }}>12,290 Bath</span><br />
                                                        &nbsp;&nbsp;&nbsp;<span style={{ color: lightBlack }}>Order Date :</span> <span style={{ color: darkBlack }}>20/01/2017</span><br />
                                                        &nbsp;&nbsp;&nbsp;<span style={{ color: lightBlack }}>Delivery Date :</span> <span style={{ color: darkBlack }}>20/01/2017</span>
                                                    </div>
                                                </div>
                                            </ListItem>
                                            <Divider inset={true} />
                                            <ListItem
                                                leftAvatar={
                                                    <Avatar
                                                        color={"white"}
                                                        size={45}
                                                        backgroundColor={"#FFC107"}
                                                    ><div style={{ fontSize: 11 }}>Pick</div></Avatar>
                                                }
                                                //rightIconButton={rightIconMenu}
                                                style={{ height: 105 }}
                                                containerElement={<Link to="/orderHistoryItem" />}
                                            >
                                                <div style={styles.divContent}>
                                                    <div style={styles.listItemHeader}>Order-00002</div>
                                                    <div style={styles.listItemDetail}>
                                                        &nbsp;&nbsp;&nbsp;<span style={{ color: lightBlack }}>Customer :</span> <span style={{ color: darkBlack }}>บริษัทชิโนรสจำกัด</span><br />
                                                        &nbsp;&nbsp;&nbsp;<span style={{ color: lightBlack }}>Balance :</span> <span style={{ color: darkBlack }}>12,290 Bath</span><br />
                                                        &nbsp;&nbsp;&nbsp;<span style={{ color: lightBlack }}>Order Date :</span> <span style={{ color: darkBlack }}>20/01/2017</span><br />
                                                        &nbsp;&nbsp;&nbsp;<span style={{ color: lightBlack }}>Delivery Date :</span> <span style={{ color: darkBlack }}>20/01/2017</span>
                                                    </div>
                                                </div>
                                            </ListItem>
                                            <Divider inset={true} />
                                            <ListItem
                                                leftAvatar={
                                                    <Avatar
                                                        color={"white"}
                                                        size={45}
                                                        backgroundColor={"#00bcd4"}
                                                    ><div style={{ fontSize: 11 }}>Pack</div></Avatar>
                                                }
                                                //rightIconButton={rightIconMenu}
                                                style={{ height: 105 }}
                                                containerElement={<Link to="/orderHistoryItem" />}
                                            >
                                                <div style={styles.divContent}>
                                                    <div style={styles.listItemHeader}>Order-00003</div>
                                                    <div style={styles.listItemDetail}>
                                                        &nbsp;&nbsp;&nbsp;<span style={{ color: lightBlack }}>Customer :</span> <span style={{ color: darkBlack }}>บริษัทชิโนรสจำกัด</span><br />
                                                        &nbsp;&nbsp;&nbsp;<span style={{ color: lightBlack }}>Balance :</span> <span style={{ color: darkBlack }}>12,290 Bath</span><br />
                                                        &nbsp;&nbsp;&nbsp;<span style={{ color: lightBlack }}>Order Date :</span> <span style={{ color: darkBlack }}>20/01/2017</span><br />
                                                        &nbsp;&nbsp;&nbsp;<span style={{ color: lightBlack }}>Delivery Date :</span> <span style={{ color: darkBlack }}>20/01/2017</span>
                                                    </div>
                                                </div>
                                            </ListItem>
                                            <Divider inset={true} />
                                            <ListItem
                                                leftAvatar={
                                                    <Avatar
                                                        color={"white"}
                                                        size={45}
                                                        backgroundColor={"#304FFE"}
                                                    ><div style={{ fontSize: 11 }}>Invoice</div></Avatar>
                                                }
                                                //rightIconButton={rightIconMenu}
                                                style={{ height: 105 }}
                                                containerElement={<Link to="/orderHistoryItem" />}
                                            >
                                                <div style={styles.divContent}>
                                                    <div style={styles.listItemHeader}>Order-00040</div>
                                                    <div style={styles.listItemDetail}>
                                                        &nbsp;&nbsp;&nbsp;<span style={{ color: lightBlack }}>Customer :</span> <span style={{ color: darkBlack }}>บริษัทชิโนรสจำกัด</span><br />
                                                        &nbsp;&nbsp;&nbsp;<span style={{ color: lightBlack }}>Balance :</span> <span style={{ color: darkBlack }}>12,290 Bath</span><br />
                                                        &nbsp;&nbsp;&nbsp;<span style={{ color: lightBlack }}>Order Date :</span> <span style={{ color: darkBlack }}>20/01/2017</span><br />
                                                        &nbsp;&nbsp;&nbsp;<span style={{ color: lightBlack }}>Delivery Date :</span> <span style={{ color: darkBlack }}>20/01/2017</span>
                                                    </div>
                                                </div>
                                            </ListItem>
                                            <Divider inset={true} />
                                            <ListItem
                                                leftAvatar={
                                                    <Avatar
                                                        color={"white"}
                                                        size={45}
                                                        backgroundColor={"#304FFE"}
                                                    ><div style={{ fontSize: 11 }}>Invoice</div></Avatar>
                                                }
                                                //rightIconButton={rightIconMenu}
                                                style={{ height: 105 }}
                                                containerElement={<Link to="/orderHistoryItem" />}
                                            >
                                                <div style={styles.divContent}>
                                                    <div style={styles.listItemHeader}>Order-00041</div>
                                                    <div style={styles.listItemDetail}>
                                                        &nbsp;&nbsp;&nbsp;<span style={{ color: lightBlack }}>Customer :</span> <span style={{ color: darkBlack }}>บริษัทชิโนรสจำกัด</span><br />
                                                        &nbsp;&nbsp;&nbsp;<span style={{ color: lightBlack }}>Balance :</span> <span style={{ color: darkBlack }}>12,290 Bath</span><br />
                                                        &nbsp;&nbsp;&nbsp;<span style={{ color: lightBlack }}>Order Date :</span> <span style={{ color: darkBlack }}>20/01/2017</span><br />
                                                        &nbsp;&nbsp;&nbsp;<span style={{ color: lightBlack }}>Delivery Date :</span> <span style={{ color: darkBlack }}>20/01/2017</span>
                                                    </div>
                                                </div>
                                            </ListItem>
                                            <Divider inset={true} />
                                            <ListItem
                                                leftAvatar={
                                                    <Avatar
                                                        color={"white"}
                                                        size={45}
                                                        backgroundColor={"#304FFE"}
                                                    ><div style={{ fontSize: 11 }}>Invoice</div></Avatar>
                                                }
                                                //rightIconButton={rightIconMenu}
                                                style={{ height: 105 }}
                                                containerElement={<Link to="/orderHistoryItem" />}
                                            >
                                                <div style={styles.divContent}>
                                                    <div style={styles.listItemHeader}>Order-00042</div>
                                                    <div style={styles.listItemDetail}>
                                                        &nbsp;&nbsp;&nbsp;<span style={{ color: lightBlack }}>Customer :</span> <span style={{ color: darkBlack }}>บริษัทชิโนรสจำกัด</span><br />
                                                        &nbsp;&nbsp;&nbsp;<span style={{ color: lightBlack }}>Balance :</span> <span style={{ color: darkBlack }}>12,290 Bath</span><br />
                                                        &nbsp;&nbsp;&nbsp;<span style={{ color: lightBlack }}>Order Date :</span> <span style={{ color: darkBlack }}>20/01/2017</span><br />
                                                        &nbsp;&nbsp;&nbsp;<span style={{ color: lightBlack }}>Delivery Date :</span> <span style={{ color: darkBlack }}>20/01/2017</span>
                                                    </div>
                                                </div>
                                            </ListItem>
                                            <Divider inset={true} />
                                            <ListItem
                                                leftAvatar={
                                                    <Avatar
                                                        color={"white"}
                                                        size={45}
                                                        backgroundColor={"#4CAF50"}
                                                    ><div style={{ fontSize: 11 }}>Delivered</div></Avatar>
                                                }
                                                //rightIconButton={rightIconMenu}
                                                style={{ height: 105 }}
                                                containerElement={<Link to="/orderHistoryItem" />}
                                            >
                                                <div style={styles.divContent}>
                                                    <div style={styles.listItemHeader}>Order-00005</div>
                                                    <div style={styles.listItemDetail}>
                                                        &nbsp;&nbsp;&nbsp;<span style={{ color: lightBlack }}>Customer :</span> <span style={{ color: darkBlack }}>บริษัทชิโนรสจำกัด</span><br />
                                                        &nbsp;&nbsp;&nbsp;<span style={{ color: lightBlack }}>Balance :</span> <span style={{ color: darkBlack }}>12,290 Bath</span><br />
                                                        &nbsp;&nbsp;&nbsp;<span style={{ color: lightBlack }}>Order Date :</span> <span style={{ color: darkBlack }}>20/01/2017</span><br />
                                                        &nbsp;&nbsp;&nbsp;<span style={{ color: lightBlack }}>Delivery Date :</span> <span style={{ color: darkBlack }}>20/01/2017</span>
                                                    </div>
                                                </div>
                                            </ListItem>
                                            <Divider inset={true} />
                                            <ListItem
                                                leftAvatar={
                                                    <Avatar
                                                        color={"white"}
                                                        size={45}
                                                        backgroundColor={"#F44336"}
                                                    ><div style={{ fontSize: 11 }}>Cancel</div></Avatar>
                                                }
                                                //rightIconButton={rightIconMenu}
                                                style={{ height: 105 }}
                                                containerElement={<Link to="/orderHistoryItem" />}
                                            >
                                                <div style={styles.divContent}>
                                                    <div style={styles.listItemHeader}>Order-00006</div>
                                                    <div style={styles.listItemDetail}>
                                                        &nbsp;&nbsp;&nbsp;<span style={{ color: lightBlack }}>Customer :</span> <span style={{ color: darkBlack }}>บริษัทชิโนรสจำกัด</span><br />
                                                        &nbsp;&nbsp;&nbsp;<span style={{ color: lightBlack }}>Balance :</span> <span style={{ color: darkBlack }}>12,290 Bath</span><br />
                                                        &nbsp;&nbsp;&nbsp;<span style={{ color: lightBlack }}>Order Date :</span> <span style={{ color: darkBlack }}>20/01/2017</span><br />
                                                        &nbsp;&nbsp;&nbsp;<span style={{ color: lightBlack }}>Cancel Date :</span> <span style={{ color: darkBlack }}>20/01/2017</span>
                                                    </div>
                                                </div>
                                            </ListItem>
                                            <Divider inset={true} /> */}
                                            </List>
                                        </div>
                                    </div>
                                </Scrollbars>
                            </div>
                        </div>
                    </div>
                );
            }
        }
    }
}

//หากมีการเรียกใช้ Props จาก Redux ให้ mapStateToProps ด้วย
function mapStateToProps(state) {
    return {
        docked: state.navLeftMenu.docked,
        width: state.navLeftMenu.width,
        height: state.navLeftMenu.height,
        searchText: state.search.text,
        displayLoading: state.common.displayLoading,
        ordersHistory: state.shop.ordersHistory,
    }
}

export default connect(mapStateToProps, actions)(OrderHistoryList);