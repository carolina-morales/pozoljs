import express, { json, urlencoded, Express } from 'express';
import cors from 'cors';
import morgan from 'morgan';

import currentEnv from './config/environments';

import ApiRoutes from './api';

// initialization
export default class Server {
  private server: Express;

  constructor() {
    this.server = express();
    this.config();
    this.middlewares();
    this.init();
  }

  private config() {
    this.server.set('port', currentEnv.PORT || 3000);
  }

  private middlewares() {
    this.server.use(morgan('dev'));
    this.server.use(urlencoded({ extended: false }));
    this.server.use(cors());
    this.server.use(json());
  }

  private init() {
    new ApiRoutes(this.server).loadRoutes();
  }

  public start() {
    try {
      this.server.listen(this.server.get('port'));
      console.log('Server is running on port', this.server.get('port'));

      process.on('SIGINT', function () {
        process.exit();
      });
    } catch (error) {
      console.log('An error ocurred when the server try to start');
      process.exit(1);
    }
  }
}
