// Deconstruct global Vue objects
// const { createApp, reactive, computed, watchEffect, onMounted, onUnmounted } = Vue
import { createApp, reactive, computed, watchEffect, onMounted, onUnmounted } from 'https://unpkg.com/vue@next/dist/vue.esm-browser.js'

const storage = {
  get: () => JSON.parse(localStorage.getItem('latest_todos') || '[]'),
  set: value => localStorage.setItem('latest_todos', JSON.stringify(value))
}

const filters = {
  all: todos => todos,
  active: todos => todos.filter(todo => !todo.completed),
  completed: todos => todos.filter(todo => todo.completed)
}

const app = createApp({
  setup () {
    // reactive => Proxy
    const state = reactive({
      todos: storage.get(),
      // 动态添加的属性也可以被监视到，这是 Vue.js 2.x 中 defineProperty 所做不到的！
      // input: '',
      visibility: 'all',
      remaining: computed(() => filters.active(state.todos).length),
      filteredTodos: computed(() => filters[state.visibility](state.todos)),
      allDone: computed({
        get: () => !state.remaining,
        set: (value) => {
          state.todos.forEach(todo => {
            todo.completed = value
          })
        }
      })
    })

    // 自动收集依赖，调用一次回调，通过 Proxy 监视哪些被使用
    watchEffect(() => {
      storage.set(state.todos)
    })

    const onHashChange = () => {
      const visibility = window.location.hash.replace(/#\/?/, '')
      if (filters[visibility]) {
        state.visibility = visibility
      } else {
        state.visibility = 'all'
        window.location.hash = ''
      }
    }

    onMounted(() => {
      window.addEventListener('hashchange', onHashChange)
      onHashChange()
    })

    onUnmounted(() => {
      window.removeEventListener('hashchange', onHashChange)
    })

    const addTodo = () => {
      const text = state.input && state.input.trim()
      if (!text || state.todos.find(i => i.text === text)) return
      state.todos.push({ id: Date.now(), text, completed: false })
      state.input = ''
    }

    const removeTodo = todo => {
      state.todos.splice(state.todos.indexOf(todo), 1)
    }

    const editTodo = todo => {
      // 动态添加的属性也可以被监视到，这是 Vue.js 2.x 中 defineProperty 所做不到的！
      state.editingTodo = todo
      state.beforeEditText = todo.text
    }

    const doneEdit = todo => {
      if (!state.editingTodo) return
      todo.text = todo.text.trim()
      todo.text || removeTodo(todo)
      state.editingTodo = null
    }

    const cancelEdit = todo => {
      state.editingTodo = null
      todo.text = state.beforeEditText
    }

    const removeCompleted = () => {
      state.todos = filters.active(state.todos)
    }

    return {
      state,
      addTodo,
      removeTodo,
      editTodo,
      doneEdit,
      cancelEdit,
      removeCompleted
    }
  },
  directives: {
    editFocus: (el, { value }) => value && el.focus()
  }
})

app.mount('#app')
