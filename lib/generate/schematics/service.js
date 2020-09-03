import chalk from 'chalk';
import fs from 'fs';
import Listr from 'listr';
import ejs from 'ejs';
import { getFileOptions, fileExists, readFileContent, folderExists } from '../../../utils/functions';

async function createFiles(options) {
	const serviceFile = `${options.targetDirectory}\\${options.name.toLowerCase()}.service.ts`;

	const fileOptions = getFileOptions(options.name);
	let fileServiceContent = await readFileContent(options, 'service');
	fileServiceContent = ejs.render(fileServiceContent, fileOptions);

	if (fs.writeFileSync(serviceFile, fileServiceContent))
		return Promise.reject(new Error('Failed to create service file'));

	return;
}

export async function createService(options) {
	try {
		if (!folderExists(options))
			return Promise.reject(
				new Error(`Failed to create file. The folder: ${options.name.toLowerCase()} does not exists.`)
			);

		const serviceFile = `${options.targetDirectory}\\${options.name.toLowerCase()}.service.ts`;
		options = await fileExists(options, serviceFile);
		if (!options.overrideFile) return true;

		const tasks = new Listr([
			{
				title: 'Creating service file',
				task: () => createFiles(options)
			}
		]);

		await tasks.run();
		return true;
	} catch (error) {
		console.error('%s Error while generate service file', chalk.red.bold('ERROR'), error);
		process.exit(1);
	}
}
