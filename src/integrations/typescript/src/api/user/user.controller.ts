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

	saveUsers = async (req: Request, res: Response): Promise<Response> => {
		try {
			const saved = await this._userService.save(req.body);
			return res.send(saved);
		} catch (error) {
			console.error('Error in UserController.saveUsers', error);
			return res.status(500).send(error);
		}
	};

	updateUsers = async (req: Request, res: Response): Promise<Response> => {
		const { id } = req.params;

		try {
			const updated = await this._userService.update(parseInt(id), req.body);
			return res.send(updated);
		} catch (error) {
			console.error('Error in UserController.updateUsers', error);
			return res.status(500).send(error);
		}
	};

	deleteUsers = async (req: Request, res: Response): Promise<Response> => {
		const { id } = req.params;

		try {
			const deleted = await this._userService.delete(parseInt(id));
			return res.send(deleted);
		} catch (error) {
			console.error('Error in UserController.deleteUsers', error);
			return res.status(500).send(error);
		}
	};
}
