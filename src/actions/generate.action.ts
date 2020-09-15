import { Question, Answers, PromptModule, createPromptModule } from 'inquirer';
import { AbstractAction } from './abstract.action';
import { Input } from '../utils/interfaces';
import { INFO_MESSAGES } from '../ui/messages.ui';
import { generateInput } from '../helpers/questions.helper';
import {
	ControllerSchematic,
	ComponentSchematic,
	ServiceSchematic,
	InterfaceSchematic,
	RoutesSchematic
} from '../schematics';

export class GenerateAction extends AbstractAction {
	private schematicType: string = '';

	public async handle(inputs: Input[], options: Input[]): Promise<void> {
		await this.askForMissingPrompts(inputs);
		await this.generateFiles(inputs.concat(options));
	}

	private async askForMissingPrompts(inputs: Input[]) {
		console.info(INFO_MESSAGES.FILES_INFORMATION_START);
		console.info('');

		this.schematicType = inputs.find((input) => input.name === 'schematic')!.value as string;

		const prompt: PromptModule = createPromptModule();
		const schematicName: string = inputs.find((input) => input.name === 'name')!.value as string;
		const questions: Question[] = [];

		if (!schematicName) {
			questions.push(
				generateInput(
					'name',
					`What is the name of your ${this.schematicType}? (Use hyphens to separate the name)`,
					'pozol'
				)
			);
		}

		if (questions.length === 0) return;
		const answers: Answers = await prompt(questions);
		return inputs.map((input) => (input.value = input.value !== undefined ? input.value : answers[input.name]));
	}

	private async generateFiles(inputs: Input[]) {
		if (this.schematicType === 'component') new ComponentSchematic(inputs).handle();
		if (this.schematicType === 'controller') new ControllerSchematic(inputs).handle();
		if (this.schematicType === 'service') new ServiceSchematic(inputs).handle();
		if (this.schematicType === 'routes') new RoutesSchematic(inputs).handle();
		if (this.schematicType === 'interface') new InterfaceSchematic(inputs).handle();
	}
}
