import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';

import { logUserIn, facebookLogin } from '../../ducks/user';

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

    renderField = ({ input, placeholder, type, meta: { touched, error } }) => (
        <div>
            <input {...input} placeholder={placeholder} type={type} className="input__field" />
            {touched && error && <span>{error}</span>}
        </div>
    );

    render() {
        const { handleSubmit } = this.props;

        return (
            <div>
                <h3>Login</h3>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <Field
                        name="username"
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
                    <Link to="/register" className="btn btn-default margin-left-sm">
                        Register
                    </Link>
                </form>
                <button className="btn btn-secondary" onClick={this.props.facebookLogin}>Facebook login</button>
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
