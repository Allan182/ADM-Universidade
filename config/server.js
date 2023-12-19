const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
const app = express();
const expressValidator = require('express-validator');
const expressSession = require('express-session');
app.set('view engine', 'ejs');
app.set('views', './app/views');
app.use(express.static('./app/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(expressSession({
    secret: 'j$K@c5@1!23$#@!2*(x!p03',
    resave: false,
    saveUninitialized: false
}));
consign()
    .include('app/routes')
    .then('config/dbConnection.js')
    .then('app/models')
    .then('app/controllers')
    .into(app);
module.exports = app;


