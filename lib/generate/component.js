import chalk from 'chalk';
import fs from 'fs';
import ncp from 'ncp';
import path from 'path';
import execa from 'execa';
import Listr from 'listr';
import { promisify } from 'util';

const access = promisify(fs.access);
const copy = promisify(ncp);

// files content to copy
let currentFileUrl = import.meta.url;
currentFileUrl = currentFileUrl.replace('file:///', '');
const templateDir = path.resolve(currentFileUrl, '../../../templates');

let fileControllerContent = fs.readFileSync(`${templateDir}\\generate\\component\\test.controller.ts`, 'utf8');
let fileServiceContent = fs.readFileSync(`${templateDir}\\generate\\component\\test.service.ts`, 'utf8');
let fileRoutesContent = fs.readFileSync(`${templateDir}\\generate\\component\\test.routes.ts`, 'utf8');
let fileInterfaceContent = fs.readFileSync(`${templateDir}\\generate\\component\\test.interface.ts`, 'utf8');

const capitalize = (string) => {
	if (typeof string !== 'string') return '';
	return string.charAt(0).toUpperCase() + string.slice(1);
};

// const removeWrongChars = (string) => {
// 	if (typeof string !== 'string') return '';
// 	const
// }

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

	// replace content with the name of the component
	fileInterfaceContent = fileInterfaceContent
		.replace(/Test/g, capitalize(options.name))
		.replace(/test/g, options.name)
		.replace(/tests/g, `${options.name}s`);
	fileServiceContent = fileServiceContent
		.replace(/Test/g, capitalize(options.name))
		.replace(/test/g, options.name)
		.replace(/tests/g, `${options.name}s`);
	fileControllerContent = fileControllerContent
		.replace(/Test/g, capitalize(options.name))
		.replace(/test/g, options.name)
		.replace(/tests/g, `${options.name}s`);
	fileRoutesContent = fileRoutesContent
		.replace(/Test/g, capitalize(options.name))
		.replace(/test/g, options.name)
		.replace(/tests/g, `${options.name}s`);

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
		targetDirectory: options.targetDirectory || `${process.cwd()}\\src\\api\\${options.name}`
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
