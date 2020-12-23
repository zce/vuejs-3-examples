<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <div>
      <Button size="lg" @custom="onClick">Hello Vue.js 3.0 - {{ store.getters.count }}</Button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
import Button from '@/components/Button.vue'

export default defineComponent({
  name: 'Home',
  components: {
    Button
  },
  setup () {
    const store = useStore()

    return {
      store,
      onClick: () => store.dispatch('increment')
    }
  }
})
</script>
