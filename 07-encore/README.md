# 20200520 面试题

```javascript
// 将给定对象包装为 `Proxy` 实现数据响应
function reactive (obj) {
  // ... 内部实现
}

// 添加一个数据状态监视函数
function watch (effect) {
  // ... 内部实现
}

const state = reactive({
  foo: 100,
  bar: 200
})

watch(() => {
  console.log('foo changed: ', state.foo)
})

watch(() => {
  console.log('bar changed: ', state.bar)
})

state.foo ++ // => foo changed:  101
state.bar ++ // => bar changed:  201
```

假设现有 `reactive` 和 `watch` 这两个函数
最终效果是 `state.foo` 或 `state.bar` 的值一旦改变，对应的 `watch` 函数自动执行

例如：
- `state.foo` 的值改变，执行第一个 `watch` 中的回调函数
- `state.bar` 的值改变，执行第二个 `watch` 中的回调函数

**要求：实现这个 `reactive` 和 `watch` 这两个函数！！！**

思路：
1. 利用 `Proxy` 实现数据响应
2. `reactive` 函数将给定对象包装为 `Proxy` 实现数据响应
3. `watch` 函数的作用是添加一个数据状态监视函数，只有这个函数内使用到的成员发生变化时，这个函数才会被执行

难点：

1. 如何收集属性对应的依赖函数