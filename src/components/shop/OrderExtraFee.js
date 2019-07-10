import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import { Card, CardHeader, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
// import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';

import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import Loading from '../Loading';

import { Scrollbars } from 'react-custom-scrollbars';

import $ from 'jquery';

const styles = {
    Scrollbars: {
        height: 0,
        overflowX: 'hidden',
    },
    divOrderDesc: {
        background: 'transparent url(./images/bg.png) repeat 0 0',
        height: '100%',
    }
}

class OrderExtraFee extends React.Component {
    state = {
        description: "",
        extraFee: {},
    }
    updateStyle(docked, width, height) {
        styles.divOrderDesc = { ...styles.divOrderDesc, height: height - 103 };
        if (docked) {
            styles.Scrollbars = { ...styles.Scrollbars, height: height - 107 }; //180
        } else {
            styles.Scrollbars = { ...styles.Scrollbars, height: height - 105 };//168
        }
    }
    componentWillReceiveProps(nextProps, nextState) {
        this.updateStyle(nextProps.docked, nextProps.width, nextProps.height);
    }
    componentWillMount() {
        this.updateStyle(this.props.docked, this.props.width, this.props.height);
        this.props.fetchExtraFee(this.props.sku.sku_group_code);
    }
    updateDescription = (description) => {
        this.props.updateOrderExtraFee('description', this.props.sku.sku_code, description, null, null, null, null);
    }
    updateExtraFee = (extraFee, type, value) => {
        if ($('#checkbox_' + extraFee.sku_code).prop('checked')) {
            let extraFeeQty = Number(this.refs[`input_${extraFee.sku_code}`].getValue());
            this.refs[`input_${extraFee.sku_code}`].focus()
            this.props.updateOrderExtraFee('addExtraFee', this.props.sku.sku_code, null, extraFee.sku_code, extraFee.sku_name, extraFeeQty, Number(extraFee.sku_price));
        } else {
            this.props.updateOrderExtraFee('removeExtraFee', this.props.sku.sku_code, null, extraFee.sku_code, null, null, null);
        }
    }
    render() {
        //console.log(this.props.getOrderExtraFee);
        if (this.props.displayLoading) {
            return (
                <div id={`loading_1`} style={{
                    ...styles.divOrderDesc,
                    paddingTop: 30,marginTop:-30,
                    background: 'transparent url(./images/bg.png) repeat 0 0', 
                    textAlign: 'center', 
                    overFlow: 'hidden',
                }}>
                    <Loading />
                </div>
            );
        }
        let description = '';
        if (this.props.getOrderExtraFee[this.props.sku.sku_code] &&
            this.props.getOrderExtraFee[this.props.sku.sku_code].description
        ) {
            description = this.props.getOrderExtraFee[this.props.sku.sku_code].description;
        }
        return (
            <div style={{
                height: '100%',
                background: 'transparent url(./images/bg.png) repeat 0 0',
            }}>
                <Scrollbars style={styles.Scrollbars} >
                    < Card id={`Card_1`}
                        style={{
                            boxShadow: 'rgba(0, 0, 0, 0) 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px',
                            background: 'transparent url(./images/bg.png) repeat 0 0',
                        }}
                        containerStyle={{ paddingBottom: 0 }}
                    >
                        <CardHeader
                            id={`CardHeader_2`}
                            title={`${this.props.sku.sku_name}`}
                            subtitle={
                                <div>
                                    {Number(this.props.sku.sku_price).toLocaleString()} บาท / {this.props.sku.sku_unit} <br />
                                    จำนวนที่สั่งซื้อ {Number(this.props.sku.order_amount).toLocaleString()} ชิ้น
                                </div>
                            }
                            avatar={
                                <Avatar
                                    src={this.props.sku.img}
                                    size={65}
                                    style={{ marginLeft: 5 }}
                                />
                            }
                            children={
                                <RaisedButton
                                    id={`RaisedButton_1`}
                                    label="Back" primary={true}
                                    //style={{fontSize:13}}
                                    onClick={() => this.props.closeExtraFee()}
                                    style={{ position: 'absolute', bottom: 10, right: 10, }}
                                />
                            }
                            textStyle={{ paddingTop: 5 }}
                        />
                        <Divider id={`Divider_1`} style={{ width: '100%', textAlign: 'center', }} />
                        {/* <CardTitle id={`CardTitle_1`} title="Option"/> */}
                        <CardText id={`CardText_1`} style={{ marginTop: -20, marginBottom: -25, }}>
                            <TextField
                                id={`Description_1`}
                                floatingLabelText="Description"
                                floatingLabelFixed={true}
                                multiLine={true}
                                rows={4}
                                onChange={(e, desc) => this.updateDescription(desc)}
                                value={description}
                                style={{ width: '100%', float: 'right', }}
                                inputStyle={{ textAlign: 'left' }}
                            />
                            <br />
                            {/*this.props.getExtraFee.map((extraFee, index) => {
                            let disabled = true;
                            if (this.props.getOrderExtraFee[this.props.sku.sku_code] &&
                                this.props.getOrderExtraFee[this.props.sku.sku_code][extraFee.sku_code] &&
                                this.props.getOrderExtraFee[this.props.sku.sku_code][extraFee.sku_code].checked == true
                            ) {
                                disabled = false;
                            }
                            let qty = '';
                            if (this.props.getOrderExtraFee[this.props.sku.sku_code] &&
                                this.props.getOrderExtraFee[this.props.sku.sku_code][extraFee.sku_code] &&
                                this.props.getOrderExtraFee[this.props.sku.sku_code][extraFee.sku_code].qty > 0
                            ) {
                                qty = this.props.getOrderExtraFee[this.props.sku.sku_code][extraFee.sku_code].qty;
                            }
                            return (
                                <div key={`div_extraFee_${extraFee.sku_code}`}>
                                    <Checkbox
                                        ref={`checkbox_${extraFee.sku_code}`}
                                        name={`checkbox_${extraFee.sku_code}`}
                                        id={`checkbox_${extraFee.sku_code}`}
                                        label={`${extraFee.sku_name} ${Number(extraFee.sku_price).toLocaleString()} บาท / ${extraFee.sku_unit}`}
                                        style={{ marginTop: 20, fontSize: 14,width:'50%', }}
                                        onCheck={(e, checked) => this.updateExtraFee(extraFee, 'check', checked)}
                                        defaultChecked={!disabled}
                                    />
                                    <TextField
                                        ref={`input_${extraFee.sku_code}`}
                                        name={`input_${extraFee.sku_code}`}
                                        id={`input_${extraFee.sku_code}`}
                                        defaultValue=""
                                        //floatingLabelText="จำนวนที่ต้องการสไลด์ชาบู (กก.)"
                                        style={{ marginTop: -5, marginBottom: 20, fontSize: 14, width: '50%', }}
                                        type={"number"}
                                        //onChange={(e)=>this.updateExtraFee(index)}
                                        onChange={(e, newValue) => this.updateExtraFee(extraFee, 'amount', newValue)}
                                        disabled={disabled}
                                        value={qty}
                                    />
                                </div>
                            );
                        })*/}
                        </CardText>
                        {/* <CardActions
                        id={`CardActions_1`}
                        style={{textAlign:'center',}}
                    >
                        <RaisedButton id={`RaisedButton_1`} label="Back" primary={true} onClick={()=>this.props.closeExtraFee()}/>
                        <RaisedButton id={`RaisedButton_2`} label="Save" primary={true} onClick={()=>this.saveExtraFee()} />
                    </CardActions> */}
                    </Card >
                </Scrollbars>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        docked: state.navLeftMenu.docked,
        width: state.navLeftMenu.width,
        height: state.navLeftMenu.height,
        displayLoading: state.common.displayLoading,

        getExtraFee: state.shop.extraFee,
        getOrderExtraFee: state.shop.orderExtraFee,
    }
}

export default connect(mapStateToProps, actions)(OrderExtraFee);