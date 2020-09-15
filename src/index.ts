import commander, { CommanderStatic } from 'commander';
import CLI from './cli';

const bootstrap = () => {
	const program: CommanderStatic = commander;
	const cli = new CLI(program);

	program
		.version(require('../package.json').version, '-v, --version', 'Output the current version')
		.usage('<command> [options]')
		.helpOption('-h, --help', 'Output usage information');

	cli.handle();

	commander.parse(process.argv);

	if (!process.argv.slice(2).length) program.outputHelp();
};

bootstrap();
