const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


const app = express();

// morgan lib - resp for logging each inbound request
app.use(logger('dev'));

// server to be able to process / parse json data sent along as part of the req
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// enable express server to parse cookies
app.use(cookieParser());

// enable server to serve static files from the public directory (ex. index.html)
app.use(express.static(path.join(__dirname, 'public')));


require('./setupMongo')();
app.use("/auth", require("./routes/auth"));
app.use("/todo", require("./routes/todo"));


module.exports = app;
