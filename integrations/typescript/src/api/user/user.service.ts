import ServiceAbstract from '../../global/models/service.model';
import { IUser } from './user.interface';

export default class UserService extends ServiceAbstract {
	private users: Array<IUser> = [];

	findAll = async (): Promise<Array<IUser>> => {
		try {
			return this.users;
		} catch (error) {
			throw error;
		}
	};

	findById = async (): Promise<Array<IUser>> => {
		try {
			return this.users;
		} catch (error) {
			throw error;
		}
	};

	findOne = async (): Promise<Array<IUser>> => {
		try {
			return this.users;
		} catch (error) {
			throw error;
		}
	};

	save = async (): Promise<any> => {
		try {
			return true;
		} catch (error) {
			throw error;
		}
	};

	update = async (): Promise<any> => {
		try {
			return true;
		} catch (error) {
			throw error;
		}
	};

	delete = async (): Promise<any> => {
		try {
			return true;
		} catch (error) {
			throw error;
		}
	};
}
