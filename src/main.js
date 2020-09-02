import chalk from 'chalk';
import fs from 'fs';
import ncp from 'ncp';
import path from 'path';
import { promisify } from 'util';
import execa from 'execa';
import Listr from 'listr';
import { projectInstall } from 'pkg-install';

const access = promisify(fs.access);
const copy = promisify(ncp);

async function copyTemplateFiles(options) {
	return copy(options.templateDirectory, options.targetDirectory, {
		clobber: false
	});
}

async function createFolder(options) {
	const { targetDirectory } = options;
	if (!fs.existsSync(targetDirectory)) {
		fs.mkdirSync(targetDirectory);
	} else {
		return Promise.reject(new Error('Failed to create folder, maybe the folder already exists'));
	}
}

async function initGit(options) {
	const result = await execa('git', [ 'init' ], {
		cwd: options.targetDirectory
	});
	if (fs.appendFileSync(options.targetDirectory + '\\' + '.gitignore', `./node_modules\n./dist\n.env`)) {
		return Promise.reject(new Error('Failed to create gitignore file'));
	}
	if (result.failed) {
		return Promise.reject(new Error('Failed to initialize Git'));
	}
	return;
}

export async function createProject(options) {
	options = {
		...options,
		targetDirectory: options.targetDirectory || process.cwd() + '\\' + options.directoryName
	};

	let currentFileUrl = import.meta.url;
	currentFileUrl = currentFileUrl.replace('file:///', '');
	const templateDir = path.resolve(currentFileUrl, '../../integrations', options.template.toLowerCase());
	options.templateDirectory = templateDir;

	try {
		await access(templateDir, fs.constants.R_OK);

		const tasks = new Listr([
			{
				title: 'Creating folder',
				task: () => createFolder(options)
			},
			{
				title: 'Copy project files',
				task: () => copyTemplateFiles(options)
			},
			{
				title: 'Initialize git',
				task: () => initGit(options),
				enabled: () => options.git
			},
			{
				title: 'Install dependencies',
				task: () =>
					projectInstall({
						cwd: options.targetDirectory
					}),
				skip: () => (!options.runInstall ? 'Pass --install to automatically install dependencies' : undefined)
			}
		]);

		await tasks.run();

		return true;
	} catch (error) {
		console.error('%s Error while create project', chalk.red.bold('ERROR'), error);
		process.exit(1);
	}
}
