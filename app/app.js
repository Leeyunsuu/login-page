'use strict';

//모듈
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mysqlConnection = require('./src/config/mysql');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const app = express();

//mysql
const mysqlConfig = mysqlConnection.config();

//SessionStore setting'
const sessionStore = new MySQLStore(mysqlConfig);

//라우팅
const home = require('./src/routes/home');

//앱 세팅
app.set('views', './src/views');
app.set('view engine', 'ejs');
app.use(express.static(`${__dirname}/src/public`));

//URL을 통해 전달되는 한글, 공백 등의 문자가 포함된 경우, 인식되지 않는 문제 해결
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
  })
);

app.use('/', home); //use => Middleware

module.exports = app;
