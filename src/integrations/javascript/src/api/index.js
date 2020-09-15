const UserRoutes = require('./user/user.routes');

module.exports = function(server) {
	const url = '/api/test';

	server.use(url, UserRoutes);
};
