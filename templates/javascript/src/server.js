const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const server = express();

// Settings
server.set('port', process.env.PORT || 3000);

// Middlewares
server.use(morgan('common'));
server.use(cors());
server.use(express.urlencoded({ extended: false }));
server.use(json());

module.exports = server;
