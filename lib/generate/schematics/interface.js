import chalk from 'chalk';
import fs from 'fs';
import Listr from 'listr';
import ejs from 'ejs';
import { getFileOptions, fileExists, readFileContent, folderExists } from '../../../utils/functions';

async function createFiles(options) {
	const interfaceFile = `${options.targetDirectory}\\${options.name.toLowerCase()}.interface.ts`;

	const fileOptions = getFileOptions(options.name);
	let fileInterfaceContent = await readFileContent(options, 'interface');
	fileInterfaceContent = ejs.render(fileInterfaceContent, fileOptions);

	if (fs.writeFileSync(interfaceFile, fileInterfaceContent))
		return Promise.reject(new Error('Failed to create interface file'));

	return;
}

export async function createInterface(options) {
	try {
		if (!folderExists(options))
			return Promise.reject(
				new Error(`Failed to create file. The folder: ${options.name.toLowerCase()} does not exists.`)
			);

		const interfaceFile = `${options.targetDirectory}\\${options.name.toLowerCase()}.interface.ts`;
		options = await fileExists(options, interfaceFile);
		if (!options.overrideFile) return true;

		const tasks = new Listr([
			{
				title: 'Creating interface file',
				task: () => createFiles(options)
			}
		]);

		await tasks.run();
		return true;
	} catch (error) {
		console.error('%s Error while generate interface file', chalk.red.bold('ERROR'), error);
		process.exit(1);
	}
}
