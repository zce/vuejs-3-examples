<template>
  <button @click="onClick"><slot></slot></button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Button',
  props: {
    size: String
  },
  setup (props, { emit }) {
    // props 是一个 proxy 对象，不能解构，解构过后丢失数据响应能力
    const onClick = (e: Event) => {
      emit('custom', e)
    }

    return { onClick }
  }
})
</script>

<style>

</style>
