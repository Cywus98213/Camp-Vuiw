<template>
  <div class="left-wrapper">
    <img src="../assets/leftArrow.svg" alt="next image" />
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.left-wrapper {
  height: 100%;
  width: 4rem;
  position: absolute;
  top: 0;
  left: 0;
  cursor: pointer;
  background: linear-gradient(
    to right,
    rgb(41, 41, 41, 1) 0%,
    rgb(41, 41, 41, 0.4) 50%,
    rgb(41, 41, 41, 0) 100%
  );
  filter: grayscale(1) opacity(0.6);
  transition: all 0.3s ease;
}
.left-wrapper:hover {
  filter: grayscale(0) opacity(1);
}
.left-wrapper img {
  position: absolute;
  top: 50%;
  left: 1rem;
  width: 2rem;
}
</style>
