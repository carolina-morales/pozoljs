import { Express } from 'express';
import UserRoutes from './user/user.routes';

export default class ApiRoutes {
	private path = '/api'
	private server: Express;
	private routes = [
		new UserRoutes()
	]

	constructor(server: Express) {
		this.server = server;
	}

	public loadRoutes = () => {
		this.routes.forEach(route => {
			this.server.use(this.path, route.setRoutes());
		})
	}
}
