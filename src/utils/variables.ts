import { ISchema } from './interfaces';

export const regex = /[áéíóúÁÉÍÓÚ\/*:.,\\;¿¡'?~`¨´{}\[\]^°¬|!"#$%&()=<>_\d\s]+/gm;
export const langs = [ 'ts', 'js', 'typescript', 'javascript' ];

export const schematics: ISchema[] = [
	{ name: 'component', alias: 'cp' },
	{ name: 'controller', alias: 'ct' },
	{ name: 'service', alias: 'sv' },
	{ name: 'routes', alias: 'rt' },
	{ name: 'interface', alias: 'ic' }
];
