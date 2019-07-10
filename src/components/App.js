import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppBar from './AppBar';

const styles = {
    content: {
        'minHeight': '400px',
        'paddingLeft': '0px',
        position: 'static'
    }
}; 

class App extends Component {
    componentWillUpdate(nextProps) {
        if (nextProps.docked) {
            styles.content = { ...styles.content, 'paddingLeft': '256px' }
        } else {
            styles.content = { ...styles.content, 'paddingLeft': '0px' }
        }
    }
    render() {
        return (
            <div style={styles.content}>
                <div>
                    <AppBar />
                </div>
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        docked: state.navLeftMenu.docked
    }
}

export default connect(mapStateToProps)(App);