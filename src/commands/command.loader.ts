import chalk from 'chalk';
import { CommanderStatic } from 'commander';
import { NewAction, GenerateAction } from '../actions';
import { NewCommand } from './new.command';
import { GenerateCommand } from './generate.command';

export class CommandLoader {
	public static load(program: CommanderStatic): void {
		new NewCommand(new NewAction()).load(program);
		new GenerateCommand(new GenerateAction()).load(program);

		this.handleInvalidCommand(program);
	}

	private static handleInvalidCommand(program: CommanderStatic) {
		program.on('command:*', () => {
			console.error(`\nInvalid command: ${chalk.red('%s')}`, program.args.join(' '));
			console.log(`See ${chalk.red('-h')} or ${chalk.red('--help')} for a list of available commands.\n`);
			process.exit(1);
		});
	}
}
