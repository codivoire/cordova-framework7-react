# Modern Hybrid App Boilerplate

Before you dive into anything, see for yourself how easy you can setup a full workflow framework for your `development` and `deployment` for your real world project.

Step 1: Clone this repo
```
git clone https://github.com/lambirou/cordova-ionicnative-framework7-react-redux.git
cd cordova-ionicnative-framework7-react-redux
```

Step 2: Install

```
npm install
```

Step 3: Start

```
npm run dev
```

And Done, as easy as 123!!


### Preface

This boilerplate is a full fledged __PRODUCTION READY__ workflow boilerplate for building complex application.

The technologies used in this workflow boilerplate shows case a `subset of technologies` we are currently using within our team ( __we put this project in github mainly as recruiting purpose for our team__ ),  and we are trying to give our candidates confidence that by working with us, they will be using decent technologies as well as staying relevant to the industry.  And that is what our team strongly believed in - __technology innovation and promoting developers' relevancy in the industry__.

If you are interested in working with us, feel free to send a message to [lambirou](https://www.twitter.com/lambirou).

![React Redux Workflow Boilerplate Logo](http://res.cloudinary.com/search-engine/image/upload/v1501696716/logo-rrb-002_zxvml0.png)

# React Redux Boilerplate

`React Redux Boilerplate` is a workflow boilerplate that make life easier for developers by providing a virtual development environment and production ready build process framework out of the box.

`React Redux Boilerplate` is for developing React client side application. So,  if you are looking for:

* `Isomorphic (Universal) support`, feel free to add server side support to it, or you can use something like [Next.js](https://github.com/zeit/next.js/), [react-server](https://github.com/redfin/react-server) or [electrode](http://www.electrode.io/)


### Features / Benefits

Features

* React 16.6
* Redux
* Saga
* ES6 / ES7
* ImmutableJS
* PreCSS ( supports SASS-like markup in your CSS )
* PostCSS ( with CSS modules activated by default )
* Webpack 4
* Reselect
* Lazy Loading component supports
* Type Checking with Babel Type Check ( Flow syntax )
* ESLint for syntax check
* Jest and Enzyme for Unit testing

Workflow

* Development
  * Hot Module Reload during development
  * Built-in lightweight config system
  * Built-in fancy cli dashboard for reporting run time compile status
  * Built-in support for multiple device concurrent debugging
* Build / Production
  * Production bundle analyzing capability
  * CSS / HTML / JS minification / Image optimization when built
  * JS code duplication removal during built ( tree shaking capability )
* Deployment
  * Built-in git commit hook, helpful for CI/CD process
  * Built-in process to deploy files directly to S3 ( optional )
* Productivity
  * Highly configurable build and workflow system ( webpack )
  * Minimal setup time and allow you to invest into things that matters
  * Everything automatic, you just care about development, nothing else \o/ Yeah ?!

If you are interested, please read the `package.json` for all installed modules and plugins.

## Table of Contents

Basic
1. [Installation](#installation)
2. [Initialize your project](#initialize-your-project)
3. [Suggested Workflow](#suggested-workflow)
4. [Folder Structure](#folder-structure)
5. [Production Readiness](#production-readiness)
6. [Configuration](#configuration)
7. [Port Configuration](#port-configuration)
8. [Installing Dependencies](#installing-dependencies)

Advanced
1. [Lazy Loading Component](#lazy-loading-component)
1. [Writing Unit Test](#writing-unit-test)
1. [Configure git commit hook](#configure-git-commit-hook)
1. [Multiple Device Concurrent Debugging](#multiple-device-concurrent-debugging)
1. [Developing Template](#developing-template)
1. [Production Optimization and Bundle Analysis](#production-optimization-and-bundle-analysis)
1. [Integration Note](#integration-note)
1. [QA](#qa)

Other
1. [Knowledge Base Reading](#knowledge-base-reading)
1. [How to Contribute](#how-to-contribute)
1. [Updates](#updates)

# Basic

## Installation


### Prerequisite

You need to have Node.js installed.

[Instruction for installing NodeJS in Mac](http://lmgtfy.com/?q=install+nodejs+mac)

[Instruction for installing NodeJS in Window](http://lmgtfy.com/?q=install+nodejs+window)

### Post Installation

If you would like to have Redux debug capabilities, you can download this Chrome extension [Redux DevTool](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)

![Redux DevTool](https://www.dropbox.com/s/wni425e3d4xiy85/redux-devtool.png?raw=1)


## Initialize your project

Now run the following commands in your terminal

**NOTE: You only need to run this once!**

```sh
$ npm install # This will install the necessary packages to use the app
```

**That's it!**


### To run the app in Development Mode

```sh
$ npm run dev
```

Wait about 30 seconds for your development environment to initialize.

When it finishes, open your browser and go to `http://localhost:3000/`

If you see the landing page, it means you have set up everything successfully.


### List of NPM Commands


```sh
$ npm run dev       # build and watch, but javascript and css not minified
$ npm run build     # build a minified production version
```

## How to Contribute

We welcome anyone to send us __pull request__ to improve this boilerplate, the goal is to make it better from time to time and we all can learn from it.

This boilerplate will be maintained separately.  So please do not check in any business logic to it unless it is for example purpose.

## License
MIT ©
