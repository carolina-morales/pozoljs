import { Request, Response } from 'express';
import { IUser } from './user.interface';
import UserService from './user.service';

export default class UserController {
	static getUsers = async (req: Request, res: Response): Promise<Response> => {
		try {
			const users: IUser[] = await UserService.getAll();

			if (users.length === 0) {
				return res.status(404).json({ msg: 'Not found registers' });
			}

			return res.json({ users });
		} catch (error) {
			console.error('Error in UserController.getUsers', error);
			return res.status(500).send(error);
		}
	};
}
