import AbstractApiRoutes from '../global/helpers/abstract.api-routes';
import UserRoutes from './user/user.routes';

export default class ApiRoutes extends AbstractApiRoutes {
	protected routes = [
		new UserRoutes()
	];
}
