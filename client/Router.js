import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import history from './history';

import TodosNew from './components/TodosNew/TodosNew';
import TodosShow from './components/TodoShow/TodoShow';
import Todos from './components/Todos/Todos';

import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import RequireAuth from './components/Auth/RequireAuth';
import NotificationsList from './components/Notifications/Notifications';

const AppRouter = () => (
    <Router history={history}>
        <div>
            <NotificationsList />
            <Navbar />
            <div className="container main">
                <Switch>
                    <Route path="/register" component={Register}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/todos/new" component={RequireAuth(TodosNew)}/>
                    <Route path="/todos/:id" component={RequireAuth(TodosShow)}/>
                    <Route path="/" component={RequireAuth(Todos)}/>
                </Switch>
            </div>
        </div>
    </Router>
);


export default AppRouter;
