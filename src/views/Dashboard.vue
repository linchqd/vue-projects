<template>
  <div class="app">
    <header class="app-header">
      <Header />
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
import Header from '../components/Header.vue'
import Aside from '../components/Aside.vue'
import Main from '../components/Main.vue'

export default {
  name: 'dashboard',
  components: {
    Header, Aside, Main
  }
}
</script>
