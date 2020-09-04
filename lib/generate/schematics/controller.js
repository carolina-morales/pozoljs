import chalk from 'chalk';
import Listr from 'listr';
import fs from 'fs';
import { fileExists, folderExists, createFiles } from '../../../utils/functions';

export async function createController(options) {
	try {
		if (!fs.existsSync(options)) {
			fs.mkdirSync(options.targetDirectory);
		}

		const controllerFile = `${options.targetDirectory}\\${options.name.toLowerCase()}.controller.${options.extensionFile}`;
		options = await fileExists(options, controllerFile);
		if (!options.overrideFile) return true;

		const tasks = new Listr([
			{
				title: 'Creating controller file',
				task: () => createFiles(options, 'controller')
			}
		]);

		await tasks.run();
		return true;
	} catch (error) {
		console.error('%s Error while generate controller file', chalk.red.bold('ERROR'), error);
		process.exit(1);
	}
}
