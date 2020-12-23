# 02-webpack-based

## Steps

```shell
# 创建项目目录
$ mkdir vue-next-sample && cd $_

# 初始化 package.json，管理项目依赖模块
$ npm init --yes

# 安装 Vue.js 3.0 模块
$ npm install vue@next

# 安装 Webpack 相关工具模块
$ npm install webpack webpack-dev-server webpack-cli --save-dev
# 安装一些项目中需要的常规 Loader 和 Plugin
$ npm install css-loader style-loader html-webpack-plugin --save-dev

# 安装 Vue.js 单文件组件 Loader 以及它所依赖的模块
$ npm install vue-loader@next @vue/compiler-sfc --save-dev
```

```shell
# 启动 Webpack Dev Server & HMR
$ NODE_ENV=development npx webpack serve
# TIPs. 从 Webpack 5 起 webpack-dev-server 也交由 webpack-cli 调用

# 启动 Webpack 构建整个应用
$ NODE_ENV=production npx webpack
```

## Project setup

```shell
# install deps
$ npm install # or yarn

# serve and hot-reloads for development
$ npm run dev

# compiles and minifies for production
$ npm run build
```
