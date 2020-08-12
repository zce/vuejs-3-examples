import { createStore } from 'vuex'

const INCREMENT = 'INCREMENT'
const DECREMENT = 'DECREMENT'

const storagePlugin = store => {
  store.subscribe((mutation, state) => {
    switch (mutation.type) {
      case INCREMENT:
      case DECREMENT:
        // save demo counter
        localStorage.setItem('latest_count', state.count)
        break
    }
  })
}

export default createStore({
  state: {
    count: parseInt(localStorage.getItem('latest_count') || '0')
  },
  getters: {
    count: state => state.count
  },
  mutations: {
    /**
     * 增加计数器计数
     */
    [INCREMENT]: state => {
      state.count++
    },

    /**
     * 减少计数器计数
     */
    [DECREMENT]: state => {
      state.count--
    }
  },
  actions: {
    /**
     * 增加计数器计数
     */
    increment: ({ commit }) => commit(INCREMENT),

    /**
     * 增加计数器计数
     */
    incrementAsync: ({ commit }) => setTimeout(() => commit(INCREMENT), 1000),

    /**
     * 减少计数器计数
     */
    decrement: ({ commit }) => commit(DECREMENT),

    /**
     * 减少计数器计数
     */
    decrementAsync: ({ commit }) => setTimeout(() => commit(DECREMENT), 1000)
  },
  plugins: [
    storagePlugin
  ]
})
