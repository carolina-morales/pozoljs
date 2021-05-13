const { environments } = require('./config/environments');
const server = require('./server');

server.listen(server.get('port'));
console.log(`Server ${environments.APP_NAME} is running on port`, server.get('port'));

process.on('SIGINT', function () {
	process.exit();
});
