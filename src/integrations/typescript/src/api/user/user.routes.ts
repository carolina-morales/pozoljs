import { Router } from 'express';
import { AbstractRoutes } from '../../global/helpers/abstract.routes';
import { IRoute, Methods } from '../../global/interfaces';
import { checkMw } from '../../middlewares/checkMw.middleware';
import UserController from './user.controller';

export default class UserRoutes extends AbstractRoutes {
  private _userController = new UserController();

  constructor() {
    super();
  }

  public path: string = '/usuarios';
  protected routes: IRoute[] = [
    {
      path: '/',
      method: Methods.GET,
      handler: this._userController.getUsers,
      localMiddleware: [checkMw]
    }
  ];

}
