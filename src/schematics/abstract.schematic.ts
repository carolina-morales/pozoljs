import { Input } from '../utils/interfaces';

export abstract class AbstractSchematic {
	constructor(protected inputs: Input[]) {}

	public abstract handle(): void;
}
