import { blueA200, greenA200 } from 'material-ui/styles/colors';
import { connect } from 'react-redux';
import Exit from 'material-ui/svg-icons/action/exit-to-app';
import ListItem from 'material-ui/List/ListItem';
import React from 'react';

import * as actions from '../../actions';

class SignOut extends React.Component {

    ToSignOut = (e, id, obj) => {
        this.props.signoutUser();
    }

    render() {
        return (
            <ListItem
                style={{ ...this.props.styleMenu, /*backgroundColor: '#FFCDD2'*/ }}
                leftIcon={
                    <Exit color={blueA200} hoverColor={greenA200} />
                }
                //primaryText="ออกจากระบบ"
                onClick={() => { this.props.handleClose(); }}
            >
                {/*<a href='/shop/order' ></a>*/}
                <div style={this.props.styleTextMenu} onClick={(e) => { this.ToSignOut() }}>ออกจากระบบ</div>
            </ListItem>
        );
    }
}

export default connect(null, actions)(SignOut);
