import webpack from 'webpack';
import { resolve } from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import { getIfUtils, removeEmpty } from 'webpack-config-utils';

export default env => {
    const { ifProd, ifNotProd } = getIfUtils(env);

    return {
        mode: ifProd('production', 'development'),
        devtool: ifNotProd('cheap-module-source-map'),
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
        plugins: [
            new MiniCssExtractPlugin()
        ],
        optimization: {
            splitChunks: {
                chunks: 'all'
            }
        }
    };
};
