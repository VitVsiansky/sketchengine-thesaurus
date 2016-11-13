## Sketch Engine Thesaurus

- [Features](#features)
  * [Routes](#routes)
  * [Basic Form](#basic-form)
      - [Lemma](#lemma)
  * [Advanced Settings](#advanced-settings)
      - [Open and Close](#open-and-close)
      - [Settings / Development Controls](#settings---development-controls)
      - [Pin and Unpin](#pin-and-unpin)
      - [Reset](#reset)
      - [Remember](#remember)
  * [Results](#results)
      - [Header](#header)
      - [Other Word Types](#other-word-types)
      - [Word Cloud](#word-cloud)
      - [Results Table](#results-table)
  * [Error Handling](#error-handling)
      - [Validations](#validations)
      - [API errors](#api-errors)
      - [Error Messages](#error-messages)
- [Folder Structure](#folder-structure)
- [Dependencies](#dependencies)
- [Running and Building the Project](#running-and-building-the-project)
  * [`npm start`](#-npm-start-)
  * [`npm test`](#-npm-test-)
  * [`npm run build`](#-npm-run-build-)
- [Improvements and Issues](#improvements-and-issues)
  * [CORS](#cors)
  * [Fetching WSposlist](#fetching-wsposlist)


## Features

### Routes

The thesaurus is located on the `/thesaurus` route. <br>
URLs contain all query paramaters and are shareable.

### Basic Form

#### Lemma

Enter a word into the main field to search for similar words. <br> Lemma is automatically converted to lower
case and rejected in case it is an empty string.

### Advanced Settings

#### Open and Close

Clicking on the `Settings` button opens the Advanced Settings panel, clicking on the `Close` button
closes the panel

#### Settings / Development Controls

Clicking on either button in the navigation on the left side of the panel header switches the view to the corresponding section.

#### Pin and Unpin

Clicking on the `Pin` button in the Advanced Settings panel positions the panel under the Lemma search bar
and displays it as a single line. Click `Unpin` to reset the position. <br>
Development controls are not available when pinned. <br>
Pin and Unpin status is automatically persisted to local storage <br>

#### Reset

Clicking on the `Reset` button resets the settings to initial state:

```js
advancedSettings: {
  minthesscore: 0,
  minsim: 0.15,
  lpos: 'noun',
  includeheadword: false,
  clusteritems: false,
  maxthesitems: 60
}
```

#### Remember

Clicking on the `Remember` button saves the current settings to local storage

### Results

#### Header

Basic data received from the API is displayed in the results header:
`lemma`, `lpos`, `freq` and `relfreq` (rounded to the thousandths)

#### Other Word Types

Using the received `wspos_dict` property, links to other word types of the same lemma are displayed for
quick navigation.

#### Word Cloud

Received words are rendered into a word cloud using the `wordcloud` dependency. <br>
Font size of the rendered words is determined by the following equation:
```js
60-(index*7)
```
Minimum font size is set to 10. <br>

If the `includeheadword` parameter is set to `true`, current `lemma` is also displayed in the Word Cloud
with font size equivalent to the font size of the word with the highest score.

#### Results Table

The table is rendered with the following columns: `word`, `score` and `freq`. <br>
If any of the received words contain a `Clust` property, an additional column is rendered with
the words in the clusters.

### Error Handling

#### Validations

Both HTML and JS validations are setup to prevent incorrect requests.

Following input validations are currently in place:

* `lemma` must not be an empty string
* `maxthesitems` must be higher than 0
* `minsim` must be higher or equal to 0
* `minthesscore` must be higher or equal to 0

If any of the above are not true, an error message is rendered and the form is not submitted.

#### API errors

If the received data from query contain the `error` property, it is rendered as an error message and no results are displayed.

#### Error Messages

Error messages are handled with the `flash-messages` module

```
src/
  modules/
    flash-messages/
```
The `add` flash message function takes an object with the following properties as an argument:
* `type`: `"error"` or `"success"`
* `message`: string to display

## Folder Structure

Chunks of functionality are separated into modules:

```
src/
  modules/
    common/
    flash-messages/
    thesaurus/
```

Each module contains an `components` folder with the React components and `.js` files with the Redux and non-Redux logic. The index.js file enables an unified export of the whole module:

```
thesaurus/
  components/
    advanced-settings.js/
    basic-form.js/
  action-types.js/
  actions.js/
  reducer.js/
  constants.js/
  index.js/
```

## Dependencies

App is created with `create-react-app`, which takes care of all the dev dependencies. <br>

Package dependencies:

* `react`, `react-dom`, `react-addons-css-transition-group`, `react-addons-transition-group`: creating and displaying React components to the DOM
* `react-router`: enables single page app browsing
* `reactstrap`: simple Bootstrap 4 components, improves HTML readibility
* `redux`, `react-redux`: unified state architecture
* `axios`, `redux-thunk`: HTTP requests and automatic promise resolution in redux actions
* `lodash`: all-purpose javascript library, reduces boilerplate
* `classnames`: enables easy conditional settings of css classes
* `wordcloud`: used for the word cloud rendering

## Running and Building the Project

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about running tests for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

## Improvements and Issues

### CORS

Access to the API from client is restricted by the `Access-Control-Allow-Origin` HTTP header. All requests are ran through a public proxy:
```
https://crossorigin.me/https://api.sketchengine.co.uk/ ...
```

This may cause a higher latency of the requests.

### Fetching WSposlist

`WSposlist` for the current corpus has to be fetched before the form is displayed (or theoretically submitted). This query could be ran immediately after selection of a corpus in the end solution.
