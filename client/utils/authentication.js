import { error } from 'react-notification-system-redux';
import jwtDecode from 'jwt-decode';

import { setAuthorized, setUser } from '../ducks/user';
import getNotificationOptions from '../utils/notifications';

class Auth {
    /**
     * Authenticate a user. Save a token string in Local Storage
     *
     * @param {string} token
     */
    static authenticateUser = token => localStorage.setItem('token', token);

    /**
     * Get a token value.
     *
     * @returns {string}
     */

    static getToken = () => localStorage.getItem('token');

    /**
     * Check if a user is authenticated - check if a token is saved in Local Storage
     *
     * @returns {boolean}
     */
    static isUserAuthenticated() {
        return this.getToken() !== null &&
               this.getToken() !== undefined;
    }

    /**
     * Deauthenticate a user. Remove a token from Local Storage.
     *
     */
    static deauthenticateUser = () => localStorage.removeItem('token');

    /**
     * Auth middleware - keeps the user logged in.
     *
     * @param {object} store - Redux store
     */
    static ensureAuthenticated(store) {
        if (this.isUserAuthenticated()) {
            const token = this.getToken();
            try {
                const decoded = jwtDecode(token);
                const { id, username } = decoded;

                store.dispatch(setAuthorized(true));
                store.dispatch(setUser({
                    id,
                    username,
                }));
            } catch (err) {
                setTimeout(() => {
                    store.dispatch(error(getNotificationOptions(err.message)));
                }, 200);
            }
        }
    }
}

export default Auth;
