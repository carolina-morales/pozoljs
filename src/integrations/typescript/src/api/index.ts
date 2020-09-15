import { Express } from 'express';

import UserRoutes from './user/user.routes';

export default function(server: Express) {
	const url = '/api';

	server.use(url, UserRoutes);
}
