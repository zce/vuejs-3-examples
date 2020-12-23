<template>
  <div class="home">
    <h2>{{ text }}</h2>
    <button @click="inc">{{ count }} + 1</button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watchEffect } from 'vue'

export default defineComponent({
  name: 'TypeScript',
  setup () {
    // 类型推断 ✅
    const count = ref(0)

    // 类型推断 ✅
    const text = computed(() => `count: ${count.value}`)

    // 类型推断 ✅
    const inc = () => count.value++

    // 类型推断 ✅
    watchEffect(() => console.log(`count changed: ${count.value}`))

    // 类型推断 ✅
    onMounted(() => console.log('component is mounted!'))

    return { count, text, inc }
  }
})
</script>
