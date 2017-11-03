import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { fetchPost, editTodo, deleteTodo } from '../../ducks/posts';

class TodoShow extends PureComponent {
    componentDidMount() {
        this.props.fetchPost(this.props.match.params.id);
    }

    renderField(field) {
        const {
            meta: {
                touched,
                error,
            },
        } = field;

        const className = `form-group ${touched && error
            ? 'has-error'
            : ''}`;

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

    deleteTodo() {
        this
            .props
            .deleteTodo(this.props.match.params.id, () => {
                this
                    .props
                    .history
                    .push('/');
            });
    }

    onSubmit(values) {
        this
            .props
            .editTodo(this.props.match.params.id, values, () => {
                this
                    .props
                    .history
                    .push('/');
            });
    }

    render() {
        const { handleSubmit } = this.props;

        if (!this.props.post) {
            return (
                <div className="container text-center">
                    <h3>Loading...</h3>
                </div>
            );
        }

        return (
            <div className="todo-show">
                <div className="text-right">
                    <Link to="/" className="btn btn-primary">
                        Back To Todos
                    </Link>
                </div>

                <div className="container text-center">
                    <h2>Content:</h2>
                    <h4>{this.props.post.description}</h4>
                </div>

                <div className="container">
                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                        <Field name="content" label="Edit Todo Content" component={this.renderField}/>
                        <button type="submit" className="btn btn-primary">
                            Save Changes
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        post: state.posts.post,
    };
}

function validate(values, ownProps) {
    const errors = {};

    if (!values.content) {
        errors.content = 'Please enter content to save changes';
    }

    if (values.content && values.content === ownProps.todo.content) {
        errors.content = 'Please enter a different value if you wish to make changes';
    }

    return errors;
}

let InitializeFromStateForm = reduxForm({ validate, form: 'TodosEditForm', enableReinitialize: true })(TodoShow);

InitializeFromStateForm = connect(mapStateToProps, { fetchPost, editTodo, deleteTodo })(InitializeFromStateForm);

export default InitializeFromStateForm;
