import inquirer from 'inquirer';
import chalk from 'chalk';
import { createComponent } from './schematics/component';
import { createController } from './schematics/controller';
import { createService } from './schematics/service';
import { createInterface } from './schematics/interface';
import { createRoutes } from './schematics/routes';

const types = [ 'component', 'controller', 'service', 'interface', 'routes' ];

async function promptForMissingOptions(options) {
	const isTypeExists = types.includes(options.type);

	const questions = [];
	if (!isTypeExists) {
		questions.push({
			type: 'list',
			name: 'type',
			message: 'Choose the type generate',
			choices: types
		});
	}

	if (!options.name) {
		questions.push({
			type: 'text',
			name: 'name',
			message: 'Please type the name'
		});
	}

	const answers = await inquirer.prompt(questions);

	if (!answers.type) return Promise.reject(new Error('You must choose the type generate'));
	if (!answers.name) return Promise.reject(new Error('You must typing the name'));

	return {
		...options,
		type: answers.type.toLowerCase(),
		name: answers.name.toLowerCase()
	};
}

export async function generateCliElement(options) {
	try {
		if (!types.includes(options.type) || !options.name) {
			options = await promptForMissingOptions(options);
		}

		switch (options.type) {
			case 'component':
				return await createComponent(options);
			case 'controller':
				return await createController(options);
			case 'service':
				return await createService(options);
			case 'interface':
				return await createInterface(options);
			case 'routes':
				return await createRoutes(options);
			default:
				return await createComponent(options);
		}
	} catch (error) {
		console.error('%s Error while generate', chalk.red.bold('ERROR'), error);
		process.exit(1);
	}
}
