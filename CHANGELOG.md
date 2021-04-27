# Changelog

## v 0.6.2

1. Added yarn support.

## v 0.6.3

1. Install using `npm i -g pozoljs` instead of `npm i -g @daniel-cmorales/pozoljs`.
2. Renames `tests` directory to `test`.
3. Implement `Partial` utility to use just one interface instead of two in each component.

## v 0.6.4

1. Update documentation

## v 0.7.0

1. The `server.ts` file is a class, so it is the most readable and the most organized.
2. The `index.ts` file just start the server, try not to configure anything here.
3. Component routes configuration file is now a class, allowing better control and organization of code.
4. An abstract class was created for routes files, so that routes configuration file extends of this abstract class more easily to configure the routing component.
5. The service and controller methods only return an error while not being implemented.
6. The `/api/index.ts` file is a class, so it only sends the server and the route files to create routing.

## v 0.7.1

1. Implement a handle error function for controller methods.
2. You can configure the global middlewares for component routes in Api Routes.
3. Rename property `localMiddlewares` for routes array to `middlewares`.
4. Fix path name of the first component when you create a new pozoljs project.
