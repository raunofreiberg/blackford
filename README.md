[![Coverage Status](https://coveralls.io/repos/github/raunofreiberg/blackford/badge.svg?branch=master)](https://coveralls.io/github/raunofreiberg/blackford?branch=master)
[![Build Status](https://travis-ci.org/raunofreiberg/blackford.svg?branch=master)](https://travis-ci.org/raunofreiberg/blackford)

# Full Stack PERN (Postgres, Express, React, Node)

#### Technologies Used

- Node: 8.9.x
- Express: 4.15.x
- KnexJS: 0.13.x
- PostgreSQL: 9.6.x
- Docker CE
- PassportJS with JWT for authentication
  - Local authentication
  - Facebook OAuth
- React: 15.6.x
- Redux: 3.7.x
- Jest 21.x
- React-Router: 4.1.x
- Redux-Form: 6.8.x
- CSS Modules
- Webpack 3.x


#### Setup


* Create a database

```
$ createdb DB_NAME
```

* Create a .env file at the root of your application and update it with your env variables

```
DATABASE_URL=postgres://localhost/<DB_NAME> // URL of your database
TOKEN_SECRET=<SECRET> // Signature for signing JWT's
CLIENT_SECRET=<CLIENT_SECRET> // Facebook app client secret
CLIENT_ID=<CLIENT_ID> // Facebook app client ID
```

* Install dependencies

```
$ npm install
```

* Also, install Knex since you probably don't have it

```
$ npm install -g knex
```

* Run the migrations provided by this repo

```
$ knex migrate:latest
```

* Run the client and server concurrently

```
$ npm run dev
```

* You should be able to see the application at `localhost:8080`


