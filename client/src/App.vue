<template>
  <div class="app">
    <header>
      <navbar />
    </header>
    <main>
      <RouterView />
    </main>
    <footer>
      <Footer />
    </footer>
  </div>
</template>
<script>
import Footer from "./components/footer.vue";
import navbar from "./components/navbar.vue";
import { RouterView } from "vue-router";
export default {
  components: { navbar, Footer },
};
</script>
<style scoped>
main {
  background-color: var(--primary-bg-clr);
  height: 100%;
  width: 100%;
}
</style>
