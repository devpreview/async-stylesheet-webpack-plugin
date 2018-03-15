const path = require('path');
const _root = path.resolve(__dirname, '.');

/**
 * Helpers
 */
const helpers = {
    root: function (args) {
        args = Array.prototype.slice.call(arguments, 0);
        return path.join.apply(path, [_root].concat(args));
    },

    libVersion: require("./package.json").version
};

/**
 * Webpack plugins
 */
const nodeExternals = require('webpack-node-externals');

/**
 * Webpack configuration
 *
 * See: https://webpack.js.org/configuration/
 */
module.exports = {
    /**
     * Instructs webpack to target a specific environment.
     *
     * See: https://webpack.js.org/concepts/targets/
     */
    target: 'node',

    /**
     * These options change how modules are resolved.
     *
     * See: https://webpack.js.org/configuration/resolve/
     */
    resolve: {
        /**
         * Automatically resolve certain extensions.
         *
         * See: https://webpack.js.org/configuration/resolve/#resolve-extensions
         */
        extensions: ['.ts']
    },

    /**
     * The externals configuration option provides a way of excluding dependencies
     * from the output bundles.
     *
     * See: https://webpack.js.org/configuration/externals/
     * See: https://github.com/liady/webpack-node-externals
     */
    externals: [nodeExternals()],

    /*
     * The entry point for the bundle
     *
     * See: https://webpack.js.org/configuration/entry-context/#entry
     */
    entry: {
        'plugin': helpers.root('src/main', 'plugin.ts')
    },

    /**
     * Options affecting the output of the compilation.
     *
     * See: https://webpack.js.org/concepts/output/
     * See: https://webpack.js.org/configuration/output/
     */
    output: {
        /**
         * The output directory as an absolute path.
         *
         * See: https://webpack.js.org/configuration/output/#output-path
         */
        path: helpers.root('dist'),

        /**
         * Specifies the name of each output file on disk.
         * IMPORTANT: You must not specify an absolute path here!
         *
         * See: http://webpack.github.io/docs/configuration.html#output-filename
         */
        filename: '[name].js',

        /**
         * Configure how the library will be exposed.
         *
         * See: https://webpack.js.org/configuration/output/#output-librarytarget
         */
        libraryTarget: 'commonjs2',

        /**
         * Configure which module or modules will be exposed via the libraryTarget.
         *
         * See: https://webpack.js.org/configuration/output/#output-libraryexport
         * See: https://github.com/webpack/webpack/issues/706#issuecomment-361923568
         */
        libraryExport: "default"
    },

    /**
     * Configuration regarding modules.
     *
     * See: https://webpack.js.org/configuration/module/
     */
    module: {
        /**
         * Rules for modules (configure loaders, parser options, etc.)
         *
         * See: https://webpack.js.org/configuration/module/#module-rules
         */
        rules: [
            /**
             * TypeScript loader for webpack
             *
             * See: https://github.com/TypeStrong/ts-loader
             */
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                options: {
                    configFile: helpers.root('tsconfig.json'),
                    context: helpers.root('src/main'),
                    compilerOptions: {
                        declaration: true
                    }
                }
            }
        ]
    },

    /**
     * Add additional plugins to the compiler.
     *
     * See: http://webpack.github.io/docs/configuration.html#plugins
     */
    plugins: [],

    /**
     * Developer tool to enhance debugging
     *
     * See: http://webpack.github.io/docs/configuration.html#devtool
     * See: https://github.com/webpack/docs/wiki/build-performance#sourcemaps
     */
    devtool: 'source-map'
};
