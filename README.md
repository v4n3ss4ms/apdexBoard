# Apdex Board - vanilla JS
Apdex Board

## Table of contents
* [Development - Run the example](#development-run-the-example)
  + [Step 1: Install dependencies](#step-1-install-dependencies)
  + [Step 2: Run the application](#step-2-run-the-application)
* [Tests](#tests)
* [Decisions](#decisions)
  + [appsData class](#appsdata-class)
  + [view.js](#viewjs)
 * [Nice to have](#nice-to-have)

## Development - Run the example

### Step 1: Install dependencies
* `npm install`

### Step 2: Run the application
* `npm start` (It runs a live server on port :8080)

## Tests
* `npm run test`

## Decisions
### appsData class
Maybe a different approach could be to extract some methods into use cases and then inject them as dependencies.

Dependencies approach:
* PROs
    * Easy to test every method.
* CONs
    * Extra complexity due to coupling.

Full class approach:
* PROs
    * Data coupling is handled just in one place.
* CONs
    * Private methods cannot be tested.


### view.js
* According with the grid-mode.jpg each apps list by host has 5 elements (APPS_NUMBER constant).
* Release number is shown through a window.alert() instead of a popup following the indications: "When clicking over an app, an alert dialog including the release number has to be shown."

## Nice to have
* Cypress could be added in order to test end to end functionalies

