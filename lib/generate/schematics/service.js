import chalk from 'chalk';
import Listr from 'listr';
import fs from 'fs';
import { fileExists, folderExists, createFiles } from '../../../utils/functions';

export async function createService(options) {
	try {
		if (!fs.existsSync(options.targetDirectory)) {
			fs.mkdirSync(options.targetDirectory);
		}

		const serviceFile = `${options.targetDirectory}\\${options.name.toLowerCase()}.service.${options.extensionFile}`;
		options = await fileExists(options, serviceFile);
		if (!options.overrideFile) return true;

		const tasks = new Listr([
			{
				title: 'Creating service file',
				task: () => createFiles(options, 'service')
			}
		]);

		await tasks.run();
		return true;
	} catch (error) {
		console.error('%s Error while generate service file', chalk.red.bold('ERROR'), error);
		process.exit(1);
	}
}
