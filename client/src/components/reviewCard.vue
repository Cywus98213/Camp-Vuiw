<template>
  <div class="review-wrapper">
    <h1>{{ reviewid }}:</h1>
    <p>{{ message }}</p>
    <button @click="deletereviewHandler">Delete</button>
  </div>
</template>
<script>
import deleteButton from "./deleteButton.vue";
import axios from "axios";
export default {
  components: {
    deleteButton,
  },
  props: ["message", "reviewid"],
  methods: {
    deletereviewHandler() {
      axios
        .delete(
          `http://localhost:3000/campgrounds/${this.$route.params.id}/reviews/${this.reviewid}`
        )
        .then((res) => {
          console.log(res);
          this.$router.go(`/campgrounds/${this.$route.params.id}`);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {},
};
</script>
<style scoped>
.review-wrapper {
}
</style>
