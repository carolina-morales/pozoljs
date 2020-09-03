import chalk from 'chalk';
import fs from 'fs';
import ncp from 'ncp';
import path from 'path';
import { promisify } from 'util';
import execa from 'execa';
import Listr from 'listr';
import ejs from 'ejs';
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
	if (fs.appendFileSync(options.targetDirectory + '\\' + '.gitignore', `node_modules\ndist\n.env`)) {
		return Promise.reject(new Error('Failed to create gitignore file'));
	}
	if (result.failed) {
		return Promise.reject(new Error('Failed to initialize Git'));
	}
	return;
}

async function initPackage(options) {
	const directoryComponentTemplates = path.join(
		__dirname,
		'../lib/generate/schematics',
		`/${options.template.toLowerCase()}`
	);
	let filePackageContent = fs.readFileSync(`${directoryComponentTemplates}\\__name.ts.package.json.template`, 'utf8');

	filePackageContent = ejs.render(filePackageContent, { projectName: options.projectName });

	if (fs.writeFileSync(`${options.targetDirectory}\\package.json`, filePackageContent))
		return Promise.reject(new Error('Failed to create interface file'));
}

export async function createProject(options) {
	options = {
		...options,
		targetDirectory: options.targetDirectory || process.cwd() + '\\' + options.projectName
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
				title: 'Creating package json file',
				task: () => initPackage(options)
			},
			{
				title: 'Creating initial files',
				task: () => copyTemplateFiles(options)
			},
			{
				title: 'Initializing git',
				task: () => initGit(options),
				enabled: () => options.git
			},
			{
				title: 'Installing dependencies',
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
