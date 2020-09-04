import inquirer from 'inquirer';
import chalk from 'chalk';
import { createController } from './schematics/controller';
import { createService } from './schematics/service';
import { createInterface } from './schematics/interface';
import { createRoutes } from './schematics/routes';
import { createFolderTask } from '../../utils/functions';
import { integrations, types, regex } from '../../utils/variables';

async function promptForMissingOptions(options) {
	const isTypeExists = types.includes(options.type);

	const questions = [];
	if (!isTypeExists) {
		questions.push({
			type: 'list',
			name: 'type',
			message: 'Choose the schema type to generate:',
			choices: types
		});
	}

	if (!options.name) {
		questions.push({
			type: 'text',
			name: 'name',
			message: 'Please type the name:'
		});
	}

	if (!options.template) {
		questions.push({
			type: 'list',
			name: 'template',
			message: 'Please choose which template to use:',
			choices: integrations
		});
	}

	const answers = await inquirer.prompt(questions);

	if (!answers.type && !options.type) return Promise.reject(new Error('You must choose the schema type to generate'));
	if (!answers.name && !options.name) return Promise.reject(new Error('You must provide the name'));
	if (!answers.template && !options.template) return Promise.reject(new Error('You must choose the template'));

	if (!regex.test(answers.name) || !regex.test(options.name)) {
		return Promise.reject(Error('The name of the schema must not contain numbers or special characters'));
	}

	return {
		...options,
		type: options.type.toLowerCase() || answers.type.toLowerCase(),
		name: options.name.toLowerCase() || answers.name.toLowerCase(),
		template: answers.template
	};
}

export async function generateCliElement(options) {
	try {
		if (!types.includes(options.type) || !options.name || !options.template) {
			options = await promptForMissingOptions(options);
		}

		options = {
			...options,
			targetDirectory: options.targetDirectory || `${process.cwd()}\\src\\api\\${options.name.toLowerCase()}`,
			extensionFile: options.template.toLowerCase() === 'typescript' ? 'ts' : 'js'
		};

		let created;
		switch (options.type) {
			case 'component':
				created =
					(await createFolderTask(options)) &&
					(await createController(options)) &&
					(await createService(options)) &&
					(await createInterface(options)) &&
					(await createRoutes(options));
				console.log('%s Component ready', chalk.green.bold('DONE'));
				return created;
			case 'controller':
				created = await createController(options);
				console.log('%s Controller ready', chalk.green.bold('DONE'));
				return created;
			case 'service':
				created = await createService(options);
				console.log('%s Service ready', chalk.green.bold('DONE'));
				return created;
			case 'interface':
				created = await createInterface(options);
				console.log('%s Interface ready', chalk.green.bold('DONE'));
				return created;
			case 'routes':
				created = await createRoutes(options);
				if (options.template.toLowerCase() !== 'typescript') {
					console.log('%s Routes ready', chalk.green.bold('DONE'));
				}
				return created;
			default:
				created =
					(await createFolderTask(options)) &&
					(await createController(options)) &&
					(await createService(options)) &&
					(await createInterface(options)) &&
					(await createRoutes(options));
				console.log('%s Component ready', chalk.green.bold('DONE'));
				return created;
		}
	} catch (error) {
		console.log(error);
		console.error('%s Error while generate', chalk.red.bold('ERROR'), error);
		process.exit(1);
	}
}
