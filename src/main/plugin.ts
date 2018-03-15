import { Compiler as WebpackCompiler } from "webpack";
import * as fs from "fs";

export interface AsyncStylesheetWebpackPluginOptions {
    preloadPolyfill?: boolean;
    noscriptFallback?: boolean;
}

export default class AsyncStylesheetWebpackPlugin {

    protected options: AsyncStylesheetWebpackPluginOptions = {
        preloadPolyfill: false,
        noscriptFallback: true
    };

    public constructor(options: AsyncStylesheetWebpackPluginOptions = {}) {
        Object.assign(this.options, options);
    }

    public apply(compiler: WebpackCompiler): void {
        compiler.plugin('html-webpack-plugin-alter-asset-tags', (data, next) => {
            next(null, this.makeStylesheetsAsync(data));
        });
    }

    public makeStylesheetsAsync(data: any): any {
        let noscriptTags: string[] = [];
        for (let tag of data.head) {
            if (tag.tagName === 'link' && tag.attributes.rel === 'stylesheet') {
                let noscriptTagAttrs = Object.keys(tag.attributes).map((attr) => {
                    return attr + '="' + tag.attributes[attr] + '"';
                }).join(' ');
                noscriptTags.push('<link ' + noscriptTagAttrs + '>');
                tag.attributes.rel = 'preload';
                tag.attributes.as = 'style';
                tag.attributes.onload = tag.attributes.onload ? tag.attributes.onload : '';
                tag.attributes.onload += "this.rel='stylesheet';";
            }
        }
        if (noscriptTags.length > 0) {
            if (this.options.noscriptFallback) {
                data.head.push({
                    tagName: 'noscript',
                    closeTag: true,
                    innerHTML: noscriptTags.join('')
                });
            }
            /**
             * rel=preload polyfill
             * See: https://github.com/filamentgroup/loadCSS#how-to-use-loadcss-recommended-example
             */
            if (this.options.preloadPolyfill) {
                data.head = [{
                    tagName: 'script',
                    attributes: {type: 'text/javascript'},
                    closeTag: true,
                    innerHTML: fs.readFileSync(
                        require.resolve('fg-loadcss/dist/cssrelpreload.min.js'),
                        'utf8'
                    )
                }].concat(data.head);
            }
        }

        return data;
    }

}
