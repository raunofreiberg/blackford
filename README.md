[![Coverage Status](https://coveralls.io/repos/github/raunofreiberg/blackford/badge.svg?branch=master)](https://coveralls.io/github/raunofreiberg/blackford?branch=master)

# Full Stack React/Express

#### Technologies Used

- React
- Redux
- React-router 4
- Redux-Form 6
- SCSS
- Webpack 2
- NodeJS
- ExpressJS
- KnexJS
- PostgreSQL


#### Setup


* Create a database

```
$ createdb todos
```

* Create a .env file at the root of your application and update it with your DATABASE_URL containing the name of your database:

```
DATABASE_URL=postgres://localhost/todos
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

* Run the client in one terminal

```
$ npm run client
```

* Then in another run the server

```
$ npm run server
```

* You should be able to see the application at `localhost:8000`


