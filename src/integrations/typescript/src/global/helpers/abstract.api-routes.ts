import { Express } from 'express';
import { AbstractRoutes } from "./abstract.routes";

export default abstract class AbstractApiRoutes {
  protected server: Express;
  protected path: string = '/api';
  protected abstract readonly routes: AbstractRoutes[];

  constructor(server: Express) {
    this.server = server;
  }

  public loadRoutes = (): void => {
    this.routes.forEach(route => {
      this.server.use(this.path, route.setRoutes());
    });
  }
}
