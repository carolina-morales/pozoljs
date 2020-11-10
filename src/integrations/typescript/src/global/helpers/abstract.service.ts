export abstract class AbstractService {
	abstract findAll(): Promise<any>;
	abstract findById(id: number): Promise<any>;
	abstract findOne(element: any): Promise<any>;
	abstract save(element: any): Promise<any>;
	abstract update(id: number, element: any): Promise<any>;
	abstract delete(id: number): Promise<any>;
}
