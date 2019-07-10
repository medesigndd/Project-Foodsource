import { connect } from 'react-redux';
import { grey400, } from 'material-ui/styles/colors';
import { Scrollbars } from 'react-custom-scrollbars';
import $ from 'jquery';
import AppBar from 'material-ui/AppBar';
import DatePicker from 'material-ui/DatePicker';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';

import * as actions from '../../actions';
import Loading from '../Loading';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

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

class SalesByCustomer extends React.Component {
    state = {
        selected: [0],
        showCheckboxes: false,
    };

    isSelected = (index) => {
        return this.state.selected.indexOf(index) !== -1;
    };

    handleRowSelection = (selectedRows) => {
        this.setState({
            selected: selectedRows,
        });
    };

    componentWillReceiveProps(nextProps, nextState) {
        this.updateStyle(nextProps.docked, nextProps.width, nextProps.height, nextProps.salesByCustomer);
    }

    componentWillMount() {
        this.updateStyle(this.props.docked, this.props.width, this.props.height, this.props.salesByCustomer);
        this.props.fetchSalesByCustomer();
    }

    updateStyle(docked, width, height, data) {
        // config = { ...config, series: [{ name: config.series.name, data }] };
        styles.Scrollbars = { ...styles.Scrollbars, height: height - 135 };
    }

    search = () => {
        this.props.fetchSalesByCustomer($("#startDate").val(), $("#endDate").val());
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
            display = <div style={{ float: 'left', marginTop: 10, bottom: 0, }}>{/* style={{ background: 'transparent url(./images/bg.png) repeat 0 0', }} */}
                <Table
                    onRowSelection={this.handleRowSelection}
                >
                    <TableHeader
                        displaySelectAll={this.state.showCheckboxes}
                        adjustForCheckbox={this.state.showCheckboxes}
                    >
                        <TableRow>
                            <TableHeaderColumn style={{ width: '100px', padding: '0px 0px 0px 10px', }}>Name</TableHeaderColumn>
                            <TableHeaderColumn style={{ width: '100px', padding: 0, }}>Ship to</TableHeaderColumn>
                            <TableHeaderColumn style={{ width: '50px', padding: '0px 10px 0px 0px', textAlign: 'right', }}>Total amount</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={this.state.showCheckboxes}
                    >
                        {
                            this.props.salesByCustomer.map((item, index) => {
                                return (
                                    <TableRow key={index} selected={this.isSelected(index)}>
                                        <TableRowColumn style={{ width: '100px', padding: '0px 0px 0px 10px', fontSize: '10px', }}>{item.cust_name}</TableRowColumn>
                                        <TableRowColumn style={{ width: '100px', padding: 0, fontSize: '10px', }}>{item.ship_to_name}</TableRowColumn>
                                        <TableRowColumn style={{ width: '50px', padding: '0px 10px 0px 0px', textAlign: 'right', fontSize: '10px', }}>{Number(item.total_amount).toLocaleString()}</TableRowColumn>
                                    </TableRow>
                                );
                            })
                        }
                    </TableBody>
                </Table>
            </div>
        }
        return (
            <div style={styles.container}>
                <div style={styles.tabs}>
                    <AppBar
                        title="ยอดขายตามลูกค้า"
                        titleStyle={{
                            fontSize: 16, marginTop: -10,
                        }}
                        style={{ height: "48px" }}
                        iconStyleLeft={{ display: 'none' }}
                    />
                    <div>
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
                        <Divider style={{ width: '100%', backgroundColor: grey400, height: 2, textAlign: 'center', }} />
                    </div>
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
        salesByCustomer: state.analytic.salesByCustomer,
    }
}

export default connect(mapStateToProps, actions)(SalesByCustomer);