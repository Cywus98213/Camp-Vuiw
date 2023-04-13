<template>
  <div class="editform">
    <h1>Edit form:</h1>
    <form
      action="/campgrounds"
      method="PUT"
      @submit.prevent="formsubmitHandler"
    >
      <label for="">Name:</label>
      <input type="text" v-model="campground.title" />

      <label for="">Price:</label>
      <input type="text" v-model="campground.price" />
      <p v-show="isvalid" class="valid">Looks good!</p>
      <p v-show="!isvalid" class="notvalid">You missing something!</p>
      <label for="">ImageURL: </label>
      <input type="text" v-model="campground.image" />
      <p v-show="isvalid" class="valid">Looks good!</p>
      <p v-show="!isvalid" class="notvalid">You missing something!</p>
      <label for="">Description:</label>
      <textarea cols="30" rows="10" v-model="campground.description"></textarea>
      <p v-show="isvalid" class="valid">Looks good!</p>
      <p v-show="!isvalid" class="notvalid">You missing something!</p>
      <label for="">Location:</label>
      <input type="text" v-model="campground.location" />
      <p v-show="isvalid" class="valid">Looks good!</p>
      <p v-show="!isvalid" class="notvalid">You missing something!</p>
      <button type="submit">Submit</button>
      <button @click.prevent="goback">Back</button>
    </form>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      campground: [],
    };
  },
  methods: {
    formsubmitHandler() {
      axios
        .put(`http://localhost:3000/campgrounds/${this.$route.params.id}`, {
          title: this.campground.title,
          price: this.campground.price,
          image: this.campground.image,
          description: this.campground.description,
          location: this.campground.location,
        })
        .then((res) => {
          this.$router.push("/campgrounds");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    goback() {
      this.$router.go(-1);
    },
  },
  mounted() {
    axios
      .get(`http://localhost:3000/campgrounds/${this.$route.params.id}`)
      .then((res) => {
        this.campground = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
<style scoped>
.editform {
  max-width: 40rem;
  padding: 1rem;
  margin: auto;
}
form {
  display: flex;
  flex-direction: column;
}

.notvalid {
  color: var(--primary-notvalid-clr);
}
</style>
