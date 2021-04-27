import { Express } from 'express';
import { IConfigRoute } from '../interfaces';

export default abstract class AbstractApiRoutes {
  protected server: Express;
  protected path: string = '/api';
  protected abstract readonly configRoutes: IConfigRoute[];

  constructor(server: Express) {
    this.server = server;
  }

  public loadRoutes = (): void => {
    for (const config of this.configRoutes) {
      this.server.use(`${this.path}${config.routes.path}`, config.middlewares.map(mw => mw), config.routes.setRoutes());
    }
  }
}
