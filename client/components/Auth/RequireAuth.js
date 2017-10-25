import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import history from '../../history';

export default function (ComposedComponent) {
    class RequireAuth extends Component {
        static propTypes = {
            isAuthorized: PropTypes.bool.isRequired,
        };

        componentWillMount() {
            if (!this.props.isAuthorized) {
                history.push('/login');
            }
        }

        componentWillUpdate(nextProps) {
            if (!nextProps.isAuthorized) {
                history.push('/login');
            }
        }

        render() {
            return <ComposedComponent {...this.props} />;
        }
    }

    const mapStateToProps = state => ({
        isAuthorized: state.user.isAuthorized,
    });

    return connect(mapStateToProps)(RequireAuth);
}
