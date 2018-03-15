import { Plugin as WebpackPlugin, Compiler as WebpackCompiler } from "webpack";
import * as fs from "fs";

export interface AsyncStylesheetWebpackPluginOptions {
    preloadPolyfill?: boolean;
    noscriptFallback?: boolean;
}

export class AsyncStylesheetWebpackPlugin extends WebpackPlugin {

    protected options: AsyncStylesheetWebpackPluginOptions = {
        preloadPolyfill: false,
        noscriptFallback: true
    };

    public constructor(options: AsyncStylesheetWebpackPluginOptions = {}) {
        super();
        Object.assign(this.options, options);
    }

    public apply(compiler: WebpackCompiler): void {
        compiler.plugin('html-webpack-plugin-alter-asset-tags', (data, next) => {
            next(null, data);
        });
    }

}
