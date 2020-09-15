import express, { json, urlencoded } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import currentEnv from './config/environments';

import ApiRoutes from './api';

// initialization
const server = express();

// settings
server.set('port', currentEnv.PORT || 3000);

// middlewares
server.use(morgan('common'));
server.use(cors());
server.use(urlencoded({ extended: false }));
server.use(json());

// routes
ApiRoutes(server);

export default server;
