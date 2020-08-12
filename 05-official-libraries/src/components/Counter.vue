<template>
  <h2>{{ count }}</h2>
  <div class="actions">
    <button @click="increment">INC</button>
    <button @click="incrementAsync">INC ASYNC</button>
    <button @click="decrement">DEC</button>
    <button @click="decrementAsync">DEC ASYNC</button>
  </div>
</template>

<script lang="ts">
// classic ------------------------------------------
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

// composition ------------------------------------------
// import { getCurrentInstance, computed } from 'vue'

// export default {
//   name: 'Counter',
//   setup () {
//     const { ctx } = getCurrentInstance()
//     const count = computed(() => ctx.$store.getters.count)

//     const increment = () => ctx.$store.dispatch('increment')
//     const incrementAsync = () => ctx.$store.dispatch('incrementAsync')
//     const decrement = () => ctx.$store.dispatch('decrement')
//     const decrementAsync = () => ctx.$store.dispatch('decrementAsync')

//     return { count, increment, incrementAsync, decrement, decrementAsync }
//   }
// }

// useStore ------------------------------------------------
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'Counter',
  setup () {
    const store = useStore()
    const count = computed(() => store.getters.count)

    const increment = () => store.dispatch('increment')
    const incrementAsync = () => store.dispatch('incrementAsync')
    const decrement = () => store.dispatch('decrement')
    const decrementAsync = () => store.dispatch('decrementAsync')

    return { count, increment, incrementAsync, decrement, decrementAsync }
  }
})
</script>

<style>

</style>
