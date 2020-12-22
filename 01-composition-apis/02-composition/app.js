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

createApp({
  setup () {
    // reactive Proxy
    const state = reactive({
      todos: storage.get(),
      input: '',
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

    onMounted(() => {
      window.addEventListener('hashchange', onHashChange)
      onHashChange()
    })

    onUnmounted(() => {
      window.removeEventListener('hashchange', onHashChange)
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

    const addTodo = () => {
      const text = state.input && state.input.trim()
      if (!text || state.todos.find(i => i.text === text)) return
      state.todos.push({ text, completed: false })
      state.input = ''
    }

    const removeTodo = todo => {
      state.todos.splice(state.todos.indexOf(todo), 1)
    }

    const editTodo = todo => {
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

    const pluralize = count => {
      return count === 1 ? 'item' : 'items'
    }

    return {
      state,
      addTodo,
      removeTodo,
      editTodo,
      doneEdit,
      cancelEdit,
      removeCompleted,
      pluralize
    }
  },
  directives: {
    editFocus: (el, { value }) => value && el.focus()
  }
}).mount('#app')
