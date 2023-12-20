var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require("mongoose");
var app = express(); // Move this line up to define the 'app' object before using it

app.set('view engine', 'pug');

app.set('views', path.join(__dirname, 'views'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



app.use(express.static(path.join(__dirname, 'public')));

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

app.use('/', indexRouter);
app.use('/users', usersRouter);



mongoose.connect("mongodb://127.0.0.1:27017/krow8",{ useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 5000, socketTimeoutMS: 45000, })
.then(() => console.log("Connected to Mongo...."))
.catch((error) => console.log(error.message));
module.exports = app;
