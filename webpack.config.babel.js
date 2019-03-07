import webpack from 'webpack';
import { resolve } from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import LiveReloadPlugin from 'webpack-livereload-plugin';

import { getIfUtils, removeEmpty } from 'webpack-config-utils';

export default env => {
    const { ifProd, ifNotProd } = getIfUtils(env);

    return {
        mode: ifProd('production', 'development'),
        devtool: ifNotProd('cheap-module-source-map'),
        stats: 'minimal',
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader'
                    }
                },
                {
                    test: /\.css$/,
                    use: [MiniCssExtractPlugin.loader, 'css-loader']
                }
            ]
        },
        plugins: removeEmpty([new MiniCssExtractPlugin(), ifNotProd(new LiveReloadPlugin({ appendScriptTag: true }))]),
        optimization: {
            splitChunks: {
                chunks: 'all'
            }
        }
    };
};
