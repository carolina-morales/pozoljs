import { IUser } from '../../interfaces';

export default class UserService {
	static getAll = async (): Promise<IUser[]> => {
		try {
			const users: IUser[] = [
				{
					name: 'John',
					lastname: 'Smith'
				}
			];

			return users;
		} catch (error) {
			console.log('16', error);
			throw error;
		}
	};
}
