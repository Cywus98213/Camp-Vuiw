<template>
  <button>{{ showText }}</button>
</template>
<script>
export default {
  props: {
    showText: {
      type: String,
      required: true,
    },
  },
};
</script>
<style scoped>
button {
  padding: 0.5rem;
  background-color: inherit;
  cursor: pointer;
  border: 1px var(--primary-font-clr) solid;
  transition: all 0.3s ease;
}
button:hover {
  background-color: var(--primary-font-clr);
  color: var(--secondary-font-clr);
}
button:active {
  transform: translateY(3px);
}
</style>
