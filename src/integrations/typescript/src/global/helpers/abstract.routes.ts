import { Router } from 'express';
import { IRoute, Methods } from '../interfaces';

export abstract class AbstractRoutes {
  protected router = Router();
  public path: string;
  protected readonly routes: IRoute[] = [];

  constructor(path: string) {
    this.path = path;
  }

  public setRoutes = (): Router => {
    for (const route of this.routes) {
      switch (route.method) {
        case Methods.GET:
          this.router.get(route.path, route.middlewares.map(mw => mw), route.handler);
          break;
        case Methods.POST:
          this.router.post(route.path, route.middlewares.map(mw => mw), route.handler);
          break;
        case Methods.PUT:
          this.router.put(route.path, route.middlewares.map(mw => mw), route.handler);
          break;
        case Methods.DELETE:
          this.router.delete(route.path, route.middlewares.map(mw => mw), route.handler);
          break;
        default: throw new Error('Not a valid method');
      }
    }

    return this.router;
  }
}
