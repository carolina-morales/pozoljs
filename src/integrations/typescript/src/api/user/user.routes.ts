import { Router } from 'express';
import UserController from './user.controller';

export default class UserRoutes {
  private router = Router();

  constructor(
    private _userCtrl = new UserController()
  ) { }

  public init() {
    this.getRoutes();
    this.postRoutes();
    this.putRoutes();
    this.deleteRoutes();
    return this.router;
  }

  private getRoutes() {
    this.router.get('/', this._userCtrl.getUsers);
  }

  private postRoutes() {
    this.router.post('/', this._userCtrl.saveUsers);
  }

  private putRoutes() {
    this.router.put('/:id', this._userCtrl.updateUsers);
  }

  private deleteRoutes() {
    this.router.delete('/:id', this._userCtrl.deleteUsers);
  }
}
