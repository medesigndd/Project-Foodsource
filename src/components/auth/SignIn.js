import React from 'react';
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux';
import * as actions from '../../actions';
import RaisedButton from 'material-ui/RaisedButton';
import Error from 'material-ui/svg-icons/alert/error';
import { withRouter } from "react-router-dom";
const styles = {
    box: {
        // width: '500px',
        //border: '3px solid #9E9E9E',
        borderRadius: '5px',
        margin: '0',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
    btn: {
        margin: 12,
    },
    txtUsername: {
        height: '35px',
        width: '300px',
        // width: '10rem',
        borderRadius: '5px 5px 0 0',
        paddingLeft: '5px',
        fontSize: '16px',
        color: '#494949',
        border: '1px solid #9E9E9E'
    },
    txtPassword: {
        height: '35px',
        width: '301px',
        // width: '10rem',
        borderRadius: ' 0 0 5px 5px',
        paddingLeft: '4px',
        marginTop: '-1px',
        fontSize: '16px',
        color: '#494949',
        border: '1px solid #9E9E9E'
    },
    heading: {
        // height: '35px',
        textAlign: 'center'
    },
    errorMsgInput: {
        backgroundColor: '#f2dede',
        borderColor: '#ebcccc',
        color: '#a94442',
        padding: '0.50rem 1.0rem',
        marginLeft: '0.6rem',
        marginBottom: '1rem',
        border: '1px solid transparent',
    },
    errorMsg: {
        marginTop: 0,
        backgroundColor: '#f2dede',
        borderColor: '#ebcccc',
        color: '#a94442',
        padding: '0.75rem 1.25rem',
        marginBottom: '1rem',
        border: '1px solid transparent',
        align: 'center',
    },
    icon: {
        marginBottom: -6
    }
};

const validate = values => {
    const errors = {}
    if (!values.username) {
        errors.username = 'Required'
        //this.props.authError('Username is required');
    } else if (values.username.length > 15) {
        errors.username = 'Must be 15 characters or less'
        //this.props.authError('Must be 15 characters or less');
    }
    if (!values.password) {
        errors.password = 'Required'
        //this.props.authError('Password is required');
    }
    return errors
}

const warn = values => {
    const warnings = {}
    // if (values.age < 19) {
    //     warnings.age = 'Hmm, you seem a bit young...'
    // }
    return warnings
}

class Signin extends React.Component {
    componentWillMount() {
        // this.props.setRole('SHOP');
    }
    componentDidMount() {
        //console.log('cadetblue');
    }
    componentWillUnmount() {
        document.body.style.background = '';
    }
    handleFormSubmit(formProps) {
        this.props.signinUser(formProps,this.props.history.push);
    }
    renderAlert() {
        if (this.props.errorMessage) {
            return (
                <div style={styles.errorMsg}>
                    <Error color={"red"} style={styles.icon} />&nbsp;<strong>Oops!</strong> {this.props.errorMessage}
                </div>
            );
        }
    }
    renderField = ({ input, placeholder, type, style, meta: { touched, error, warning } }) => (
        <span>
            <input {...input} placeholder={placeholder} type={type} style={style} />
            {touched && (
                (error &&
                    <span style={styles.errorMsgInput}>
                        <Error color={"red"} style={styles.icon} />&nbsp;{error}
                    </span>
                )
                ||
                (warning &&
                    <span style={styles.errorMsgInput}>
                        <i className="fa fa-exclamation-circle fa-lg"></i>&nbsp;{warning}
                    </span>
                )
            )}
        </span>
    )
    render() {
        //document.body.style.backgroundColor = "#424242";
        document.body.style.background = 'url(../images/TSaWwNF.jpg)';
        document.body.style.backgroundSize = 'cover';
        //webkit-background-size: cover
        document.body.style.webkitBackgroundSize = 'cover';
        document.body.style.backgroundAttachment = 'fixed';
        const { handleSubmit, pristine, /*reset,*/ submitting } = this.props;
        return (
            <div>
                <form onSubmit={this.handleFormSubmit.bind(this)}>
                    <div style={styles.box}>
                        <div style={{ padding: '16px' }}>
                            <div style={styles.heading}>
                                {/* <img src='../images/cloud.png' style={{ width: '150px' }} /> */}
                                <h2 style={{ color: 'white' }}>Sign in to HORECA </h2>
                            </div>
                            <div>
                                <Field
                                    name="username"
                                    component={this.renderField}
                                    placeholder="Username"
                                    type="text"
                                    style={styles.txtUsername}
                                />
                                <br />
                                <Field
                                    name="password"
                                    component={this.renderField}
                                    placeholder="Password"
                                    type="password"
                                    style={styles.txtPassword}
                                />
                                <br />
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <RaisedButton
                                    label="Sign-In"
                                    primary={true}
                                    style={styles.btn}
                                    disabled={(pristine || submitting) && false}
                                    onClick={handleSubmit(this.handleFormSubmit.bind(this))}
                                />
                                <RaisedButton label="Reset" style={styles.btn} />
                                {this.renderAlert()}
                            </div>
                            {/*<div>
                                <Checkbox
                                    style={{ color: 'white', fill: 'black' }}
                                    iconStyle={{ color: 'white', fill: 'white' }}
                                    labelStyle={{ color: 'white' }}
                                    label="Keep me signed in"
                                    style={{ marginBottom: 16 }}
                                />
                            </div>
                            <Divider />
                             <div style={{ marginTop: 16 }}>
                                <a href='#' style={{ color: 'white', textDecoration: 'none' }}>Forgot Username or Password?</a>
                            </div> */}
                        </div>
                    </div>
                </form>
            </div >
        );
    }
}
function mapStateToProps(state) {
    console.log(state);
    return {
        role: state.auth.role,
        errorMessage: state.auth.error,
        initialValues: {
            // username: "admin",
            // password: "1234",
            // username: "b@b.com",
            // password: "secret",
        },
    }
}

export default connect(mapStateToProps, actions)(reduxForm({
    
    form: 'signinForm',
    validate, // <--- validation function given to redux-form
    warn, // <--- warning function given to redux-form
})(withRouter(Signin)));
