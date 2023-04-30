<template>
  <div class="wrapper">
    <div class="Camps-nav">
      <div class="Camps-nav-title">
        <h1>All Campgrounds</h1>
      </div>
      <div class="Camps-nav-create">
        <RouterLink
          class="create-btn"
          v-if="IsLoggedIn"
          :to="{ name: 'createCamp' }"
          ><createButton
        /></RouterLink>
      </div>
    </div>
    <ul class="camps-list">
      <DisplayCard
        v-for="campground in campgrounds"
        :key="campground._id"
        :title="campground.title"
        :location="campground.location"
        :price="campground.price"
        :image="campground.image"
        :cardId="campground._id"
      />
    </ul>
  </div>
</template>
<script>
import createButton from "../components/createButton.vue";
import DisplayCard from "../components/displayCard.vue";
import { RouterLink } from "vue-router";
import axios from "axios";
export default {
  data() {
    return {
      campgrounds: [],
    };
  },
  components: {
    DisplayCard,
    createButton,
  },
  methods: {},
  mounted() {
    axios
      .get("http://localhost:3000/campgrounds")
      .then((res) => {
        this.campgrounds = res.data;
      })
      .catch((err) => {});
  },
  computed: {
    IsLoggedIn() {
      return this.$store.getters.IsLoggedIn;
    },
  },
};
</script>
<style scoped>
.wrapper {
  height: 100%;
  width: 100%;
}
.Camps-nav {
  display: flex;
  align-items: center;
  padding: 1rem;
}
.Camps-nav-create {
  margin-left: auto;
}
.Camps-nav-title h1 {
  font-size: 1.2rem;
}
.camps-list {
  display: grid;
  padding: 0.5rem;
  gap: 1rem;
  grid-template-columns: repeat(1, 1fr);
}

@media screen and (min-width: 767px) {
  .camps-list {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (min-width: 1016px) {
  .camps-list {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media screen and (min-width: 1424px) {
  .camps-list {
    grid-template-columns: repeat(4, 1fr);
  }
}
@media screen and (min-width: 2540px) {
  .camps-list {
    grid-template-columns: repeat(6, 1fr);
  }
}
</style>
