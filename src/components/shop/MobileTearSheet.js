import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
class MobileTearSheet extends Component {

    static propTypes = {
        children: PropTypes.node,
        height: PropTypes.number.isRequired,
    };
    static defaultProps = {
        height: 500,
    };
    static contextTypes = {
        muiTheme: PropTypes.object.isRequired,
    };

    render() {
        const { prepareStyles, } = this.context.muiTheme;

        const styles = {
            root: {
                //marginBottom: 24,
                marginRight: 24,
                //maxWidth: 360,
                width: '100%',
            },
            container: {
                border: 'solid 1px #d9d9d9',
                borderBottom: 'none',
                borderTop: 'none',
                borderRight: 'none',
                borderLeft: 'none',
                //height: this.props.height,
                overflow: 'hidden',
                width: '98%',
                marginLeft: '1%'
            },
            bottomTear: {
                display: 'block',
                position: 'relative',
                marginTop: -10,
                //maxWidth: 360,
                width: '80%',
            },
        };

        return (
            <div style={{ textAlign: 'center', }}>
                <div style={prepareStyles(styles.root)}>
                    <div style={prepareStyles(styles.container)}>
                        {this.props.children}
                    </div>
                    {/*<img style={prepareStyles(styles.bottomTear)} src="../images/bottom-tear.svg" />*/}
                </div>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        invoiceOrder: state.shop.invoiceOrder,
        width: state.navLeftMenu.width,
    }
}

export default connect(mapStateToProps)(MobileTearSheet);
