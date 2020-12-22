import { createApp } from 'https://unpkg.com/vue@next/dist/vue.esm-browser.js'

const storage = {
  get: () => JSON.parse(localStorage.getItem('latest_todos') || '[]'),
  set: value => localStorage.setItem('latest_todos', JSON.stringify(value))
}

const filters = {
  all: todos => todos,
  active: todos => todos.filter(todo => !todo.completed),
  completed: todos => todos.filter(todo => todo.completed)
}

// Vue 3.0 仍然支持 2.x 选项 API 的方式
const app = createApp({
  data: () => ({
    todos: storage.get(),
    input: '',
    visibility: 'all',
    editingTodo: null
  }),

  computed: {
    remaining () {
      return filters.active(this.todos).length
    },
    filteredTodos () {
      return filters[this.visibility](this.todos)
    },
    allDone: {
      get  () {
        return !this.remaining
      },
      set (value) {
        this.todos.forEach(todo => {
          todo.completed = value
        })
      }
    }
  },

  watch: {
    todos: {
      handler: value => storage.set(value),
      deep: true
    }
  },

  mounted () {
    window.addEventListener('hashchange', this.onHashChange)
    this.onHashChange()
  },

  unmounted () {
    window.removeEventListener('hashchange', this.onHashChange)
  },

  methods: {
    onHashChange () {
      const visibility = window.location.hash.replace(/#\/?/, '')
      if (filters[visibility]) {
        this.visibility = visibility
      } else {
        this.visibility = 'all'
        window.location.hash = ''
      }
    },

    addTodo () {
      const text = this.input && this.input.trim()
      if (!text || this.todos.find(i => i.text === text)) return
      this.todos.push({ id: Date.now(), text, completed: false })
      this.input = ''
    },

    removeTodo (todo) {
      this.todos.splice(this.todos.indexOf(todo), 1)
    },

    editTodo (todo) {
      this.editingTodo = todo
      this.beforeEditText = todo.text
    },

    doneEdit (todo) {
      if (!this.editingTodo) return
      todo.text = todo.text.trim()
      todo.text || removeTodo(todo)
      this.editingTodo = null
    },

    cancelEdit (todo) {
      this.editingTodo = null
      todo.text = this.beforeEditText
    },

    removeCompleted () {
      this.todos = filters.active(this.todos)
    },

    pluralize (count) {
      return count === 1 ? 'item' : 'items'
    }
  },

  directives: {
    editFocus: (el, { value }) => value && el.focus()
  }
})

app.mount('#app')
