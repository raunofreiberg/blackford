import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';

import { createUser } from '../../ducks/user';
import renderField from '../Field/renderField';

class Register extends React.Component {
    static propTypes = {
        createUser: PropTypes.func.isRequired,
        handleSubmit: PropTypes.func.isRequired,
    };

    onSubmit(values) {
        this.props.createUser(values);
    }

    required = value => (value ? undefined : 'Required');

    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))} className="form__auth">
                <h3>Register</h3>
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
                <button type="submit" className="btn btn--primary">Register</button>
                <Link to="/login" className="btn btn--default">Login</Link>
            </form>
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
    form: 'RegisterForm',
})(connect(null, { createUser })(Register));
