var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require("mongoose");
var session = require('express-session');
var bodyParser = require('body-parser');
var app = express(); 


app.set('view engine', 'pug');

app.set('views', path.join(__dirname, 'views'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));


app.use(express.static(path.join(__dirname, 'public')));

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var calculatorRouter = require('./routes/calculatorRoutes'); 



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/calculator', calculatorRouter);





mongoose.connect("mongodb://127.0.0.1:27017/krow8",{ useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 5000, socketTimeoutMS: 45000, })
.then(() => console.log("Connected to Mongo...."))
.catch((error) => console.log(error.message));
module.exports = app;
