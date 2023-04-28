<template>
  <div class="wrapper">
    <img :src="campground.image" alt="campground image" />
    <div class="info">
      <p class="title">{{ campground.title }}</p>
      <p class="location">{{ campground.location }}</p>
      <br />
      <h3>Description:</h3>
      <p class="description">{{ campground.description }}</p>
      <br />
      <p class="price">${{ campground.price }}/ Day</p>
      <br />
      <h1>Review:</h1>
      <div class="review-section">
        <reviewCard
          v-for="review in campground.reviews"
          :reviewid="review._id"
          :message="review.body"
        />
      </div>
      <br />
      <form
        v-if="isLoggedIn"
        novalidate
        class="review-form"
        @submit.prevent="createReviewHandler"
      >
        <label for="review">Comment:</label>
        <textarea
          :class="{ error: v$.reviewMessage.$error }"
          name="review"
          id="review"
          cols="30"
          rows="5"
          v-model="state.reviewMessage"
        ></textarea>
        <p class="error-msg" v-if="v$.reviewMessage.$error">
          {{ v$.reviewMessage.$errors[0].$message }}
        </p>

        <formSubmitButton :showText="'Submit'" v-if="isLoggedIn" />
      </form>
      <gotoLoginButton v-if="!isLoggedIn" @click="gotoSignin" />
    </div>
  </div>
</template>
<script>
import gotoLoginButton from "../components/gotologinbutton.vue";
import formSubmitButton from "../components/formSubmitButton.vue";
import reviewCard from "../components/reviewCard.vue";
import { reactive, computed } from "vue";
import useValidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import Reservebutton from "../components/Reservebutton.vue";
import backButton from "../components/mobilebackButton.vue";
import editButton from "../components/editButton.vue";
import deleteButton from "../components/deleteButton.vue";
import axios from "axios";
export default {
  setup() {
    const state = reactive({
      reviewMessage: "",
    });

    const rules = computed(() => {
      return {
        reviewMessage: { required, minLength: minLength(5) },
      };
    });

    const v$ = useValidate(rules, state);

    return {
      state,
      v$,
    };
  },
  data() {
    return {
      campground: [],
      ismobile: false,
      windowsize: null,
      IstheCreator: false,
    };
  },
  components: {
    gotoLoginButton,
    reviewCard,
    deleteButton,
    editButton,
    backButton,
    Reservebutton,
    formSubmitButton,
  },
  methods: {
    deleteCampHandler() {
      axios
        .delete(`http://localhost:3000/campgrounds/${this.$route.params.id}`)
        .then((res) => {
          console.log(res);
          this.$router.push("/campgrounds");
        })
        .catch((err) => {
          if (err.response.status === 401) {
            this.$router.push("/login");
          }
        });
    },
    reviewSubmitValidator() {
      this.v$.$validate();
      if (!this.v$.$error) {
        this.createReviewHandler();
      }
    },
    createReviewHandler() {
      axios
        .post(
          `http://localhost:3000/campgrounds/${this.$route.params.id}/reviews`,
          {
            body: this.state.reviewMessage,
            token: localStorage.getItem("loginJWToken"),
            userId: localStorage.getItem("userId"),
          }
        )
        .then((res) => {
          this.$router.go(`/campgrounds/${this.$route.params.id}`);
          console.log(res);
        })
        .catch((err) => {
          if (err.response.status === 401) {
            this.$router.push("/login");
          }
        });
    },
    gotoSignin() {
      this.$router.push("/login");
    },
    checkWindowSize() {
      this.windowSize = window.innerWidth;
      if (this.windowSize < 767) {
        return (this.ismobile = true);
      }
      this.ismobile = false;
    },
  },
  mounted() {
    axios
      .get(`http://localhost:3000/campgrounds/${this.$route.params.id}`)
      .then((res) => {
        console.log(res);
        this.campground = res.data;
        if (res.data.creator === localStorage.getItem("userId")) {
          this.IstheCreator = true;
        } else {
          console.log("not the same user");
          this.IstheCreator = false;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  created() {
    window.addEventListener("resize", this.checkWindowSize);
    this.checkWindowSize();
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
  },
};
</script>

<style scoped>
.wrapper {
  height: 100%;
  width: 100%;
}

img {
  max-height: 600px;
  width: 100%;
  object-fit: cover;
}
.info {
  padding: 2rem;
}
.title {
  font-size: 3rem;
}
.review-form {
  display: flex;
  flex-direction: column;
}
.review-section {
  margin-top: 2rem;
  height: 350px;
  overflow-y: scroll;
}
.price {
  font-size: 2rem;
}
.review {
  padding: 1rem;
}
.error-msg {
  color: var(--primary-notvalid-clr);
}
.error {
  border: var(--primary-notvalid-clr) solid;
}
</style>
