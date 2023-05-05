<template>
  <div class="wrapper">
    <div class="goback">
      <backButton />
    </div>
    <form
      class="form-edit"
      action="/campgrounds"
      method="PUT"
      @submit.prevent="formsubmitHandler"
    >
      <div class="header">Edit form</div>
      <div class="inputbox">
        <label for="">Name:</label>
        <input
          type="text"
          v-model="state.editcampName"
          :class="{ error: v$.editcampName.$error }"
        />
        <img
          v-if="v$.editcampName.$error"
          class="error-img"
          src="../assets/error-exclamation.svg"
          alt="error input"
        />
        <p v-if="v$.editcampName.$error" class="notvalid">
          {{ v$.editcampName.$errors[0].$message }}
        </p>
      </div>

      <div class="inputbox">
        <label for="">Image files: </label>
        <input type="file" multiple v-on:change="onFileChange" />
        <div class="upload-wrapper" v-for="image in currentImagefile">
          <img :src="image.path" alt="current upload images" />

          <input
            type="checkbox"
            :value="image.filename"
            v-model="deleteImagefile"
          />
        </div>
      </div>

      <div class="inputbox">
        <label for="">Description:</label>
        <textarea
          cols="30"
          rows="10"
          v-model="state.editcampDescription"
          :class="{ error: v$.editcampDescription.$error }"
        ></textarea>
        <img
          v-if="v$.editcampDescription.$error"
          class="error-img"
          src="../assets/error-exclamation.svg"
          alt="error input"
        />
        <p v-if="v$.editcampDescription.$error" class="notvalid">
          {{ v$.editcampDescription.$errors[0].$message }}
        </p>
      </div>

      <div class="inputbox">
        <label for="">Location:</label>
        <input
          type="text"
          v-model="state.editcampLocation"
          :class="{ error: v$.editcampLocation.$error }"
        />
        <img
          v-if="v$.editcampLocation.$error"
          class="error-img"
          src="../assets/error-exclamation.svg"
          alt="error input"
        />
        <p v-if="v$.editcampLocation.$error" class="notvalid">
          {{ v$.editcampLocation.$errors[0].$message }}
        </p>
      </div>

      <formSubmitButton :showText="'Submit'" />
    </form>
  </div>
</template>
<script>
import backButton from "../components/backButton.vue";
import formSubmitButton from "../components/formSubmitButton.vue";
import { reactive, computed } from "vue";
import useValidate from "@vuelidate/core";
import { required, minLength, numeric } from "@vuelidate/validators";
import axios from "axios";
export default {
  data() {
    return {
      campImagefile: null,
      deleteImagefile: [],
      currentImagefile: null,
    };
  },
  setup() {
    const state = reactive({
      editcampName: "",

      editcampDescription: "",
      editcampLocation: "",
    });

    const rules = computed(() => {
      return {
        editcampName: { required, minLength: minLength(6) },

        editcampDescription: { required, minLength: minLength(6) },
        editcampLocation: { required, minLength: minLength(6) },
      };
    });

    const v$ = useValidate(rules, state);

    return {
      state,
      v$,
    };
  },
  components: {
    formSubmitButton,
    backButton,
  },
  methods: {
    formsubmitHandler() {
      this.v$.$validate();
      if (!this.v$.$error) {
        this.editformHandler();
      }
    },
    editformHandler() {
      const formData = new FormData();
      formData.append("title", this.state.editcampName);

      formData.append("creator", localStorage.getItem("userId"));
      formData.append("description", this.state.editcampDescription);
      formData.append("location", this.state.editcampLocation);

      if (this.deleteImagefile) {
        for (let i = 0; i < this.deleteImagefile.length; i++) {
          formData.append("deleteImages", this.deleteImagefile[i]);
        }
      }

      if (this.campImagefile) {
        for (let i = 0; i < this.campImagefile.length; i++) {
          formData.append("images", this.campImagefile[i]);
        }
      }

      axios
        .put(
          `https://camp-viuw.herokuapp.com/campgrounds/${this.$route.params.id}`,
          formData,
          {
            headers: {
              Authorization: localStorage.getItem("loginJWToken"),
            },
          }
        )
        .then((res) => {
          this.$router.push("/campgrounds");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onFileChange(e) {
      this.campImagefile = e.target.files;
    },
    currentFileDelete(e) {
      console.log(e.target.value);
    },
  },
  mounted() {
    axios
      .get(
        `https://camp-viuw.herokuapp.com/campgrounds/${this.$route.params.id}`
      )
      .then((res) => {
        this.state.editcampName = res.data.title;

        this.currentImagefile = res.data.images;
        this.state.editcampDescription = res.data.description;
        this.state.editcampLocation = res.data.location;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
<style scoped>
.wrapper {
  height: 100vh;
  width: 100%;
  display: grid;
  place-content: center;
  position: relative;
}
.form-edit {
  width: 500px;
  height: 100%;
  position: relative;
  padding: 2.5rem 1rem 1rem 1rem;
  border: 1px var(--primary-btn-clr) solid;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.goback {
  position: absolute;
  top: 0;
  left: 0;
  margin: 1rem;
}
.header {
  position: absolute;
  height: 2rem;
  top: 0;
  left: 0;
  width: 100%;
  background-color: var(--navbar-btn-hover);
  display: flex;
  align-items: center;
  justify-content: center;
}
.notvalid {
  color: var(--primary-notvalid-clr);
}

.inputbox {
  display: flex;
  flex-direction: column;
  position: relative;
}
.upload-wrapper {
  margin: 0.3rem;
  display: flex;
  justify-content: space-between;
}
.error-img {
  position: absolute;
  right: 0.5rem;
  top: 1.8rem;
  width: 1rem;
}
.error {
  border: 1px var(--primary-notvalid-clr) solid;
}
.upload-wrapper img {
  width: 5rem;
  aspect-ratio: 3/2;
  object-fit: contain;
}
</style>
