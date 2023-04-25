<template>
  <div class="review-wrapper">
    <h1>{{ reviewid }}:</h1>
    <p>{{ message }}</p>
    <form action="DELETE" @submit.prevent="deletereviewHandler">
      <button>Delete</button>
    </form>
  </div>
</template>
<script>
import axios from "axios";
export default {
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
