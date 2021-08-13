import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/components/UserList'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: Index
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/signUp',
    name: 'signUp',
    component: SignUp
  }
]

const router = new VueRouter({
  routes
})

export default router
