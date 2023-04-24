<template>
  <div class="hero">
    <video
      width="100%"
      height="100%"
      class="back-video"
      autoplay
      loop
      muted
      plays-inline
    >
      <source src="../assets/home-video.mp4" type="video/mp4" />
    </video>
    <div class="filter"></div>
    <div class="home-content">
      <h1 class="home-title">Campground Vuiw</h1>
      <RouterLink :to="{ name: 'campgrounds' }">Explore Now</RouterLink>
    </div>
  </div>
</template>
<script>
import { RouterLink } from "vue-router";
export default {};
</script>
<style scoped>
.hero {
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.home-title {
  color: var(--secondary-font-clr);
  font-size: 1.5rem;
  padding: 1rem 0;
  transition: all 0.3s ease-in-out;
  text-transform: uppercase;
}
.home-title:hover {
  -webkit-text-stroke: 1px var(--secondary-font-clr);
  color: transparent;
}
.home-content {
  z-index: 3;
}
.home-content a {
  color: var(--secondary-font-clr);
  border: 1px var(--secondary-font-clr) solid;
  padding: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.home-content a:hover {
  background-color: var(--secondary-font-clr);
  color: var(--primary-font-clr);
}
.back-video {
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.filter {
  position: absolute;
  top: 0;
  bottom: 0;
  height: 100vh;
  width: 100%;
  background-color: var(--primary-font-clr);
  opacity: 0.6;
  z-index: 2;
}
@media screen and (min-width: 767px) {
  .home-title {
    font-size: 4rem;
  }
}
@media screen and (min-width: 1224px) {
  .home-title {
    font-size: 6rem;
  }
}
</style>
