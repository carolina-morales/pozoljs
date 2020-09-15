import { Command, CommanderStatic } from 'commander';
import chalk from 'chalk';
import { AbstractCommand } from './abstract.command';
import { Input } from '../utils/interfaces';
import { langs } from '../utils/variables';

export class NewCommand extends AbstractCommand {
	public load(program: CommanderStatic): void {
		program
			.command('new [name]')
			.alias('n')
			.description('Generate new node-express project.')
			.option('--directory [directory]', 'Specify the destination directory. Must be a relative path')
			.option('-g, --skip-git', 'Skip git repository initialization,')
			.option('-i, --skip-install', 'Skip packages installation.')
			.option('-l, --language [language]', 'Programming language to you use: JavaScript or TypeScript.')
			.action(async (name: string, command: Command) => {
				try {
					const options: Input[] = [];
					const inputs: Input[] = [];
					options.push({ name: 'directory', value: command.directory });
					options.push({ name: 'skip-git', value: command.skipGit });
					options.push({ name: 'skip-install', value: command.skipInstall });

					if (!!command.language) {
						const langMatch = langs.includes(command.language);
						if (!langMatch)
							throw new Error(
								`Invalid language "${command.language}". Available languages: "javascript / js" and "typescript / ts"`
							).message;
						if (command.language === 'javascript' || command.language === 'js')
							command.language = 'javascript';
						if (command.language === 'typescript' || command.language === 'ts')
							command.language = 'typescript';
					}
					options.push({ name: 'language', value: command.language ? command.language : 'typescript' });

					inputs.push({ name: 'name', value: name });

					await this.action.handle(inputs, options);
				} catch (error) {
					console.error(chalk.red.bold('ERROR'), error);
					process.exit(1);
				}
			});
	}
}
