import webpack from 'webpack';
import { resolve } from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import LiveReloadPlugin from 'webpack-livereload-plugin';

// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

import { getIfUtils, removeEmpty } from 'webpack-config-utils';

export default env => {
    const { ifProd, ifNotProd } = getIfUtils(env);

    return {
        mode: ifProd('production', 'development'),
        devtool: ifNotProd('cheap-module-source-map'),
        resolve: {
            alias: {
                ['~']: resolve(__dirname, 'src')
            }
        },
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
        plugins: removeEmpty([
            // new BundleAnalyzerPlugin(),
            new MiniCssExtractPlugin(),
            ifNotProd(new LiveReloadPlugin({ appendScriptTag: true })),
            new webpack.EnvironmentPlugin({
                NODE_ENV: ifProd('production', 'development')
            })
        ])
        // ,
        // optimization: {
        //     splitChunks: {
        //         chunks: 'all'
        //     }
        // }
    };
};
