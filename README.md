[![Coverage Status](https://coveralls.io/repos/github/raunofreiberg/blackford/badge.svg?branch=master)](https://coveralls.io/github/raunofreiberg/blackford?branch=master)
[![Build Status](https://travis-ci.org/raunofreiberg/blackford.svg?branch=master)](https://travis-ci.org/raunofreiberg/blackford)

# Full Stack PERN (Postgres, Express, React, Node)

#### Technologies Used

- NodeJS
- ExpressJS
- KnexJS
- PostgreSQL
- Docker
- PassportJS with JWT for authentication
- React
- Redux
- React-Router 4
- Redux-Form 6
- SCSS
- Webpack 2


#### Setup


* Create a database

```
$ createdb DB_NAME
```

* Create a .env file at the root of your application and update it with your DATABASE_URL containing the name of your database:

```
DATABASE_URL=postgres://localhost/<DB_NAME>
```

* Also, add the TOKEN_SECRET for signing JWT tokens
```
TOKEN_SECRET=<SECRET>
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


