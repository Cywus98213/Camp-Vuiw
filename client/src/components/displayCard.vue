<template>
  <div class="Card-wrapper">
    <img class="Card-image" :src="images[0].path" alt="camp-image" />
    <div class="info-wrapper">
      <p class="Card-header bold">{{ title }}</p>
      <p class="Card-subheader">{{ location }}</p>
      <p class="Card-price">
        <span class="bold">$ {{ price }} </span> /Day
      </p>
    </div>
    <RouterLink
      class="Card-view-link"
      :to="{ name: 'campground', params: { id: cardId } }"
      >View</RouterLink
    >
  </div>
</template>
<script>
import { RouterLink } from "vue-router";
export default {
  props: {
    title: String,
    location: String,
    price: Number,
    images: Array,
    cardId: String,
  },
  methods: {},
  components: {},
};
</script>
<style scoped>
.Card-wrapper {
  display: flex;
  flex-direction: column;
  border-radius: 0.3rem;

  height: 33rem;
  border: 1px var(--primary-font-clr) solid;
  position: relative;
}
.info-wrapper {
  display: flex;

  padding: 0.4rem 0.5rem;
  flex-direction: column;
}

.Card-header {
  font-size: 2rem;
}
.Card-subheader {
  color: grey;
}
.Card-view-link {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  font-size: 1.5rem;
  text-align: center;
  color: var(--secondary-font-clr);
  background-color: var(--primary-btn-clr);
  transition: background-color 0.3s ease;
}
.Card-view-link:hover {
  background-color: var(--primary-btn-hover);
}
.Card-image {
  width: 100%;
  height: 70%;
  object-fit: cover;
  border-radius: 0.3rem 0.3rem 0 0;
}
.Card-price span {
  font-size: 1.3rem;
}
</style>
