import { Answers, Question, PromptModule, createPromptModule } from 'inquirer';
import Listr, { ListrTask } from 'listr';
import execa from 'execa';
import ncp from 'ncp';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { promisify } from 'util';
import { INFO_MESSAGES, ERROR_MESSAGES } from '../ui/messages.ui';
import { Input } from '../utils/interfaces';
import { AbstractAction } from './abstract.action';
import { ifDirExistsElseMakeDir } from '../utils/functions';
import { render } from 'ejs';
import { generateInput } from '../helpers/questions.helper';
import { generateTask } from '../helpers/listr-tasks.helper';
import chalk from 'chalk';

export class NewAction extends AbstractAction {
	private copy = promisify(ncp);
	private appName: string = '';
	private language: string = '';

	public async handle(inputs: Input[], options: Input[]): Promise<void> {
		try {
			this.appName = inputs.find((input) => input.name === 'name')!.value as string;

			await this.askForMissingPrompts(inputs);

			this.language = options.find((option) => option.name === 'language')!.value.toString().toLowerCase();
			const directoryPath = options.find((option) => option.name === 'directory')!.value as string;
			const directoryProject = join(directoryPath ? directoryPath : '', this.appName);

			const skipGit = options.some((option) => option.name === 'skip-git' && option.value);
			const skipInstall = options.some((option) => option.name === 'skip-install' && option.value);

			const lists: ListrTask[] = [];

			lists.push(generateTask('Creating folder', () => this.createFolders(directoryProject)));
			lists.push(generateTask('Creating project', () => this.initIntegration(directoryProject)));

			if (!skipGit) lists.push(generateTask('Initializing git', () => this.initGit(directoryProject)));

			if (!skipInstall)
				lists.push(generateTask('Installing packages', () => this.installPackages(directoryProject)));

			const tasks = new Listr(lists);
			await tasks.run();
			console.info('');
		} catch (error) {
			console.error(chalk.red.bold('ERROR'), error);
			process.exit(1);
		}
	}

	private async askForMissingPrompts(inputs: Input[]) {
		console.info(INFO_MESSAGES.PROJECT_INFORMATION_START);
		console.info('');

		const prompt: PromptModule = createPromptModule();
		const questions: any[] = [];

		if (!this.appName) {
			questions.push(
				generateInput(
					'name',
					'What is the name of your new project? (Use hyphens to separate the name)',
					'pozol-app'
				)
			);
		}

		const answers: Answers = await prompt(questions as ReadonlyArray<Question>);
		return inputs.map((input) => (input.value = input.value !== undefined ? input.value : answers[input.name]));
	}

	private createFolders(directoryProject: string): void {
		const created = ifDirExistsElseMakeDir(directoryProject);
		if (!created) throw new Error('Folder already exists.').message;
	}

	private async initIntegration(directoryProject: string) {
		const destPath = join(process.cwd(), directoryProject);
		const integrationPath = join(__dirname, `../integrations/${this.language}`);

		// copy files
		this.copy(integrationPath, destPath, {
			clobber: false
		});

		// create package json
		const packagePath = join(__dirname, `../integrations/templates/npm-package.template`);
		let packageContent = readFileSync(packagePath, 'utf8');
		packageContent = render(packageContent, { name: this.appName, language: this.language });
		writeFileSync(join(destPath, 'package.json'), packageContent);

		// create pozol config json
		const pozolConfigPath = join(__dirname, `../integrations/templates/pozol-config.template`);
		const version = require('../../package.json').version;
		let pozolConfigContent = readFileSync(pozolConfigPath, 'utf8');
		pozolConfigContent = render(pozolConfigContent, { name: this.appName, language: this.language, version });
		writeFileSync(join(destPath, 'pozol.config.json'), pozolConfigContent);
	}

	private async initGit(directoryProject: string) {
		const destPath = join(process.cwd(), directoryProject);
		const result = await execa('git', [ 'init' ], { cwd: destPath });

		const gitIgnorePath = join(__dirname, `../integrations/templates/gitignore.template`);
		let gitIgnoreContent = readFileSync(gitIgnorePath, 'utf8');
		gitIgnoreContent = render(gitIgnoreContent, { language: this.language });
		writeFileSync(join(destPath, '.gitignore'), gitIgnoreContent);

		if (result.failed) throw new Error(ERROR_MESSAGES.GIT_INITIALIZATION_ERROR).message;
	}

	private async installPackages(directoryProject: string) {
		const destPath = join(process.cwd(), directoryProject);
		const result = await execa('npm', [ 'install' ], { cwd: destPath });

		if (result.failed) throw new Error(ERROR_MESSAGES.NPM_INSTALLING_ERROR).message;
	}
}
