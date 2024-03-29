import { createRouter, createWebHistory } from 'vue-router'
import * as vues from '../vue-imports'
import AjaxAuth from '@/components/AjaxAuth.vue'
import App from '@/App.vue'
import Home from '@/views/Home.vue'
import Scrapbook from '@/views/Scrapbook.vue'
import About from '@/views/About.vue'
import HomeMain from '@/components/HomeMain.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import Banner from '@/components/Banner.vue'
import UploadForm from '@/components/UploadForm.vue'
import { useAuthenticationStore }  from '@/stores/isAuthenticated'
import SignUp from '@/views/SignUp.vue'
import Login from '@/views/Login.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/scrapbook',
    name: 'Scrapbook',
    component: Scrapbook
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path:'/sign-up',
    name:'Sign-Up',
    component: SignUp
  }
 
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})




// How to use lazy loading in vue
// {
//   path: '/about',
//   name: 'about',
//   // route level code-splitting
//   // this generates a separate chunk (About.[hash].js) for this route
//   // which is lazy-loaded when the route is visited.
//   component: () => import('../views/AboutView.vue')
// }

export default router
