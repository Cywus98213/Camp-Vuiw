<template>
  <div class="Card-wrapper">
    <img class="Card-image" :src="image" alt="camp-image" />
    <div class="info-wrapper">
      <p class="Card-header bold">{{ title }}</p>
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
  border-radius: 1rem;
  width: 100%;
  height: 30rem;
}
.info-wrapper {
  padding: 0.7rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.Card-header {
  font-size: 1.4rem;
}
.Card-image {
  width: 100%;
  height: 70%;
  object-fit: cover;
  border-radius: 1rem 1rem 0 0;
}
</style>
