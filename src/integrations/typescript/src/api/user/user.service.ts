import { AbstractService } from '../../global/services/abstract.service';
import { ISearchUser, IUser } from './user.interface';

export default class UserService extends AbstractService {
	private users: Array<IUser> = [];

	findAll = async (): Promise<Array<IUser>> => {
		try {
			return this.users;
		} catch (error) {
			throw error;
		}
	};

	findById = async (id: number): Promise<Array<IUser>> => {
		try {
			return this.users;
		} catch (error) {
			throw error;
		}
	};

	findOne = async (user: ISearchUser): Promise<Array<IUser>> => {
		try {
			return this.users;
		} catch (error) {
			throw error;
		}
	};

	save = async (user: IUser): Promise<any> => {
		try {
			return true;
		} catch (error) {
			throw error;
		}
	};

	update = async (id: number, user: IUser): Promise<any> => {
		try {
			return true;
		} catch (error) {
			throw error;
		}
	};

	delete = async (id: number): Promise<any> => {
		try {
			return true;
		} catch (error) {
			throw error;
		}
	};
}
