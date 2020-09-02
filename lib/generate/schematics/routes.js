import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import Listr from 'listr';
import ejs from 'ejs';
import { getFileOptions, fileExists } from '../../utils/functions';

// files content to copy
let directoryComponentTemplates = path.join(__dirname, './templates');
let fileRoutesContent = fs.readFileSync(`${directoryComponentTemplates}\\__name.routes.ts.template`, 'utf8');

async function createFiles(options) {
	if (!fs.existsSync(options.targetDirectory)) {
		return Promise.reject(
			new Error(`Failed to create file. The folder: ${options.name.toLowerCase()} does not exists.`)
		);
	}

	const routesFile = `${options.targetDirectory}\\${options.name.toLowerCase()}.routes.ts`;

	const fileOptions = getFileOptions(options.name);
	fileRoutesContent = ejs.render(fileRoutesContent, fileOptions);

	if (fs.writeFileSync(routesFile, fileRoutesContent))
		return Promise.reject(new Error('Failed to create routes file'));

	return;
}

export async function createRoutes(options) {
	options = {
		...options,
		targetDirectory: options.targetDirectory || `${process.cwd()}\\src\\api\\${options.name.toLowerCase()}`
	};

	try {
		const routesFile = `${options.targetDirectory}\\${options.name.toLowerCase()}.routes.ts`;
		options = await fileExists(options, routesFile);
		if (!options.overrideFile) return true;

		const tasks = new Listr([
			{
				title: 'Creating file',
				task: () => createFiles(options)
			}
		]);

		await tasks.run();

		console.log('%s Routes file ready', chalk.green.bold('DONE'));
		return true;
	} catch (error) {
		console.error('%s Error while generate routes file', chalk.red.bold('ERROR'), error);
		process.exit(1);
	}
}
