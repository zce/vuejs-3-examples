<template>
  <button @click="toggle(true)">open</button>
  <teleport to="#app" :disabled="disabled">
    <div class="modal" v-show="open">
      <h2>Modal title</h2>
      <p>balabala...</p>
      <button @click="toggle(false)">close</button>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, ref, onUnmounted } from 'vue'

export default defineComponent({
  name: 'Modal',
  setup () {
    const open = ref(false)
    const toggle = (v: boolean) => {
      open.value = v
    }

    const disabled = ref(false)
    onUnmounted(() => { disabled.value = true })

    return { open, toggle, disabled }
  }
})
</script>

<style>
.modal {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
}
</style>
