export interface Input {
	name: string;
	value: boolean | string;
	options?: any;
}

export interface ISchema {
	name: string;
	alias: string;
}

export interface IPozolConfig {
	name: string;
	language: string;
	version: string;
}
