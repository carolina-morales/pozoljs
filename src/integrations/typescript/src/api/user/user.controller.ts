import { Request, Response } from 'express';
import UserService from './user.service';
import { IUser } from './user.interface';

export default class UserController {
	private users: Array<IUser> = [];

	constructor(private _userService = new UserService()) {}

	getUsers = async (req: Request, res: Response): Promise<Response> => {
		try {
			this.users = await this._userService.findAll();

			if (this.users.length === 0) {
				return res.status(404).json({ msg: 'Not found registers' });
			}

			return res.json({ users: this.users });
		} catch (error) {
			console.error('Error in UserController.getUsers', error);
			return res.status(500).send(error);
		}
	};
}
