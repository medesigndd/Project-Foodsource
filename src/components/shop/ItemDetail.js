import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import { withRouter } from "react-router-dom";

import { Card, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
// import Star from 'material-ui/svg-icons/toggle/star';
// import StarBorder from 'material-ui/svg-icons/toggle/star-border';

import Loading from '../Loading';
import * as actions from '../../actions';

const styles = {
    container: {
        position: 'absolute',
        top: '56px',
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
        //textAlign: 'center',
        zIndex: 700,
        // paddingLeft: '25%',
        overflowX: 'hidden',
        //top: '30px'
    },
    div: {
        position: 'relative',//relative,absolute
        width: '100%',
        textAlign: 'center',
        zIndex: 600,
    },
    labelColor: {
        color: 'white'
    }
};

class ItemDetail extends React.Component {
    static contextTypes = {
        router: PropTypes.object
    }
    state = {
        loading: true,
    }
    updateStyle(docked, width, height) {
        if (docked) {
            styles.tabs = { ...styles.tabs, 'paddingLeft': 0, width: width - 255 };
            styles.Scrollbars = { ...styles.Scrollbars, height: height - 100 };

        } else {
            styles.tabs = { ...styles.tabs, 'paddingLeft': 0, width: '100%' };
            styles.Scrollbars = { ...styles.Scrollbars, height: height - 100 };
        }
    }
    componentWillMount() {
        setTimeout(() => { this.setState({ loading: false }); }, 500);
        if (this.props.itemDetail.id == null) {
            // this.context.router.push('/catalog');
            this.props.history.push("/catalog");
        }
        this.updateStyle(this.props.docked, this.props.width, this.props.height);
    }

    componentDidMount() {
        this.props.notShowCartBalance();
    }
    componentWillReceiveProps(nextProps, nextState) {
        this.updateStyle(nextProps.docked, nextProps.width, nextProps.height);
    }
    changeFavorite = (id, sku_code, favorite) => {
        this.props.changeFavorite(id, sku_code, favorite);
    }

    render() {
        if (this.state.loading) {
            return (
                <div style={styles.container}>
                    <div style={styles.tabs}>
                        <AppBar
                            title={`รายละเอียดสินค้า`}
                            titleStyle={{
                                fontSize: 16, marginTop: -10,
                            }}
                            style={{ height: "48px" }}
                            iconStyleLeft={{ display: 'none' }}
                        />
                        <div style={{ textAlign: 'center' }}>
                            <Loading />
                        </div>
                    </div>
                </div>
            );
        }
        // if (this.props.itemDetail.favorite === true) {
        //     let star = <Star color={"gold"} style={styles.Icon} />
        // } else {
        //     let star = <StarBorder color="black" style={styles.Icon} />
        // }
        return (
            <div style={styles.container}>
                <div style={styles.tabs}>
                    <AppBar
                        title={`รายละเอียดสินค้า`}
                        titleStyle={{
                            fontSize: 16, marginTop: -10,
                        }}
                        style={{ height: "48px" }}
                        iconStyleLeft={{ display: 'none' }}
                    />
                    <Scrollbars style={styles.Scrollbars} >
                        <div name="div_1" style={styles.divList}>
                            <Card name={"Card_1"} style={{ position: 'relative', boxShadow: 'none' }}>
                                <Link to={'/catalog'} >
                                    <RaisedButton
                                        id={`RaisedButton_1`}
                                        label="Back" primary={true}
                                        style={{ marginBottom: 20, position: 'absolute', top: 10, right: 10, cursor: 'pointer', }}
                                    />
                                </Link>
                                <CardMedia name="CardMedia_1" style={{ textAlign: 'center', }}
                                    overlay={
                                        <CardTitle
                                            title={this.props.itemDetail.sku_name}
                                            subtitle={
                                                `${(this.props.itemDetail.sku_price * 1).toLocaleString()} บาท / 
                                                        ${this.props.itemDetail.sku_unit}`}
                                        />
                                    }
                                >
                                    <img
                                        src={this.props.itemDetail.img_original}
                                        style={{
                                            minWidth: '0px', width: 'none',
                                            maxWidth: '350px', maxHeight: '300px',
                                            paddingBottom: 50,
                                        }}
                                        alt=""
                                    />
                                    <div
                                        style={{
                                            textAlign: 'right', marginRight: '-10px',
                                        }}
                                    >
                                        {/* <IconButton
                                            style={{ padding: 0, width: 25, marginRight: 25 }}
                                            onClick={() => { this.changeFavorite(this.props.itemDetail.id, this.props.itemDetail.sku_code, this.props.itemDetail.favorite) }}
                                        >
                                            {star}
                                        </IconButton> */}
                                    </div>
                                </CardMedia>
                                <CardTitle title="Description" />
                                <CardText>
                                    &nbsp;&nbsp;&nbsp;&nbsp;{this.props.itemDetail.description}
                                </CardText>
                            </Card>
                        </div>
                    </Scrollbars>
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

        itemDetail: state.shop.showItemDetail,
    }
}

export default connect(mapStateToProps, actions)(withRouter(ItemDetail));
