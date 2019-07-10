import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Scrollbars } from 'react-custom-scrollbars';
import Loading from '../Loading';
import $ from 'jquery';

import { Card, CardHeader, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import DatePicker from 'material-ui/DatePicker';
import { grey600, } from 'material-ui/styles/colors';

import confirm from '../../util/confirm';
import FileInputComponent from 'react-file-input-previews-base64'

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

class OrderDescription extends React.Component {
    constructor() {
        super();
        this.state = {
            pictures: {}
        };
    }
    onChange = (pictures) => this.setState({ pictures });
    updateStyle(docked, width, height) {
        styles.divOrderDesc = { ...styles.divOrderDesc, height: height - 103 };
        if (docked) {
            styles.Scrollbars = { ...styles.Scrollbars, height: height - 147 }; //180
        } else {
            styles.Scrollbars = { ...styles.Scrollbars, height: height - 145 };//168
        }
    }
    componentWillReceiveProps(nextProps, nextState) {
        this.updateStyle(nextProps.docked, nextProps.width, nextProps.height);
        if (nextProps.confirmOrderSuccess === true && nextProps.displayLoading === false) {
            alert("Ordered successfully : " + nextProps.orderNumberSuccess);
        }
    }
    componentWillMount() {
        this.updateStyle(this.props.docked, this.props.width, this.props.height);
        this.props.fetchExtraFee('');
    }
    updateDescription = (e, desc) => {
        this.props.updateOrderDescription(desc);
    }
    updateDeliveryDate = (e, date) => {
        var tzoffset = (new Date()).getTimezoneOffset() * 60000;
        var today = new Date(date - tzoffset).toISOString().slice(0, 10);
        this.props.updateOrderDeliveryDate(today);
    }
    updateCustomerPONumber = (e, customer_po_number) => {
        this.props.updateCustomerPONumber(customer_po_number);
    }
    confirmOrder = () => {
        if (this.props.deliveryDate === "") {
            alert('กรุณาระบุวันที่ต้องการสินค้า');
            return false;
        }
        confirm('Confirm Order.').then(
            (result) => {
                // `proceed` callback
                //this.props.closeDescription();
                this.props.confirmOrder(
                    this.props.defaultCustomer.cust_code,
                    this.props.description,
                    this.props.deliveryDate,
                    this.props.customerPONumber,
                    this.props.customerPOIMG,
                    this.props.allOrder,
                    this.props.getOrderExtraFee,
                );
            },
            (result) => {
                // `cancel` callback
            }
        )
    }
    readURL(e) {
        // let img = document.getElementById('imgShow');
        // img.style.display = "block";
        $('#imgShow').css('display', 'block');
        let input = e.target;
        if (input.files && input.files[0]) {
            this.props.updateCustomerPOIMG(input.files[0])
            // var val = input.files[0].name.toLowerCase();
            // var regex = new RegExp("(.*?)\.(jpg|jpeg|png)$");
            // if(!(regex.test(val))) {
            //     alert("ต้องเป็นนามสกุล jpg,jpeg,png เท่านั้น");
            //     $('.input01').filestyle('clear');
            //     $('#imgShow').attr('src',"images/member/"+$('#old_image_delete').val());
            //     return;
            // }
            let base64Image;
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#imgShow').attr('src', e.target.result);
                base64Image = e.target.result;
                this.props.updateCustomerPOIMG(base64Image);

                //console.log(base64Image);
            }.bind(this);
            reader.readAsDataURL(input.files[0]);
        }
    }
    clearImg(e) {
        this.props.updateCustomerPOIMG('');
        $('#imgShow').attr('src', '');
        $("#take_photo").val("");
    }
    updatePOIMG = (data) => {
        var image = new Image();
        image.onload = (e) => {
            var canvas = document.createElement("canvas");
            var ctx = canvas.getContext("2d");
            canvas.width = 1024; // target width
            canvas.height = canvas.width * (image.height / image.width);
            ctx.drawImage(image,
                0, 0, image.width, image.height,
                0, 0, canvas.width, canvas.height
            );
            // create a new base64 encoding
            // var resampledImage = new Image();
            // resampledImage.src = canvas.toDataURL();
            //console.log(canvas.toDataURL());
            //document.getElementById("resampled").appendChild(resampledImage);
            this.props.updateCustomerPOIMG(canvas.toDataURL());
        };
        image.src = data[0].base64;
    }
    render() {
        //console.log(this.props.customerPOIMG);
        if (this.props.customerPOIMG) {
            // // $('#imgShow').css('display','block');
            // $("#take_photo").files = this.props.customerPOIMG;
            // var reader = new FileReader();
            // reader.onload = function (e) {
            //     $('#imgShow').attr('src', e.target.result);
            // }
            // reader.readAsDataURL(this.props.customerPOIMG);
        }
        let datePicker = null;
        if (this.props.deliveryDate !== '') {
            datePicker = <DatePicker
                id={`DatePicker`}
                floatingLabelText="วันที่ต้องการสินค้า"
                floatingLabelFixed={true}
                //hintText="วันที่ต้องการสินค้า"
                onChange={(e, date) => this.updateDeliveryDate(e, date)}
                defaultDate={new Date(this.props.deliveryDate)}
            />
        } else {
            datePicker = <DatePicker
                id={`DatePicker`}
                floatingLabelText="วันที่ต้องการสินค้า"
                floatingLabelFixed={true}
                //hintText="วันที่ต้องการสินค้า"
                onChange={(e, date) => this.updateDeliveryDate(e, date)}
            />
        }
        if (this.props.displayLoading) {
            return (
                <div id={`loading_1`} style={{
                    ...styles.divOrderDesc,
                    paddingTop: 30, marginTop: -30,
                    background: 'transparent url(./images/bg.png) repeat 0 0',
                    textAlign: 'center',
                    overFlow: 'hidden',
                }}>
                    <Loading />
                </div>
            );
        }

        return (
            <div style={styles.divOrderDesc}>
                <div>
                    <Scrollbars style={styles.Scrollbars} >
                        <Card id={`Card`}
                            style={{
                                boxShadow: 'rgba(0, 0, 0, 0) 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px',
                                background: 'transparent url(./images/bg.png) repeat 0 0',
                            }}
                            containerStyle={{ paddingBottom: 0 }}
                        >
                            <CardHeader
                                id={`CardHeader`}
                                title={
                                    <div style={{ color: grey600, fontSize: 14, }}>
                                        {`จำนวนสินค้าที่สั่งซื้อ ${this.props.allOrder.length} รายการ`}
                                    </div>
                                }
                                children={
                                    <RaisedButton
                                        id={`RaisedButton`}
                                        label="Back" primary={true}
                                        onClick={() => this.props.closeDescription()}
                                        style={{ position: 'absolute', top: 22, right: 10, }}
                                    />
                                }
                                textStyle={{ paddingTop: 15, height: 35, }}
                            />
                            <Divider id={`Divider`} style={{ width: '100%', textAlign: 'center', }} />
                            <CardText id={`CardText`} style={{ marginBottom: -25, }}>
                                {datePicker}
                                <TextField
                                    id={`CustomerPONumber`}
                                    floatingLabelText="PO ลูกค้า"
                                    floatingLabelFixed={true}
                                    onChange={(e, customer_po_number) => this.updateCustomerPONumber(e, customer_po_number)}
                                    value={this.props.customerPONumber}
                                    style={{ width: '100%', float: 'right', }}
                                    inputStyle={{ textAlign: 'left' }}
                                />
                                {/* <img id="imgShow" src="" alt="" height="" width="345" className="img-responsive" />
                                <RaisedButton
                                    containerElement='label' // <-- Just add me!
                                    label='Take Photo PO'
                                    onChange={(e) => this.readURL(e)}
                                    style={{ marginTop: 5, }}
                                >
                                    <input
                                        type="file"
                                        id="take_photo"
                                        name="take_photo"
                                        className="input01"
                                        accept="images/*"
                                        style={{
                                            //display: 'none',
                                        }}
                                        capture
                                    />
                                </RaisedButton>
                                <RaisedButton
                                    containerElement='label' // <-- Just add me!
                                    label='Clear Photo PO'
                                    onClick={(e) => this.clearImg(e)}
                                    style={{ marginLeft: 20, marginTop: 5, }}
                                >
                                </RaisedButton> */}
                                <RaisedButton
                                    containerElement='label' // <-- Just add me!
                                    label='Take Photo PO'
                                    labelStyle={{
                                        marginTop: -14,
                                        display: 'block',
                                    }}
                                    //onChange={(e) => this.readURL(e)}
                                    style={{ marginTop: 5, paddingBottom: 8, paddingTop: 8, }}
                                >
                                    <FileInputComponent
                                        labelText=""
                                        labelStyle={{ fontSize: 14, display: 'block', }}
                                        buttonComponent={
                                            <button type="button" style={{ display: 'none', }}></button>
                                        }
                                        textFieldComponent={
                                            <input type="text" style={{ display: 'none', }} />
                                        }
                                        multiple={true}
                                        callbackFunction={(file_arr) => { this.updatePOIMG(file_arr); }}
                                        accept="image/*"
                                        imageStyle={{
                                            marginBottom: 15, marginRight: 10, marginLeft: 10,
                                            width: "auto", height: "90vmin",
                                            boxShadow: "rgba(0, 0, 0, 0.188235) 0px 10px 30px, rgba(0, 0, 0, 0.227451) 0px 6px 10px"
                                        }}
                                    />
                                </RaisedButton>
                                <TextField
                                    id={`Description`}
                                    floatingLabelText="รายละเอียดเพิ่มเติม"
                                    floatingLabelFixed={true}
                                    multiLine={true}
                                    rows={4}
                                    onChange={(e, desc) => this.updateDescription(e, desc)}
                                    value={this.props.description}
                                    style={{ width: '100%', float: 'right', }}
                                    inputStyle={{ textAlign: 'left' }}
                                />
                                {/* <p>Original (48x48)</p>
                                <div id="original"></div>
                                <p>Resampled (32x32)</p>
                                <div id="resampled"></div> */}
                            </CardText>
                        </Card >
                    </Scrollbars>
                </div>
                <div
                    style={{
                        positiion: 'fixed',
                        bottom: -200, zIndex: 900,
                        paddingTop: 3,
                        textAlign: 'center',
                    }}
                >
                    <RaisedButton
                        label="ยืนยันการสั่งซื้อ"
                        style={{ width: '99%' }}
                        primary={true}
                        labelStyle={{ fontSize: '17px', color: 'white' }}
                        onClick={() => this.confirmOrder()}
                    />
                </div>
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

        allOrder: state.shop.allOrder,
        getOrderExtraFee: state.shop.orderExtraFee,
        defaultCustomer: state.auth.user_data.default_customer,
        deliveryDate: state.shop.orderDeliveryDate,
        customerPONumber: state.shop.orderCustomerPONumber,
        customerPOIMG: state.shop.orderCustomerPOIMG,
        description: state.shop.orderDescription,
        confirmOrderSuccess: state.shop.confirmOrderSuccess,
        orderNumberSuccess: state.shop.orderNumberSuccess,
    }
}

export default connect(mapStateToProps, actions)(OrderDescription);