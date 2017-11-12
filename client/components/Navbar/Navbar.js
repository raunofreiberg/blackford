import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as styles from './Navbar.scss';
import { logUserOut } from "../../ducks/user";

class Navbar extends React.Component {
    static propTypes = {
        onLogout: PropTypes.func.isRequired,
        isAuthorized: PropTypes.bool.isRequired,
    };

    render() {
        return (
            <div className={styles.navbarWrapper}>
                <nav>
                    {this.props.isAuthorized ?
                        <span className={styles.username}>{this.props.user.username}</span>
                        : ''
                    }
                    <span className={styles.appName}>Blackford</span>
                    {this.props.isAuthorized ?
                        <button className={styles.btn} onClick={() => this.props.onLogout()}>Log out</button>
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
