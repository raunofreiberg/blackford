require('dotenv').config();
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compression = require('compression');
const passport = require('passport');
const cors = require('cors');
const helpers = require('../helpers');
const dev = process.env.NODE_ENV === 'development';

const apiRoutes = require('./apiRoutes');
const authRoutes = require('./authRoutes');
const { ensureAuthenticated } = require('./auth/utils');
const knex = require('./dbConnect');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false,
}));

app.use(cookieParser());

app.use(passport.initialize());

app.use('/api/posts', ensureAuthenticated);
app.use('/api/posts', apiRoutes);
app.use('/auth', authRoutes);

// const knex = require('./dbConnect');
// knex('users')
//     .then(x => console.log(x))

// Nginx is used to serve static files in production.
if (dev) {
    app.use(express.static(helpers.root('client')));
    app.all('*', (req, res, next) => {
        res.sendFile('index.html', {
            root: helpers.root('client'),
        });
    });
}

module.exports = app;
