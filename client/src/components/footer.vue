<template>
  <div class="footer-wrapper">
    <div class="links-nav cols">
      <h2 class="header">USERFUL LINKS</h2>
      <ul>
        <RouterLink class="link" :to="{ name: 'home' }">Home</RouterLink>
        <RouterLink class="link" :to="{ name: 'campgrounds' }"
          >Campgrounds</RouterLink
        >
        <RouterLink class="link" :to="{ name: 'register' }"
          >Register</RouterLink
        >
      </ul>
    </div>
    <div class="newsletter cols">
      <h2 class="header">NEWSLETTER</h2>
      <input class="inputbox" type="email" placeholder="Your Email Address" />
      <button class="newletter-btn">SUBSCRIBE NOW</button>
    </div>
    <div class="contact cols">
      <h2 class="header">CONTACT</h2>
      <p>1234 Maple Street</p>
      <p>Suite 567 Anytown,</p>
      <p>USA 12345</p>
      <div class="social-media">
        <a href="https://github.com/Cywus98213/yelp-camp-vue-version"></a>
        <a href="https://twitter.com/"></a>
        <a href="https://www.instagram.com/"></a>
      </div>
    </div>
  </div>
</template>
<script>
import { RouterLink } from "vue-router";
export default {};
</script>
<style scoped>
.footer-wrapper {
  margin-top: auto;
  max-height: 100%;
  background-color: var(--primary-footer-bg-clr);
  color: var(--secondary-font-clr);
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
}
@media screen and (min-width: 767px) {
  .footer-wrapper {
    grid-template-columns: 1fr 1fr 1fr;
    max-height: 20rem;
  }
}

.links-nav ul {
  display: flex;
  flex-direction: column;
}
.link {
  padding: 0.1rem 0;
  text-decoration: none;
  color: var(--secondary-font-clr);
  position: relative;
}
.link::before {
  content: "";
  height: 2px;
  width: 0%;
  background-color: var(--secondary-font-clr);
  position: absolute;
  bottom: 0;
  left: 0;
  transform-origin: left;
  transition: all 0.3s ease-in-out;
}

.link:hover::before {
  width: 100%;
}
.cols {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.social-media {
  margin: 1rem;
}
.media {
  cursor: pointer;
  height: 1.5rem;
  width: 1.5rem;
  transition: color 0.3s ease;
}
.media:hover {
  color: var(--navbar-btn-hover);
}
.social-media svg {
  margin: 1rem;
}
.header {
  margin: 2rem;
}
.inputbox {
  width: 80%;
  margin: 2rem;
  border-radius: 0.4rem;
  padding: 0.5rem 1rem;
  text-align: center;
}
.newletter-btn {
  cursor: pointer;
  background-color: inherit;
  border-radius: 2rem;
  border: 2px var(--secondary-font-clr) solid;
  color: var(--secondary-font-clr);
  padding: 0.5rem 1rem;
  transition: all 0.3s ease;
}
.newletter-btn:hover {
  background-color: var(--secondary-font-clr);
  color: var(--primary-font-clr);
}
</style>
