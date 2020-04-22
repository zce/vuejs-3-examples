<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Button size="lg" @custom="onClick">Hello Vue.js 3.0</Button>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Button from '@/components/Button.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld,
    Button
  },
  setup () {
    const onClick = () => {
      console.log(111)
    }

    return { onClick }
  }
}
</script>
