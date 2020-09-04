import arg from 'arg';
import inquirer from 'inquirer';
import { createProject } from './main';
import { generateCliElement } from '../lib/generate';
import chalk from 'chalk';
import figlet from 'figlet';
import { integrations, regex } from '../utils/variables';

export function parseArgumentsIntoOptions(rawArgs) {
	let obj = {};
	const args = arg(
		{
			'--git': Boolean,
			'--yes': Boolean,
			'--install': Boolean,
			'--template': String,
			'--generate': Boolean,
			'--no-test': Boolean,
			'-y': '--yes',
			'-i': '--install',
			'-t': '--template',
			'-g': '--generate'
		},
		{
			argv: rawArgs.slice(2)
		}
	);

	if (args['--generate'] || args['-g']) {
		if (args._[0] && !regex.test(args._[0])) {
			console.log(
				chalk.red.bold('ERROR'),
				'The name of the schema must not contain numbers or special characters'
			);
			return;
		}

		obj = {
			generate: args['--generate'] || false,
			type: args._[0] || '',
			name: args._[1] || '',
			template: args['--template'] || ''
		};
	} else {
		if (args._[0] && !regex.test(args._[0])) {
			console.log(
				chalk.red.bold('ERROR'),
				'The name of the schema must not contain numbers or special characters'
			);
			return;
		}

		obj = {
			projectName: args._[0],
			skipPrompts: args['--yes'] || false,
			git: args['--git'] || false,
			template: args['--template'],
			runInstall: args['--install'] || true
		};
	}

	return obj;
}

async function promptForMissingOptions(options) {
	const defaultTemplate = 'TypeScript';
	const defaultProjectName = 'pozol-project';

	if (options.skipPrompts) {
		return {
			...options,
			template: options.template || defaultTemplate,
			projectName: options.projectName || defaultProjectName
		};
	}

	const questions = [];
	if (!options.projectName) {
		questions.push({
			type: 'text',
			name: 'projectName',
			message: 'Please type the project name:',
			default: defaultProjectName
		});
	}

	if (!options.template) {
		questions.push({
			type: 'list',
			name: 'template',
			message: 'Please choose which project template to use:',
			choices: integrations,
			default: defaultTemplate
		});
	}

	if (!options.git) {
		questions.push({
			type: 'confirm',
			name: 'git',
			message: 'Initialize a git repository?',
			default: false
		});
	}

	const answers = await inquirer.prompt(questions);

	if (!regex.test(answers.projectName) || !regex.test(options.projectName)) {
		console.log(chalk.red.bold('ERROR'), 'The project name must not contain numbers or special characters');
		return;
	}

	return {
		...options,
		template: options.template || answers.template,
		git: options.git || answers.git,
		projectName: options.projectName || answers.projectName
	};
}

export async function cli(args) {
	let options = parseArgumentsIntoOptions(args);
	if (options.generate) {
		if (!await generateCliElement(options)) {
			console.error('%s Error while generate', chalk.red.bold('ERROR'));
		}
	} else {
		options = await promptForMissingOptions(options);
		await createProject(options);

		console.log('');

		console.log(chalk.green.bold('DONE'), `The pozol project was created`);

		console.log('');

		console.log(chalk.rgb(0, 0, 0).bold.bgCyan('GREAT'), 'Thanks to use Pozoljs :)');
		console.log('Do not forget to drink a cold pozol ;)');

		console.log('');

		console.log(`Go into the project:`, chalk.yellow.bold(`cd ${options.projectName}`));
		console.log(chalk.blue('Happy hacking!'));

		console.log('');

		figlet('Pozoljs', function(err, data) {
			if (err) {
				console.log('Something went wrong when try to print the figlet...');
				console.dir(err);
				return;
			}
			console.log(data);
		});
	}
}
