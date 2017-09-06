const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const mysql = require('mysql');
const db = require('./database');
const dbPool  = mysql.createPool(db.conf);

const app = express();

const corsOptions = {
  origin: 'http://localhost:8100'
  // credentials: true
};

//setUp middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));
app.use(cors(corsOptions));

//setUp auth with passport
require('./auth').init(app, dbPool, db);

//setUp user middleware like errorHandler
require('./middleware').init(app);

//setUp routes
require('./auth').route(app); // /login
require('./users').route(app, dbPool, db); // /users

module.exports = app;
