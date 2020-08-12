# Tree Shaking

Tree Shaking 翻译过来的意思就是“摇树”。伴随着摇树的动作，树上的枯树枝和树叶就会掉落下来。

我们这里要介绍的 Tree-shaking 也是同样的道理，不过通过 Tree-shaking “摇掉”的是代码中那些没有用到的部分，这部分没有用的代码更专业的说法应该叫作未引用代码（dead-code）。

Tree-shaking 最早是 Rollup 中推出的一个特性，Webpack 从 2.0 过后开始支持这个特性。

我们使用 Webpack 生产模式打包的优化过程中，就使用自动开启这个功能，以此来检测我们代码中的未引用代码，然后自动移除它们。

我们可以先来体验一下这个功能的效果，这里我的源代码非常简单，只有两个文件。

```
└─ 09-tree-shaking
   ├── src
   │   ├── components.js
   │   └── main.js
   ├── package.json
   └── webpack.config.js
```

其中 components.js 中导出了一些函数，这些函数各自模拟了一个组件，具体代码如下：

```javascript
// ./src/components.js
export const Button = () => {
  return document.createElement('button')
  console.log('dead-code')
}

export const Link = () => {
  return document.createElement('a')
}

export const Heading = level => {
  return document.createElement('h' + level)
}
```

其中 Button 组件函数中，在 return 过后还有一个 console.log() 语句，很明显这句代码永远都不会被执行，所以这个 console.log() 就属于未引用代码。

在 main.js 文件中只是导入了 compnents.js，具体代码如下：

```javascript
// ./src/main.js
import { Button } from './components'
document.body.appendChild(Button())
```

但是注意这里导入 components 模块时，我们只提取了模块中的 Button 成员，那这就导致components 模块中很多地方都不会被用到，那这些地方就是冗余的，具体冗余部分如下：

```javascript
// ./src/components.js
export const Button = () => {
  return document.createElement('button')
  // 未引用代码
  console.log('dead-code')
}
// 未引用代码
export const Link = () => {
  return document.createElement('a')
}
// 未引用代码
export const Heading = level => {
  return document.createElement('h' + level)
}
```

去除冗余代码是生产环境优化中一个很重要的工作，Webpack 的 Tree-shaking 功能就很好地实现了这一点。

我们打开命令行终端，这里我们尝试以 production 模式运行打包，具体命令如下：

```shell
$ npx webpack --mode=production
```

Webpack 的 Tree-shaking 特性在生产模式下会自动开启。打包完成以后我们打开输出的 bundle.js，具体结果如下：

图片: https://uploader.shimo.im/f/XFRxQdD0mZcFG7sV.png

通过搜索你会发现，components 模块中冗余的代码根本没有输出。这就是经过 Tree-shaking 处理过后的效果。

试想一下，如果我们在项目中引入 Lodash 这种工具库，大部分情况下我们只会使用其中的某几个工具函数，而其他没有用到的部分就是冗余代码。通过 Tree-shaking 就可以极大地减少最终打包后 bundle 的体积。

需要注意的是，Tree-shaking 并不是指 Webpack 中的某一个配置选项，而是一组功能搭配使用过后实现的效果，这组功能在生产模式下都会自动启用，所以使用生产模式打包就会有 Tree-shaking 的效果。

开启 Tree Shaking
由于目前官方文档中对于 Tree-shaking 的介绍有点混乱，所以我们这里再来介绍一下在其他模式下，如何一步一步手动开启 Tree-shaking。通过这个过程，还可以顺便了解 Tree-shaking 的工作过程和 Webpack 其他的一些优化功能。

这里还是上述的案例结构，我们再次运行 Webpack 打包，不过这一次我们不再使用 production 模式，而是使用 none，也就是不开启任何内置功能和插件，具体命令如下：

```shell
$ npx webpack --mode=none
```

打包完成过后，我们再次找到输出的 bundle.js 文件，具体结果如下：

图片: https://uploader.shimo.im/f/85zE2HIxvgsV5zTV.png

这里的打包结果跟我们在第二讲中分析的是一样的，源代码中的一个模块对应这里的一个函数。

我们这里注意一下 components 对应的这个模块，虽然外部没有使用这里的 Link 函数和 Heading 函数，但是仍然导出了它们，具体如下图所示：

图片: https://uploader.shimo.im/f/0pCsFvOjN0GfZ31f.png

显然这种导出是没有任何意义的。

明确目前打包结果的状态过后，我们打开 Webpack 的配置文件，在配置对象中添加一个 optimization 属性，这个属性用来集中配置 Webpack 内置优化功能，它的值也是一个对象。

在 optimization 对象中我们可以先开启一个 usedExports 选项，表示在输出结果中只导出外部使用了的成员，具体配置代码如下：

```javascript
// ./webpack.config.js
module.exports = {
  // ... 其他配置项
  optimization: {
    // 模块只导出被使用的成员
    usedExports: true
  }
}
```

配置完成后，重新打包，然后我们再来看一下输出的 bundle.js，具体结果如下图：

图片: https://uploader.shimo.im/f/VjYwWCBp3UvKrKM9.png

此时你会发现 components 模块所对应的函数，就不再导出 Link 和 Heading 这两个函数了，那它们对应的代码就变成了未引用代码。而且如果你使用的是 VS Code，会发现 VS Code 将这两个函数名的颜色变淡了，这是为了表示它们未被引用。

对于这种未引用代码，如果我们开启压缩代码功能，就可以自动压缩掉这些没有用到的代码。

我们可以回到配置文件中，尝试在 optimization 配置中开启 minimize，具体配置如下：

```javascript
// ./webpack.config.js
module.exports = {
  // ... 其他配置项
  optimization: {
    // 模块只导出被使用的成员
    usedExports: true,
    // 压缩输出结果
    minimize: true
  }
}
```

然后再次回到命令行重新运行打包，具体结果如下图所示：

图片: https://uploader.shimo.im/f/fymWxnJLWbOCF1Vd.png

仔细查看打包结果，你会发现，Link 和 Heading 这些未引用代码都被自动移除了。

这就是 Tree-shaking 的实现，整个过程用到了 Webpack 的两个优化功能：

- usedExports - 打包结果中只导出外部用到的成员；
- minimize - 压缩打包结果。

如果把我们的代码看成一棵大树，那你可以这样理解：

- usedExports 的作用就是标记树上哪些是枯树枝、枯树叶；
- minimize 的作用就是负责把枯树枝、枯树叶摇下来。
