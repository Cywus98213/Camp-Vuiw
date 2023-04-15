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
  </div>
  <div class="camp-detail-mobile" v-if="ismobile">
    <div class="mobile-image-wrapper">
      <img :src="campground.image" alt="campsite" />
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
    </div>
    <div class="camp-detail-nav">
      <RouterLink :to="{ name: 'campEdit', params: { campid: campground._id } }"
        ><editButton />
      </RouterLink>
      <deleteButton @click="deleteCampHandler" />
    </div>
  </div>
</template>
<script>
import Reservebutton from "../components/Reservebutton.vue";
import backButton from "../components/mobilebackButton.vue";
import editButton from "../components/editButton.vue";
import deleteButton from "../components/deleteButton.vue";
import { RouterLink } from "vue-router";
import axios from "axios";
export default {
  components: {
    deleteButton,
    editButton,
    backButton,
    Reservebutton,
  },
  data() {
    return {
      campground: [],
      ismobile: false,
      windowsize: null,
    };
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
        } else if (err.response.status === 500) {
          console.log("Code: 500 , Something went Wrong.");
        } else if (err.response.status === 400) {
          console.log("Code: 400 , Something went Wrong.");
        }
      });
  },
  created() {
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
.camp-info-desktop {
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
.camp-detail-main-mobile {
}
.camp-info-mobile {
}
.camp-price-mobile {
}
.price-tag {
  font-size: 1.5rem;
}
</style>
