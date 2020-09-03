import chalk from 'chalk';
import fs from 'fs';
import Listr from 'listr';
import ejs from 'ejs';
import { getFileOptions, fileExists, readFileContent, folderExists } from '../../../utils/functions';

async function createFiles(options) {
	const routesFile = `${options.targetDirectory}\\${options.name.toLowerCase()}.routes.ts`;

	const fileOptions = getFileOptions(options.name);
	let fileRoutesContent = await readFileContent(options, 'routes');
	fileRoutesContent = ejs.render(fileRoutesContent, fileOptions);

	if (fs.writeFileSync(routesFile, fileRoutesContent))
		return Promise.reject(new Error('Failed to create routes file'));

	return;
}

export async function createRoutes(options) {
	try {
		if (!folderExists(options))
			return Promise.reject(
				new Error(`Failed to create file. The folder: ${options.name.toLowerCase()} does not exists.`)
			);

		const routesFile = `${options.targetDirectory}\\${options.name.toLowerCase()}.routes.ts`;
		options = await fileExists(options, routesFile);
		if (!options.overrideFile) return true;

		const tasks = new Listr([
			{
				title: 'Creating routes file',
				task: () => createFiles(options)
			}
		]);

		await tasks.run();
		return true;
	} catch (error) {
		console.error('%s Error while generate routes file', chalk.red.bold('ERROR'), error);
		process.exit(1);
	}
}
