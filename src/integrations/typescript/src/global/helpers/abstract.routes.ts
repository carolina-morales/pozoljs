import { Router } from 'express';
import { IRoute } from '../interfaces';

export abstract class AbstractRoutes {
  protected router = Router();
  public abstract path: string;
  protected abstract readonly routes: IRoute[] = [];

  public setRoutes = (): Router => {
    for (const route of this.routes) {
      const routeFullPath = `${this.path}${route.path}`;
      for (const middleware of route.localMiddleware) {
        this.router.use(routeFullPath, middleware);
      };

      switch (route.method) {
        case 'GET':
          this.router.get(routeFullPath, route.handler);
          break;
        case 'POST':
          this.router.post(routeFullPath, route.handler);
          break;
        case 'PUT':
          this.router.put(routeFullPath, route.handler);
          break;
        case 'DELETE':
          this.router.delete(routeFullPath, route.handler);
          break;
        default: throw new Error('Not a valid method');
      }
    }

    return this.router;
  }
}
