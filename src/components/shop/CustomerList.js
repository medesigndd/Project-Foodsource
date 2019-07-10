import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import { withRouter } from "react-router-dom";

import MobileTearSheet from './MobileTearSheet';
import AppBar from 'material-ui/AppBar';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import { lightBlack } from 'material-ui/styles/colors';

// import IconButton from 'material-ui/IconButton';
// import AddShoppingCart from 'material-ui/svg-icons/action/add-shopping-cart';
import * as actions from '../../actions';
import Loading from '../Loading';
import SearchBar from '../SearchBar';

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
        width: '100%',
        marginTop: -20,
        marginLeft: -20,
    },
    listItemHeader: {
        fontSize: 12, paddingTop: 15,
        //paddingTop: 13,
        textAlign: 'left', width: '100%',
        marginLeft: 10,
        height: '20px',
        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
    },
    listItemDetail: {
        color: lightBlack,
        textAlign: 'left', width: '100%',
        marginLeft: 10, paddingTop: 0,
        height: '18px',
        fontSize: 12,
        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
    },
    divAmount: {
        float: 'right',
        width: '40%',
        marginRight: 10
    },
};

class CustomerList extends React.Component {
    static contextTypes = {
        router: PropTypes.object
    }
    state = {
        showCustomer: [],
    }
    updateStyle(docked, width, height) {
        styles.Scrollbars = { ...styles.Scrollbars, height: height - 176 };
        if (docked) {
            styles.tabs = { ...styles.tabs, 'paddingLeft': 0, width: width - 255 };
            styles.divContent = { ...styles.divContent, marginLeft: 25, };
            styles.listItemHeader = { ...styles.listItemHeader, fontSize: 16, };
            styles.listItemDetail = { ...styles.listItemDetail, fontSize: 14, };
        } else {
            styles.tabs = { ...styles.tabs, 'paddingLeft': 0, width: '100%' };
            styles.divContent = { ...styles.divContent, marginLeft: -10, };
            styles.listItemHeader = { ...styles.listItemHeader, fontSize: 12, };
            styles.listItemDetail = { ...styles.listItemDetail, fontSize: 12, };
        }
    }
    componentWillMount() {
        //this.props.statusLoading();
        this.props.fetchUserData(this.props.history.push);
        this.updateStyle(this.props.docked, this.props.width, this.props.height);
        this.props.updateSearchText("");
    }
    componentDidMount() {
        this.props.showMenuTabCatalog();
        setTimeout(() => { this.setState({ loading: false }); }, 400);
    }
    componentWillReceiveProps(nextProps, nextState) {
        this.updateStyle(nextProps.docked, nextProps.width, nextProps.height);
        this.findCustomer(nextProps.searchText);
    }
    shouldComponentUpdate = (nextProps, nextState) => {
        // console.log(this.props.displayLoading,nextProps.displayLoading);
        // if(this.props.displayLoading===false && nextProps.displayLoading=== true){
        //     return false;
        // }else{
        //     return true;
        // }
        return true;
    }
    findCustomer(searchText) {
        let rs = this.props.listCustomer.filter((cust) => {
            return cust.cust_name.indexOf(searchText) > -1;
        });
        this.setState({ showCustomer: rs, });
    }
    selectCustomer(cust) {
        this.props.selectCustomer(cust);
    }
    render() {
        let display = '';
        if (this.props.displayLoading) {
            display = <div style={{ textAlign: 'center' }}>
                <Loading />
            </div>
        } else {
            display = <div style={{ background: 'transparent url(./images/bg.png) repeat 0 0', }}>
                <SearchBar searchShowFavorite={false} />
                <div>
                    <Scrollbars style={styles.Scrollbars} >
                        <div style={styles.divList}>
                            <div style={styles.root}>
                                <MobileTearSheet>
                                    <List>
                                        {this.state.showCustomer.map((cust, index) => {
                                            return (
                                                <div key={index}>
                                                    <ListItem
                                                        leftAvatar={
                                                            <Avatar
                                                                //color={"white"}
                                                                //size={45}
                                                                //backgroundColor={"red"}
                                                                src={cust.cust_img}
                                                                size={45}
                                                                style={{ marginTop: 3 }}
                                                            />
                                                        }
                                                        //rightIconButton={rightIconMenu}
                                                        style={{ height: 65 }}
                                                        onClick={(e) => { this.selectCustomer(cust) }}
                                                    //disabled={true}
                                                    >
                                                        <div style={styles.divContent}>
                                                            <div style={styles.listItemHeader}>{cust.cust_name}</div>
                                                            <div style={styles.listItemDetail}>
                                                                &nbsp;&nbsp;&nbsp;<span style={{ color: lightBlack }}>{cust.ship_to_name}</span><br />
                                                                {/* &nbsp;&nbsp;&nbsp;<span style={{ color: lightBlack }}>{cust.ship_branch_name}</span> */}
                                                            </div>
                                                        </div>
                                                        {/* <div style={styles.divAmount}>
                                                                <div style={{ marginTop: -20 }} >
                                                                    <IconButton
                                                                        iconStyle={{
                                                                            width: 38, height: 38,
                                                                        }}
                                                                        style={{
                                                                            float: 'right', marginRight: 0, marginTop: 5,
                                                                        }}
                                                                        onClick={(e) => { this.selectCustomer(cust) }}
                                                                    >
                                                                        <AddShoppingCart
                                                                            style={{ cursor: 'pointer', fontSize: 100, }}
                                                                            color={"gray"}
                                                                            hoverColor="4DD0E1"
                                                                        //onClick={this.handleOpen}
                                                                        />
                                                                    </IconButton>
                                                                </div>
                                                            </div> */}
                                                    </ListItem>
                                                    <Divider inset={true} />
                                                </div>
                                            );
                                        })}
                                    </List>
                                </MobileTearSheet>
                            </div>
                        </div>
                    </Scrollbars>
                </div>
            </div>
        }
        return (
            <div style={styles.container}>
                <div style={styles.tabs}>
                    <AppBar
                        title="เลือกร้านที่ต้องการสั่งซื้อ"
                        titleStyle={{
                            fontSize: 16, marginTop: -10,
                        }}
                        style={{ height: "48px" }}
                        iconStyleLeft={{ display: 'none' }}
                    />
                    {display}
                </div>
            </div>
        );
    }
}

//หากมีการเรียกใช้ Props จาก Redux ให้ mapStateToProps ด้วย
function mapStateToProps(state) {
    return {
        role: state.auth.role,
        width: state.navLeftMenu.width,
        height: state.navLeftMenu.height,
        open: state.navLeftMenu.open,
        docked: state.navLeftMenu.docked,
        searchText: state.search.text,

        listCustomer: state.auth.user_data.list_customer,
        displayLoading: state.common.displayLoading,
    }
}

export default connect(mapStateToProps, actions)(withRouter(CustomerList));
