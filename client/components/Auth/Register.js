import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';

import { createUser } from '../../ducks/user';

class Register extends React.Component {
    static propTypes = {
        createUser: PropTypes.func.isRequired,
        handleSubmit: PropTypes.func.isRequired,
    };

    onSubmit(values) {
        this.props.createUser(values);
    }

    required = value => (value ? undefined : 'Required');

    renderField = ({ input, placeholder, type, meta: { touched, error } }) => (
        <div>
            <input {...input} placeholder={placeholder} type={type} className="input__field" />
            {touched && ((error && <span>{error}</span>))}
        </div>
    );

    render() {
        const { handleSubmit } = this.props;

        return (
            <div>
                <h3>Register</h3>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <Field
                        name="text"
                        type="text"
                        component={this.renderField}
                        placeholder="Username"
                        validate={this.required}
                    />
                    <Field
                        name="password"
                        type="password"
                        component={this.renderField}
                        placeholder="Password"
                        validate={this.required}
                    />
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                    <Link to="/login" className="btn btn-default margin-left-sm">
                        Login
                    </Link>
                </form>
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
    form: 'RegisterForm',
})(connect(null, { createUser })(Register));
