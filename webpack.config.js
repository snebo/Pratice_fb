// this should look at our source and bundle it in the dist
const path = require('path')

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: { // this determines where the file gotten from the entry is stored
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    watch: true // make changes live
}