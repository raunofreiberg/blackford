import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { logUserIn } from '../../ducks/user';

class Login extends React.Component {
    onSubmit(values) {
        this.props.logUserIn(values, () => {
            this.props.history.push('/');
        });
    }

    renderField(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? 'has-error' : ''}`;

        return (
            <div className={className}>
                <label>{field.label}</label>
                <input type="text" className="form-control" {...field.input} />
                <div>
                    {touched
                        ? <p className="text-danger">{error}</p>
                        : ''}
                </div>
            </div>
        );
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <div className="todos-new">
                <h3>Login</h3>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <Field name="username" label="Username" component={this.renderField} />
                    <Field name="password" type="password" label="Password" component={this.renderField} />
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                    <Link to="/" className="btn btn-danger margin-left-sm">
                        Cancel
                    </Link>
                    <Link to="/register" className="btn btn-default margin-left-sm">
                        Register
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
    form: 'LoginForm',
})(connect(null, { logUserIn })(Login));
