import { createApp, ref, computed, watchEffect, onMounted, onUnmounted } from 'https://unpkg.com/vue@next/dist/vue.esm-browser.js'

const useStorage = () => {
  const storage = {
    get: () => JSON.parse(localStorage.getItem('latest_todos') || '[]'),
    set: value => localStorage.setItem('latest_todos', JSON.stringify(value))
  }

  // ref 是包装为引用对象
  const store = ref(storage.get() || [])

  watchEffect(() => {
    storage.set(store.value)
  })

  return store
}

const useFilter = todos => {
  const filters = {
    all: list => list,
    active: list => list.filter(i => !i.completed),
    completed: list => list.filter(i => i.completed)
  }

  const visibility = ref('all')

  const onHashChange = () => {
    const hash = window.location.hash.replace(/#\/?/, '')
    if (filters[hash]) {
      visibility.value = hash
    } else {
      visibility.value = 'all'
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

  const total = computed(() => todos.value.length)
  const remaining = computed(() => filters.active(todos.value).length)
  const filteredTodos = computed(() => filters[visibility.value](todos.value))
  const allDone = computed({
    get: () => !remaining,
    set: value => {
      todos.value.forEach(todo => {
        todo.completed = value
      })
    }
  })

  return { visibility, total, remaining, filteredTodos, allDone }
}

const useAdd = todos => {
  const input = ref('')
  const addTodo = () => {
    const text = input.value && input.value.trim()
    if (!text) return
    todos.value.push({ text, completed: false })
    input.value = ''
  }
  return { input, addTodo }
}

const useRemove = todos => {
  const removeTodo = todo => {
    todos.value.splice(todos.value.indexOf(todo), 1)
  }
  const removeCompleted = () => {
    todos.value = todos.value.filter(i => !i.completed)
  }
  return { removeTodo, removeCompleted }
}

const useEdit = () => {
  let beforeEditText = null
  const editingTodo = ref(null)

  const editTodo = todo => {
    editingTodo.value = todo
    beforeEditText = todo.text
  }

  const doneEdit = todo => {
    if (!editingTodo.value) return
    todo.text = todo.text.trim()
    todo.text || removeTodo(todo)
    editingTodo.value = null
  }

  const cancelEdit = todo => {
    editingTodo.value = null
    todo.text = beforeEditText
  }

  return { editingTodo, editTodo, doneEdit, cancelEdit }
}

const app = createApp({
  setup () {
    // 取出初始状态
    const todos = useStorage()

    return {
      ...useFilter(todos),
      ...useAdd(todos),
      ...useRemove(todos),
      ...useEdit()
    }
  },
  directives: {
    editFocus: (el, { value }) => value && el.focus()
  }
})

app.mount('#app')

