let menus = [{
  url: '/',
  name: 'dashboard',
  text: 'Dashboard',
  icon: 'tachometer-alt',
  active: false,
  is_expanded: false
},
{
  text: '账户管理',
  icon: 'user-plus',
  active: false,
  is_expanded: false,
  secMenu: [
    { url: '/accounts/users/userList', name: 'users', text: '用户管理', icon: 'user', active: false },
    { url: '/accounts/groups/groupList', name: 'groups', text: '用户组管理', icon: 'users', active: false },
    { url: '/accounts/roles/roleList', name: 'roles', text: '角色管理', icon: 'user-secret', active: false },
    { url: '/accounts/permissions', name: 'permissions', text: '权限管理', icon: 'user-lock', active: false }
  ]
}]
export default menus
