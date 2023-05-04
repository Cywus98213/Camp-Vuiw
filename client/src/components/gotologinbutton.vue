<template>
  <button>Click Here to Sign in.</button>
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
  color: var(--secondary-font-clr);
  background-color: var(--primary-btn-clr);
  cursor: pointer;
  border: 1px var(--primary-font-clr) solid;
  transition: all 0.3s ease;
}
button:hover {
  background-color: var(--primary-btn-hover);
}
button:active {
  transform: translateY(3px);
}
</style>
