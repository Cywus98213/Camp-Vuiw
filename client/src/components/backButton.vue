<template>
  <img
    src="../assets/Back.svg"
    alt="go back to previous page"
    @click="goback"
  />
</template>
<script>
export default {
  methods: {
    goback() {
      this.$router.go(-1);
    },
  },
};
</script>
<style scoped>
img {
  width: 3rem;
  cursor: pointer;
  border-radius: 50%;
  transition: all 0.3s ease;
}
img:hover {
  background-color: var(--navbar-btn-hover);
}
</style>
