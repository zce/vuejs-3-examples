<template>
  <section id="app" class="todoapp" v-cloak>
    <header class="header">
      <h1>todos</h1>
      <input class="new-todo" placeholder="What needs to be done?" autocomplete="off" autofocus v-model="input"
        @keyup.enter="addTodo">
    </header>
    <section class="main" v-show="total">
      <input id="toggle-all" class="toggle-all" type="checkbox" v-model="allDone">
      <label for="toggle-all">Mark all as complete</label>
      <ul class="todo-list">
        <li v-for="todo in filteredTodos" :key="todo.id"
          :class="{ completed: todo.completed, editing: todo === editingTodo }">
          <div class="view">
            <input class="toggle" type="checkbox" v-model="todo.completed">
            <label @dblclick="editTodo(todo)">{{ todo.text }}</label>
            <button class="destroy" @click="removeTodo(todo)"></button>
          </div>
          <input class="edit" type="text" v-model="todo.text" v-edit-focus="todo === editingTodo"
            @blur="doneEdit(todo)" @keyup.enter="doneEdit(todo)" @keyup.escape="cancelEdit(todo)">
        </li>
      </ul>
    </section>
    <footer class="footer" v-show="total">
      <span class="todo-count">
        <strong>{{ remaining }}</strong> {{ remaining === 0 ? 'item' : 'items' }} left
      </span>
      <ul class="filters">
        <li><a href="#/all" :class="{ selected: visibility === 'all' }">All</a></li>
        <li><a href="#/active" :class="{ selected: visibility === 'active' }">Active</a></li>
        <li><a href="#/completed" :class="{ selected: visibility === 'completed' }">Completed</a></li>
      </ul>
      <button class="clear-completed" @click="removeCompleted" v-show="total > remaining">
        Clear completed
      </button>
    </footer>
  </section>
  <footer class="info">
    <p>Double-click to edit a todo</p>
    <p>Template by <a href="http://sindresorhus.com">Sindre Sorhus</a></p>
    <p>Created by <a href="https://zce.me">zce</a></p>
    <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
  </footer>
</template>

<script>
import { ref, reactive, computed, watchEffect, onMounted, onUnmounted } from 'vue'

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
    if (!text || todos.value.find(i => i.text === text)) return
    todos.value.push({ id: Date.now(), text, completed: false })
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

export default {
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
}
</script>

<style src="todomvc-app-css/index.css"></style>
