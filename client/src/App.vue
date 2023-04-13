<template>
  <div class="app">
    <header>
      <navbar />
    </header>
    <main>
      <RouterView />
    </main>
  </div>
</template>
<script>
import navbar from "./components/navbar.vue";
import { RouterView } from "vue-router";
export default {
  components: { navbar },
};
</script>
<style scoped>
.app {
}
main {
  background-color: var(--primary-bg-clr);
  min-height: 100vh;
  min-width: 100%;
}
</style>
