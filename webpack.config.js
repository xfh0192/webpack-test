  const path = require('path');
  //const webpack = require('webpack');       //尝试dynamic import 动态导入时注释了
  const HtmlWebpackPlugin = require("html-webpack-plugin");
  //使用这个插件，解决的问题：如果在这里更改了入口文件的名称，index.html中引用的文件src仍会用旧的名字
  //虽然在 dist/ 文件夹我们已经有 index.html 这个文件，然而 HtmlWebpackPlugin 还是会默认生成 index.html 文件。
  //这就是说，它会用新生成的 index.html 文件，把我们的原来的替换。
  //这样就不用改动index.html了
  const CleanWebpackPlugin = require("clean-webpack-plugin");
  /*
	你可能已经注意到，由于过去的指南和代码示例遗留下来，导致我们的 /dist 文件夹相当杂乱。webpack 会生成文件，然后将这些文件放置在 /dist 文件夹中，但是 webpack 无法追踪到哪些文件是实际在项目中用到的。
	通常，在每次构建前清理 /dist 文件夹，是比较推荐的做法，因此只会生成用到的文件
  */

  module.exports = {
    entry: {
    	//app: './src/index.js',
    	//print: './src/print.js'                  //多入口文件
    	//vendor: ['lodash'],                      //将依赖包独立为一个入口文件
      //another: './src/another-module.js'       //另一个入口文件。多个入口文件依赖相同代码块时，使用插件CommonsChunkPlugin
      //下面是尝试动态导入的demo
      index: './src/index.js'
    },
    output: {
    	filename: '[name].bundle.js',
    	path: path.resolve(__dirname, 'dist'),
      chunkFilename: '[name].bundle.js',        //动态导入
      // 对于热替换(HMR)是必须的，让 webpack 知道在哪里载入热更新的模块(chunk)
    	publicPath: "./"   //告诉本地出口文件去哪找
  	},
    //watch: true,
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        }
      ]
    },
  	plugins: [
  		//new CleanWebpackPlugin(["dist"]),
  		new HtmlWebpackPlugin({
  			title: 'Code Splitting'
  		}),
      // 开启全局的模块热替换(HMR)
  		//new webpack.HotModuleReplacementPlugin(),  		// 启用 HMR
      // 当模块热替换(HMR)时在浏览器控制台输出对用户更友好的模块名字信息
      //new webpack.NamedModulesPlugin()
      //去重插件
      //new webpack.optimize.CommonsChunkPlugin({      //用于去重的插件
      //    name: 'common'                            // specify the common bundle's name
      //})
      //动态导入
      //不写东西
  	],
  	devtool: "cheap-module-eval-source-map",
  	devServer: {
  		hot: true, 										//告诉dev-server在使用HMR
      port: 8080,
      compress: true,
  		contentBase: path.resolve(__dirname, "dist"),
  		publicPath: "/"
  	}
  };