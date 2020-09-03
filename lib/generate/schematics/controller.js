import chalk from 'chalk';
import fs from 'fs';
import Listr from 'listr';
import ejs from 'ejs';
import { getFileOptions, fileExists, readFileContent, folderExists } from '../../../utils/functions';

async function createFiles(options) {
	const controllerFile = `${options.targetDirectory}\\${options.name.toLowerCase()}.controller.ts`;

	const fileOptions = getFileOptions(options.name);
	let fileControllerContent = await readFileContent(options, 'controller');
	fileControllerContent = ejs.render(fileControllerContent, fileOptions);

	if (fs.writeFileSync(controllerFile, fileControllerContent, 'utf8'))
		return Promise.reject(new Error('Failed to create controller file'));

	return;
}

export async function createController(options) {
	try {
		if (!folderExists(options))
			return Promise.reject(
				new Error(`Failed to create file. The folder: ${options.name.toLowerCase()} does not exists.`)
			);

		const controllerFile = `${options.targetDirectory}\\${options.name.toLowerCase()}.controller.ts`;
		options = await fileExists(options, controllerFile);
		if (!options.overrideFile) return true;

		const tasks = new Listr([
			{
				title: 'Creating controller file',
				task: () => createFiles(options)
			}
		]);

		await tasks.run();
		return true;
	} catch (error) {
		console.error('%s Error while generate controller file', chalk.red.bold('ERROR'), error);
		process.exit(1);
	}
}
