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
      { path: 'accounts/users', redirect: { 'name': 'users_userList' } },
      { path: 'accounts/users/userList', name: 'users_userList', component: () => import('../components/accounts/users/UserList.vue'), meta: { permission: 'users_manage' } },
      { path: 'accounts/users/userEdit/:name', name: 'users_userEdit', component: () => import('../components/accounts/users/UserEdit.vue') },
      { path: 'accounts/users/userInfo/:id', name: 'users_userInfo', component: () => import('../components/accounts/users/UserEdit.vue') },
      { path: 'accounts/groups', name: 'groups', component: () => import('../components/accounts/users/UserEdit.vue'), meta: { permission: 'gruops_manage' } },
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
    path: '/404',
    name: 'notFound',
    component: () => import('../views/404.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
