<template>
  <button>Create</button>
</template>
<script>
export default {};
</script>
<style scoped>
button {
  padding: 0.5rem 1rem;
  text-decoration: none;
  background-color: var(--primary-btn-clr);
  color: var(--secondary-font-clr);
  border-radius: var(--btn-radius);
  transition: background-color 0.3s ease;
  cursor: pointer;
  border: none;
}
button:hover {
  background-color: var(--primary-btn-hover);
}
</style>
