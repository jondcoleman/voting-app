'use strict';

var express = require('express'),
    routes = require('./app/routes/index.js'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    session = require('express-session'),
    bodyParser = require('body-parser');


var app = express();
require('dotenv').load();
require('./app/config/passport')(passport);

mongoose.connect(process.env.DBURI);
app.use('/common', express.static(process.cwd() + '/app/common'));
app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));

app.use(session({
    secret: 'secretClementine',
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(bodyParser.json());

app.set('view engine', 'jade');
app.set('views', './app/views');

routes(app, passport);

var port = 3000;
app.listen(process.env.PORT || port, function () {
    console.log('Node.js listening on port ' + port + '...');
});
