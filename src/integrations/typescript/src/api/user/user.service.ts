import { AbstractService } from '../../global/helpers/abstract.service';
import { IUser } from './user.interface';

export default class UserService extends AbstractService {
	private users: IUser[] = [];

	find = async (user: Partial<IUser>): Promise<IUser[]> => {
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
