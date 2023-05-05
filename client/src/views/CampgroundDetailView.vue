<template>
  <div class="wrapper">
    <DeleteModal
      v-if="isDelete"
      @closeModal="closeModalHandle"
      :campName="campground.title"
    />
    <div class="img-container">
      <img
        v-for="image in campground.images"
        class="images"
        :style="{ transform: imageTransform }"
        :src="image.path"
        alt="campground image"
      />
      <Previmagebutton @click="prevImage" />
      <NextImagebutton @click="nextImage" />
      <editordeletebutton v-if="IstheCreator" @delete="deleteModalHandle" />
    </div>

    <div class="info">
      <div class="campinfo">
        <p class="title">{{ campground.title }}</p>
        <p class="location">{{ campground.location }}</p>
        <br />
        <p>Post Creator: {{ campground.creator }}</p>
        <br />
        <h3>Description:</h3>
        <p class="description">{{ campground.description }}</p>
        <br />
      </div>
      <div class="comment-area">
        <h1 class="review-header">Review:</h1>
        <div class="review-section">
          <reviewCard
            v-for="review in campground.reviews"
            :reviewid="review._id"
            :message="review.message"
            :creator="review.creator"
          />
        </div>
        <br />
        <form
          v-if="isLoggedIn"
          novalidate
          class="review-form"
          @submit.prevent="reviewSubmitValidator"
        >
          <label for="review">Comment:</label>
          <textarea
            :class="{ error: v$.reviewMessage.$error }"
            name="review"
            id="review"
            cols="30"
            rows="2"
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
  </div>
</template>
<script>
import editordeletebutton from "../components/editordeletebutton.vue";
import gotoLoginButton from "../components/gotologinbutton.vue";
import formSubmitButton from "../components/formSubmitButton.vue";
import reviewCard from "../components/reviewCard.vue";
import { reactive, computed } from "vue";
import useValidate from "@vuelidate/core";
import { required, minLength, maxLength } from "@vuelidate/validators";
import { mapGetters } from "vuex";
import axios from "axios";
import NextImagebutton from "../components/nextImagebutton.vue";
import Previmagebutton from "../components/previmagebutton.vue";
import DeleteModal from "../components/deleteModal.vue";
export default {
  setup() {
    const state = reactive({
      reviewMessage: "",
    });

    const rules = computed(() => {
      return {
        reviewMessage: {
          required,
          minLength: minLength(5),
          maxLength: maxLength(20),
        },
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
      currentImageIndex: 0,
      isDelete: false,
    };
  },
  components: {
    gotoLoginButton,
    reviewCard,
    editordeletebutton,
    formSubmitButton,
    NextImagebutton,
    Previmagebutton,
    DeleteModal,
  },
  methods: {
    reviewSubmitValidator() {
      this.v$.$validate();
      if (!this.v$.$error) {
        this.createReviewHandler();
      }
    },
    createReviewHandler() {
      axios
        .post(
          `https://camp-viuw.herokuapp.com/campgrounds/${this.$route.params.id}/reviews`,
          {
            message: this.state.reviewMessage,
            creator: localStorage.getItem("userId"),
          },
          {
            headers: {
              Authorization: localStorage.getItem("loginJWToken"),
              campid: this.$route.params.id,
            },
          }
        )
        .then((res) => {
          window.location.reload();
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
    nextImage() {
      if (this.currentImageIndex + 1 < this.campground.images.length) {
        this.currentImageIndex += 1;
      }
    },
    prevImage() {
      if (this.currentImageIndex - 1 >= 0) {
        this.currentImageIndex -= 1;
      }
    },
    deleteModalHandle() {
      this.isDelete = true;
    },
    closeModalHandle() {
      this.isDelete = false;
    },
  },

  created() {
    axios
      .get(
        `https://camp-viuw.herokuapp.com/campgrounds/${this.$route.params.id}`
      )
      .then((res) => {
        this.campground = res.data;

        if (res.data.creator === localStorage.getItem("userId")) {
          this.IstheCreator = true;
        } else {
          this.IstheCreator = false;
        }
      })
      .catch((err) => {
        console.log(err);
      });
    window.addEventListener("resize", this.checkWindowSize);
    this.checkWindowSize();
  },
  computed: {
    ...mapGetters(["IsLoggedIn"]),
    isLoggedIn() {
      return this.IsLoggedIn;
    },
    imageTransform() {
      return `translateX(-${this.currentImageIndex * 100}%)`;
    },
  },
};
</script>

<style scoped>
.wrapper {
  height: 100%;
  width: 100%;
}
.img-container {
  max-height: 600px;
  width: 100%;
  display: flex;
  position: relative;
  overflow: hidden;
}
.images {
  object-fit: cover;
  max-height: 100%;
  width: 100%;
  transition: all 0.8s ease;
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
.review-header {
  font-size: 1.5rem;
}
@media screen and (min-width: 767px) {
  .info {
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr 1fr;
  }
  .wrapper {
    width: 80%;
    margin: auto;
  }
}
@media screen and (min-width: 1439px) {
  .wrapper {
    width: 60%;
    margin: auto;
  }
}
</style>
