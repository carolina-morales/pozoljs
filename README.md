# Pozol CLI

## Installing the CLI
In your shell run
```shell
npm install -g @daniel-cmorales/pozoljs
```

## Create and installing modules of the pozol project
Run the command into the directory where your project will be
```shell
pozoljs [projectName]
```
For example
```shell
pozoljs myapp
```

**Remember go into the folder**

## Create component
Run the command
```shell
pozoljs -g component [componentName]
```
For example
```shell
pozoljs -g component user
```

## Create controller
**This works if the folder already exists**
\
Run the command
```shell
pozoljs -g controller [controllerName]
```
For example: This one, create user.controller.ts file in user folder
```shell
pozoljs -g controller user
```

## Create service
**This works if the folder already exists**
\
Run the command
```shell
pozoljs -g service [serviceName]
```
For example: This one, create user.service.ts file in user folder
```shell
pozoljs -g service user
```

## Create interface
**This works if the folder already exists**
\
Run the command
```shell
pozoljs -g interface [interfaceName]
```
For example: This one, create user.interface.ts file in user folder
```shell
pozoljs -g interface user
```

## Create routes
**This works if the folder already exists**
\
Run the command
```shell
pozoljs -g routes [routesName]
```
For example: This one, create user.routes.ts file in user folder
```shell
pozoljs -g routes user
```