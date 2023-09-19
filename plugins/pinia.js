import { createPinia } from 'pinia'
import { createApp } from 'vue'

export default defineNuxtPlugin((NuxtApp) => {
  const app = createApp({})
  app.use(createPinia())

  return (app)
})
