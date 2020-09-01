import { ITest } from './test.interface';

export default class TestService {
	private test: Array<ITest>;

	findAll = async (): Promise<Array<ITest>> => {
		try {
			return this.test;
		} catch (error) {
			throw error;
		}
	};

	findOne = async (): Promise<Array<ITest>> => {
		try {
			return this.test;
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
