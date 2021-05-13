const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const { environments } = require('./config/environments');

const ApiRoutes = require('./api');

// initialization
const server = express();

// settings
server.set('port', environments.PORT || 3000);

// middlewares
server.use(morgan('common'));
server.use(cors());
server.use(express.urlencoded({ extended: false }));
server.use(express.json());

// routes
ApiRoutes(server);

module.exports = server;
