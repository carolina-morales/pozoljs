import fs from 'fs';
import inquirer from 'inquirer';
import Listr from 'listr';
import path from 'path';
import ejs from 'ejs';

export const capitalize = (str) => {
	if (typeof str !== 'string') return '';
	return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const sanitize = (str) => {
	str = str.replace(/[0-9áéíóúñü \.,_-]/gim, '');
	return str.trim();
};

export const pascalCase = (str) => {
	str = str.replace(/(\w)(\w*)/g, function(g0, g1, g2) {
		return g1.toUpperCase() + g2.toLowerCase();
	});
	return str;
};

export const camelCase = (str) => {
	str = pascalCase(str);
	return str.charAt(0).toLowerCase() + str.slice(1);
};

export const createFiles = async (options, type) => {
	const filePath = `${options.targetDirectory}\\${options.name.toLowerCase()}.${type}.${options.extensionFile}`;

	const fileOptions = {
		...getFileOptions(options.name),
		template: options.template.toLowerCase()
	};

	let fileTemplate = await readFileContent(type);
	fileTemplate = ejs.render(fileTemplate, fileOptions).trim();

	if (fs.writeFileSync(filePath, fileTemplate, 'utf8'))
		return Promise.reject(new Error(`Failed to create ${type} file`));

	return true;
};

export const readFileContent = async (type) => {
	const pathTemplate = path.join(__dirname, `../lib/generate/schematics/templates`);
	return fs.readFileSync(`${pathTemplate}\\${type}.template`, 'utf8');
};

export const folderExists = async (options) => {
	if (!fs.existsSync(options.targetDirectory)) {
		return false;
	} else {
		return true;
	}
};

export const createFolder = async (options) => {
	const { targetDirectory } = options;
	if (!fs.existsSync(targetDirectory)) {
		return fs.mkdirSync(targetDirectory);
	}
};

export const createFolderTask = async (options) => {
	try {
		const tasks = new Listr([
			{
				title: 'Creating folder',
				task: () => createFolder(options)
			}
		]);

		await tasks.run();
		return true;
	} catch (error) {
		throw error;
	}
};

export const getFileOptions = (str) => {
	return {
		pascalCaseName: sanitize(pascalCase(str)),
		camelCaseName: sanitize(camelCase(str)),
		lowerCaseName: str.toLowerCase()
	};
};

export const fileExists = async (options, filePath) => {
	if (fs.existsSync(filePath)) {
		const questions = [];
		questions.push({
			type: 'confirm',
			name: 'overrideFile',
			message: 'The file already exists. Are you sure you want to override it?',
			default: false
		});

		const answers = await inquirer.prompt(questions);

		return {
			...options,
			overrideFile: answers.overrideFile
		};
	}

	return {
		...options,
		overrideFile: true
	};
};
