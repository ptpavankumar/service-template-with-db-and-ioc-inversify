const _ = require('lodash');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const container = require('./ioc');
const routes = require('./routes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use((req, res, next) => {
  req.scope = container(); // eslint-disable-line no-param-reassign
  next();
});

// Register all the routers
_.forEach(routes, router => app.use(router));

module.exports = app;
