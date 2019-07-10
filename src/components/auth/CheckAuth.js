import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import * as actions from '../../actions';


export default function (ComposedComponent) {
    class Authentication extends Component {
        static contextTypes = {
            router: PropTypes.object
        }
        componentWillMount() {
            this.props.checkAuth(this.props.history.push);
            if (!this.props.authenticated) {
                // this.context.router.push('/signin');
                this.props.history.push("/signin");
            } else {
            }
        }
        componentWillUpdate(nextProps) {
            if (!nextProps.authenticated) {
                //this.context.router.push('/signin');
                this.props.history.push("/signin");
            } else {
            }
        }
        render() {
            return <ComposedComponent {...this.props} />;
        }
    }

    // Authentication.propTypes = {
    //     history: PropTypes.shape({
    //         push: PropTypes.func.isRequired,
    //     }).isRequired,
    // };

    return connect(state => ({ authenticated: state.auth.authenticated }), actions)(withRouter(Authentication));
}