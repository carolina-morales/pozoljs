import express, { json, urlencoded } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import currentEnv from './config/environments/index.config';

import UserRoutes from './api/user/user.routes';

// initialization
const server = express();

// settings
const url = '/api';
server.set('port', currentEnv.PORT || 3000);

// middlewares
server.use(morgan('common'));
server.use(cors());
server.use(urlencoded({ extended: false }));
server.use(json());

// routes
server.use(url, UserRoutes);

export default server;
