import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { Link } from "react-router-dom";

import Icon from '../Icons';
import * as styles from './Navbar.scss';
import { logUserOut } from "../../ducks/user";

class Navbar extends React.Component {
    static propTypes = {
        onLogout: PropTypes.func.isRequired,
        isAuthorized: PropTypes.bool.isRequired,
    };

    state = {
        isDropdownOpen: false,
    };

    hideDropdown = () => {
        this.setState({ isDropdownOpen: false });
        document.removeEventListener('click', this.hideDropdown);
    };

    showDropdown = () => {
        this.setState({ isDropdownOpen: true });
        document.addEventListener('click', this.hideDropdown);
    };

    renderDropdown() {
        const { isDropdownOpen } = this.state;
        const { avatar, username } = this.props.user;

        return (
            <div className={styles.dropdownWrapper}>
                {avatar ? <img src={avatar} /> : ''}
                <button
                    className={styles.dropdownBtn}
                    onClick={this.showDropdown}
                >
                    {username}
                    <Icon icon="chevron" />
                </button>
                <div className={classNames(styles.dropdown, isDropdownOpen ? styles.dropdownOpen : null)}>
                    <Link to="/posts/new" className={styles.newPostBtn}>
                        <Icon icon="plus" />
                        New Post
                    </Link>
                    <button
                        className={styles.logoutBtn}
                        onClick={this.props.onLogout}
                    >
                        <Icon icon="logout" />
                        Logout
                    </button>
                </div>
            </div>
        );
    }

    render() {
        return (
            <nav className={styles.navbarWrapper}>
                <div className={classNames('container', styles.containerWrapper)}>
                    <span className={styles.appName}>Blackford</span>
                    <div className={styles.navbarActions}>
                        {this.props.isAuthorized ?
                            this.renderDropdown()
                            : ''
                        }
                    </div>
                </div>
            </nav>
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


{/*<button className={styles.logoutBtn} onClick={() => this.props.onLogout()}>*/
}
{/*Log out*/
}
{/*</button>*/
}