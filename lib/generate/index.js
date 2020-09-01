import inquirer from 'inquirer';
import chalk from 'chalk';
import { createComponent } from './component';

const types = [ 'component' ];

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
				await createComponent(options);
				break;
			default:
				await createComponent(options);
				break;
		}
	} catch (error) {
		console.error('%s Error while generate', chalk.red.bold('ERROR'), error);
		process.exit(1);
	}
}
