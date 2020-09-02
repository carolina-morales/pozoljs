import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import Listr from 'listr';
import ejs from 'ejs';
import { getFileOptions, fileExists } from '../../utils/functions';

// files content to copy
let directoryComponentTemplates = path.join(__dirname, './templates');
let fileServiceContent = fs.readFileSync(`${directoryComponentTemplates}\\__name.service.ts.template`, 'utf8');

async function createFiles(options) {
	if (!fs.existsSync(options.targetDirectory)) {
		return Promise.reject(
			new Error(`Failed to create file. The folder: ${options.name.toLowerCase()} does not exists.`)
		);
	}

	const serviceFile = `${options.targetDirectory}\\${options.name.toLowerCase()}.service.ts`;

	const fileOptions = getFileOptions(options.name);
	fileServiceContent = ejs.render(fileServiceContent, fileOptions);

	if (fs.writeFileSync(serviceFile, fileServiceContent))
		return Promise.reject(new Error('Failed to create service file'));

	return;
}

export async function createService(options) {
	options = {
		...options,
		targetDirectory: options.targetDirectory || `${process.cwd()}\\src\\api\\${options.name.toLowerCase()}`
	};

	try {
		const serviceFile = `${options.targetDirectory}\\${options.name.toLowerCase()}.service.ts`;
		options = await fileExists(options, serviceFile);
		if (!options.overrideFile) return true;

		const tasks = new Listr([
			{
				title: 'Creating file',
				task: () => createFiles(options)
			}
		]);

		await tasks.run();

		console.log('%s Service ready', chalk.green.bold('DONE'));
		return true;
	} catch (error) {
		console.error('%s Error while generate service file', chalk.red.bold('ERROR'), error);
		process.exit(1);
	}
}
