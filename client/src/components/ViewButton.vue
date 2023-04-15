<template>
  <button class="bold">View</button>
</template>
<script>
export default {};
</script>
<style scoped>
button {
  padding: 0.2rem 0.7rem;
  text-decoration: none;
  background-color: var(--primary-font-clr);
  color: var(--secondary-font-clr);
  filter: grayscale(1) opacity(0.7);
  transition: filter 0.3s ease;
  cursor: pointer;
  border: none;
  border-radius: 0.2rem;
}
button:hover {
  filter: grayscale(0) opacity(1);
}
</style>
