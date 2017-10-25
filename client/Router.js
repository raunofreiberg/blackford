import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import TodosNew from './components/TodosNew/TodosNew';
import TodosShow from './components/TodoShow/TodoShow';
import Todos from './components/Todos/Todos';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Navbar from './components/Navbar/Navbar';
import RequireAuth from './components/Auth/RequireAuth';
import history from './history';

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Navbar />
            <Switch>
                <Route path="/register" component={Register}/>
                <Route path="/login" component={Login}/>
                <Route path="/todos/new" component={RequireAuth(TodosNew)}/>
                <Route path="/todos/:id" component={RequireAuth(TodosShow)}/>
                <Route path="/" component={RequireAuth(Todos)}/>
            </Switch>
        </div>
    </Router>
);


export default AppRouter;
