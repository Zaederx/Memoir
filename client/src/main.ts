import { createApp } from 'vue'
import { createPinia } from 'pinia'
import * as vues from './vue-imports'
import router from './router'

import './assets/main.css'
const app = createApp(vues.App)

//add components
app.component('Home', vues.Home)
app.component('About', vues.About)
app.component('Scrapbook', vues.Scrapbook)
app.component('Banner',vues.Banner)
app.component('HeadScripts',vues.HeadScripts)
app.component('LoginForm',vues.LoginForm)
app.component('SiteFooter', vues.SiteFooter)
app.component('HomeMain', vues.HomeMain)
app.component('UploadForm', vues.UploadForm)


app.use(createPinia())
app.use(router)

app.mount('#app')
