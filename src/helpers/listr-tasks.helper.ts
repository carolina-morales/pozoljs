import { ListrTask } from 'listr';

export const generateTask = (title: string, task: any, enabled?: any, skip?: any): ListrTask => {
	return {
		title,
		task,
		enabled,
		skip
	};
};
