<template>
  <button class="bold">DELETE</button>
</template>
<script>
export default {};
</script>
<style scoped>
button {
  background-color: var(--primary-btn-clr);
  color: var(--secondary-font-clr);
  padding: 0.4rem 1rem;
  border: none;
  cursor: pointer;
  text-transform: uppercase;
  filter: grayscale(1) opacity(0.7);
  transition: filter 0.3s ease;
}
button:hover {
  filter: grayscale(0) opacity(1);
}
</style>
