import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import $ from 'jquery';
import Loading from '../Loading';
import Divider from 'material-ui/Divider';
import { grey400, } from 'material-ui/styles/colors';
import { Scrollbars } from 'react-custom-scrollbars';
import AppBar from 'material-ui/AppBar';


const ReactHighcharts = require('react-highcharts'); // Expects that Highcharts was loaded in the code.

let config = {
    credits: {
        enabled: false
    },
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: null,
        style: {
            display: 'none'
        }
    },
    subtitle: {
        text: null,
        style: {
            display: 'none'
        }
    },
    tooltip: {
        // pointFormat: 'คิดเป็น : <b>{point.percentage:.1f}%</b><br/>จำนวนเงิน : <b>{point.y} บาท</b>'        
        formatter: function () {
            return '<b>' + this.key + '</b><br/>' +
                'คิดเป็น : <b> ' + Math.round(this.percentage) + '%</b><br/>' +
                'จำนวนเงิน : <b>' + Number(this.y).toLocaleString() + ' บาท</b>';
        }
    },
    plotOptions: {
        pie: {
            size: '85%',
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                distance: -50,
                enabled: true,
                //format: '<div style="font-size:9">{point.name}</div><br/>{point.percentage:.1f}%',                
                formatter: function () {
                    if (this.percentage !== 0) return Math.round(this.percentage) + '%';
                },
                style: {
                    color: 'black',
                    fontWeight: 200,
                    fontSize: 7,
                },
                connectorColor: 'silver',
            },
            showInLegend: true
        }
    },
    series: [{
        name: 'คิดเป็น',
        data: [
            { name: 'A4 Ribeye', y: 121452 },
            {
                name: 'A4 Striploin',
                y: 269048,
                // sliced: true,
                // selected: true
            },
            { name: 'A5 Ribeye', y: 75760 },
            { name: 'A5 Striploin', y: 82928 },
        ]
    }],

};

const styles = {
    container: {
        position: 'relative',//relative,absolute
        top: '56px',
        width: '100%',
        //background: 'transparent url(./images/bg.png) repeat 0 0',
    },
    tabs: {
        position: 'fixed',
        width: '100%',
        zIndex: 900,
    },
    Scrollbars: {
        height: 0,
    },
};

class SalesBySeller extends React.Component {

    componentWillReceiveProps(nextProps, nextState) {
        this.updateStyle(nextProps.docked, nextProps.width, nextProps.height, nextProps.salesBySeller);
    }

    componentWillMount() {
        this.updateStyle(this.props.docked, this.props.width, this.props.height, this.props.salesBySeller);
        this.props.fetchSalesBySeller();
    }

    updateStyle(docked, width, height, data) {
        config = { ...config, series: [{ name: config.series.name, data }] };
        styles.Scrollbars = { ...styles.Scrollbars, height: height - 140 };
    }

    search = () => {
        this.props.fetchSalesBySeller($("#startDate").val(), $("#endDate").val());
    }

    render() {
        let display = <div></div>;
        if (this.props.displayLoading) {
            display = <div style={styles.container}>
                <div style={styles.tabs}>
                    <div align="center">
                        <Loading />
                    </div>
                </div>
            </div>
        } else {
            display = <div>{/* style={{ background: 'transparent url(./images/bg.png) repeat 0 0', }} */}
                <ReactHighcharts config={config}></ReactHighcharts>
            </div>
        }
        return (
            <div style={styles.container}>
                <div align="center" style={{ position: 'fixed', width: '100%', zIndex: 2, backgroundColor: 'white', }}>
                    <AppBar
                        title="ยอดขายตามเซลล์"
                        titleStyle={{
                            fontSize: 16, marginTop: -10,
                        }}
                        style={{ height: "48px", textAlign: 'left', }}
                        iconStyleLeft={{ display: 'none' }}
                    />
                    <DatePicker
                        id={`startDate`}
                        floatingLabelText="วันที่เริ่ม"
                        floatingLabelFixed={true}
                        style={{ marginLeft: 10, float: 'left' }}
                        textFieldStyle={{ width: 100, }}
                    //hintText="วันที่ต้องการสินค้า"
                    //onChange={(e, date) => this.updateDeliveryDate(e, date)}
                    />
                    <div style={{ float: 'left', marginTop: 40, bottom: 0 }}>-</div>
                    <DatePicker
                        id={`endDate`}
                        floatingLabelText="วันที่สิ้นสุด"
                        floatingLabelFixed={true}
                        style={{ marginLeft: 10, float: 'left' }}
                        textFieldStyle={{ width: 100, }}
                    //hintText="วันที่ต้องการสินค้า"
                    //onChange={(e, date) => this.updateDeliveryDate(e, date)}
                    />
                    <RaisedButton
                        id={`RaisedButton`}
                        label="ค้นหา" primary={true}
                        style={{ marginLeft: 20, float: 'left', marginTop: 25, }}
                        onClick={() => { this.search() }}
                    />
                    <Divider style={{ width: '100%', backgroundColor: grey400, height: 2, }} />
                </div>
                <div style={{ paddingTop: 105, zIndex: 1, }}>
                    <Scrollbars style={styles.Scrollbars} >
                        {display}
                    </Scrollbars>
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
        searchText: state.search.text,
        displayLoading: state.common.displayLoading,
        salesBySeller: state.analytic.salesBySeller,
    }
}

export default connect(mapStateToProps, actions)(SalesBySeller);