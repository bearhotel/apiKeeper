var path = require('path')
var webpack = require('webpack')
function resolvePath(dir) {
  return path.resolve(__dirname, dir)
}
const config = {
  entry: {
    index: resolvePath('./index.js')  
  },
  output: {
    path: resolvePath('./dist'),
    filename: 'api-keeper.js',
    library: 'apikeeper',//library指定的是你require时候的模块名。
    libraryTarget: 'umd'//把 libraryTarget 设定为 umd 表示采用 通用模块定义 来生成最终结果
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          { loader: 'babel-loader' }
        ]
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    })
  ]
}

module.exports = config
