import { createRouter, createWebHistory } from 'vue-router'
import homeView from '../views/homeView.vue'
import aboutView from '../views/aboutView.vue'
import loginView from '../views/loginView.vue'
import accessDeniedView from '../views/accessDeniedView.vue'
import { isAuthenticated } from '../auth.js'
import firebaseSigninView from '@/views/firebaseSigninView.vue'
import firebaseRegisterView from '@/views/firebaseRegisterView.vue'
import addBookView from '@/views/addBookView.vue'
import getBookCountView from '@/views/getBookCountView.vue'
import WeatherView from '@/views/weatherView.vue'
import countBookapi from '@/views/countBookapi.vue'
import getAllBookapi from '@/views/getAllBookapi.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: homeView
  },
  {
    path: '/about',
    name: 'about',
    component: aboutView,
    meta: { requireAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: loginView
  },
  {
    path: '/accessDenied',
    name: 'accessDenied',
    component: accessDeniedView
  }, 
  {
    path: '/fireLogin', 
    name: 'fireLogin', 
    component: firebaseSigninView
  }, 
  {
    path: '/fireRegister', 
    name: 'fireRegister',
    component: firebaseRegisterView
  }, 
  {
    path: '/addbook', 
    name: 'addbook', 
    component: addBookView
  },
  {
    path: '/getBookCount',
    name: 'getBookCount',
    component: getBookCountView
  },
  {
    path: '/weatherCheck',
    name: 'weatherCheck',
    component: WeatherView
  },
  {
    path: '/countBookapi',
    name: 'countBookapi',
    component: countBookapi
  },
  {
    path: '/getAllBookapi',
    name: 'getAllBookapi',
    component: getAllBookapi
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if(to.meta.requireAuth && !isAuthenticated.value) {
    next({name: 'accessDenied'})
  } else {
    next()
  }
})

export default router
