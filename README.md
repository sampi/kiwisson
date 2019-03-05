[![Build Status](https://travis-ci.org/sampi/kiwisson.svg?branch=master)](https://travis-ci.org/sampi/kiwisson) [![Greenkeeper badge](https://badges.greenkeeper.io/sampi/kiwisson.svg)](https://greenkeeper.io/) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# kiwisson

kiwisson is a small web app that emulates T9 predictive text technology. Typing numbers will be predicted to become words and with the `*` key, alternative suggestions can be shown.

**[View Demo - https://kiwisson.sampi.io/](https://kiwisson.sampi.io/)**

![kiwisson](https://github.com/sampi/kiwisson/raw/master/.github/kiwisson.png)

## Getting started

### Installation

#### create-react-app

The app is bootstrapped using the [create-react-app](https://facebook.github.io/create-react-app/) toolkit so if you're familiar with it, you can jump in right away.

#### Getting the code

To serve the app on your local machine, you need to run the following commands:

```bash
git clone git@github.com:sampi/kiwisson.git
cd kiwisson
npm ci
```

#### Starting the app

Now you're ready to start the app!

```bash
npm start
```

[localhost:3000](http://localhost:3000) will open automatically in your browser and you can start using the app.

## Testing

### Running tests

#### Unit tests

kiwisson uses [Jest](https://jestjs.io/) for unit testing and all elements are rendered by React. Because this is such a small project and all the components are quite tightly coupled, there was no need to use shallow DOM rendering.

To run the unit tests:

```bash
npm run test
```

If you're into fancy colorful code coverage tables:

```bash
npm run test -- --coverage
```

#### Integration tests

kiwisson uses [Cypress](https://www.cypress.io/) for integration tests.

To run the integration tests:

```bash
npm run build && npm run test:cypress
```

You can also see previous runs on the [Cypress Dashboard](https://dashboard.cypress.io/#/projects/c5sog9/runs)

### Testing strategy

Because this app is very simple, the React components themselves didn't need too much testing.

Each component has at least one simple test to make sure it renders without crashing.
If there is any functionality within the app that would warrant testing, because it's not functionality of React itself, then there is at least one test covering that feature.

For integration testing, the whole UI is tested, but it looks very similar to the unit tests of the mock server.

### Continuous integration

Every time code is pushed to the `master` branch or a PR is created, unit and integration tests are triggered, in addition to pushing the latest code GitHub Pages and tagging releases with Semantic Release if a new version is warranted.

#### Deployment

To create an optimized production build of the app, just run:

```bash
npm run build
```

This will create a minified version of the page in `/build` and it doesn't require a backend to run.

##### GitHub Pages

The app is hosted on GitHub Pages and it's really easy to update what is served from there, just run:

```bash
npm run deploy
```

##### Semantic Release

This repository follows the Commitizen commit guidelines, and enforces them using [commitlint](https://conventional-changelog.github.io/commitlint/). This way, it's easy to tell programmatically when to bump the version and what to bump it to. It also helps to generate the changelog and create a GitHub release.
Whenever code is merged to the `master` branch, [Semantic Release](https://semantic-release.gitbook.io/semantic-release/) will parse new commits and will publish a release if necessary.

I personally feel that this type of restriction on commit messages is a bit too much, but I also understand that it's valuable to have a consistent style of commits from all developers and to be able to easily generate version numbers automatically.

## Structure

I prefer to organize files by domain and not by type, so you won't find the classic `components` and `containers` folders in this app! Especially not, if it's this small of a project.

- `kiwisson`
  - `.github` _Images used in this README._
  - `build` _The output of the production build._
  - `cypress` _Integration test specs._
  - `public` _Static files and `index.html` entrypoint._
  - `src` _The Source._
    - `keyboard` _Code for phone keys and the keyboard container._
      - `Key.{js,css}` _A single key._
      - `Keyboard.{js,css}` _Container component to display all 12 keys._
    - `screen` _Code for the phone screen._
      - `Screen.{js,css}` _The screen. This is where a call would have been made to the REST API, so the mock is called from here._
    - `server` _Because I didn't have enough time to create a real backend, here is the client-side implementation of the T9 translation/prediction algorithm._
      - `words.js` _The 10.000 most common english words, USA spelling. It has been downloaded from [here](https://github.com/first20hours/google-10000-english)_
      - `server.js` _The algorithm_to turn a string of numbers into a string of words._
  - `App.{js,css}` _The main container, it also sets up the React Context Provider._
  - `constants.js` _This is code shared between the frontend and the "backend", a list of all keys and their labels._
  - `index.{js,css}` _The entrypoint of the React app. It also registers the Service Worker._
  - `InputContext.js` _A very simple React Context, following the tuple format, so it feels right to use it with Hooks._
  - `serviceWorker.js` \_The default create-react-app Service Worker that helps to cache all files in the browser and allow offline usage.
  - `vars.css` _CSS Custom Properties (CSS variables) are defined here for the whole page._

### CSS

Due to the size and complexity of this project, there was no need to use any CSS methodologies, so I went with the simplest solution.
I am using CSS Custom Properties, to have all variables, that might require tweaking and are repeated across the code, in a single place. I didn't want to [eject](https://facebook.github.io/create-react-app/docs/available-scripts#npm-run-eject) to add PostCSS plugins that transform code using CSS Custom Properties to include hardcoded values as well, so IE11 support is dropped.

The app is sort of responsive, as long as the aspect ratio doesn't go above `860/962`, the UI scales with the browser. If it does get wider than this configuration, the keyboard and screen will be locked to the middle of the screen and margins will stretch on both sides.

## Technologies

- React - https://reactjs.org/
  I've used React and Preact extensively in the past, but I haven't had a chance to try Hooks and Context and it felt nice to not have to pull in another library or go down the non-React-route and try to mess with a global state or weird messaging between components.

- Jest - https://jestjs.io/
  Unit testing is simple with Jest, however one has to be careful when the only place you're testing your DOM is in an emulated [jsdom](https://github.com/jsdom/jsdom) environment.

- Cypress - https://www.cypress.io/
  Integration testing using Cypress was really smooth and easy, the only reason I haven't tried it before was because it can only test in Chromium-based browsers. I am eagerly awaing developments from the Cypress team in support for different browsers, they should have something ready [soon](https://github.com/cypress-io/cypress/issues/310).

- webpack - https://webpack.js.org/
  webpack is pre-configured in create-react-app, I only needed to add some magic comments and use `import().then()` to be able to split the generated code, which was very smooth.

- babel - https://babeljs.io/
  babel is pre-configured in create-react-app, their config is acceptable.

- create-react-app - https://facebook.github.io/create-react-app/
  This is the standard in starting a new React project, without having to maintain and configure a build and test setup. It also sets up a standard ESLint configuraiton for React.
  It works well, however there is quite a lot of boilerplate added to the generated bundles, which can not be made smaller until ejecting and taking over the responsibility of maintaining said configurations. It is a fair trade-off, especially in a time-sensitive project, like this one.

- gh-pages - https://github.com/tschaub/gh-pages
  This tool pushes changes to the `gh-pages` branch.

- Commitizen - http://commitizen.github.io/cz-cli/
  Originally made by the AngularJS team, Commitizen sets a standard for commit messages and makes it easy to figure out what happened in each commit.

- commitlint - https://conventional-changelog.github.io/commitlint/
  commitlint helps to enforce the Commitizen commit rules.

- semantic-release - https://semantic-release.gitbook.io/semantic-release/
  semantic-release helps to version the releases automatically and appropriately.

- Prettier - https://prettier.io/
  Prettier is a very versatile code-formatter and I like to use it in any project I'm involved in. It makes for code that looks like it's been written by the same person and supports many files types. I have changed the default configuration to use single quotes and tabs, everything else remains unchanged.

- ESLint - https://eslint.org/
  ESLint is useful for linting files and get errors pointed out as I'm writing them.

- husky - https://github.com/typicode/husky
  husky is used to set up git hooks.

- lint-staged - https://github.com/okonet/lint-staged
  lint-staged is used to make sure any file that is committed, will be formatted with Prettier.

- start-server-and-test - https://github.com/bahmutov/start-server-and-test
  start-server-and-test was recommended in the Cypress documentation, to have a server running and run tests against it, without making the CI build hang.

## Things that didn't make it

I have overestimated the amount of free time I will have for this project, so some of the things I really wanted to do didn't happen.

Here's a list of things that didn't make it:

- Tech
  - A real backend
    I wanted to set up GraphQL and have a REST API setup, where I would get the T9 prediction of the input strings
  - React Native
    This would have been a great time to try React Native, but I couldn't estimate in advance how much extra development time it would take.
  - @pika/pack - https://www.pikapkg.com/blog/introducing-pika-pack/
    I have seen many tools that help with transpilation and bundling, but this project seems to be doing exactly what I'm looking for. I decided against this, because I didn't want to risk spending a lot of time trying to fix a broken build and didn't want to get lost in configuration files and unstable hotfixes.
- Features
  - (Smart) Punctuation
    There is 0 support for punctuation. The button `1` is ignored when generating words. It gets even trickier when trying to predict that the user meant to write `can't` or `don't`, and even more complex when predicting possessive words like `Steve's`.
  - Startup tone
    It would have been fun to add a little retro phone chime when the app starts.
  - Themes
    Because of the way CSS Custom Properties work, it would be quite easy to create a few extra set of variables and change the colors, or even the font of the app.
  - Handling of long texts
    When the user has typed so much, that it doesn't fit on the simulated screen, it will just overflow and the next words aren't visible.
  - Handling of long pressing buttons
    I would expect at least the backspace key to start repeating the delete action after a short timeout. I decided to get back to this feature later, but as I'm writing the README and it's almost 1am, I don't think it will make it in the final release.
- Bugs
  - Aliasing of the pixelated screen effect
    Some browsers in some resolutions will produce a moire effect, because the fake-pixelated screen has a lot of small repeating lines. My original plan was to use `<canvas>` to render a pixel-perfect imitation of an old phone's LCD screen, but I realized that I can make the same effect with only CSS. I only discovered this "bug" towards the end of development and decided that it's acceptable that it looks like this for the purposes of this demo.

## The task

### Task description

The task was to implement a number to word list converted in the style of [T9](<https://en.wikipedia.org/wiki/T9_(predictive_text)>) with a React frontend and optionally a Node backend.

### My solution

I started by imagining how I would like this app to look like, and decided that imitation a retro phone would be fitting.

I set up a basic create-react-app project and started with the keyboard and a screen. I've added some styling to it until it looked
alright. I knew I wanted to use Hooks, and I've discovered that Context will also fit here perfectly.

I then wrote the unit tests and set up the CI build pipeline.

In the end, I've added comments, integration tests and wrote this README.

It was fun to make something that looks ugly on purpose and to stack so many backgrounds and box-shadows on top of each other to create a weird "real" feeling.

The code itself is kind of short, but I've tried to explain all of my reasoning in this file, I hope that it will all make sense.
