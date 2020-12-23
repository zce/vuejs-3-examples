# Vue.js 3.0 tutorials

为什么学习 Vue.js 3.0？

作为前端的主力框架，Vue.js 因为上手成本低的特点，有着很大的市场占有率，很多的公司都在大面积使用 Vue.js 作为主要的技术栈，再往后升级 Vue.js 3.0 只是早晚的事情，而且 Vue.js 3.0 确实有很多突破性的改进（具体的改进和变化我们待会也会详细介绍），所以对于我们前端开发者而言，掌握 Vue.js 3.0 也是一个必要的目标。

Vue.js 3.0 已经发布有一段时间了，而且在此之前也经历过一个很长的测试阶段，所以对于 Vue.js 3.0 我相信大多数「圈内人士」都或多或少的了解了一些。例如：新的 Composition APIs、响应式数据底层实现改由 Proxy 实现、重写了 Virtual DOM、性能上的变化等等。

具体我们开发者能够感知到的变化，我们可以从官方文档中找到一个非常完整详细的[介绍](https://v3.vuejs.org/guide/migration/introduction.html#notable-new-features)，其中绝大多数的变化在我们之前的课程中我也有过详细的介绍。

今天晚上我并不打算一个一个地跟你去过一遍这些新的特性，我是希望能够更多的跟你分享一些我的理解和观点，因为对于已经入行的同学来说，很多时候被困扰的并不用法上的问题，而是设计和原理上的疑惑。

具体来说，我把今天的要分享的内容归纳为以下这几个问题：

1. Vue.js 3.0 为什么会推出一套全新的 Composition APIs？这套全新的 API 又有哪些明显的优势？
2. Composition APIs 究竟应该怎样使用才能发挥出它应有的价值？
3. Vue.js 3.0 目前在实际场景下的使用情况如何？敢不敢现在升级？
4. 周边生态目前又是什么样的状态？

如果时间允许的情况下，我会：

1. 剖析一下 Vue.js 3.0 中响应式数据核心的实现原理和源码
2. 聊一聊 Vue.js 3.0 中的几个实验性的语法糖
3. 拆解一下 Vue.js 3.0 同期发布的 Vite

不知道这些问题有没有戳中你，如果你也有类似的疑问，一定跟我们一起看下去，彻底搞懂这些问题。

## Composition APIs

### Composition APIs 的起因

话不多说，首先来看第一个话题：Vue.js 3.0 为什么会推出一套全新的 Composition APIs？

想要彻底理解 Vue.js 3.0 为什么搞一套 Composition APIs，核心你得先能够体会到 Vue.js 中存在的一些「小问题」。（因为一套替代方案的核心价值肯定在于它解决了之前的某种问题）。

大家对 Vue.js 3.0 熟不熟我不好确定，但是大家之前应该都或多或少的用过 Vue.js 2.x，在 Vue.js 2.x 中，框架的规则性或者叫规矩感非常强。

可能这么说不好理解，我举个例子，比如我们在一个页面组件中要呈现一些从服务器端获取的数据，我们需要先在组件的 data 中添加一个成员，往模板上暴露数据，然后要到组件的生命周期钩子函数中添加获取数据的逻辑代码，如果取回来的数据在呈现的时候还需要经过过滤筛选，那我们还需要在组件的 computed 属性中添加对应的计算属性。

整个过程看似很和谐，这也是为什么说 Vue.js 上手非常友好的原因，毕竟这个过程中框架提供了很完善的规则，我们只需要照着文档一步一步来就行。

这里我也准备了一个[小案例](01-composition-apis/01-classic/prepare.html)，....

这里我们要去添加筛选界面上所现实的 Todos 列表的功能。

我们需要先 xxx，再 xxx ...

那大家能意识到这样做存在的问题么？

同一个业务功能相关的代码分散在各个位置，框架的规则是按照技术特性划分，而不是按照业务功能划分

### *Options APIs（Classic Usage）

Vue.js 3.0 仍然支持 Vue.js 2.x Options APIs 典型用法！

### Composition APIs 的基本用法

Vue.js 3.0 全新引入一套新的 API 调用风格，类函数式编程！

### Composition APIs 封装 Hooks

如果只是目前这么去使用 Composition APIs，那只是换汤不换药，没什么意义。。。

单纯的使用 Composition APIs 并没有太明显的优势，Composition APIs 核心的优势在于 Composition（组合）！

hooks 库：https://github.com/u3u/vue-hooks

### 封装后的 Todos 案例

发挥 Composition APIs 的价值

### Composition APIs 的优势总结

- 逻辑组合，更强大的逻辑抽象能力，同时更好的逻辑复用
- 没有 this，没烦恼，再也不用纠结 this 上到底有什么了
- 更好的类型推导能力（TypeScript）
- 更友好的 Tree-shaking 支持（渐进式体验）
- 更大的代码压缩空间

## Vue.js 3.0 基础设施

### 基于 Webpack 构建

### 基于 Vue CLI 构建

### 基于 Vite 构建

参考： https://github.com/zce/vite-essentials

## 周边库生态

### 官方库

### 社区库

- https://github.com/vuejs/awesome-vue/issues/3544

## ENCORE 加餐

### Reactivity



### SFC Sugers

- https://github.com/vuejs/rfcs/pull/222
- https://github.com/vuejs/rfcs/pull/228
- https://github.com/vuejs/rfcs/pull/227

### Vite 原理与实践

参考： https://github.com/zce/vite-essentials

---

> Some examples of Vue.js 3.0.

- [Composition APIs](01-composition-apis)
- [Webpack based](02-webpack-based)
- [Vue CLI based](03-vue-cli-based)
- [Vite based](04-vite-based)
- [Official Libraries](05-official-libraries)

> https://github.com/zce/vite-essentials
