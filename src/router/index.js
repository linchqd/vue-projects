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
    meta: { permission: 'get_dashboard' },
    children: [
      { path: 'accounts/users', name: 'users', component: () => import('../components/accounts/users/UserList.vue'), meta: { permission: 'users_manage' } },
      { path: 'accounts/groups', name: 'groups', component: () => import('../components/accounts/users/UserList.vue'), meta: { permission: 'gruops_manage' } },
      { path: 'accounts/roles', name: 'roles', component: () => import('../components/accounts/users/UserList.vue'), meta: { permission: 'roles_manage' } },
      { path: 'accounts/permissions', name: 'permissions', component: () => import('../components/accounts/users/UserList.vue'), meta: { permission: 'permissions_manage' } }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/deny',
    name: 'deny',
    component: () => import('../views/Deny.vue')
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('../components/accounts/users/User.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
