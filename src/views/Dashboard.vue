<template>
  <div class="app" :class="{'mini': mini}">
    <header class="app-header">
      <a class="app-header__logo" href="#">Docker管理平台</a>
      <a @click="ToMini" class="app-header_toggle"><font-awesome-icon icon="align-justify" size="lg"/></a>
    </header>
    <aside class="app-aside">
      <Aside />
    </aside>
    <main class="app-main">
      <Main />
    </main>
  </div>
</template>

<script>
import Aside from '../components/Aside.vue'
import Main from '../components/Main.vue'

export default {
  name: 'dashboard',
  data () {
    return {
      mini: false
    }
  },
  components: {
    Aside, Main
  },
  methods: {
    ToMini () { // 小图标展示
      this.mini = !this.mini
    }
  }
}
</script>
