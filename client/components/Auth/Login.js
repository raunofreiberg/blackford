import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';

import { logUserIn, facebookLogin } from '../../ducks/user';
import renderField from '../Field/renderField';

class Login extends React.Component {
    static propTypes = {
        logUserIn: PropTypes.func.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        facebookLogin: PropTypes.func.isRequired,
    };

    onSubmit(values) {
        this.props.logUserIn(values);
    }

    required = value => (value ? undefined : 'Required');

    render() {
        const { handleSubmit } = this.props;

        return (
            <div className="form__auth">
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <h3>Login</h3>
                    <Field
                        name="username"
                        type="text"
                        component={renderField}
                        placeholder="Username"
                        validate={this.required}
                    />
                    <Field
                        name="password"
                        type="password"
                        component={renderField}
                        placeholder="Password"
                        validate={this.required}
                    />
                    <button type="submit" className="btn btn--primary">Login</button>
                </form>
                <Link to="/register" className="btn btn--default">Register</Link>
                <button className="btn btn--facebook" onClick={this.props.facebookLogin}>Facebook login</button>
            </div>
        );
    }
}

function validate(values) {
    const errors = {};

    if (!values) {
        errors.content = 'Please enter content to submit or press cancel';
    }

    return errors;
}

export default reduxForm({
    validate,
    form: 'LoginForm',
})(connect(null, { logUserIn, facebookLogin })(Login));
