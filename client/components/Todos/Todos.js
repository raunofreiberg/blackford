import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchTodos, deleteTodo, deleteAllTodos} from '../../ducks/todos';
import _ from 'lodash';

class Todos extends PureComponent {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchTodos();
    }

    renderTodos() {
        return (
            <div>
                {this.props.todos.map(todo => (
                    <div>
                        <Link to={`/todos/${todo.id}`} key={todo.id}>
                            <li className='list-group-item'>
                                {todo.content}
                            </li>
                        </Link>
                        <button
                            className='btn btn-danger'
                            onClick={() => this.props.deleteTodo(todo.id)}
                        >
                            Delete Todo
                        </button>
                    </div>
                ))}
            </div>
        )
    }

    render() {
        if (!this.props.todos || !_.size(this.props.todos)) {
            return (
                <div className='todos'>
                    <div className='text-right'>
                        <Link to='/todos/new' className='btn btn-primary'>
                            Create Todo
                        </Link>
                    </div>
                    <div className='text-center text-primary'>
                        <h3>No Todos</h3>
                    </div>
                </div>
            );
        }

        return (
            <div className='todos'>
                <div className='text-right'>
                    <Link to='/todos/new' className='btn btn-primary'>
                        Create Todo
                    </Link>
                    <button className="btn btn-danger" onClick={this.props.deleteTodos}>Delete all Todos</button>
                </div>
                <h3>Todos</h3>
                <ul className='list-group'>{this.renderTodos()}</ul>
            </div>
        );
    }
}
;

const mapStateToProps = state => ({
    todos: state.todos.todos,
});

const mapDispatchToProps = dispatch => ({
    fetchTodos: () => dispatch(fetchTodos()),
    deleteTodos: () => dispatch(deleteAllTodos()),
    deleteTodo: id => dispatch(deleteTodo(id)),
});

const TodosConnector = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Todos);

export default TodosConnector
