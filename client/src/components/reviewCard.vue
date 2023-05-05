<template>
  <div class="review-wrapper">
    <div class="review-header">
      <h1>{{ creator }}:</h1>
      <deleteButton
        class="review-nav"
        @click="reviewDeleteHandler"
        v-if="isCreator"
      />
    </div>

    <p>{{ message }}</p>
  </div>
</template>
<script>
import deleteButton from "../components/reviewdeleteButton.vue";
import axios from "axios";
export default {
  data() {
    return {
      isCreator: false,
      usernameinfo: [],
    };
  },
  components: {
    deleteButton,
  },
  props: ["message", "reviewid", "creator"],
  methods: {
    reviewDeleteHandler() {
      axios
        .delete(
          `https://camp-viuw.herokuapp.com/campgrounds/${this.$route.params.id}/reviews/${this.reviewid}`,
          {
            headers: {
              Authorization: localStorage.getItem("loginJWToken"),
            },
          }
        )
        .then((res) => {
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    if (this.creator === localStorage.getItem("userId")) {
      this.isCreator = true;
    }
  },
};
</script>
<style scoped>
.review-header {
  display: flex;
}
.review-nav {
  margin-left: auto;
}
@media screen and (min-width: 767px) {
}
</style>
