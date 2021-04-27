import { Request, Response, NextFunction } from "express";
import { AbstractRoutes } from "./helpers/abstract.routes";

export enum Methods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

export interface IRoute {
  path: string,
  method: Methods,
  handler: (req: Request, res: Response, next: NextFunction) => void | Promise<any>;
  middlewares: ((req: Request, res: Response, next: NextFunction) => any | Promise<any>)[]
}

export interface IConfigRoute {
  routes: AbstractRoutes,
  middlewares: ((req: Request, res: Response, next: NextFunction) => any | Promise<any>)[]
}
