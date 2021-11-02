var htmlwp = require('html-webpack-plugin');
module.exports = {
    entry: './src/main.js',
    output: {
        path: __dirname + '/dist',
        filename: 'build.js'
    },
    plugins: [
        new htmlwp({
            title: '首页',
            filename: 'index.html',
            template: 'vue_02.html'
        })
    ]
}