<template>
  <div class="camp-detail-desktop" v-if="!ismobile">
    <h1 class="title regular">{{ campground.title }}</h1>
    <h2 class="grey">{{ campground.location }}</h2>
    <div class="camp-detail-nav">
      <RouterLink :to="{ name: 'campEdit' }"><editButton /></RouterLink>
      <deleteButton @click="deleteCampHandler" />
    </div>
    <div class="desktop-image-wrapper">
      <img :src="campground.image" alt="campsite" />
    </div>

    <div class="camp-detail-main-desktop">
      <div class="camp-info-desktop">
        <h2 class="">{{ campground.description }}</h2>
      </div>
      <div class="camp-price-desktop">
        <p class="price-tag bold">
          ${{ campground.price }} CAD <span class="regular">/ Night</span>
        </p>
      </div>
    </div>

    <div class="review-display-desktop">
      <h1 class="review-header">Reviews:</h1>
      <reviewCard
        v-for="review in campground.reviews"
        :message="review.body"
        :reviewid="review._id"
      />
    </div>

    <form class="review-form-desktop" @submit.prevent="reviewSubmitValidator">
      <label>Comments:</label>
      <textarea
        name="review"
        id=""
        cols="30"
        rows="3"
        placeholder="Leave a Review Here"
        v-model="state.reviewMessage"
        :class="{ error: v$.reviewMessage.$error }"
      ></textarea>
      <p v-if="v$.reviewMessage.$error" class="notvalid">
        {{ v$.reviewMessage.$errors[0].$message }}
      </p>

      <formSubmitButton :showText="'Submit'" />
    </form>
  </div>
  <div class="camp-detail-mobile" v-if="ismobile">
    <div class="mobile-image-wrapper">
      <img :src="campground.image" alt="campsite" />
    </div>
    <div class="camp-detail-nav">
      <RouterLink :to="{ name: 'campEdit' }"><editButton /> </RouterLink>
      <deleteButton @click="deleteCampHandler" />
    </div>
    <div class="camp-detail-main-mobile">
      <div class="camp-info-mobile">
        <h1 class="title regular">{{ campground.title }}</h1>
        <h2 class="grey">{{ campground.location }}</h2>
        <h2>{{ campground.description }}</h2>
      </div>
      <div class="camp-price-mobile">
        <p class="price-tag bold">
          ${{ campground.price }} CAD <span class="regular">/ Night</span>
        </p>
      </div>

      <div class="review-display-mobile">
        <h1 class="review-header">Reviews:</h1>
        <reviewCard
          v-for="review in campground.reviews"
          :message="review.body"
        />
      </div>

      <form class="review-form-mobile" @submit.prevent="reviewSubmitValidator">
        <label>Comments:</label>
        <textarea
          name="review"
          id=""
          cols="30"
          rows="3"
          placeholder="Leave a Review Here"
          v-model="reviewMessage"
        ></textarea>
        <formSubmitButton :showText="'Submit'" />
      </form>
    </div>
  </div>
</template>
<script>
import formSubmitButton from "../components/formSubmitButton.vue";
import reviewCard from "../components/reviewCard.vue";
import { reactive, computed } from "vue";
import useValidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import Reservebutton from "../components/Reservebutton.vue";
import backButton from "../components/mobilebackButton.vue";
import editButton from "../components/editButton.vue";
import deleteButton from "../components/deleteButton.vue";
import { RouterLink } from "vue-router";
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
    };
  },
  components: {
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
          console.log(err);
        });
    },
    reviewSubmitValidator() {
      this.v$.$validate();
      if (!this.v$.$error) {
        this.createReviewHandler();
      } else {
        alert("Failed to submit review!");
      }
    },
    createReviewHandler() {
      axios
        .post(
          `http://localhost:3000/campgrounds/${this.$route.params.id}/reviews`,
          {
            body: this.state.reviewMessage,
          }
        )
        .then((res) => {
          this.$router.go(`/campgrounds/${this.$route.params.id}`);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
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
        this.campground = res.data;
      })
      .catch((err) => {
        if (err.response.status === 404) {
          console.log("Code: 404 , Something went Wrong.");
          this.$router.push("/campgrounds/error404");
        } else if (err.response.status === 500) {
          console.log("Code: 500 , Something went Wrong.");
          this.$router.push("/campgrounds/error500");
        } else if (err.response.status === 400) {
          console.log("Code: 400 , Something went Wrong.");
          this.$router.push("/campgrounds/error400");
        }
      });
  },
  created() {
    console.log(this.campground);
    window.addEventListener("resize", this.checkWindowSize);
    this.checkWindowSize();
  },
};
</script>

<style scoped>
.grey {
  color: grey;
}
.camp-detail-desktop {
  height: 100vh;
  max-width: 1120px;
  margin: auto;
  padding: 1rem;
}
.title {
  font-size: 2rem;
}
.camp-detail-nav {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
}
.desktop-image-wrapper {
  margin: auto;
  aspect-ratio: 16/9;
  max-width: 1120px;
}
.desktop-image-wrapper img {
  object-fit: cover;
  height: 100%;
  width: 100%;
}
.camp-detail-main-desktop {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.camp-price-desktop {
  width: 80%;
  margin-left: auto;
}

.camp-detail-mobile {
  max-height: 100%;
  max-width: 1120px;
  margin: auto;
  padding: 1rem;
}
.title {
  font-size: 2rem;
}
.camp-detail-nav {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
}
.mobile-image-wrapper {
  margin: auto;
  aspect-ratio: 16/9;
  max-width: 1120px;
}
.mobile-image-wrapper img {
  object-fit: cover;
  height: 100%;
  width: 100%;
}
.price-tag {
  font-size: 1.5rem;
}
.review-form-mobile {
  display: flex;
  flex-direction: column;
}
.review-form-desktop {
  display: flex;
  flex-direction: column;
  width: 50%;
}

.notvalid {
  color: var(--primary-notvalid-clr);
}
.error {
  border: 2px var(--primary-notvalid-clr) solid;
}
.review-display-desktop {
  overflow-y: scroll;
  margin-top: 5rem;
  width: 50%;
  height: 20%;
}
.review-display-mobile {
  overflow-y: scroll;
  margin-top: 15rem;
  height: 27vh;
}
.review-header {
  font-size: 1.3rem;
}
</style>
