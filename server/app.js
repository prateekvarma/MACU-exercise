const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const data = require('./data');

const app = express();

app.use(cors('localhost'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


/* Implement your routes here */
app.get("/animals", (req, res, next) => {
  res.status(200).json(data);
 });

module.exports = app;
