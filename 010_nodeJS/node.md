# Node.js

## 一. Node.js概述
### 1. Node.js概述
1. Node.js是一个基于"Chrome V8引擎"的JavaScript"运行环境"
2. Nvm运行在一台电脑中装多个nodejs的版本
3. Node环境与浏览器环境异同
   + 内置对象不同
     + 浏览器提供了window全局对象
     + NodeJS全局对象叫global
   + this默认指向不同
     + 浏览器中全局this默认指向window
     + NodeJS环境中全局this默认指向空对象{}
   + api不同
     + 浏览器环境中提供了操作节点的DOM相关API和操作浏览器的BOM相关API
     + NodeJS环境中没有HTML节点也没有浏览器, 所以NodeJS环境中没有DOM/BOM

### 2. 全局对象属性

1. __dirname: 当前文件所在文件夹的绝对路径
2. __filename: 当前文件的绝对路径
3. setInterval / clearInterval : 和浏览器中window对象上的定时器一样
4. setTimeout /  clearTimeout : 和浏览器中window对象上的定时器一样
5. console :  和浏览器中window对象上的打印函数一样

### 3. 模块

1. NodeJS采用CommonJS规范实现了模块系统

2. CommonJS规范规定了如何定义一个模块, 如何暴露(导出)模块中的变量函数, 以及如何使用定义好的模块

3. 模块导出 （三种方式）

   + 通过exports.xxx = xxx导出
   + 通过module.exports.xxx = xxx导出
   + 通过global.xxx = xxx导出
   + 注意：
     + 无论通过哪种方式导出, 使用时都需要先导入(require)才能使用
     + 通过global.xxx方式导出不符合CommonJS规范, 不推荐使用

4. exports和module.exports区别

   + exports只能通过 exports.xxx方式导出数据, 不能直接赋值
   + module.exports既可以通过module.exports.xxx方式导出数据, 也可以直接赋值
   + 在企业开发中无论哪种方式都不要直接赋值, 这个问题只会在面试中出现

5. require

   + require导入模块时可以不添加导入模块的类型

     + 如果没有指定导入模块的类型, 那么会依次查找.js .json .node文件

       无论是三种类型中的哪一种, 导入之后都会转换成JS对象返回给我们

   + 导入自定义模块时必须指定路径

   + require可以导入"自定义模块(文件模块)"、"系统模块(核心模块)"、"第三方模块"

   + 导入"系统模块"和"第三方模块"是不用添加路径

     + 导入"系统模块"和"第三方模块"是不用添加路径的原因：
       + 如果是"系统模块"直接到环境变量配置的路径中查找
       + 如果是"第三方模块"会按照module.paths数组中的路径依次查找

### 4. 包管理

1. npm

2. cnpm

3. nrm :  换源工具

4. yarn：Yarn是由Facebook、Google、Exponent 和 Tilde 联合推出了一个新的 JS 包管理工具

   Yarn 是为了弥补 npm5.0之前 的一些缺陷而出现的

### 5.NODE_ENV

1. NODE_ENV是一个环境变量

2. 设置NODE_ENV

   + windows
     + set NODE_ENV  // 先查看NODE_ENV是否存在
     + set NODE_ENV=production  // 如果不存在则添加环境变量
     + set NODE_ENV=    // 若存在则需要先删除
   + Linux
     + echo $NODE_ENV    // 查看NODE_ENV是否存在
     + export NODE_ENV=production     // 不存在则添加环境变量
     + unset NODE_ENV    // 删除环境变量
   + NODE_ENV保存在process.env中，可通过`console.log(process.env.NODE_ENV)`查看

3. cross-env

   + 此包可以解决不同系统间命令兼容问题

   + ```sh
     # 安装
     npm install --save-dev cross-env
     # 使用
     "scripts": {
       "dev": "cross-env NODE_ENV=dev nodemon ./bin/www.js",
       "build": "cross-env NODE_ENV=pro nodemon ./bin/www.js",
     }
     ```

## 二. 核心API

### 1. Buffer

### 2. 路径模块(path)

### 3. 文件操作

### 4. HTTP模块

### 5. URL模块

### 6. querystring模块

## 三. 第三方包

### 1. nodemon

1. 监视服务端应用程序文件改变的包，一旦服务器文件改变，会自动重启服务
2. 本地安装使用
   + npm i nodemon
   + npx nodemon app.js
3. 全局安装使用
   + npm i nodemon -g
   + nodemon app.js

### 2.Ajv

1. JSON Schema：定义了JSON格式的规范，利用这个规范可以对数据进行校验
2. Ajv是一个能根据JSON Schema对数据进行校验的node库
3. https://www.npmjs.com/package/ajv