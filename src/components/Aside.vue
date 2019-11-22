<template>
    <ul class="app-menu">
      <li>
          <a class="app-menu__item" href="/">
            <font-awesome-icon icon="tachometer-alt" size="lg" fixed-width />
            <span class="app-menu__label">Dashboard</span>
          </a>
      </li>
      <li class="treeview" :class="{'is-expanded': is_expanded}">
        <a class="app-menu__item" @click="toggleTreeMenu" href="#" data-toggle="treeview">
          <font-awesome-icon icon="user-plus" size="lg" fixed-width />
          <span class="app-menu__label">账户管理</span>
          <font-awesome-icon icon="angle-right" fixed-width :class="{'fa-rotate-90': is_expanded}" />
        </a>
        <ul class="treeview-menu">
          <li>
            <a class="treeview-item" href="#">
              <font-awesome-icon icon="user" size="md" fixed-width />用户管理
            </a>
          </li>
          <li>
            <a class="treeview-item" href="#">
              <font-awesome-icon icon="users" size="md" fixed-width />用户组管理
            </a>
          </li>
          <li>
            <a class="treeview-item" href="#">
              <font-awesome-icon icon="user-secret" size="md" fixed-width />角色管理
            </a>
          </li>
          <li>
            <a class="treeview-item" href="#">
              <font-awesome-icon icon="user-lock" size="md" fixed-width />权限管理
            </a>
          </li>
        </ul>
      </li>
    </ul>
</template>

<script>
export default {
  name: 'Aside',
  data () {
    return {
      is_expanded: false
    }
  },
  methods: {
    toggleTreeMenu () {
      this.is_expanded = !this.is_expanded
    }
  }
}
</script>
<style>
.app-aside {
    position: fixed;
    top: 0;
    left: 0;
    margin-top: 50px;
    width: 230px;
    min-height: calc(100vh);
    overflow: auto;
    z-index: 10;
    background-color: #ffffff;
    -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    -webkit-transition: left 0.3s ease, width 0.3s ease;
    -o-transition: left 0.3s ease, width 0.3s ease;
    transition: left 0.3s ease, width 0.3s ease;
}
.app-aside .app-menu, .app-aside .treeview-menu {
    padding-left: 0;
    margin: 0;
    list-style: none;
}
.app-aside .app-menu__item {
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  color: rgba(0, 0, 0, 0.65);
  text-decoration: none;
  padding: 12px 15px;
  font-size: 1.08em;
  -webkit-transition: background-color 0.3s ease;
  -o-transition: background-color 0.3s ease;
  transition: background-color 0.3s ease;
}
.app-aside .app-menu__item:hover {
    background: #e7f2fe;
    text-decoration: none;
    color: #1280F2;
}
.app-aside .app-menu__item svg:first-child {
  margin-right: 5px;
  width: 25px;
  -webkit-box-flex: 0;
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
}
.app-aside .app-menu__item svg:last-child {
  -webkit-transform-origin: center;
  -ms-transform-origin: center;
  transform-origin: center;
  -webkit-transition: -webkit-transform 0.3s ease;
  transition: -webkit-transform 0.3s ease;
  -o-transition: transform 0.3s ease;
  transition: transform 0.3s ease;
}
.app-aside .app-menu__label{
    white-space: nowrap;
    -webkit-box-flex: 1;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
}
.app-aside .treeview-menu {
  max-height: 0;
  overflow: hidden;
  -webkit-transition: max-height 0.3s ease;
  -o-transition: max-height 0.3s ease;
  transition: max-height 0.3s ease;
}
.app-aside .treeview.is-expanded .treeview-menu {
  max-height: 100vh;
  -webkit-transition: max-height 0.3s ease;
  -o-transition: max-height 0.3s ease;
  transition: max-height 0.3s ease;
}
.app-aside .treeview-item {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding: 5px 5px 5px 20px;
  font-size: 1em;
  color: rgba(0, 0, 0, 0.65);
  text-decoration: none;
  -webkit-transition: background-color 0.3s ease;
  -o-transition: background-color 0.3s ease;
  transition: background-color 0.3s ease;
}
.app-aside .treeview-item:hover, .app-aside .treeview-item.active {
  background: #e7f2fe;
  text-decoration: none;
  color: #1280F2;
}
.app-aside .treeview-item svg {
    margin-right: 5px;
    width: 16px;
}
</style>
