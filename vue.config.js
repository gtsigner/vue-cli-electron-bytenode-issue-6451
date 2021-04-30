const webpack = require('webpack');
const path = require('path');

//plugins
const BytenodeWebpackPlugin = require('@herberttn/bytenode-webpack-plugin').BytenodeWebpackPlugin; //没办法支持electron

module.exports = {
    pages: {
        index: {entry: './src/main.js', template: 'public/index.html'},
    },
    outputDir: 'dist',
    configureWebpack: {
        plugins: [
            //disable chunk look=> https://medium.com/@glennreyes/how-to-disable-code-splitting-in-webpack-1c0b1754a3c5
            new webpack.optimize.LimitChunkCountPlugin({maxChunks: 1}),
        ],
        resolve: {

        },
        module: {
        },
        optimization: {
            splitChunks: false,
        },
    },
    css: {
        sourceMap: false,
        extract: false,
        loaderOptions: {
            scss: {
                // prependData: `@import "~@/assets/scss/variables/scss/material-colors.scss";`,
            },
        },
    },
    chainWebpack: (config) => {
        config.plugin('bytenode').use(BytenodeWebpackPlugin, [{compileForElectron: true}]);
        // new BytenodeWebpackPlugin({ compileForElectron: true })
    },
    // 关闭生产环境的 source map
    productionSourceMap: false,
    runtimeCompiler: true,
    filenameHashing: false,
    publicPath: '/',
    transpileDependencies: [
        'vue-echarts',
        'resize-detector',
    ],
};
