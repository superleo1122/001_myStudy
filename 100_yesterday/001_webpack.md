#  webpack的坑

## 一. 配置坑

1. file-loader打包图片后，页面图片显示不了
   + <img src="D:\02_csbook\001_前端的那些坑\images\001_webpack\001_file-loader-img.png" style="zoom:50%;" />
   + 原因：file-loader在最新版本中options里的esModule默认为true
   + 解决方案：第一种是将esModule改为false，而是降低file-loader版本
2. url-loader内部是封装了file-loader，所以二者不能同时使用，选其一即可。对于esModule，同上，将其设置为false。
3. 要对css打包，需要安装两个loader
   + css-loader：负责解析css文件中的@import依赖关系
   + style-loader：负责将webpack处理好的样式内容添加到页面的head标签中
4. loader的两个特点
   + 单一原则，一个loader只做一件事
   + 多个loader配置在同一个use里，会按照从右往左，从下至上的顺序执行
5. postcss-loader坑
   + 若要对css进行处理，则需要将postcss-loader放到匹配css文件的use里
   + 若是要对less进行处理，则需要将postcss-loader放到匹配less文件的use里
   + 若是要对sass进行处理，则需要将postcss-loader放到匹配sass文件的use里
6. file-loader
   + 在对字体图标打包时，若css-loader开启了模test块化，则可能会导致字体图标显示不出来
7. 利用terser-webpack-plugin和optimize-css-assets-webpack-plugin进行css和js压缩时，optimization的minimize需要设置为true
8. 打包css中背景图片路径问题
   + webpack打包后给的都是相对路径，这个相对路径是相对于index.html的，但是相对于css文件就不适用了，因为此时会相对于css目录去寻找
   + 解决方法
     1. 开发阶段：将打包图片loader的publicPath设置为webpack-dev-server服务器地址
     2. 上线阶段：将打包图片loader的publicPath设置为线上服务器地址
9. 

## 二. 其他坑

1. 在使用webpack命令打包时，项目路径不能含有中文，否则会出现找不到依赖模块的错误

## 三. loader及插件

1. 各种loader
   + file-loader：对图片进行打包
   + url-loader：对图片打包，对设置的小于某个体积的图片可打包成base64，自身包含file-loader
   + css-loader:  解析css文件中的@import依赖关系
     + options参数
     + modules: true  // 开启模块化，在导入时需要使用 import from 
   + less-loader：将less代码编译为css代码
   + sass-loader：将sass代码编译成css代码
   + postcss-loader：一款使用插件去转换css的工具(它有如下好用插件)
     + autoprefixer：自动补全浏览器厂商前缀
     + postcss-pxtorem：自动把px转换为rem
     + postcss-sprites：合并多张图为一张精灵图，并自动修改css中图片路径与位置
   + babel-loader
     + 将ES678转为ES5
     + 额外安装polyfill可以将es5中没有对应的语法，例如promise等，通过polyfill给补上去
   + html-withimg-loader
     + 将html中用到的图片打包到指定目录中，因为file-loader或者url-loader只能将JS或CSS中用到的图片打包到指定目录中
2. 各种插件
   + HtmlWebpackPlugin
     + 能在打包结束之后在输出目录自动创建一个index.html，并将打包好的JS自动引入到这个文件中，通过template属性配置
     + 对html进行压缩，需要配置minify属性
   + add-asset-html-webpack-plugin
     + 将指定文件添加到html中，依赖htmlwebpackplugin插件
   + DllPlugin
     + webpack内置插件，生成dll清单文件
   + DllReferencePlugin
     + webpack内置插件，指定文件路径
   + clean-webpack-plugin
     + 在打包之前会将webpack输出目录清空
   + copy-webpack-plugin
     + 能将指定目录的文件复制一份到webpack输出目录指定位置，不会对文件进行压缩，只是复制
   + mini-css-extract-plugin
     + 能将打包的css内容提取到单独的文件，用来代替style-loader，style-loader还是它粗暴了，它直接将css插入到html的head中
   + terser-webpack-plugin
     + JS代码压缩插件
   + optimize-css-assets-webpack-plugin
     + css代码压缩插件
   + HotModuleReplacementPlugin
     + webpack内置插件
     + 通过MiniCssExtractPlugin.loader来处理CSS的，需要额外参数配置
     + 貌似只能监听css模块变化，不能监听js模块变化。。。要监听js模块变化得手动监听。。。
   + ESlint
     + 代码检测工具
     + 在配置loader时需要排在处理JS的其他loader之前
   + webpack-merge
     + 用来合并配置文件
   + Split-Chunks-Plugin
     + webpack底层进行代码切割时使用的插件
   + Provide-Plugin
     + webpack内置插件，可以在全局引入模块
   + IgnorePlugin
     + webpack内置插件，可以用于忽略第三方包指定目录，让指定目录不被打包进去
   + HappyPack
     + webpack打包项目是单线程的，为了多线程打包，可以使用HappyPack这个插件
   + webpack-bundle-analyzer
     + 一个可视化的优化插件

## 四. webpack学习点

1. 常见配置

   + entry：需要打包文件入口

   + output：打包之后输出路径和文件

   + mode：打包模式

     + development -- 不会压缩打包后的JS代码
     + production -- 会自动压缩打包后的JS代码

   + devtool：配置sourcemap

   + watch

     + 监听文件变化，当文件变化后自动重新编译打包
     + watchOptions
       + aggregateTimeout: 函数防抖，单位毫秒
       +  poll: 以毫秒为单位进行轮询
       + ignored: 设置不进行监听的文件夹

   + devServer

     + 将打包好的文件运行在一个服务器环境下

       + 注意：并不会将打包文件进行输出
       + 通过webpack-dev-server，在文件内容修改后会自动打包并且自动刷新页面，为了解决自动刷新页面问题，可以使用HMR

     + 这是一个插件应该，需要先安装的哈: `npm install --save-dev webpack-dev-server`

     + 参数：

       1. contentBase: 输出文件目录

       2. open: 是否自动打开浏览器

       3. port: 端口
       4. proxy：设置代理，解决跨域问题（通过请求转发）

     + 运行命令：`npx webpack-dev-server --config webpack.config.js`

   + plugins

     + 插件配置

   + optimization

     + 配置webpack优化项

   + purifycss

     + 能给css做tree-shaking

   + resolve

     + 配置导入模块的路径解析规则
       1. alias：通过设置别名映射导入路径，简化导入代码
       2. mainFields：指定模块入口的查找顺序
       3. extensions：指定导入模块文件类型查找顺序
       4. modules：指定导入模块的查找范围

   + module

     + noParse：声明不需要去解析其依赖关系的库

   + externals

     + 将全局引入的第三方模块设置为一个外部扩展库，不需要打包，可以提升打包速度

2. 常见命令

   + npx webpack : 打包命令，配置文件名必须叫webpack.config.js
   + npx webpack --config xxx : 打包时通过--config指定配置文件名称，可通过npm script进行简化

3. 概念

   + webpack在打包时会将代码分为业务代码(main.js)和库(vendor.js)，库和业务代码之间的关系叫做manifest，在使用contenthash时，其实main.js的hash可能会一直变化，即使代码没有改动，通过runtimeChunk可以将一部分不变动的代码再次分离出来。
   + webpack打包多页应用
     + 配置多个入口

## 五. webpack优化点

1. CSS压缩

2. JS压缩

3. HTML压缩

4. 多张图片合并为一张精灵图

5. Tree-Shaking

   + 过滤掉无用的JS代码和CSS代码
   + 在webpack中，生产环境已经默认配置了Tree-Shaking，而开发环境需要手动配置
     + 配置时只需添加usedExports为true即可，不需要使用TerserPlugin之流
   + 对于不需要Tree-Shaking的文件，可以通过package.json的sideEffects属性设置
   + 必须使用ES模块导入

6. CSS-Tree-Shaking

   + 对于CSS，可以使用上面webpack内置的，也可以使用专门的purifycss

7. Code-Splitting

   + 目的在于对导入模块进行切分，减少重复导入的代码。对于文件大小超过限制，会去检查是否有导入的模块，若有则按缓存组规则将导入模块分割出来，若无则不分割。

   + webpack在打包时自动将JS代码分割成区块，可通过optimization里的splitChunks属性进行配置，默认是对异步代码进行分割，若对同步代码也需要进行分割，需要修改chunks为all（默认为async）
   + webpack在切割代码时底层使用的是split-chunks-plugin插件

8. 模块异步加载（懒加载）

   + 看webpack官网如何进行异步加载
   + 对于使用异步加载的模块，即使没有配置code-splitting，在打包时webpack也会自动帮我们进行代码分割

9. Prefetching （在空闲的时候加载）

   + 使用方式：在异步加载时添加魔法注释`/* webpackPrefetch: true */`
   + 注：使用魔法注释可以修改分割代码名称

10. 长缓存优化

    + 打包文件时给文件名称加上内容的hash值
    + webpack中的哈希值
      + hash：根据整个打包的内容(全部文件内容)生成hash值
      + chunkhash：根据不同入口文件依赖的文件解析构建的chunk生成hash
        + 只支持js和css，不支持img等其他资源
      + contenthash：根据某个文件内容生成hash ---- 推荐
        + 在webpack4中，contenthash和热更新有冲突，所以在开发模式中使用contenthash必须关闭热更新
        + main.js哈希值变化问题

11. 使用Provide-Plugin引入全局模块

12. dll动态链接库

    +  功能和externals一样，都是为了防止重复打包不会发生变化的第三方模块，提升打包速度
    + 只需要编译一次
    + 动态链接库优势
      + 不用手动插入
      + 所有第三方库只会被打包一次
    + 存在问题
      + 若提前打包生成了多个文件和清单，那么需要手动添加清单
