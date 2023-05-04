<template>
  <div class="right-wrapper">
    <img src="../assets/rightArrow.svg" alt="next image" />
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.right-wrapper {
  height: 100%;
  width: 4rem;
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
  background: linear-gradient(
    to left,
    rgb(41, 41, 41, 1) 0%,
    rgb(41, 41, 41, 0.4) 50%,
    rgb(41, 41, 41, 0) 100%
  );
  filter: grayscale(1) opacity(0.6);
  transition: all 0.3s ease;
}
.right-wrapper:hover {
  filter: grayscale(0) opacity(1);
}
.right-wrapper img {
  position: absolute;
  top: 50%;
  right: 1rem;
  width: 2rem;
}
</style>
