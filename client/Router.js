import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import history from './history';

import TodosNew from './components/Posts/CreatePost';
import TodosShow from './components/Posts/PostDetail';
import Posts from './components/Posts/Posts';

import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import RequireAuth from './components/Auth/RequireAuth';
import NotificationsList from './components/Notifications';

const AppRouter = () => (
    <Router history={history}>
        <div>
            <NotificationsList />
            <Navbar />
            <div className="container main">
                <Switch>
                    <Route path="/register" component={Register}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/posts/new" component={RequireAuth(TodosNew)}/>
                    <Route path="/posts/:id" component={RequireAuth(TodosShow)}/>
                    <Route path="/" component={RequireAuth(Posts)}/>
                </Switch>
            </div>
        </div>
    </Router>
);


export default AppRouter;
