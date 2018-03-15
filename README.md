[![license](https://img.shields.io/github/license/devpreview/async-stylesheet-webpack-plugin.svg)](https://github.com/devpreview/async-stylesheet-webpack-plugin/blob/master/LICENSE)
[![Build Status](https://travis-ci.org/devpreview/async-stylesheet-webpack-plugin.svg?branch=master)](https://travis-ci.org/devpreview/async-stylesheet-webpack-plugin)
[![npm version](https://badge.fury.io/js/async-stylesheet-webpack-plugin.svg)](https://www.npmjs.com/package/async-stylesheet-webpack-plugin)
[![dependencies Status](https://david-dm.org/devpreview/async-stylesheet-webpack-plugin/status.svg)](https://david-dm.org/devpreview/async-stylesheet-webpack-plugin)
[![devDependencies Status](https://david-dm.org/devpreview/async-stylesheet-webpack-plugin/dev-status.svg)](https://david-dm.org/devpreview/async-stylesheet-webpack-plugin?type=dev)
[![peerDependencies Status](https://david-dm.org/devpreview/async-stylesheet-webpack-plugin/peer-status.svg)](https://david-dm.org/devpreview/async-stylesheet-webpack-plugin?type=peer)
[![npm](https://img.shields.io/npm/dt/async-stylesheet-webpack-plugin.svg)](https://github.com/devpreview/async-stylesheet-webpack-plugin/releases)

# Asynchronous stylesheets loading with [HTML Webpack Plugin](https://webpack.js.org/plugins/html-webpack-plugin/)

## Why load stylesheets asynchronously?
Referencing CSS stylesheets with `link[rel=stylesheet]` or `@import` causes browsers to delay page rendering while a stylesheet loads. When loading stylesheets that are not critical to the initial rendering of a page, this blocking behavior is undesirable. The new `<link rel="preload">` standard enables us to load stylesheets asynchronously, without blocking rendering.

* Latest release: https://github.com/devpreview/async-stylesheet-webpack-plugin/releases
* NPM: https://www.npmjs.com/package/async-stylesheet-webpack-plugin

## Install via npm
```
npm install --save-dev style-ext-html-webpack-plugin
```

## Usage
The plugin will generate an HTML5 file for you that includes all your `webpack`
bundles in the body using `script` tags. Just add the plugin to your `webpack`
config as follows:

**webpack.config.js**
```js
const HtmlWebpackPlugin = require('html-webpack-plugin')
const AsyncStylesheetWebpackPlugin = require('async-stylesheet-webpack-plugin');

module.exports = {
  ...
  
  plugins: [
    new HtmlWebpackPlugin(),
    new ScriptExtHtmlWebpackPlugin(),
    ...
  ]
}
```

This will generate a file `dist/index.html` containing the following

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Webpack App</title>
    <link href="app.css" rel="preload" as="style" onload="this.rel='stylesheet';">
    <noscript><link href="app.css" rel="stylesheet"></noscript>
  </head>
  <body>
    <script src="app.js"></script>
  </body>
</html>
```

## Options
