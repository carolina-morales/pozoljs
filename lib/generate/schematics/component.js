import chalk from 'chalk';
import fs from 'fs';
import ncp from 'ncp';
import path from 'path';
import Listr from 'listr';
import ejs from 'ejs';
import { promisify } from 'util';
import { getFileOptions } from '../../utils/functions';

const access = promisify(fs.access);
const copy = promisify(ncp);

// files content to copy
let directoryComponentTemplates = path.join(__dirname, './templates');

let fileControllerContent = fs.readFileSync(`${directoryComponentTemplates}\\__name.controller.ts.template`, 'utf8');
let fileServiceContent = fs.readFileSync(`${directoryComponentTemplates}\\__name.service.ts.template`, 'utf8');
let fileRoutesContent = fs.readFileSync(`${directoryComponentTemplates}\\__name.routes.ts.template`, 'utf8');
let fileInterfaceContent = fs.readFileSync(`${directoryComponentTemplates}\\__name.interface.ts.template`, 'utf8');

async function createFolder(options) {
	const { targetDirectory } = options;
	if (!fs.existsSync(targetDirectory)) {
		fs.mkdirSync(targetDirectory);
	} else {
		return Promise.reject(new Error('Failed to create folder, maybe the folder already exists'));
	}
}

async function createFiles(options) {
	const controllerFile = `${options.targetDirectory}\\${options.name.toLowerCase()}.controller.ts`;
	const serviceFile = `${options.targetDirectory}\\${options.name.toLowerCase()}.service.ts`;
	const interfaceFile = `${options.targetDirectory}\\${options.name.toLowerCase()}.interface.ts`;
	const routesFile = `${options.targetDirectory}\\${options.name.toLowerCase()}.routes.ts`;
	const testingFile = `${options.targetDirectory}\\${options.name.toLowerCase()}.spec.ts`;

	const fileOptions = getFileOptions(options.name);

	fileControllerContent = ejs.render(fileControllerContent, fileOptions);
	fileInterfaceContent = ejs.render(fileInterfaceContent, fileOptions);
	fileServiceContent = ejs.render(fileServiceContent, fileOptions);
	fileRoutesContent = ejs.render(fileRoutesContent, fileOptions);

	if (fs.writeFileSync(controllerFile, fileControllerContent, 'utf8'))
		return Promise.reject(new Error('Failed to create controller file'));

	if (fs.writeFileSync(serviceFile, fileServiceContent))
		return Promise.reject(new Error('Failed to create service file'));

	if (fs.writeFileSync(interfaceFile, fileInterfaceContent))
		return Promise.reject(new Error('Failed to create interface file'));

	if (fs.writeFileSync(routesFile, fileRoutesContent))
		return Promise.reject(new Error('Failed to create routes file'));

	if (options.withTest) {
		if (fs.appendFileSync(testingFile, '')) return Promise.reject(new Error('Failed to create testing file'));
	}

	return;
}

export async function createComponent(options) {
	options = {
		...options,
		targetDirectory: options.targetDirectory || `${process.cwd()}\\src\\api\\${options.name.toLowerCase()}`
	};

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
