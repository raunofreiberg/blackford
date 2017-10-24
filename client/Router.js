import React from 'react';
import { Router, Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import TodosNew from './components/TodosNew/TodosNew';
import TodosShow from './components/TodoShow/TodoShow';
import Todos from './components/Todos/Todos';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import history from './history';
import Auth from './modules/Auth';

import { setAuthorized } from "./ducks/user";

const RedirectRoute = ({ component: Component, isAuthorized, redirectPath, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => isAuthorized === true
                ? <Component {...props} />
                : <Redirect to={{ pathname: redirectPath }} />}
        />
    );
};

class CustomRouter extends React.Component {
    componentWillMount() {
        return Auth.isUserAuthenticated() ? this.props.setAuthorized(true) : null;
    }

    render() {
        return (
            <Router history={history}>
                <div>
                    <Navbar/>
                    <Switch>
                        <RedirectRoute
                            path="/register"
                            component={Register}
                            isAuthorized
                            redirectPath="/"
                        />
                        <RedirectRoute
                            path="/login"
                            component={Login}
                            isAuthorized
                            redirectPath="/"
                        />
                        <RedirectRoute
                            path="/todos/new"
                            component={TodosNew}
                            isAuthorized={this.props.isAuthorized}
                            redirectPath="/login"
                        />
                        <RedirectRoute
                            path="/todos/:id"
                            component={TodosShow}
                            isAuthorized={this.props.isAuthorized}
                            redirectPath="/login"
                        />
                        <RedirectRoute
                            exact
                            path="/"
                            component={Todos}
                            isAuthorized={Auth.isUserAuthenticated()}
                            redirectPath="/login"
                        />
                    </Switch>
                </div>
            </Router>
        );
    }
}

const mapStateToProps = state => ({
    isAuthorized: state.user.isAuthorized,
});

const mapDispatchToProps = dispatch => ({
    setAuthorized: status => dispatch(setAuthorized(status)),
});

const CustomRouterConnector = connect(
    mapStateToProps,
    mapDispatchToProps,
)(CustomRouter);

export default CustomRouterConnector;
