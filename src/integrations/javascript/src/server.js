const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const currentEnv = require('./config/environments');

const UserRoutes = require('./api/user/user.routes');

// initialization
const server = express();

// settings
const url = '/api/test';
server.set('port', currentEnv.PORT || 3000);

// middlewares
server.use(morgan('common'));
server.use(cors());
server.use(express.urlencoded({ extended: false }));
server.use(express.json());

// routes
server.use(url, UserRoutes);

module.exports = server;
