import AbstractApiRoutes from '../global/helpers/abstract.api-routes';
import { IConfigRoute } from '../global/interfaces';
import UserRoutes from './user/user.routes';
import { checkMw } from '../middlewares/checkMw.middleware';

export default class ApiRoutes extends AbstractApiRoutes {
	/**
	 * These middlewares that you configure here
	 * will be applied for each component route
	 */
	protected configRoutes: IConfigRoute[] = [
		{
			routes: new UserRoutes(),
			middlewares: [checkMw]
		}
	];
}
