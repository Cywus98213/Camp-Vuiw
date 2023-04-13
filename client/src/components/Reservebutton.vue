<template>
  <button @click="reservehandler">Reserve</button>
</template>
<script>
export default {
  methods: {
    reservehandler() {
      alert("Reserve Dummy");
    },
  },
};
</script>
<style scoped>
button {
  padding: 0.5rem 0.8rem;
  background-color: var(--primary-btn-clr);
  color: var(--primary-btn-text-clr);
  border: none;
  border-radius: 0.2rem;
}
</style>
