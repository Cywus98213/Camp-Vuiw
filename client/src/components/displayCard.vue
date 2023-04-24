<template>
  <div class="Card-wrapper">
    <img class="Card-image" :src="image" alt="camp-image" />
    <div class="info-wrapper">
      <p class="Card-header bold">{{ title }}</p>
      <p class="Card-subheader">{{ location }}</p>
      <p class="Card-price">
        <span class="bold">$ {{ price }} </span> /Day
      </p>
      <RouterLink
        class="Card-view-link"
        :to="{ name: 'campground', params: { id: cardId } }"
        ><ViewButton
      /></RouterLink>
    </div>
  </div>
</template>
<script>
import ViewButton from "./ViewButton.vue";
import { RouterLink } from "vue-router";
export default {
  props: {
    title: String,
    location: String,
    price: Number,
    image: String,
    cardId: String,
  },
  methods: {},
  components: {
    ViewButton,
  },
};
</script>
<style scoped>
.Card-wrapper {
  display: flex;
  flex-direction: column;
  background-color: var(--primary-card-bg-clr);
  border-radius: 0.3rem;
  height: 30rem;
  border: 1px var(--primary-font-clr) solid;
}
.info-wrapper {
  padding: 0.7rem;
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 0.2rem;
}
.Card-header {
  font-size: 1.4rem;
}
.Card-subheader {
  color: grey;
}
.Card-image {
  width: 100%;
  height: 70%;
  object-fit: cover;
  border-radius: 0.3rem 0.3rem 0 0;
}
</style>
