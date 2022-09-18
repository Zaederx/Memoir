import { createRouter, createWebHistory } from 'vue-router'
import * as vues from '../vue-imports'

const routes = [
  {
    path: '/',
    name: 'home',
    component: vues.Home
  },
  {
    path: '/about',
    name: 'about',
    component: vues.About
  },
  {
    path: '/scrapbook',
    name: 'scrapbook',
    component: vues.Scrapbook
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
