import chalk from 'chalk';
import { join } from 'path';
import Table from 'cli-table3';
import { existsSync, readFileSync } from 'fs';
import { Command, CommanderStatic } from 'commander';
import { AbstractCommand } from './abstract.command';
import { Input } from '../utils/interfaces';
import { schematics } from '../utils/variables';

export class GenerateCommand extends AbstractCommand {
	public load(program: CommanderStatic): void {
		program
			.command('generate <schematic> [name] [path]')
			.alias('g')
			.description(
				`Generate a node element.\n    Should be a relative path.\n    Available schematics:\n${this.commandDescription()}`
			)
			.option('--no-spec', 'No generate spec file')
			.action(async (schematic: string, name: string, path: string, command: Command) => {
				try {
					// validate if the schematic exists
					const isExistsSchematic = schematics.some(
						(schematicItem) =>
							schematicItem.name.includes(schematic) || schematicItem.alias.includes(schematic)
					);

					if (!isExistsSchematic)
						throw new Error(
							`Invalid schematic "${schematic}". Available schematics:\n${this.commandDescription()}`
						).message;

					// validate if the current dir is a project created using pozoljs
					const configFilePath = join(process.cwd(), 'pozol.config.json');
					if (!existsSync(configFilePath))
						throw new Error(
							`This directory is not a project created using pozoljs. Please, execute the command in the main folder`
						).message;

					// everything is correct
					const options: Input[] = [];
					const inputs: Input[] = [];
					const pozolConfig = JSON.parse(readFileSync(configFilePath, 'utf-8'));

					switch (schematic) {
						case 'cp':
							schematic = 'component';
							break;
						case 'ct':
							schematic = 'controller';
							break;
						case 'sv':
							schematic = 'service';
							break;
						case 'rt':
							schematic = 'routes';
							break;
						case 'ic':
							schematic = 'interface';
							break;
					}

					options.push({ name: 'no-spec', value: command.spec });
					options.push({ name: 'project-name', value: pozolConfig.name });
					options.push({ name: 'language', value: pozolConfig.language });

					inputs.push({ name: 'schematic', value: schematic.toLowerCase() });
					inputs.push({ name: 'name', value: name });
					inputs.push({ name: 'path', value: path });

					await this.action.handle(inputs, options);
				} catch (error) {
					console.error(chalk.red.bold('ERROR'), error);
					process.exit(1);
				}
			});
	}

	private commandDescription(): string {
		const leftMargin = '     ';
		const tableConfig = {
			head: [ 'name', 'alias' ],
			chars: {
				left: leftMargin.concat('│'),
				'top-left': leftMargin.concat('┌'),
				'bottom-left': leftMargin.concat('└'),
				mid: '',
				'left-mid': '',
				'mid-mid': '',
				'right-mid': ''
			}
		};

		const table: any = new Table(tableConfig);
		for (const schematic of schematics) {
			table.push([ schematic.name, schematic.alias ]);
		}

		return table.toString();
	}
}
