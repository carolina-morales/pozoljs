import { AbstractRoutes } from '../../global/helpers/abstract.routes';
import { IRoute, Methods } from '../../global/interfaces';
import { checkMw } from '../../middlewares/checkMw.middleware';
import UserController from './user.controller';

export default class UserRoutes extends AbstractRoutes {
  constructor(
    private _userController = new UserController()
  ) {
    super('/usuarios');
  }

  protected routes: IRoute[] = [
    {
      path: '/',
      method: Methods.GET,
      handler: this._userController.getUsers,
      localMiddleware: [checkMw]
    }
  ];

}
