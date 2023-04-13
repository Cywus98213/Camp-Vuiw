<template>
  <button @click="goBack">
    <img src="../assets/Back.svg" alt="Backpage" />
  </button>
</template>
<script>
export default {
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>
<style scoped>
button {
  background-color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
button img {
  width: 2rem;
  height: auto;
}
</style>
