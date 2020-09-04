import chalk from 'chalk';
import Listr from 'listr';
import { fileExists, folderExists, createFiles } from '../../../utils/functions';

export async function createRoutes(options) {
	try {
		if (!folderExists(options))
			return Promise.reject(
				new Error(`Failed to create file. The folder: ${options.name.toLowerCase()} does not exists.`)
			);

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
