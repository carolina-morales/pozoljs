import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import Listr from 'listr';
import ejs from 'ejs';
import { getFileOptions, fileExists } from '../../utils/functions';

// files content to copy
let directoryComponentTemplates = path.join(__dirname, './templates');
let fileControllerContent = fs.readFileSync(`${directoryComponentTemplates}\\__name.controller.ts.template`, 'utf8');

async function createFiles(options) {
	if (!fs.existsSync(options.targetDirectory)) {
		return Promise.reject(
			new Error(`Failed to create file. The folder: ${options.name.toLowerCase()} does not exists.`)
		);
	}

	const controllerFile = `${options.targetDirectory}\\${options.name.toLowerCase()}.controller.ts`;

	const fileOptions = getFileOptions(options.name);
	fileControllerContent = ejs.render(fileControllerContent, fileOptions);

	if (fs.writeFileSync(controllerFile, fileControllerContent, 'utf8'))
		return Promise.reject(new Error('Failed to create controller file'));

	return;
}

export async function createController(options) {
	options = {
		...options,
		targetDirectory: options.targetDirectory || `${process.cwd()}\\src\\api\\${options.name.toLowerCase()}`
	};

	try {
		const controllerFile = `${options.targetDirectory}\\${options.name.toLowerCase()}.controller.ts`;
		options = await fileExists(options, controllerFile);
		if (!options.overrideFile) return true;

		const tasks = new Listr([
			{
				title: 'Creating file',
				task: () => createFiles(options)
			}
		]);

		await tasks.run();

		console.log('%s Controller ready', chalk.green.bold('DONE'));
		return true;
	} catch (error) {
		console.error('%s Error while generate controller file', chalk.red.bold('ERROR'), error);
		process.exit(1);
	}
}
