# Pozol CLI

Pozoljs is a package to initialize your node-express project with typescript or javascript and create full components to develop your backend apps faster.

Pozoljs will helps you to get a node-express project more escalable with a good estructure for folders and files.

Pozoljs is not a framework.

## Getting start

- [Installing](#installing)
- [The CLI](#the-cli)
  - [Some concepts](#some-concepts)
  - [Build your project](#build-project)
  - [Files structure](#files-structure)
- [Commands](#commands)
  - [Schematics available](#schematic-available)
- [About the project](#about-project)

## Installing the CLI <a name="installing"></a>

Global installation.
```shell
npm install -g @daniel-cmorales/pozoljs
```

Local installation.
```shell
npm install @daniel-cmorales/pozoljs
```

When the package is installed, you will can use `pozoljs` command.

## The CLI :book: <a name="the-cli"></a>

### Some concepts <a name="some-concepts"></a>

1. **Component** is a small folder that contains the principal modules of an endpoint. For example, you will make endpoints about users, so in the users folder you have controller, service, routes files (and interface if it is a typescript project).
2. **Service** connect with the database or return data that you need. In other words, the service provides data to the controller. In the start, the service file implements find, save, update and delete methods.
3. **Controller** manipualte the data that obtains of the service or of the route. The controller call service methods through dependencie injection.
4. **Routes** about your component like GET, POST, PUT or DELETE.
5. **Interface** is using in typescript like a data type.

### Build your project using pozoljs <a name="build-project"></a>

Create a new node-express projects with an initial structure. <br>
*`pozoljs <name> [options]`*

#### Options available
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Alias</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>--skip-install</td>
      <td>-i</td>
      <td>If you do not to install initial dependencies.</td>
    </tr>
    <tr>
      <td>--skip-git</td>
      <td>-g</td>
      <td>If you do not to initialize for git repositorie.</td>
    </tr>
    <tr>
      <td>--language</td>
      <td>-l</td>
      <td>Typescript is the default language. You can choose javascript. Just type javascript, js, typescript or ts.</td>
    </tr>
    <tr>
      <td>--directory</td>
      <td></td>
      <td>Destination directory. Must be a relative path.</td>
    </tr>
    <tr>
      <td>--help</td>
      <td></td>
      <td>For more information.</td>
    </tr>
  </tbody>
</table>

### Files Structure <a name="files-structure"></a>

Pozoljs builds a node-express project with an initial structure. This one helps you to develop faster and escalable code. The initial structure is:
```shell
├────src
│    ├───api
│    │   └───component
│    │   │    ├───component.controller.ts/js
│    │   │    ├───component.interface.ts/js
│    │   │    ├───component.routes.ts/js
│    │   │    └───component.service.ts/js
│    │   └───index.ts/js
│    ├───config
│    │   └────environments
│    │        ├───development.ts/js
│    │        ├───index.ts/js
│    │        └───production.ts/js
│    ├───global
│    │   ├───helpers
│    │   │    └───abstract.service.ts/js
│    │   ├───interfaces.ts/js
│    │   └───variables.ts/js
│    ├───middlewares
│    ├───database.ts/js
│    ├───index.ts/js
│    └───server.ts/js
├───.editorconfig
├───.env
├───.gitignore
├───package.json
├───pozoljs.config.json
├───package-lock.json
└───tsconfig.json
```

- **pozol config:** pozoljs needs this file configuration to generate files.
- **src:** development code is here.
  - **api:** all your components will be created here.
  - **config:** the configuration like variables. Pozoljs create the enviroments folder with the development and production files.
  - **global:** your project maybe using external services like others REST API or maybe you have variables that you will use in much components.
  - **middlewares:** here you create all the middlewares that you will use in others components.
  - **main files (index, database and server):** this files you can code the server and database configuration, and you can initialize your project using index file. Pozoljs code the initial server configuration for you.

## Commands <a name="commands"></a>

All commands have the full type and abreviation type. <br>
*`pozoljs g <schematic> [name]`*

### Schematics available <a name="#schematic-available"></a>
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Alias</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>component</td>
      <td>cp</td>
      <td>Create controller, service, routes and interface file in the api folder by default.</td>
    </tr>
    <tr>
      <td>controller</td>
      <td>ct</td>
      <td>Create controller file and create the folder if does not exists.</td>
    </tr>
    <tr>
      <td>service</td>
      <td>sv</td>
      <td>Create service file and create the folder if does not exists.</td>
    </tr>
    <tr>
      <td>routes</td>
      <td>rt</td>
      <td>Create controller file and create the folder if does not exists.</td>
    </tr>
    <tr>
      <td>interface</td>
      <td>ic</td>
      <td>Create interface file and create the folder if does not exists.</td>
    </tr>
  </tbody>
</table>

## About the project created <a name="about-project"></a>

The project created using pozoljs is to get an initial and generic structure of all your node projects.

In the package.json there are 3 commands:

1. Run `npm run dev` to execute the project in development mode.
2. Run `npm run build` to create the production project (just for typescript).
3. Run `npm run start` to execute the project in the production mode.

For more information, you can execute: `pozoljs --help`