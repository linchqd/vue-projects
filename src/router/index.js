import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('../views/Dashboard.vue'),
    children: [
      { path: 'accounts/users', name: 'users', component: () => import('../components/UserList.vue') },
      { path: 'accounts/groups', name: 'groups', component: () => import('../components/UserList.vue') },
      { path: 'accounts/roles', name: 'roles', component: () => import('../components/UserList.vue') },
      { path: 'accounts/permissions', name: 'permissions', component: () => import('../components/UserList.vue') }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
