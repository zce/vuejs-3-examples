<template>
  <div class="about">
    <h1>This is an about page</h1>
    <Counter />

    <Modal />
  </div>
</template>

<script>
// // @ is an alias to /src
// import { getCurrentInstance } from 'vue'
// import Counter from '@/components/Counter.vue'

// export default {
//   name: 'About',
//   components: {
//     Counter
//   },
//   setup () {
//     const { ctx } = getCurrentInstance()
//     console.log(ctx.$router.currentRoute.value)
//   }
// }

// useRoute ----------------------------------------
// @ is an alias to /src
import { useRoute } from 'vue-router'
import Counter from '@/components/Counter.vue'
import Modal from '@/components/Modal.vue'

export default {
  name: 'About',
  components: {
    Counter,
    Modal
  },
  setup () {
    const route = useRoute()
    console.log(route)
  }
}
</script>

<style>
.about {
  position: relative;
  overflow: hidden;
}
</style>
