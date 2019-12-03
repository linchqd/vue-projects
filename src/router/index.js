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
      { path: 'accounts/users', redirect: { 'name': 'users_userList' }, meta: { permission: 'user_get_list' } },
      { path: 'accounts/users/userList', name: 'users_userList', component: () => import('../components/accounts/users/UserList.vue'), meta: { permission: 'user_get_list' } },
      { path: 'accounts/users/userEdit/:name', name: 'users_userEdit', component: () => import('../components/accounts/users/UserManage.vue'), meta: { permission: 'user_get_list&user_update_all|user_get_list&user_modify' } },
      { path: 'accounts/users/userInfo/:name', name: 'users_userInfo', component: () => import('../components/accounts/users/UserManage.vue'), meta: { permission: 'user_get_list&user_update_all' } },
      { path: 'accounts/groups', redirect: { 'name': 'groups_groupList' }, meta: { permission: 'group_get_list' } },
      { path: 'accounts/groups/groupList', name: 'groups_groupList', component: () => import('../components/accounts/groups/GroupList.vue'), meta: { permission: 'group_get_list' } },
      { path: 'accounts/groups/groupEdit/:name', name: 'groups_groupEdit', component: () => import('../components/accounts/groups/GroupManage.vue'), meta: { permission: 'group_get_list&group_update|group_get_list&group_modify' } },
      { path: 'accounts/groups/groupInfo/:name', name: 'groups_groupInfo', component: () => import('../components/accounts/groups/GroupManage.vue'), meta: { permission: 'group_get_list&group_update' } },
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
