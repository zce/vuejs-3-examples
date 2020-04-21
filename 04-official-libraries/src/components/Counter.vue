<template>
  <h2>{{ count }}</h2>
  <div class="actions">
    <button @click="increment">INC</button>
    <button @click="incrementAsync">INC ASYNC</button>
    <button @click="decrement">DEC</button>
    <button @click="decrementAsync">DEC ASYNC</button>
  </div>
</template>

<script>
// import { mapGetters, mapActions } from 'vuex'

// export default {
//   name: 'Counter',
//   computed: mapGetters({
//     count: 'count'
//   }),
//   methods: mapActions({
//     increment: 'increment',
//     incrementAsync: 'incrementAsync',
//     decrement: 'decrement',
//     decrementAsync: 'decrementAsync'
//   })
// }

import { getCurrentInstance, computed } from 'vue'

export default {
  name: 'Counter',
  setup () {
    const { ctx } = getCurrentInstance()
    const count = computed(() => ctx.$store.getters.count)
    function increment () {
      ctx.$store.dispatch('increment')
    }
    function incrementAsync () {
      ctx.$store.dispatch('incrementAsync')
    }
    function decrement () {
      ctx.$store.dispatch('decrement')
    }
    function decrementAsync () {
      ctx.$store.dispatch('decrementAsync')
    }
    return { count, increment, incrementAsync, decrement, decrementAsync }
  }
}
</script>

<style>

</style>
