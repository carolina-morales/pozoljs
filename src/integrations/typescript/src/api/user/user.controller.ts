import { Request, Response } from 'express';
import UserService from './user.service';
import { IUser } from './user.interface';

export default class UserController {
	private users: IUser[] = [];

	constructor(private _userService = new UserService()) { }

	getUsers = async (req: Request, res: Response): Promise<Response> => {
		throw new Error('Method not implemented.');
	};

	saveUsers = async (req: Request, res: Response): Promise<Response> => {
		throw new Error('Method not implemented.');
	};

	updateUsers = async (req: Request, res: Response): Promise<Response> => {
		throw new Error('Method not implemented.');
	};

	deleteUsers = async (req: Request, res: Response): Promise<Response> => {
		throw new Error('Method not implemented.');
	};
}
