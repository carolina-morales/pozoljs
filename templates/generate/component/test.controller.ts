import { Request, Response } from 'express';
import TestService from './test.service';
import { ITest } from './test.interface';

export default class TestController {
	private tests: Array<ITest>;

	constructor(private testService = new TestService()) {}

	getTests = async (req: Request, res: Response): Promise<Response> => {
		try {
			this.tests = await this.testService.findAll();
			return this.tests;
		} catch (error) {
			console.error(error);
			return res.status(500).send(`An error ocurred in TestController.getTests: ${error}`);
		}
	};
}
