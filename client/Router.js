import React from 'react';
import { Router, Route, Redirect, Switch } from 'react-router-dom';

import TodosNew from './components/TodosNew/TodosNew';
import TodosShow from './components/TodoShow/TodoShow';
import Todos from './components/Todos/Todos';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Auth from './modules/Auth';
import Navbar from './components/Navbar/Navbar';
import history from './history';

const RedirectRoute = ({ component: Component, isAuthorized, redirectPath, ...rest }) => {
    console.log(isAuthorized);
    return (
        <Route
            {...rest}
            render={(props) => isAuthorized === true
                ? <Component {...props} />
                : <Redirect to={{ pathname: redirectPath, state: { from: props.location } }}/>}
        />
    );
};

const CustomRouter = () => (
    <Router history={history}>
        <div>
            <Navbar />
            <Switch>
                <RedirectRoute
                    path="/register"
                    component={Register}
                    isAuthorized={!Auth.isUserAuthenticated()}
                    redirectPath="/todos"
                />
                <RedirectRoute
                    path="/login"
                    component={Login}
                    isAuthorized={!Auth.isUserAuthenticated()}
                    redirectPath="/todos"
                />
                <RedirectRoute
                    path="/todos/new"
                    component={TodosNew}
                    isAuthorized={Auth.isUserAuthenticated()}
                    redirectPath="/login"
                />
                <RedirectRoute
                    path="/todos/:id"
                    component={TodosShow}
                    isAuthorized={Auth.isUserAuthenticated()}
                    redirectPath="/login"
                />
                <RedirectRoute
                    path="/todos"
                    component={Todos}
                    isAuthorized={Auth.isUserAuthenticated()}
                    redirectPath="/login"
                />
            </Switch>
        </div>
    </Router>
);

export default CustomRouter;
