import { ConfirmQuestion, InputQuestion, ListQuestion } from 'inquirer';

export const generateInput = (name: string, message: string, defaultValue: string): InputQuestion => {
	return {
		type: 'input',
		name,
		message,
		default: defaultValue
	};
};

export const generateList = (name: string, message: string, choices: string[]): ListQuestion => {
	return {
		type: 'list',
		name,
		message,
		choices
	};
};

export const generateConfirm = (name: string, message: string, defaultVale: boolean): ConfirmQuestion => {
	return {
		type: 'confirm',
		name,
		message,
		default: defaultVale
	};
};
