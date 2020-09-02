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

export const getFileOptions = (str) => {
	return {
		pascalCaseName: sanitize(pascalCase(str)),
		camelCaseName: sanitize(camelCase(str)),
		lowerCaseName: str.toLowerCase()
	};
};
