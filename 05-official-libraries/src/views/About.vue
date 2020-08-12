<template>
  <div class="about">
    <h1>This is an about page</h1>
    <Counter />

    <Modal />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import Counter from '@/components/Counter.vue'
import Modal from '@/components/Modal.vue'

export default defineComponent({
  name: 'About',
  components: {
    Counter,
    Modal
  },
  setup () {
    const route = useRoute()
    console.log(route)
  }
})
</script>

<style>
.about {
  position: relative;
  overflow: hidden;
}
</style>
