import { createApp } from 'vue'
import { createPinia } from 'pinia'
import * as vues from './vue-imports'
import router from './router'
import { useAuthenticationStore } from '@/stores/isAuthenticated'

const app = createApp(vues.App)

//add components
app.component('Home', vues.Home)
app.component('About', vues.About)
app.component('Scrapbook', vues.Scrapbook)
app.component('AjaxAuth', vues.AjaxAuth)
app.component('Banner', vues.Banner)
app.component('HomeMain', vues.HomeMain)
app.component('SiteFooter', vues.SiteFooter)
app.component('UploadForm', vues.UploadForm)
app.component('HeadScripts', vues.HeadScripts)
app.component('Login', vues.Login)
app.component('LoginForm', vues.LoginForm)
app.component('SignUpForm', vues.SignUpForm)
app.component('SignUp', vues.SignUp)
app.use(createPinia())

router.beforeEach((to, from, next) => {
    const authStore = useAuthenticationStore()
    if (to.name == 'Scrapbook'  && !(authStore.checkAuth().value)) next({ name: 'Login' })
    else next()
  })
app.use(router)

app.mount('#app')


