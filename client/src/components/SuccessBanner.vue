<template>
  <div class="banner">
    <p class="message">{{ message }}</p>
  </div>
</template>
<script>
export default {
  props: {
    message: {
      type: String,
      required: true,
    },
  },
};
</script>
<style scoped>
.banner {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--primary-valid-clr);
  width: 90%;
  height: 4rem;
  border-radius: 0 0 0.3rem 0.3rem;
  max-width: 500px;
  transition: all 0.3s ease;
  padding: 1rem;
  position: relative;
}
.message {
  color: var(--secondary-font-clr);
}
</style>
