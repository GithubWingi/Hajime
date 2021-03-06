![MIT License][badge-license]

# Hajime

Hajime is an Electron application for managing Kendo's competition

# Project status

The project is currently slowed down due to lack of resources _(currently only the main author is working on **Hajime**)_:
- Developers that want to contribute to the project
- Donations that can help actively growing the project and finish the MVP that every Kendo's dojo can use it in a Kendo's competition event

# Roadmap (MVP)

TODO: add more details, explanations, images

* :white_check_mark: Create competition workflow
  * :white_check_mark: General informations
  * :white_check_mark: Importing fighters or teams
  * :white_check_mark: Setup the competition formula _(rules)_
* Competition **'D-Day'** workflow
  * :white_check_mark: Fighters/Teams list review and lock
  * :white_check_mark: Pools _(Todo: more detail)_
  * Tournament bracket in the same UX/UI than Pools _(Todo: more detail)_
* i18n _(:fr:, :gb: for the begining)_
* Marking board
* Live-scoring application
  * Slave application connected to a master application through [socket.io](https://socket.io/)
  * Must work without internet (local network)
  * Reflexion about making an mobile / tablet app (using Flutter, React Native, etc.) or keep using Electron as it can be installed on a windows tablet (can be enough)
  * It should shared a part of the components as we already handle list of fights, fight scoring, etc...

## Scoring application

# Installation

## Dependancies

You need to install these dependancies to launch the project

* [NodeJS](https://nodejs.org/en/)
* [Yarn](https://yarnpkg.com/lang/en/) (More reliable than `npm` to manage packages)

Then you need to install the project dependancies by launching `yarn`

## Scripts

Defined in  `package.json` :
- `yarn dev` : launch the application in development mode
- `compile` : Compile source code with webpack
- `build` : Create an executable installation on the current OS environment
- `build:fast` : Faster build only for test purposes in production mode
- `postinstall` : Compile binaries dependancies (eg. drivers like mysql, sqlite, etc.)

# Technical details of the project

## Main technologies and libraries

* [Electron](https://electronjs.org/)
* [Webpack](https://webpack.js.org/)
* [Electron-Webpack](https://webpack.electron.build/)
* [Vuejs](https://fr.vuejs.org/v2/guide/)
* [Vuex](https://vuex.vuejs.org/)
* [Vue-router](https://router.vuejs.org/)
* [Bootstrap](https://getbootstrap.com/)
* [Bootstrap-Vue](https://bootstrap-vue.js.org/)
* [Bootstrap theme](http://byrushan.com/projects/super-admin/app/2.1/index.html)
* [Material icon](http://zavoloklom.github.io/material-design-iconic-font/)
* [Sass](https://sass-lang.com/documentation/syntax)
* [Sequelize](https://sequelize.org/v5/)

## Directory structure

* `/dist` : contain production files when `yarn build` was used
  * `/src/main` : [main process](https://electronjs.org/docs/tutorial/application-architecture) of Electron
  * `/src/renderer` : [render process](https://electronjs.org/docs/tutorial/application-architecture) of Electron
    * `/src/renderer/index.js` : Entry point
    * `/src/renderer/App.vue` : Vue JS entry point
    * `/src/renderer/assets` : Images, fonts, etc...
    * `/src/renderer/components` : VueJS screens. (TODO: should rename this folder to `screens`)
    * `/src/renderer/database` : Contain all files related to the database. models definition, sequelize, migrations
    * `/src/renderer/plugins` : Custom Vue JS components loaded as a plugin
    * `/src/renderer/router` : Vue-router configuration files
    * `/src/renderer/store` : Vuex files
* `/database` : Mysql workbench files
* `/webpack/webpack.renderer.additions.js` : Webpack's override configuration
* `.env` : environment variables

## Contributing

You can contribute to **Hajime** by following [CONTRIBUTING.MD][contributing]

[//]: # (List of reference)
[contributing]: https://github.com/Maus3rSR/Hajime/blob/master/CONTRIBUTING.md
[badge-license]: https://img.shields.io/github/license/Maus3rSR/hajime?style=flat-square