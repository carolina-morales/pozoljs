import chalk from 'chalk';
import fs from 'fs';
import fsExtra from 'fs-extra';
import ncp from 'ncp';
import path from 'path';
import execa from 'execa';
import Listr from 'listr';
import { promisify } from 'util';

const access = promisify(fs.access);
const copy = promisify(ncp);

async function createFolder(options) {
	const { targetDirectory } = options;
	if (!fs.existsSync(targetDirectory)) {
		fs.mkdirSync(targetDirectory);
	} else {
		return Promise.reject(new Error('Failed to create folder, maybe the folder already exists'));
	}
}

async function createFiles(options) {
	const controllerFile = `${options.targetDirectory}\\${options.name}.controller.ts`;
	const serviceFile = `${options.targetDirectory}\\${options.name}.service.ts`;
	const interfaceFile = `${options.targetDirectory}\\${options.name}.interface.ts`;
	const routesFile = `${options.targetDirectory}\\${options.name}.routes.ts`;
	const testingFile = `${options.targetDirectory}\\${options.name}.spec.ts`;

	if (fs.appendFileSync(controllerFile, '')) return Promise.reject(new Error('Failed to create controller file'));

	if (fs.appendFileSync(serviceFile, '')) return Promise.reject(new Error('Failed to create service file'));

	if (fs.appendFileSync(interfaceFile, '')) return Promise.reject(new Error('Failed to create interface file'));

	if (fs.appendFileSync(routesFile, '')) return Promise.reject(new Error('Failed to create routes file'));

	if (options.withTest) {
		if (fs.appendFileSync(testingFile, '')) return Promise.reject(new Error('Failed to create testing file'));
	}

	return;
}

export async function createComponent(options) {
	options = {
		...options,
		targetDirectory: options.targetDirectory || `${process.cwd()}\\src\\api\\${options.name}`
	};

	console.log(options);

	try {
		const tasks = new Listr([
			{
				title: 'Creating folder',
				task: () => createFolder(options)
			},
			{
				title: 'Creating initialize files',
				task: () => createFiles(options)
			}
		]);

		await tasks.run();

		console.log('%s Component ready', chalk.green.bold('DONE'));
		return true;
	} catch (error) {
		console.error('%s Error while generate component', chalk.red.bold('ERROR'), error);
		process.exit(1);
	}
}
