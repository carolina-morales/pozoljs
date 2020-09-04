import chalk from 'chalk';
import Listr from 'listr';
import fs from 'fs';
import { fileExists, folderExists, createFiles } from '../../../utils/functions';

export async function createRoutes(options) {
	try {
		if (!fs.existsSync(options.targetDirectory)) {
			fs.mkdirSync(options.targetDirectory);
		}

		const routesFile = `${options.targetDirectory}\\${options.name.toLowerCase()}.routes.${options.extensionFile}`;
		options = await fileExists(options, routesFile);
		if (!options.overrideFile) return true;

		const tasks = new Listr([
			{
				title: 'Creating routes file',
				task: () => createFiles(options, 'routes')
			}
		]);

		await tasks.run();
		return true;
	} catch (error) {
		console.error('%s Error while generate routes file', chalk.red.bold('ERROR'), error);
		process.exit(1);
	}
}
