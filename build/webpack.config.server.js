const path = require('path')
const nodeExternals = require('webpack-node-externals')

const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
module.exports = {
  mode: 'none',
  target: 'node',
  entry: path.join(__dirname, '../src/skeleton.entry.js'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [{
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      }
    ]
  },
  externals: nodeExternals({
    whitelist: /\.css$/
  }),
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  plugins: [
    
    new VueSSRServerPlugin({
      filename: 'skeleton.json'
    })
  ]
}
