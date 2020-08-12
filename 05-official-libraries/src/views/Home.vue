<template>
  <div class="home">
    <Button size="lg" @custom="onClick">Hello Vue.js 3.0 {{ store.getters.count }}</Button>
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// import { computed, getCurrentInstance } from 'vue'
// import HelloWorld from '@/components/HelloWorld.vue'
// import Button from '@/components/Button.vue'

// export default {
//   name: 'Home',
//   components: {
//     HelloWorld,
//     Button
//   },
//   setup () {
//     const { ctx } = getCurrentInstance()

//     return {
//       count: computed(() => ctx.$store.getters.count),
//       onClick: () => {
//         ctx.$store.dispatch('increment')
//       }
//     }
//   }
// }

// useStore -----------------------------
import { useStore } from 'vuex'
import HelloWorld from '@/components/HelloWorld.vue'
import Button from '@/components/Button.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld,
    Button
  },
  setup () {
    const store = useStore()

    return {
      store,
      onClick: () => {
        store.dispatch('increment')
      }
    }
  }
}
</script>
