import chalk from 'chalk';
import fs from 'fs';
import ncp from 'ncp';
import path from 'path';
import execa from 'execa';
import Listr from 'listr';
import { promisify } from 'util';
import { camelCase, capitalize, pascalCase, sanitize } from '../utils/functions';

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

	// replace content with the name of the component
	fileInterfaceContent = fileInterfaceContent
		.replace(/Test/g, sanitize(pascalCase(options.name)))
		.replace(/test/g, sanitize(camelCase(options.name)))
		.replace(/tests/g, `${sanitize(camelCase(options.name))}s`);
	fileServiceContent = fileServiceContent
		.replace(/test.interface/gim, `${options.name.toLowerCase()}.interface`)
		.replace(/Test/g, sanitize(pascalCase(options.name)))
		.replace(/test/g, sanitize(camelCase(options.name)))
		.replace(/tests/g, `${sanitize(camelCase(options.name))}s`);
	fileControllerContent = fileControllerContent
		.replace(/test.service/gim, `${options.name.toLowerCase()}.service`)
		.replace(/test.interface/gim, `${options.name.toLowerCase()}.interface`)
		.replace(/Test/g, sanitize(pascalCase(options.name)))
		.replace(/test/g, sanitize(camelCase(options.name)))
		.replace(/tests/g, `${sanitize(camelCase(options.name))}s`);
	fileRoutesContent = fileRoutesContent
		.replace(/test.controller/gim, `${options.name.toLowerCase()}.controller`)
		.replace(/Test/g, sanitize(pascalCase(options.name)))
		.replace(/test/g, sanitize(camelCase(options.name)))
		.replace(/tests/g, `${sanitize(camelCase(options.name))}s`);

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
