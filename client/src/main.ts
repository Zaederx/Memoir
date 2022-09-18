import { createApp } from 'vue'
import { createPinia } from 'pinia'

import * as vues from './vue-imports'
import router from './router'

import './assets/main.css'

const app = createApp(vues.App)

//add components
app.component('home', vues.Home)
app.component('about', vues.About)
app.component('scrapbook', vues.Scrapbook)


app.use(createPinia())
app.use(router)

app.mount('#app')
