# Changelog

## v 0.6.2

1. Added yarn support.

## v 0.6.3

1. Install using `npm i -g pozoljs` instead of `npm i -g @daniel-cmorales/pozoljs`.
2. Renames `tests` directory to `test`.
3. Implement `Partial` utility to use just one interface instead of two in each component.

## v 0.6.4

1. Update documentation

## v 0.6.5

1. The `server.ts` file is a class, so it is the most readable and the most organized.
2. The `index.ts` file just start the server, try not to configure anything here.
3. Component routes configuration file is now a class, allowing better control and organization of code.
4. The service and controller methods only return an error while not being implemented.
