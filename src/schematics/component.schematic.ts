import { AbstractSchematic } from './abstract.schematic';
import { ControllerSchematic } from './controller.schematic';
import { InterfaceSchematic } from './interface.schematic';
import { RoutesSchematic } from './routes.schematic';
import { ServiceSchematic } from './service.schematic';

export class ComponentSchematic extends AbstractSchematic {
	private controllerSchematic = new ControllerSchematic(this.inputs);
	private serviceSchematic = new ServiceSchematic(this.inputs);
	private routesSchematic = new RoutesSchematic(this.inputs);
	private interfaceSchematic = new InterfaceSchematic(this.inputs);

	public async handle() {
		const language = this.inputs.find((input) => input.name === 'language')!.value as string;

		await this.controllerSchematic.handle();
		await this.serviceSchematic.handle();
		await this.routesSchematic.handle();

		if (language === 'typescript') await this.interfaceSchematic.handle();
	}
}
