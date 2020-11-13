import { Request, Response } from 'express';
import UserService from './user.service';
import { IUser } from './user.interface';

export default class UserController {
	private users: IUser[] = [];

	constructor(private _userService = new UserService()) { }

	getUsers = async (req: Request, res: Response): Promise<Response> => {
		try {
			this.users = await this._userService.find(req.query);
			return res.json(this.users);
		} catch (error) {
			console.error('Error in UserController.getUsers', error);
			return res.status(500).send(error);
		}
	};
}
