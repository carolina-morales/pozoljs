import { AbstractService } from '../../global/helpers/abstract.service';
import { IUser } from './user.interface';

export default class UserService extends AbstractService {
	private users: IUser[] = [];

	find(user: Partial<IUser>): Promise<any> {
		throw new Error('Method not implemented.');
	}

	save = async (user: IUser): Promise<any> => {
		throw new Error('Method not implemented.');
	};

	update = async (id: number, user: IUser): Promise<any> => {
		throw new Error('Method not implemented.');
	};

	delete = async (id: number): Promise<any> => {
		throw new Error('Method not implemented.');
	};
}
