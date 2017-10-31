import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { logUserOut } from "../../ducks/user";

class Navbar extends React.Component {
    static propTypes = {
        onLogout: PropTypes.func.isRequired,
        isAuthorized: PropTypes.bool.isRequired,
    };

    render() {
        return (
            <div className="navbar__container">
                <nav className="navbar navbar-default">
                    {this.props.isAuthorized ?
                        <span className="navbar-username">{this.props.user.username}</span>
                        : ''
                    }
                    <span className="navbar-app">Blackford</span>
                    {this.props.isAuthorized ?
                        <button className="navbar-btn" onClick={() => this.props.onLogout()}>Log out</button>
                        : ''
                    }
                </nav>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthorized: state.user.isAuthorized,
    user: state.user.user,
});

const mapDispatchToProps = dispatch => ({
    onLogout: () => dispatch(logUserOut()),
});

const NavbarConnector = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Navbar);

export default NavbarConnector;
