import { createApp } from 'vue'
// import { createI18n } from 'vue-i18n'

import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

import 'element-plus/theme-chalk/dark/css-vars.css'
// const i18n = createI18n({
//   // something vue-i18n options here ...
// })
const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
// app.use(i18n)
app.mount('#app')
