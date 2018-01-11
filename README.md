[![Coverage Status](https://coveralls.io/repos/github/raunofreiberg/blackford/badge.svg?branch=master)](https://coveralls.io/github/raunofreiberg/blackford?branch=master)
[![Build Status](https://travis-ci.org/raunofreiberg/blackford.svg?branch=master)](https://travis-ci.org/raunofreiberg/blackford)

# Full Stack PERN (Postgres, Express, React, Node)

#### Technologies Used

- Node: 8.9.x
- Express: 4.15.x
- KnexJS: 0.13.x
- PostgreSQL: 9.6.x
- Docker CE
- Nginx
- PassportJS with JWT for authentication
  - Local authentication
  - Facebook OAuth
- React: 16
- Redux: 3.7.x
- Jest 21.x
- React-Router: 4.1.x
- Redux-Form: 6.8.x
- CSS Modules
- Webpack 3.x


#### Development Setup (Non-Docker variant)

* Create a database

```
$ createdb DB_NAME
```

* Create a .env file at the root of your application and update it with your env variables.

```
DATABASE_URL=postgres://localhost/<DB_NAME> // URL of your database
TOKEN_SECRET=<SECRET> // Signature for signing JWT's
CLIENT_SECRET=<CLIENT_SECRET> // Facebook app secret
CLIENT_ID=<CLIENT_ID> // Facebook client ID
FACEBOOK_APP_ID=<FACEBOOK_APP_ID> // Facebook app ID
```

* Install dependencies

```
$ npm install
$ npm install -g knex // database connection wrapper - you probably don't have this
```

* Run the migrations provided by this repo

```
$ knex migrate:latest
```

* Run the client and server concurrently

```
$ npm run dev
```

* You should be able to see the application at `localhost:8080`. All API requests are proxied to the Node.js server running at port 3001


#### Docker

* Set some env variables for the Docker-compose.yml file

```
TOKEN_SECRET=<SECRET> // Signature for signing JWT's
CLIENT_SECRET=<CLIENT_SECRET> // Facebook app secret
CLIENT_ID=<CLIENT_ID> // Facebook client ID
FACEBOOK_APP_ID=<FACEBOOK_APP_ID> // Facebook app ID
```

* Run it

```
$ docker-compose up
```

* Application is available at localhost:3001. No `webpack-dev-server` is used inside Docker, just a regular webpack watch instead.

#### Production

```
$ docker-compose -f Docker-compose.prod.yml up
```

¯\_(ツ)_/¯