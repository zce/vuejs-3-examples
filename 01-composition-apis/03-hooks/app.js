import { createApp, ref, onMounted, onUnmounted } from 'https://unpkg.com/vue@next/dist/vue.esm-browser.js'

/**
 * Toggle hook
 * @param {any} initialState initial state
 */
const useToggle = initialState => {
  const open = ref(initialState ?? false)
  const toggle = () => {
    open.value = !open.value
  }
  return { open, toggle }
}

/**
 * Request posts by fetch hook
 * @param {object} params request params
 */
const usePosts = params => {
  const posts = ref([])
  onMounted(async () => {
    const url = new URL('https://jsonplaceholder.typicode.com/posts')
    params && Object.entries(params).forEach(([ key, value ]) => url.searchParams.append(key, value))
    const res = await fetch(url)
    posts.value = await res.json()
  })
  return { posts }
}

/**
 * Window size hook
 */
const useWindowSize = () => {
  const width = ref(window.innerWidth)
  const height = ref(window.innerHeight)

  const update = () => {
    width.value = window.innerWidth
    height.value = window.innerHeight
  }

  onMounted(() => window.addEventListener('resize', update))
  onUnmounted(() => window.removeEventListener('resize', update))

  return { width, height }
}

/**
 * Hash change hook
 */
const useHash = () => {
  const hash = ref(location.hash)

  const update = () => {
    hash.value = location.hash
  }

  onMounted(() => window.addEventListener('hashchange', update))
  onUnmounted(() => window.removeEventListener('hashchange', update))

  return { hash }
}

/**
 * Application
 */
const app = createApp({
  setup () {
    return {
      ...useToggle(),
      ...usePosts({ _limit: 10 }),
      ...useWindowSize(),
      ...useHash(),
    }
  }
})

app.mount('#app')
