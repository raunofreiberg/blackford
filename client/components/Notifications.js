import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Notifications from 'react-notification-system-redux';

class NotificationsList extends React.Component {
    static propTypes = {
        notifications: PropTypes.arrayOf(
            PropTypes.shape({
                title: PropTypes.string,
                message: PropTypes.string,
                position: PropTypes.string,
                autoDismiss: PropTypes.number,
                action: PropTypes.shape({
                    label: PropTypes.string,
                    callback: PropTypes.func,
                }),
            }),
        ),
    };

    static defaultProps = {
        notifications: {},
    };

    render() {
        const { notifications } = this.props;

        const style = {
            NotificationItem: {
                // Applied to every notification, regardless of the notification level
                DefaultStyle: {
                    margin: '10px 5px 2px 1px',
                    padding: '24px',
                    border: 'none',
                    color: '#fff',
                    lineHeight: '21px',
                    fontFamily: 'Circular Air',
                    fontSize: '15px',
                    borderRadius: '3px',
                    boxShadow: 'none',
                    top: '85px', // navbar height + 2px
                },

                // Applied only to the success notification item
                success: {
                    background: '#6FC2E3',
                },

                // Applied only to the warning notification item
                warning: {
                    background: '#7C8999',
                },

                // Applied only to the warning notification item
                error: {
                    background: '#EF6262',
                },
            },
        };

        return (
            <Notifications
                notifications={notifications}
                style={style}
            />
        );
    }
}

export default connect(
    state => ({ notifications: state.notifications }),
)(NotificationsList);