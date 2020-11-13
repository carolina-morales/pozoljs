export abstract class AbstractService {
	abstract find(element: any): Promise<any>;
	abstract save(element: any): Promise<any>;
	abstract update(id: number, element: any): Promise<any>;
	abstract delete(id: number): Promise<any>;
}
