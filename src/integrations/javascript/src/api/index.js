const UserRoutes = require('./user/user.routes');

module.exports = function(server) {
	const url = '/api';

	server.use(`${url}/users`, UserRoutes);
};
