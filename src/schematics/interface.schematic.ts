import chalk from 'chalk';
import { join } from 'path';
import Listr, { ListrTask } from 'listr';
import { existsSync, mkdirSync } from 'fs';
import { AbstractSchematic } from './abstract.schematic';
import { generateTask } from '../helpers/listr-tasks.helper';
import { askIfOverrideFile, createFile } from '../helpers/generate-schematics.helper';

export class InterfaceSchematic extends AbstractSchematic {
	private schematicName: string = '';
	private optionPath: string = '';
	private destPath: string = '';

	public async handle() {
		try {
			this.schematicName = this.inputs.find((input) => input.name === 'name')!.value as string;
			this.optionPath = this.inputs.find((input) => input.name === 'path')!.value as string;
			this.destPath = this.optionPath
				? join(process.cwd(), this.optionPath, this.schematicName)
				: join(process.cwd(), 'src', 'api', this.schematicName);

			this.createFolder();

			const shouldOverride = await this.askIfOverrideFile();
			if (!shouldOverride) return;

			const lists: ListrTask[] = [];

			lists.push(generateTask('Creating interface file...', () => this.createFiles()));

			const tasks = new Listr(lists);
			await tasks.run();
		} catch (error) {
			console.error(chalk.red.bold('ERROR'), error);
			process.exit(1);
		}
	}

	private createFolder(): void {
		if (existsSync(this.destPath)) return;
		mkdirSync(this.destPath);
	}

	private createFiles(): void {
		const language = this.inputs.find((input) => input.name === 'language')!.value.toString().toLowerCase();
		createFile(this.destPath, language, 'interface', this.schematicName);
	}

	private async askIfOverrideFile(): Promise<boolean> {
		const language = this.inputs.find((input) => input.name === 'language')!.value.toString().toLowerCase();

		if (language === 'javascript') throw new Error('Your project is using javascript').message;

		return await askIfOverrideFile(this.destPath, language, this.schematicName, 'interface');
	}
}
