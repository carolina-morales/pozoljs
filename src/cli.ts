import { CommanderStatic } from 'commander';
import { CommandLoader } from './commands';

export default class CLI {
	private program: CommanderStatic;

	constructor(program: CommanderStatic) {
		this.program = program;
	}

	public handle() {
		CommandLoader.load(this.program);
	}
}
