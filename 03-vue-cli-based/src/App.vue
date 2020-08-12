<template>
  <section class="todoapp">
    <header class="header">
      <h1>todos</h1>
      <input class="new-todo" placeholder="What needs to be done?" autocomplete="off" autofocus v-model="state.input"
        @keyup.enter="addTodo">
    </header>
    <section class="main" v-show="state.todos.length">
      <input id="toggle-all" class="toggle-all" type="checkbox" v-model="state.allDone">
      <label for="toggle-all">Mark all as complete</label>
      <ul class="todo-list">
        <li v-for="todo in state.filteredTodos" :key="todo"
          :class="{ completed: todo.completed, editing: todo === state.editingTodo }">
          <div class="view">
            <input class="toggle" type="checkbox" v-model="todo.completed">
            <label @dblclick="editTodo(todo)">{{ todo.text }}</label>
            <button class="destroy" @click="removeTodo(todo)"></button>
          </div>
          <input class="edit" type="text" v-model="todo.text" v-edit-focus="todo === state.editingTodo"
            @blur="doneEdit(todo)" @keyup.enter="doneEdit(todo)" @keyup.escape="cancelEdit(todo)">
        </li>
      </ul>
    </section>
    <footer class="footer" v-show="state.todos.length">
      <span class="todo-count">
        <strong>{{ state.remaining }}</strong> <span>{{ pluralize(state.remaining) }} left</span>
      </span>
      <ul class="filters">
        <li><a href="#/all" :class="{ selected: state.visibility === 'all' }">All</a></li>
        <li><a href="#/active" :class="{ selected: state.visibility === 'active' }">Active</a></li>
        <li><a href="#/completed" :class="{ selected: state.visibility === 'completed' }">Completed</a></li>
      </ul>
      <button class="clear-completed" @click="removeCompleted" v-show="state.todos.length > state.remaining">
        Clear completed
      </button>
    </footer>
  </section>
  <footer class="info">
    <p>Double-click to edit a todo</p>
    <!-- Remove the below line ↓ -->
    <p>Template by <a href="http://sindresorhus.com">Sindre Sorhus</a></p>
    <!-- Change this out with your name and url ↓ -->
    <p>Created by <a href="https://zce.me">zce</a></p>
    <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
  </footer>
</template>

<script>
import { reactive, computed, watchEffect, onMounted, onUnmounted } from 'vue'

const storage = {
  get: () => JSON.parse(localStorage.getItem('latest_todos') || '[]'),
  set: value => localStorage.setItem('latest_todos', JSON.stringify(value))
}

const filters = {
  all: todos => todos,
  active: todos => todos.filter(todo => !todo.completed),
  completed: todos => todos.filter(todo => todo.completed)
}

export default {
  setup () {
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
      if (!text) return
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
}
</script>

<style src="todomvc-app-css/index.css"></style>
