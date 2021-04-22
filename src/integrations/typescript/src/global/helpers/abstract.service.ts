export abstract class AbstractService {
	public abstract find(element: any): Promise<any>;
	public abstract save(element: any): Promise<any>;
	public abstract update(id: number, element: any): Promise<any>;
	public abstract delete(id: number): Promise<any>;
}
