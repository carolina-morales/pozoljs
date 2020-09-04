import chalk from 'chalk';
import Listr from 'listr';
import { fileExists, folderExists, createFiles } from '../../../utils/functions';

export async function createInterface(options) {
	if (options.template.toLowerCase() !== 'typescript') {
		return true;
	}

	try {
		if (!folderExists(options))
			return Promise.reject(
				new Error(`Failed to create file. The folder: ${options.name.toLowerCase()} does not exists.`)
			);

		const interfaceFile = `${options.targetDirectory}\\${options.name.toLowerCase()}.interface.${options.extensionFile}`;
		options = await fileExists(options, interfaceFile);
		if (!options.overrideFile) return true;

		const tasks = new Listr([
			{
				title: 'Creating interface file',
				task: () => createFiles(options, 'interface')
			}
		]);

		await tasks.run();
		return true;
	} catch (error) {
		console.error('%s Error while generate interface file', chalk.red.bold('ERROR'), error);
		process.exit(1);
	}
}
