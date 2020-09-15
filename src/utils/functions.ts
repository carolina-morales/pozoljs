import { readFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

export const sanitize = (str: string): string => {
	str = str.replace(/[0-9áéíóúñü \.,_-]/gim, '');
	return str.trim();
};

export const pascalCase = (str: string): string => {
	str = str.replace(/(\w)(\w*)/g, function(g0, g1, g2) {
		return g1.toUpperCase() + g2.toLowerCase();
	});
	return str;
};

export const camelCase = (str: string): string => {
	str = pascalCase(str);
	return str.charAt(0).toLowerCase() + str.slice(1);
};

export const isDirExists = (path: string): boolean => {
	return existsSync(path);
};

export const ifDirExistsElseMakeDir = (path: string): boolean => {
	path = join(process.cwd(), path);
	if (!isDirExists(path)) {
		mkdirSync(path);
		return true;
	} else {
		return false;
	}
};

export const getFileOptions = (str: string) => {
	return {
		pascalCase: sanitize(pascalCase(str)),
		camelCase: sanitize(camelCase(str)),
		lowerCase: str.toLowerCase()
	};
};

export const readTemplateContent = (schematicType: string): string => {
	const templatePath = join(__dirname, `../schematics/templates/${schematicType}.template`);
	return readFileSync(templatePath, 'utf8');
};

export const isExistsSchematicFile = (
	destPath: string,
	language: string,
	schematicType: string,
	schematicName: string
): boolean => {
	const extension: string = language === 'javascript' ? 'js' : 'ts';
	const filePath: string = join(destPath, `${schematicName}.${schematicType}.${extension}`);

	return existsSync(filePath);
};
