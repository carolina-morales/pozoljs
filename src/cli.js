import arg from 'arg';
import inquirer from 'inquirer';
import { createProject } from './main';
import { generateCliElement } from '../lib/generate/index';

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
			'-g': '--git',
			'-y': '--yes',
			'-i': '--install',
			'-t': '--template',
			'-g': '--generate'
		},
		{
			argv: rawArgs.slice(2)
		}
	);

	if (args['--generate']) {
		obj = {
			generate: args['--generate'] || false,
			type: args._[0] || '',
			name: args._[1] || ''
		};
	} else {
		obj = {
			directoryName: args._[0],
			skipPrompts: args['--yes'] || false,
			git: args['--git'] || false,
			template: args['--template'],
			runInstall: args['--install'] || true
		};
	}

	return obj;
}

async function promptForMissingOptions(options) {
	const defaultTemplate = 'JavaScript';
	const defaultDirectoryName = 'pozol-project';

	if (options.skipPrompts) {
		return {
			...options,
			template: options.template || defaultTemplate,
			directoryName: options.directoryName || defaultDirectoryName
		};
	}

	const questions = [];
	if (!options.directoryName) {
		questions.push({
			type: 'text',
			name: 'directoryName',
			message: 'Please type the project name',
			default: defaultDirectoryName
		});
	}

	if (!options.template) {
		questions.push({
			type: 'list',
			name: 'template',
			message: 'Please choose which project template to use',
			choices: [ 'JavaScript', 'TypeScript' ],
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
	return {
		...options,
		template: options.template || answers.template,
		git: options.git || answers.git,
		directoryName: options.directoryName || answers.directoryName
	};
}

export async function cli(args) {
	let options = parseArgumentsIntoOptions(args);
	if (options.generate) {
		await generateCliElement(options);
	} else {
		options = await promptForMissingOptions(options);
		await createProject(options);
	}
}
