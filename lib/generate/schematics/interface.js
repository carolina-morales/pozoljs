import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import Listr from 'listr';
import ejs from 'ejs';
import { getFileOptions, fileExists } from '../../utils/functions';

// files content to copy
let directoryComponentTemplates = path.join(__dirname, './templates');
let fileInterfaceContent = fs.readFileSync(`${directoryComponentTemplates}\\__name.interface.ts.template`, 'utf8');

async function createFiles(options) {
	if (!fs.existsSync(options.targetDirectory)) {
		return Promise.reject(
			new Error(`Failed to create file. The folder: ${options.name.toLowerCase()} does not exists.`)
		);
	}

	const interfaceFile = `${options.targetDirectory}\\${options.name.toLowerCase()}.interface.ts`;

	const fileOptions = getFileOptions(options.name);
	fileInterfaceContent = ejs.render(fileInterfaceContent, fileOptions);

	if (fs.writeFileSync(interfaceFile, fileInterfaceContent))
		return Promise.reject(new Error('Failed to create interface file'));

	return;
}

export async function createInterface(options) {
	options = {
		...options,
		targetDirectory: options.targetDirectory || `${process.cwd()}\\src\\api\\${options.name.toLowerCase()}`
	};

	try {
		const interfaceFile = `${options.targetDirectory}\\${options.name.toLowerCase()}.interface.ts`;
		options = await fileExists(options, interfaceFile);
		if (!options.overrideFile) return true;

		const tasks = new Listr([
			{
				title: 'Creating file',
				task: () => createFiles(options)
			}
		]);

		await tasks.run();

		console.log('%s Interface ready', chalk.green.bold('DONE'));
		return true;
	} catch (error) {
		console.error('%s Error while generate interface file', chalk.red.bold('ERROR'), error);
		process.exit(1);
	}
}
