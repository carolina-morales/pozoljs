import ejs from 'ejs';
import { writeFileSync } from 'fs';
import { Answers, createPromptModule, PromptModule, Question } from 'inquirer';
import { join } from 'path';
import { getFileOptions, isExistsSchematicFile, readTemplateContent } from '../utils/functions';
import { generateConfirm } from './questions.helper';

export const askIfOverrideFile = async (
	destPath: string,
	language: string,
	schematicName: string,
	schematicType: string
): Promise<boolean> => {
	const prompt: PromptModule = createPromptModule();
	const questions: Question[] = [];
	const isDirExists = isExistsSchematicFile(destPath, language, schematicType, schematicName);

	if (isDirExists)
		questions.push(
			generateConfirm(
				'override',
				`The ${schematicType} file already exists. Are you sure you want to override it?`,
				false
			)
		);

	if (questions.length === 0) return true;
	const answers: Answers = await prompt(questions);
	return answers.override as boolean;
};

export const createFile = async (destPath: string, language: string, schematicType: string, schematicName: string) => {
	const extension: string = language === 'javascript' ? 'js' : 'ts';
	const filePath: string = join(destPath, `${schematicName}.${schematicType}.${extension}`);

	const fileOptions = {
		...getFileOptions(schematicName),
		language
	};

	let fileTemplate = readTemplateContent(schematicType);
	fileTemplate = ejs.render(fileTemplate, fileOptions).trim();

	writeFileSync(filePath, fileTemplate, 'utf8');
};
