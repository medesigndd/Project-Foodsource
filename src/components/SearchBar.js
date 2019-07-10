import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';

import Star from 'material-ui/svg-icons/toggle/star';
import Clear from 'material-ui/svg-icons/content/clear';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Search from 'material-ui/svg-icons/action/search';

const styles = {
    container: {
        paddingTop: 0,
        width: '100%',
        textAlign: 'center',
        zIndex: 300,
        //marginTop: '-14px',
        //backgroundColor: 'white',
    },
    TextField: {
        width: '90%',
        padding: 0,
        margin: 0,
        //backgroundColor: '#FFF'
    },
    textPadding: {
        paddingLeft: '35px',
    },
    IconButtonFavorite: {
        marginLeft: '-80px',
        marginRight:'20',
    },
    IconButtonClear: {
        marginLeft: '-40px'
    },
    StarBorder: {
        cursor: 'pointer',
        color: 'gold',
    },
    Star: {
        cursor: 'pointer',
        color: 'gold',
    },
    Search: {
        marginRight: '-30px',
        marginTop: '20px',
    }

};

class SearchBar extends React.Component {
    changeFavorite = () => {
        this.props.updateSearchFavorite(!this.props.searchFavorite);
    }
    updateSearchText = (value) => {
        this.props.updateSearchText(value);
    }
    render() {
        let icon = null;
        if (this.props.searchFavorite) {
            icon = <Star
                style={styles.Star}
                color={"gold"}
            />
        } else {
            icon = <StarBorder
                style={styles.StarBorder}
            />
        }
        let displayFavorite = '';
        if (!this.props.searchShowFavorite) displayFavorite = 'none';
        return (
            <div style={styles.container}>
                <Search style={styles.Search} />
                <TextField
                    hintText="สินค้า"
                    floatingLabelText="ค้นหา"
                    style={styles.TextField}
                    hintStyle={styles.textPadding}
                    floatingLabelStyle={styles.textPadding}
                    inputStyle={{
                        ...styles.textPadding,
                    }}
                    onChange={(e,newValue) => { this.updateSearchText(newValue) }}
                    value={this.props.searchText}
                />
                <IconButton
                    style={{ ...styles.IconButtonFavorite, display: displayFavorite }}
                    onClick={() => { this.changeFavorite() }}
                >
                    {icon}
                </IconButton>
                <IconButton
                    style={{ ...styles.IconButtonClear}}
                    onClick={(e) => { this.updateSearchText('') }}
                >
                    <Clear                         
                        color="red"
                        style={{
                            cursor: 'pointer', fontSize: 5,
                        }}
                    />
                </IconButton>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        width: state.navLeftMenu.width,
        height: state.navLeftMenu.height,
        searchText: state.search.text,
        searchFavorite: state.search.favorite,
    }
}

SearchBar.defaultProps = {
    searchShowFavorite: false,
};

export default connect(mapStateToProps, actions)(SearchBar);