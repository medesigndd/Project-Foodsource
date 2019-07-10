import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import { withRouter } from "react-router-dom";

import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Star from 'material-ui/svg-icons/toggle/star';
import Description from 'material-ui/svg-icons/action/description';
import Paper from 'material-ui/Paper';
import {
    //lightBlack,
    grey500,
    grey800,
} from 'material-ui/styles/colors';

import Loading from '../Loading';
import SearchBar from '../SearchBar';

import * as actions from '../../actions';

const styles = {
    Scrollbars: {
        height: 0,
        overflowX: 'hidden',
    },
    loading: {
        marginTop: -30,
        height: 0,
    },
    divList: {
        position: 'relative',
        width: '100%',
        textAlign: 'center',
        zIndex: 700,
        background: 'transparent url(./images/bg.png) repeat 0 0',
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        paddingTop: '5px',
    },
    gridList: {
        width: '95%',
        height: '100%',
        paddingBottom: '10px'
    },
    Icon: {
        cursor: 'pointer',
    },
    titleStyle: {
        //color: 'rgb(0, 188, 212)',
    },
    Paper: {
        height: 190,
        width: '100%',
        textAlign: 'center',
        display: 'inline-block',
        padding: 5,
        //overFlow: 'hidden',
        paddingBottom: 40,
        backgroundColor: "white",
    },
    divShowTitle: {
        float: 'left', textAlign: 'left',
        display: 'inline', width: '75%',
        marginTop: '5px',
    },
    IconAdd: {
        position: 'absolute',
        padding: 0,
        top: 35,
        width: 35,
        background: 'linear-gradient(to left, rgba(0,0,0,1) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)',
    },
    IconRemove: {
        position: 'absolute',
        padding: 0,
        top: 35,
        width: 35,
        background: 'linear-gradient(to right, rgba(0,0,0,1) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)',
    },
    line: {
        margin: 0,
        marginTop: "0px",
        marginBottom: "0px",
        marginLeft: 0,
        height: "1px",
        border: "none",
        backgroundColor: "#E0E0E0"
    }
};

class CatalogList extends React.Component {
    state = {
        showCol: 4,
        showSKU: [],
    }
    static contextTypes = {
        router: PropTypes.object
    }
    updateStyle(docked, width, height) {
        styles.Scrollbars = { ...styles.Scrollbars, height: height - 176 };
        if (docked) {
            styles.tabs = { ...styles.tabs, 'paddingLeft': 0, width: width - 255 };
            styles.loading = { ...styles.loading, height: height - 176 + 72 };
        } else {
            styles.tabs = { ...styles.tabs, 'paddingLeft': 0, width: '100%' };
            styles.loading = { ...styles.loading, height: height - 176 + 72 };
        }
    }
    updateState(width) {
        //this.divShowTitle = { ...this.divShowTitle, width: '80%' };
        if (width <= this.props.widthCol_1) {
            this.setState({ showCol: 1 });
        } else if (width > this.props.widthCol_1 && width <= this.props.widthCol_2) {
            this.setState({ showCol: 2 });
        } else if (width > this.props.widthCol_2 && width <= this.props.widthCol_3) {
            this.setState({ showCol: 3 });
        } else if (width > this.props.widthCol_3 && width <= this.props.widthCol_4) {
            this.setState({ showCol: 4 });
        } else if (width > this.props.widthCol_4) {
            this.setState({ showCol: 5 });
        }
    }
    componentWillMount() {
        this.props.updateSearchText("");
        this.props.fetchSKU(this.props.defaultCustomer.cust_code);
        this.updateState(this.props.width);
        this.updateStyle(this.props.docked, this.props.width, this.props.height);
        this.props.updateSearchFavorite(this.props.favorite);
        //this.props.updateShowOrder(this.props.allSKU);
    }
    componentDidMount() {
        //setTimeout(() => { this.setState({ loading: false }); }, 500);
    }
    componentWillReceiveProps = (nextProps) => {
        this.updateStyle(nextProps.docked, nextProps.width, nextProps.height);
        this.updateState(nextProps.width);
        //this.setState({ showSKU: this.props.allSKU });
        this.findOrders(nextProps.favorite, nextProps.searchText, nextProps.allSKU);
    }
    changeFavorite = (sku) => {
        this.props.changeFavorite(sku.id, sku.sku_code, this.props.defaultCustomer.cust_code, sku.favorite);
        //this.findOrders(this.props.searchFavorite, this.props.searchText);
        this.findOrders(this.props.favorite, this.props.searchText, this.props.allSKU);
    }
    componentWillUnmount() {
        this.props.handleTransitionEnd();
    }
    findOrders(favorite, searchText, allSKU) {
        //let rsFavorite = this.props.allSKU.filter((sku) => {return Number(sku.favorite) === 1});
        let rs = allSKU.filter((sku) => {
            if (Number(favorite) === 1) {
                return Number(sku.favorite) === 1;
            } else {
                return Number(sku.favorite) === 0;
            }
        });
        let rs2 = rs.filter((sku) => {
            return sku.sku_name.indexOf(searchText) > -1;
        });
        this.setState({ showSKU: rs2 });
    }
    selectOrder = (sku) => {
        this.props.addToOrder(sku);
    }

    showItemDetail = (sku) => {
        this.props.showItemDetail(sku);
        //this.context.router.push('/itemDetail');
        this.props.history.push("/itemDetail");
    }

    render() {
        if (this.props.displayLoading) {
            return (
                <div style={{ paddingTop: 30, textAlign: 'center', background: 'transparent url(./images/bg.png) repeat 0 0', }}>
                    <div style={styles.divList}>
                        <div style={styles.loading}>
                            <Loading />
                        </div>
                    </div>
                </div>
            );
        }
        let i = 0;
        return (
            <div style={{ background: 'transparent url(./images/bg.png) repeat 0 0', }}>
                <SearchBar searchShowFavorite={false} />
                <div>
                    <Scrollbars style={styles.Scrollbars} >
                        <div style={styles.divList}>
                            <div style={styles.root}>
                                <GridList
                                    cellHeight={190}
                                    style={styles.gridList}
                                    cols={this.state.showCol}
                                >
                                    {this.state.showSKU.map((sku, index) => {
                                        let key = sku.img + (i++);
                                        let checkInvoice = this.props.allOrder.findIndex((rs) => { return rs.id === sku.id });
                                        //let invoiceData = this.props.allOrder.find((rs) => { return rs.id === sku.id });
                                        let paperBackground = '';
                                        let iconChangeAmount = '';
                                        if (checkInvoice > -1) {
                                            paperBackground = '#80DEEA';
                                        } else {
                                            paperBackground = 'white';
                                        }
                                        iconChangeAmount =
                                            <div>
                                                <IconButton
                                                    style={{
                                                        position: 'absolute', padding: 0,
                                                        top: 0, width: 25, height: 30, right: 0,
                                                        background: 'black',
                                                    }}
                                                    tooltip="Display detail"
                                                >
                                                    <Description
                                                        color="#4DD0E1" hoverColor="gold"
                                                        style={{
                                                            cursor: 'pointer', fontSize: 5,
                                                        }}
                                                        onClick={() => { this.showItemDetail(sku) }}
                                                    //onClick={() => { this.handleOpen(sku) }}
                                                    />
                                                </IconButton>
                                            </div>;
                                        let star = null;
                                        if (Number(sku.favorite)) star = <Star color={"gold"} style={styles.Icon} />
                                        else star = <StarBorder color={"black"} style={styles.Icon} />

                                        return (
                                            <Paper
                                                key={key}
                                                zDepth={1}
                                                style={{
                                                    ...styles.Paper,
                                                    backgroundColor: paperBackground,
                                                    position: 'relative',
                                                }}
                                            >
                                                <GridTile
                                                    titleStyle={styles.titleStyle}
                                                    style={{ cursor: 'pointer', position: 'relative', }}
                                                    onClick={(e) => { this.selectOrder(sku) }}
                                                >
                                                    <img src={sku.img} alt={""} />
                                                </GridTile>
                                                <hr style={styles.line} />
                                                <div style={{ marginTop: '-1px' }} >
                                                    <div style={styles.divShowTitle} >
                                                        <div style={{
                                                            position: 'absolute',
                                                            top: 155, width: '95%',
                                                            fontSize: 10, color: grey800,

                                                            whiteSpace: 'nowrap', overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                        }}
                                                        >
                                                            <strong>{sku.sku_name}</strong>
                                                        </div>
                                                        <div style={{
                                                            position: 'absolute',
                                                            top: 170,
                                                            fontSize: 10, color: grey500,
                                                            marginLeft: 5, marginTop: 0,

                                                            //whiteSpace: 'nowrap', overflow: 'hidden',
                                                            //textOverflow: 'ellipsis',
                                                        }}
                                                        >
                                                            {Number(sku.sku_price).toLocaleString()} บาท / {sku.sku_unit}
                                                        </div>
                                                        {/* <div style={{
                                                            fontSize: '10px', color: 'black',
                                                            whiteSpace: 'nowrap', overflow: 'hidden',
                                                            textOverflow: 'ellipsis', marginTop: '-2px',
                                                            marginLeft: 5,
                                                        }}
                                                        >
                                                            {sku.min_weight} - {sku.max_weight} {sku.sku_unit}
                                                        </div> */}
                                                    </div>
                                                    <div
                                                        style={{
                                                            position: 'absolute',
                                                            bottom: -10, right: -10,
                                                            display: 'inline',
                                                        }}
                                                    >
                                                        <IconButton
                                                            style={{
                                                                padding: 0,
                                                                //width: 25,
                                                                //marginRight: 13, marginTop: -3
                                                            }}
                                                            onClick={() => { this.changeFavorite(sku) }}
                                                        >{/* style={{ padding: 0, width: 25 }} */}
                                                            {star}
                                                        </IconButton>
                                                        {/* <Link to={'/shop/itemdetail/' + sku.id} >
                                                            <IconButton
                                                                style={{ padding: 0, width: 25, marginRight: 10 }}
                                                            >
                                                                <Description
                                                                    color="black"
                                                                    style={styles.Icon}
                                                                    onClick={() => { this.handleOpen(sku) }}
                                                                />
                                                            </IconButton>
                                                        </Link> */}
                                                    </div>
                                                </div>
                                                {iconChangeAmount}
                                            </Paper>
                                        );
                                    })}
                                </GridList>
                            </div>
                        </div>
                    </Scrollbars>
                </div>
            </div>
        );
    }
}

CatalogList.defaultProps = {
    widthCol_1: 300,
    widthCol_2: 600,
    widthCol_3: 1000,
    widthCol_4: 1300,
};

function mapStateToProps(state) {
    return {
        width: state.navLeftMenu.width,
        height: state.navLeftMenu.height,
        searchText: state.search.text,
        searchFavorite: state.search.favorite,
        allSKU: state.shop.allSKU,
        allOrder: state.shop.allOrder,
        docked: state.navLeftMenu.docked,
        displayLoading: state.common.displayLoading,

        defaultCustomer: state.auth.user_data.default_customer,
    }
}

export default connect(mapStateToProps, actions)(withRouter(CatalogList));
