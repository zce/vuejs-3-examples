module.exports = {
  mode: 'none',
  optimization: {
    // 模块只导出被使用的成员
    // usedExports: true,
    // 尽可能合并每一个模块到一个函数中
    // concatenateModules: true,
    // 压缩输出结果
    // minimize: true
  }
}
