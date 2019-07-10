import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

import Avatar from 'material-ui/Avatar';
import ListItem from 'material-ui/List/ListItem';
import IconButton from 'material-ui/IconButton';
import Edit from 'material-ui/svg-icons/action/autorenew';

import * as actions from '../actions';

const styles = {
    Avatar: {
        marginTop: '-5px',
        zIndex: 1000,
        backgroundColor: "#FFFFFF",
    },
    chip: {
        textAlign: 'center',
        marginLeft: '53px',
        marginTop: '-18px',
        zIndex: 900,
    },
    styleHrAvatar: {
        margin: 0,
        marginTop: "0px",
        marginBottom: "0px",
        marginLeft: 0,
        height: "1px",
        border: "none",
        backgroundColor: "#BDBDBD"
    },
    UserText: {
        color: 'rgba(0, 138, 255, 0.85)',
        fontSize: '12px',
    }
};

class AvatarShow extends React.Component {
    componentWillMount() {
        this.props.fetchUserData(this.props.history.push);
    }
    clearDefaultCust() {
        this.props.clearDefaultCustomer();
        //this.props.statusLoading();
        this.props.handleClose();
    }
    render() {
        let showChangeCust = null
        if (this.props.user_data.default_customer.cust_name && this.props.user_data.list_customer.length > 1) {
            showChangeCust = <IconButton
                style={{
                    marginRight: 0, marginTop: 0, padding: 0,
                    right: 0, bottom: 0,
                }}
                onClick={(e) => { this.clearDefaultCust() }}
            >
                <Edit
                    style={{ cursor: 'pointer', }}
                    color="green"
                    hoverColor="gold"
                    viewBox="0 0 24 24"
                />
            </IconButton>
        }
        return (
            <div>
                <ListItem
                    disabled={true}
                    style={{ textAlign: 'center', height: '71px', backgroundColor: "#eeeeee" }}
                >
                    <div>
                        <Avatar
                            src={this.props.user_data.default_customer.cust_img}
                            size={45}
                            style={styles.Avatar}
                        />
                        {showChangeCust}
                        <div style={{ fontSize: 11, marginLeft: '-13px', }}>
                            {this.props.user_data.default_customer.cust_name}
                            <br />
                            <span style={styles.UserText} >{this.props.user_data.full_name}</span>
                        </div>
                    </div>
                </ListItem>
                <hr style={styles.styleHrAvatar} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        role: state.auth.role,
        user_data: state.auth.user_data,
    }
}

export default connect(mapStateToProps, actions)(withRouter(AvatarShow));
