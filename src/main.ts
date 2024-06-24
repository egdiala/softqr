import { createApp, markRaw } from 'vue'
import { createRouter, createWebHistory } from 'vue-router/auto'
import { routes } from 'vue-router/auto-routes'
// import { setupLayouts } from 'virtual:generated-layouts'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import './style.css'
import App from './App.vue'

const app = createApp(App)

const router = createRouter({
    history: createWebHistory(),
    routes
})
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
pinia.use(({ store }) => {
  store.$router = markRaw(router)
})
app.use(router)
app.use(pinia)
app.mount('#app')