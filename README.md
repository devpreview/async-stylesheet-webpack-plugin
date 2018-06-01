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

## Install via npm
```
npm install --save-dev async-stylesheet-webpack-plugin
```

* Latest release: https://github.com/devpreview/async-stylesheet-webpack-plugin/releases
* NPM: https://www.npmjs.com/package/async-stylesheet-webpack-plugin

## Usage
The plugin will update all your `webpack` bundles stylesheets in the head using `link` tags with `rel="preload"` attribute.
Just add the plugin to your `webpack` config as follows:

**webpack.config.js**
```js
const HtmlWebpackPlugin = require('html-webpack-plugin')
const AsyncStylesheetWebpackPlugin = require('async-stylesheet-webpack-plugin');

module.exports = {
  ...
  
  plugins: [
    new HtmlWebpackPlugin(),
    new AsyncStylesheetWebpackPlugin(),
    ...
  ]
}
```

This will generate a file `dist/index.html` containing the following:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Webpack App</title>
    <link href="app.css" rel="preload" as="style" onload="this.onload=null;this.rel='stylesheet';">
    <noscript><link href="app.css" rel="stylesheet"></noscript>
  </head>
  <body>
    <script src="app.js"></script>
  </body>
</html>
```

## Options
You can pass a hash of configuration options to `async-stylesheet-webpack-plugin`. Allowed values are as follows:

|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|**[`preloadPolyfill`](#preload-polyfill)**|`{Boolean}`|`false`|If `true` then enabled legacy browser support|
|**[`noscriptFallback`](#without-javascript)**|`{Boolean}`|`true`|If `true` then enabled fallback stylesheets loading without `JavaScript`|
|`chunks`|`{String[]}`|`null`|Allows you to async load only some chunks|
|`excludeChunks`|`{String[]}`|`null`|Allows you to skip async load some chunks|

Here's an example `webpack` config illustrating how to use these options:

**webpack.config.js**
```js
module.exports = {
  ...
  
  plugins: [
    new HtmlWebpackPlugin(),
    new AsyncStylesheetWebpackPlugin({
      preloadPolyfill: true,
      noscriptFallback: true
    }),
    ...
  ]
}
```
## Legacy browser support

### Preload polyfill
If `preloadPolyfill` option is enabled (this option disabled by default) `async-stylesheet-webpack-plugin` adding in HTML `head` [cssrelpreload.js](https://github.com/filamentgroup/loadCSS/blob/master/src/cssrelpreload.js) provided by [loadCSS](https://github.com/filamentgroup/loadCSS).

This will generate a file `dist/index.html` containing the following:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Webpack App</title>
    <script type="text/javascript">/* here is the content of the cssrelpreload.js */</script>
    <link href="app.css" rel="preload" as="style" onload="this.onload=null;this.rel='stylesheet';">
    <noscript><link href="app.css" rel="stylesheet"></noscript>
  </head>
  <body>
    <script src="app.js"></script>
  </body>
</html>
```

### Without JavaScript
If `noscriptFallback` option is enabled (this option enabled by default) `async-stylesheet-webpack-plugin` adding in HTML `head` `noscript` tag with traditional stylesheet loading.

This will generate a file `dist/index.html` containing the following:
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Webpack App</title>
    <link href="app.css" rel="preload" as="style" onload="this.onload=null;this.rel='stylesheet';">
    <noscript><link href="app.css" rel="stylesheet"></noscript>
  </head>
  <body>
    <script src="app.js"></script>
  </body>
</html>
```

If `noscriptFallback` option is disabled `async-stylesheet-webpack-plugin` only updated `link` tags:
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Webpack App</title>
    <link href="app.css" rel="preload" as="style" onload="this.onload=null;this.rel='stylesheet';">
  </head>
  <body>
    <script src="app.js"></script>
  </body>
</html>
```

## Credit
* [loadCSS](https://github.com/filamentgroup/loadCSS) - A function for loading CSS asynchronously;
* [HTML Webpack Plugin](https://github.com/jantimon/html-webpack-plugin) - Simplifies creation of HTML files to serve your webpack bundles.

## See also
* [all-chunks-loaded-webpack-plugin](https://github.com/devpreview/all-chunks-loaded-webpack-plugin) - Provide callback executed after all chunks loaded;
* [Script Extension for HTML Webpack Plugin](https://github.com/numical/script-ext-html-webpack-plugin) - Enhances html-webpack-plugin functionality with different deployment options for your scripts including 'async', 'preload', 'prefetch', 'defer', 'module', custom attributes, and inlining;
* [preload-webpack-plugin](https://github.com/GoogleChromeLabs/preload-webpack-plugin) - A webpack plugin for injecting <link rel='preload|prefecth'> into HtmlWebpackPlugin pages, with async chunk support.

## Need a feature?
Welcome to [issues](https://github.com/devpreview/async-stylesheet-webpack-plugin/issues)!
